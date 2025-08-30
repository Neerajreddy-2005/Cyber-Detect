import joblib
import numpy as np
from scapy.all import sniff, IP, TCP, UDP
from sklearn.preprocessing import StandardScaler
import logging
import json
import asyncio
import websockets
import threading
import os
import random
import time
from datetime import datetime

# ----------------- Load Trained Components -----------------
model = joblib.load("nids_xgboost_model3.pkl")
scaler = joblib.load("nids_scaler3.pkl")
selected_features = joblib.load("nids_feature_columns3.pkl")

# ----------------- Logging -----------------
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(message)s',
)

print("🚨 Real-time Network Intrusion Detection Started...")

# ----------------- WebSocket Connections -----------------
connected_clients = set()

async def register(websocket):
    connected_clients.add(websocket)
    try:
        await websocket.wait_closed()
    finally:
        connected_clients.remove(websocket)

async def broadcast(message):
    if connected_clients:
        await asyncio.gather(
            *[client.send(message) for client in connected_clients]
        )

async def websocket_server():
    port = int(os.environ.get('PORT', 8765))
    host = '0.0.0.0'  # Allow external connections for cloud
    async with websockets.serve(register, host, port):
        await asyncio.Future()  # run forever

# ----------------- Feature Extraction Function -----------------
def extract_features(pkt):
    features = {}

    if IP in pkt:
        features['IP_IHL'] = pkt[IP].ihl
        features['IP_TTL'] = pkt[IP].ttl
        features['IP_Len'] = pkt[IP].len
        features['IP_Frag'] = pkt[IP].flags.value
        features['Proto'] = pkt[IP].proto
    else:
        return None  # skip non-IP packets

    if TCP in pkt:
        features['Src_Port'] = pkt[TCP].sport
        features['Dst_Port'] = pkt[TCP].dport
        features['Window'] = pkt[TCP].window
        features['Flags'] = pkt[TCP].flags.value
        features['Pkt_Len'] = len(pkt)
    elif UDP in pkt:
        features['Src_Port'] = pkt[UDP].sport
        features['Dst_Port'] = pkt[UDP].dport
        features['Window'] = 0
        features['Flags'] = 0
        features['Pkt_Len'] = len(pkt)
    else:
        return None  # skip non-TCP/UDP packets

    return features

# ----------------- Live Packet Callback -----------------
def predict_intrusion(pkt):
    feat_dict = extract_features(pkt)
    if not feat_dict:
        return

    # Filter to match selected features
    input_features = []
    for feat in selected_features:
        val = feat_dict.get(feat, 0)  # use 0 for missing features
        input_features.append(val)

    input_scaled = scaler.transform([input_features])
    prediction = model.predict(input_scaled)[0]
    label = "Normal Traffic" if prediction == 0 else "ATTACK"
    
    # Create log entry
    log_entry = {
        "id": f"{pkt[IP].src}-{pkt[IP].dst}",
        "timestamp": datetime.now().strftime("%m-%d %H:%M:%S"),
        "src_ip": f"{pkt[IP].src}-{feat_dict['Src_Port']}",
        "dst_ip": f"{pkt[IP].dst}-{feat_dict['Dst_Port']}",
        "protocol": str(feat_dict['Proto']),
        "prediction": int(prediction),
        "label": label,
        "packet_length": str(feat_dict['Pkt_Len']),
        "ttl": str(feat_dict['IP_TTL'])
    }
    
    # Log to file
    with open("nids_logs.json", "a") as f:
        f.write(json.dumps(log_entry) + "\n")
    
    # Broadcast to WebSocket clients
    asyncio.run(broadcast(json.dumps(log_entry)))
    logging.info(f"Prediction: {label}")

# ----------------- Cloud Detection -----------------
def is_cloud_environment():
    """Detect if running in cloud environment"""
    cloud_indicators = [
        'RENDER' in os.environ,
        'HEROKU' in os.environ,
        'AWS' in os.environ,
        'GCP' in os.environ,
        'AZURE' in os.environ,
        'PORT' in os.environ,  # Render sets this
    ]
    return any(cloud_indicators)

