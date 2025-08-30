import joblib
import numpy as np
from scapy.all import sniff, IP, TCP, UDP
from sklearn.preprocessing import StandardScaler
import logging
import json
import asyncio
import websockets
import threading
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
    async with websockets.serve(register, "localhost", 8765):
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

# ----------------- Start Services -----------------
def start_websocket():
    asyncio.run(websocket_server())

def start_sniffing():
    sniff(filter="ip", prn=predict_intrusion, store=0)

if __name__ == "__main__":
    # Start WebSocket server in a separate thread
    ws_thread = threading.Thread(target=start_websocket)
    ws_thread.start()
    
    # Start packet sniffing in the main thread
    start_sniffing()
