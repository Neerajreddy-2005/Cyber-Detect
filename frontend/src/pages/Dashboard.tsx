import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ShieldCheck, Activity, Settings, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface PacketLog {
  id: string;
  timestamp: string;
  src_ip: string;
  dst_ip: string;
  protocol: string;
  prediction: number;
  label: string;
  packet_length: string;
  ttl: string;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [showLogs, setShowLogs] = useState(true);
  const [showOnlyIntrusions, setShowOnlyIntrusions] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(3);
  const [activeTab, setActiveTab] = useState('overview');
  const [packetLogs, setPacketLogs] = useState<PacketLog[]>([]);
  const [showAllLogs, setShowAllLogs] = useState(false);
  const [normalPackets, setNormalPackets] = useState(0);
  const [intrusionPackets, setIntrusionPackets] = useState(0);
  const [trafficData, setTrafficData] = useState<Array<{timestamp: string, normal: number, intrusion: number}>>([]);
  const [protocolData, setProtocolData] = useState<Array<{name: string, value: number}>>([]);
  const ws = useRef<WebSocket | null>(null);

  // Function to handle showing more/less logs
  const toggleShowAllLogs = () => {
    setShowAllLogs(prev => !prev);
  };

  useEffect(() => {
    // Connect to WebSocket
    ws.current = new WebSocket('ws://localhost:8765');
    
    ws.current.onmessage = (event) => {
      const packet: PacketLog = JSON.parse(event.data);
      
      // Update packet logs - keep only the latest 100 logs in memory
      setPacketLogs(prev => {
        const newLogs = [packet, ...prev];
        return newLogs.slice(0, 100);
      });
      
      // Update counters
      if (packet.prediction === 0) {
        setNormalPackets(prev => prev + 1);
      } else {
        setIntrusionPackets(prev => prev + 1);
      }
      
      // Update traffic data
      const now = new Date().toLocaleTimeString();
      setTrafficData(prev => {
        const newData = [...prev];
        if (newData.length > 0 && newData[0].timestamp === now) {
          if (packet.prediction === 0) {
            newData[0].normal += 1;
          } else {
            newData[0].intrusion += 1;
          }
        } else {
          newData.unshift({
            timestamp: now,
            normal: packet.prediction === 0 ? 1 : 0,
            intrusion: packet.prediction === 1 ? 1 : 0
          });
        }
        return newData.slice(0, 10);
      });
      
      // Update protocol data
      setProtocolData(prev => {
        const protocol = packet.protocol === '6' ? 'TCP' : 
                        packet.protocol === '17' ? 'UDP' : 
                        packet.protocol === '1' ? 'ICMP' : 'Other';
        
        const newData = [...prev];
        const index = newData.findIndex(item => item.name === protocol);
        if (index !== -1) {
          newData[index].value += 1;
        } else {
          newData.push({ name: protocol, value: 1 });
        }
        return newData;
      });
    };

    ws.current.onerror = (error) => {
      toast({
        title: 'Connection Error',
        description: 'Failed to connect to the network monitoring service',
        variant: 'destructive'
      });
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [toast]);

  // Simulating real-time updates
  const handleRefresh = () => {
    toast({
      title: 'Dashboard Refreshed',
      description: 'Latest network traffic data loaded',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Network Traffic Dashboard</h1>
          <p className="text-gray-400">Real-time monitoring and intrusion detection</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <Button variant="outline" className="mr-2" onClick={handleRefresh}>
            <Activity className="mr-2 h-4 w-4" /> Refresh
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" /> {new Date().toLocaleDateString()}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-cyberpulse-darker border-green-800/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Normal Packets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-2xl font-bold">{normalPackets.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-cyberpulse-darker border-red-800/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Intrusions Detected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-2xl font-bold">{intrusionPackets.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-cyberpulse-darker border-blue-800/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Packets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Activity className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-2xl font-bold">{(normalPackets + intrusionPackets).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-cyberpulse-darker border-purple-800/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className={`h-3 w-3 rounded-full ${ws.current?.readyState === WebSocket.OPEN ? 'bg-green-500' : 'bg-red-500'} mr-2 animate-pulse`}></div>
                  <span className={ws.current?.readyState === WebSocket.OPEN ? 'text-green-500' : 'text-red-500'}>
                    {ws.current?.readyState === WebSocket.OPEN ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <Card className="bg-cyberpulse-darker">
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
              <CardDescription>Normal vs. intrusion traffic over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="timestamp" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#221F26', border: '1px solid #444', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="normal" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="intrusion" stroke="#ea384c" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-cyberpulse-darker">
              <CardHeader>
                <CardTitle>Protocol Distribution</CardTitle>
                <CardDescription>Breakdown by protocol type</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={protocolData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#221F26', border: '1px solid #444', borderRadius: '0.5rem' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="value" fill="#9b87f5" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Logs Section */}
          <Card className="bg-cyberpulse-darker">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Network Logs</CardTitle>
                <CardDescription>Recent packet data and classifications</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {packetLogs.length > 20 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAllLogs((prev) => !prev)}
                    className="text-sm"
                  >
                    {showAllLogs ? 'Show Less' : 'Show More'}
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowLogs(!showLogs)}
                >
                  {showLogs ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            {showLogs && (
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-2 px-2">ID</th>
                        <th className="text-left py-2 px-2">Timestamp</th>
                        <th className="text-left py-2 px-2">Src-Dst</th>
                        <th className="text-left py-2 px-2">Protocol</th>
                        <th className="text-left py-2 px-2">Status</th>
                        <th className="text-left py-2 px-2">Length</th>
                        <th className="text-left py-2 px-2">TTL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(showAllLogs ? packetLogs : packetLogs.slice(0, 20)).map((log) => (
                        <tr key={log.id} className="border-b border-gray-800/50">
                          <td className="py-2 px-2 font-mono">{log.id}</td>
                          <td className="py-2 px-2 font-mono">{log.timestamp}</td>
                          <td className="py-2 px-2 font-mono">{log.src_ip}</td>
                          <td className="py-2 px-2 font-mono">{log.protocol}</td>
                          <td className="py-2 px-2">
                            <div className="flex items-center">
                              <div className={`h-2 w-2 rounded-full ${log.prediction === 0 ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                              <span>{log.label}</span>
                            </div>
                          </td>
                          <td className="py-2 px-2 font-mono">{log.packet_length}</td>
                          <td className="py-2 px-2 font-mono">{log.ttl}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {packetLogs.length > 20 && !showAllLogs && (
                  <div className="mt-4 text-center text-sm text-gray-400">
                    Showing 20 of {packetLogs.length} logs
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-cyberpulse-darker">
            <CardHeader>
              <CardTitle>Dashboard Settings</CardTitle>
              <CardDescription>Configure your dashboard preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="show-intrusions">Show only Intrusions</Label>
                  <p className="text-sm text-gray-400">Filter to display only intrusion events</p>
                </div>
                <Switch
                  id="show-intrusions"
                  checked={showOnlyIntrusions}
                  onCheckedChange={setShowOnlyIntrusions}
                />
              </div>
              <div className="space-y-4">
                <Label htmlFor="refresh-interval">Refresh Interval (seconds)</Label>
                <Slider
                  id="refresh-interval"
                  min={1}
                  max={10}
                  step={1}
                  value={[refreshInterval]}
                  onValueChange={(value) => setRefreshInterval(value[0])}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