# ----------------- Simulated Packet Generator -----------------
def generate_simulated_packet():
    """Generate realistic packet data for cloud environment"""
    # Common IP addresses
    src_ips = ['192.168.1.100', '10.0.0.50', '172.16.0.25', '192.168.0.10']
    dst_ips = ['8.8.8.8', '1.1.1.1', '208.67.222.222', '9.9.9.9']
    
    # Common ports
    src_ports = [random.randint(1024, 65535) for _ in range(4)]
    dst_ports = [80, 443, 22, 53, 8080, 3000, 5000]
    
    # Protocols (6=TCP, 17=UDP)
    protocols = [6, 17]
    
    # Generate packet data
    packet_data = {
        'src_ip': random.choice(src_ips),
        'dst_ip': random.choice(dst_ips),
        'src_port': random.choice(src_ports),
        'dst_port': random.choice(dst_ports),
        'protocol': random.choice(protocols),
        'packet_length': random.randint(64, 1500),
        'ttl': random.randint(32, 128),
        'window': random.randint(1024, 65535) if random.choice(protocols) == 6 else 0,
        'flags': random.randint(0, 63) if random.choice(protocols) == 6 else 0,
        'ihl': random.randint(5, 15),
        'frag': random.randint(0, 3)
    }
    
    return packet_data

def simulate_packet_analysis():
    """Simulate packet analysis for cloud environment"""
    while True:
        try:
            # Generate simulated packet
            packet_data = generate_simulated_packet()
            
            # Create features dictionary
            features = {
                'IP_IHL': packet_data['ihl'],
                'IP_TTL': packet_data['ttl'],
                'IP_Len': packet_data['packet_length'],
                'IP_Frag': packet_data['frag'],
                'Proto': packet_data['protocol'],
                'Src_Port': packet_data['src_port'],
                'Dst_Port': packet_data['dst_port'],
                'Window': packet_data['window'],
                'Flags': packet_data['flags'],
                'Pkt_Len': packet_data['packet_length']
            }
            
            # Use existing prediction logic
            input_features = []
            for feat in selected_features:
                val = features.get(feat, 0)
                input_features.append(val)
            
            input_scaled = scaler.transform([input_features])
            prediction = model.predict(input_scaled)[0]
            label = "Normal Traffic" if prediction == 0 else "ATTACK"
            
            # Create log entry
            log_entry = {
                "id": f"{packet_data['src_ip']}-{packet_data['dst_ip']}",
                "timestamp": datetime.now().strftime("%m-%d %H:%M:%S"),
                "src_ip": f"{packet_data['src_ip']}-{packet_data['src_port']}",
                "dst_ip": f"{packet_data['dst_ip']}-{packet_data['dst_port']}",
                "protocol": str(packet_data['protocol']),
                "prediction": int(prediction),
                "label": label,
                "packet_length": str(packet_data['packet_length']),
                "ttl": str(packet_data['ttl'])
            }
            
            # Log to file
            with open("nids_logs.json", "a") as f:
                f.write(json.dumps(log_entry) + "\n")
            
            # Broadcast to WebSocket clients
            asyncio.run(broadcast(json.dumps(log_entry)))
            logging.info(f"Simulated Prediction: {label}")
            
            # Wait before next packet (simulate real-time)
            time.sleep(random.uniform(0.5, 2.0))
            
        except Exception as e:
            logging.error(f"Error in packet simulation: {e}")
            time.sleep(1)

# ----------------- Start Services -----------------
def start_websocket():
    asyncio.run(websocket_server())

def start_sniffing():
    if is_cloud_environment():
        logging.info("🌐 Running in cloud environment - using simulated packet data")
        simulate_packet_analysis()
    else:
        logging.info("🏠 Running locally - using real packet sniffing")
        try:
            sniff(filter="ip", prn=predict_intrusion, store=0)
        except Exception as e:
            logging.error(f"Packet sniffing failed: {e}")
            logging.info("Falling back to simulated data...")
            simulate_packet_analysis()

if __name__ == "__main__":
    # Start WebSocket server in a separate thread
    ws_thread = threading.Thread(target=start_websocket)
    ws_thread.start()
    
    # Start packet sniffing in the main thread
    start_sniffing()
