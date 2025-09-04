# Cyber-Detect: Network Intrusion Detection System

A real-time network intrusion detection system powered by machine learning, featuring a modern web interface for monitoring and analyzing network traffic.

## 🚀 Overview

Cyber-Detect is a comprehensive network security solution that combines advanced machine learning algorithms with real-time packet analysis to detect and classify network intrusions. The system provides an intuitive web dashboard for monitoring network traffic, visualizing security metrics, and receiving instant alerts for suspicious activities.

## 🏗️ System Architecture

The project follows a client-server architecture with the following components:

- **Backend**: Python-based packet analysis and ML inference engine
- **Frontend**: Modern React web application with real-time updates
- **Communication**: WebSocket-based real-time data streaming
- **ML Model**: Pre-trained XGBoost classifier for intrusion detection

## 🛠️ Technologies Used

### Backend Technologies
- **Python 3.8+**: Core programming language
- **Scapy 2.5.0**: Network packet manipulation and analysis
- **Scikit-learn 1.4.0**: Machine learning framework
- **XGBoost 2.0.3**: Gradient boosting classifier for intrusion detection
- **NumPy 1.26.4**: Numerical computing
- **Joblib 1.3.2**: Model serialization and loading
- **WebSockets 12.0**: Real-time communication
- **Asyncio 3.4.3**: Asynchronous programming
- **Logging**: Built-in Python logging module

### Frontend Technologies
- **React 18.3.1**: Modern JavaScript framework
- **TypeScript 5.5.3**: Type-safe JavaScript development
- **Vite 5.4.1**: Fast build tool and development server
- **Tailwind CSS 3.4.11**: Utility-first CSS framework
- **Shadcn/ui**: Modern component library
- **Radix UI**: Accessible UI primitives
- **React Router DOM 6.26.2**: Client-side routing
- **Recharts 2.12.7**: Data visualization library
- **React Hook Form 7.53.0**: Form handling
- **Zod 3.23.8**: Schema validation
- **TanStack Query 5.56.2**: Data fetching and caching
- **Lucide React 0.462.0**: Icon library

### Development Tools
- **ESLint 9.9.0**: Code linting
- **PostCSS 8.4.47**: CSS processing
- **Autoprefixer 10.4.20**: CSS vendor prefixing

### System Requirements
- **Npcap**: Required for Windows packet sniffing (see installation guide below)
- **Node.js 16+**: For frontend development
- **Python 3.8+**: For backend development

## 🎨 User Interface & Design

