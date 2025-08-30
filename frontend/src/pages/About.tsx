import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, Database, Network, BarChart2 } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Cyber-Pulse</h1>
          <p className="text-xl text-gray-400">
            Our advanced Network Intrusion Detection System
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4 cyber-heading">Network Intrusion Detection System (NIDS)</h2>
            <p className="text-gray-300 mb-6">
              Cyber-Pulse is a real-time Network Intrusion Detection System that uses machine learning to 
              detect and classify network intrusions. The system includes a training pipeline, real-time detection, 
              and a web-based dashboard for monitoring.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-cyberpulse-darker border-cyberpulse-purple/20 transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                <CardHeader className="pb-3">
                  <div className="h-10 w-10 rounded-full bg-cyberpulse-purple/10 flex items-center justify-center mb-2">
                    <Shield className="h-5 w-5 text-cyberpulse-purple" />
                  </div>
                  <CardTitle>Security Focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Designed to identify malicious network activities and protect vital infrastructure from cyber threats.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-cyberpulse-darker border-cyberpulse-purple/20 transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                <CardHeader className="pb-3">
                  <div className="h-10 w-10 rounded-full bg-cyberpulse-blue/10 flex items-center justify-center mb-2">
                    <Database className="h-5 w-5 text-cyberpulse-blue" />
                  </div>
                  <CardTitle>Machine Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Powered by XGBoost, our model is trained on extensive network traffic data to achieve high accuracy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 cyber-heading">Model Development and Feature Selection</h2>
            <Card className="bg-cyberpulse-darker border-cyberpulse-purple/20 mb-8 transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
              <CardHeader>
                <CardTitle></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  In this project, We experimented with various machine learning algorithms, including XGBoost, Random Forest, and Support Vector Machine (SVM), for detecting network intrusions using the CIC-IDS 2017 dataset. After extensive evaluation, We selected XGBoost as the final model, as it is highly efficient for large datasets and achieved an accuracy of nearly 99%.
                  Additionally, We compared different feature selection methods — filter, wrapper, and embedded techniques — to identify and select the most relevant attributes, thereby improving model performance and reducing complexity.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 cyber-heading">Model Performance</h2>
            <Card className="bg-cyberpulse-darker border-cyberpulse-purple/20 mb-8 transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Overall Accuracy</span>
                    <span className="font-semibold">96.52%</span>
                  </div>
                  <Progress value={96.52} className="h-2" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Normal Traffic (Class 0)</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Precision</span>
                          <span>100%</span>
                        </div>
                        <Progress value={100} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Recall</span>
                          <span>96%</span>
                        </div>
                        <Progress value={96} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>F1-Score</span>
                          <span>98%</span>
                        </div>
                        <Progress value={98} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Intrusion Traffic (Class 1)</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Precision</span>
                          <span>86%</span>
                        </div>
                        <Progress value={86} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Recall</span>
                          <span>99%</span>
                        </div>
                        <Progress value={99} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>F1-Score</span>
                          <span>92%</span>
                        </div>
                        <Progress value={92} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-400 pt-4">
                  <p>Based on evaluation with 565,576 test samples (454,089 normal, 111,487 intrusion)</p>
                </div>
              </CardContent>
            </Card>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 cyber-heading">Technical Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-cyberpulse-darker border-cyberpulse-purple/20 transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                <CardHeader className="pb-3">
                  <CardTitle>System Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    <li>Python 3.8+</li>
                    <li>Modern web browser</li>
                    <li>Network access for traffic monitoring</li>
                    <li>Minimum 4GB RAM for processing</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-cyberpulse-darker border-cyberpulse-purple/20 transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                <CardHeader className="pb-3">
                  <CardTitle>Software Dependencies</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    <li>pandas, numpy</li>
                    <li>scikit-learn, xgboost</li>
                    <li>joblib, streamlit</li>
                    <li>logging utilities</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 cyber-heading">Dashboard Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-cyberpulse-darker border-cyberpulse-purple/20 transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                <CardHeader className="pb-3">
                  <div className="h-10 w-10 rounded-full bg-cyberpulse-orange/10 flex items-center justify-center mb-2">
                    <Network className="h-5 w-5 text-cyberpulse-orange" />
                  </div>
                  <CardTitle>Monitoring Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    <li>Real-time monitoring of network traffic</li>
                    <li>Filtering options for normal/intrusion traffic</li>
                    <li>Detailed packet log view</li>
                    <li>Configurable refresh interval</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-cyberpulse-darker border-cyberpulse-purple/20 transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                <CardHeader className="pb-3">
                  <div className="h-10 w-10 rounded-full bg-cyberpulse-green/10 flex items-center justify-center mb-2">
                    <BarChart2 className="h-5 w-5 text-cyberpulse-green" />
                  </div>
                  <CardTitle>Visualization Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    <li>Performance metrics visualization</li>
                    <li>Traffic trend analysis</li>
                    <li>Protocol distribution charts</li>
                    <li>Alert system for suspicious activities</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