### Design System
The application features a modern, cyberpunk-inspired design with:
- **Dark Theme**: Primary dark color scheme (#1A1F2C, #221F26)
- **Accent Colors**: Purple (#9b87f5), Blue (#0EA5E9), Orange (#F97316), Green (#10B981)
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Smooth Animations**: CSS transitions and hover effects
- **Modern Typography**: Clean, readable font hierarchy

### Key Interface Components

#### 1. Home Page
- Hero section with project overview
- Feature highlights with animated cards
- Performance statistics display
- Call-to-action buttons for navigation

#### 2. Dashboard
- **Real-time Monitoring**: Live packet analysis with WebSocket updates
- **Interactive Charts**: Traffic visualization using Recharts
- **Packet Logs**: Detailed log of analyzed network packets
- **Statistics Cards**: Key metrics and performance indicators
- **Filtering Options**: Toggle between normal traffic and intrusions
- **Settings Panel**: Configurable refresh intervals and display options

#### 3. Navigation
- Responsive sidebar navigation
- Breadcrumb navigation
- Mobile-friendly hamburger menu

## 🔧 Installation & Setup

### Prerequisites

#### 1. System Requirements
- **Windows 10/11** (for packet sniffing functionality)
- **Python 3.8 or higher**
- **Node.js 16 or higher**
- **npm or yarn package manager**

#### 2. Npcap Installation (Required for Packet Sniffing)

**⚠️ IMPORTANT**: Npcap is required for real network packet analysis on Windows.

1. **Download Npcap**:
   - Go to: https://npcap.com/#download
   - Download "Npcap 1.83 installer" (main installer)

2. **Install Npcap**:
   - Right-click the installer and "Run as administrator"
   - Accept all default settings during installation
   - **Restart your computer** after installation

3. **Verify Installation**:
   - After restart, the packet sniffing functionality will work
   - Without Npcap, you'll get: "Sniffing and sending packets is not available at layer 2: winpcap is not installed"

### Backend Setup

1. **Navigate to the backend directory**:
```bash
cd backend
```

2. **Install Python dependencies**:
```bash
pip install -r requirements.txt
```

3. **Run the backend server**:
```bash
python packet_detection.py
```

**Backend Features**:
- WebSocket server on `ws://localhost:8765`
- Real-time packet sniffing and analysis
- Machine learning intrusion detection
- Automatic log generation

### Frontend Setup

1. **Navigate to the frontend directory**:
```bash
cd frontend
```

2. **Install Node.js dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm run dev
```

**Frontend Features**:
- Development server on `http://localhost:5173` (or next available port)
- Hot module replacement
- TypeScript compilation
- Tailwind CSS processing

## 🚀 Running the System

### Complete Setup Sequence

1. **Install Npcap** (if not already installed):
   - Download and install Npcap as administrator
   - Restart your computer

2. **Start Backend First**:
```bash
cd backend
python packet_detection.py
```

3. **Start Frontend** (in a new terminal):
```bash
cd frontend
npm run dev
```

4. **Access the Application**:
   - **Dashboard**: Navigate to `http://localhost:5173/dashboard`
   - **Home Page**: Visit `http://localhost:5173`

### Verification Steps

1. **Check Backend Status**:
   - Look for: "🚨 Real-time Network Intrusion Detection Started..."
   - WebSocket server should be running on port 8765

2. **Check Frontend Status**:
   - Look for: "VITE v5.4.18 ready"
   - Server should be running on localhost (port 5173 or next available)

3. **Test Real-time Data**:
   - Open dashboard in browser
   - Should see live packet analysis data
   - WebSocket connection should be established

## 📊 Features

### Real-time Network Monitoring
- Live packet capture and analysis
- Instant intrusion detection alerts
- WebSocket-based real-time updates
- Configurable refresh intervals

### Machine Learning Integration
- Pre-trained XGBoost model for intrusion classification
- Feature extraction from network packets
- Binary classification (Normal vs. Intrusion)
- High accuracy detection (96.52% accuracy)

### Interactive Dashboard
- Real-time traffic visualization
- Protocol distribution charts
- Packet statistics and metrics
- Filterable log display
- Responsive design for all devices

### Data Visualization
- Line charts for traffic trends
- Bar charts for protocol distribution
- Progress indicators for system status
- Color-coded alerts and notifications

## 🔒 Security Features

- **Packet Analysis**: Deep inspection of network packets
- **Feature Extraction**: Comprehensive network feature analysis
- **Anomaly Detection**: ML-based pattern recognition
- **Real-time Alerts**: Instant notification of suspicious activities
- **Log Management**: Detailed logging of all analyzed packets

## 📁 Project Structure

```
Cyber-Detect/
├── backend/
│   ├── packet_detection.py          # Main backend application
│   ├── requirements.txt             # Python dependencies
│   ├── nids_xgboost_model3.pkl     # Pre-trained ML model
│   ├── nids_scaler3.pkl            # Feature scaler
│   ├── nids_feature_columns3.pkl   # Feature column definitions
│   └── nids_logs.json              # System logs
├── frontend/
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   ├── pages/                  # Application pages
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── lib/                    # Utility functions
│   │   └── App.tsx                 # Main application component
│   ├── public/                     # Static assets
│   ├── package.json                # Node.js dependencies
│   └── tailwind.config.ts          # Tailwind CSS configuration
└── README.md                       # Project documentation
```

## 🎯 Performance Metrics

- **Detection Accuracy**: 96.52%
- **Intrusion Recall**: 99%
- **Overall F1-Score**: 97%
- **Real-time Processing**: Sub-second packet analysis
- **WebSocket Latency**: Minimal delay for live updates

## 🔧 Configuration

### Backend Configuration
- WebSocket port: 8765 (configurable in `packet_detection.py`)
- Packet capture interface: Default network interface
- Log level: INFO (configurable)

### Frontend Configuration
- Development server port: 5173 (Vite default, auto-increments if busy)
- API endpoints: WebSocket connection to localhost:8765
- Build output: `dist/` directory

## 🚀 Deployment

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
python packet_detection.py
```

## 🛠️ Troubleshooting

### Common Issues

1. **"No libpcap provider available"**:
   - Install Npcap as described above
   - Restart your computer after installation

2. **"ModuleNotFoundError: No module named 'xgboost'"**:
   - Run: `pip install -r requirements.txt`

3. **"Port already in use"**:
   - Frontend will automatically use next available port
   - Check terminal output for actual port number

4. **WebSocket connection failed**:
   - Ensure backend is running before frontend
   - Check firewall settings
   - Verify port 8765 is not blocked

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔮 Future Enhancements

- Multi-user authentication system
- Advanced threat intelligence integration
- Custom rule-based detection
- API endpoints for external integrations
- Mobile application
- Cloud deployment options
- Support for additional ML models
- Enhanced visualization features
