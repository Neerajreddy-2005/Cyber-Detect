import { Button } from '@/components/ui/button';
import { Shield, BarChart2, Activity, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cyberpulse-darker to-cyberpulse-dark py-20 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Secure Your Network with <span className="cyber-heading">Cyber-Pulse</span>
            </h1>
            <p className="text-xl text-gray-300">
              Advanced network intrusion detection powered by machine learning,
              providing real-time protection against threats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-cyberpulse-purple hover:bg-cyberpulse-purple/90">
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-cyberpulse-purple text-cyberpulse-purple hover:bg-cyberpulse-purple/10">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="relative">
              <div className="absolute -inset-1 bg-cyberpulse-purple/30 rounded-lg blur-xl"></div>
              <div className="relative bg-cyberpulse-darker p-4 rounded-lg border border-cyberpulse-purple/30">
                <img 
                  src="/lovable-uploads/network-intrusion-detection.jpg" 
                  alt="Network Intrusion Detection Dashboard" 
                  className="rounded-lg shadow-2xl border border-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-cyberpulse-dark">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 cyber-heading">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Activity className="h-8 w-8 text-cyberpulse-purple" />,
                title: 'Real-time Monitoring',
                description: 'Continuous monitoring of network traffic with instant alerts for suspicious activities.'
              },
              {
                icon: <Database className="h-8 w-8 text-cyberpulse-blue" />,
                title: 'Machine Learning',
                description: 'Advanced algorithms to identify patterns and detect anomalies in network traffic.'
              },
              {
                icon: <BarChart2 className="h-8 w-8 text-cyberpulse-orange" />,
                title: 'Interactive Dashboard',
                description: 'Visualize network activities and security metrics with our intuitive dashboard.'
              },
              {
                icon: <Shield className="h-8 w-8 text-cyberpulse-green" />,
                title: 'Binary Classification',
                description: 'Accurate classification of network traffic as normal or intrusion with high precision.'
              }
            ].map((feature, index) => (
              <div key={index} className="cyber-card p-6 space-y-4 transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                <div className="bg-black/20 p-3 rounded-full w-fit">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-cyberpulse-darker">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 cyber-heading">
            Protection You Can Measure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: '96.52%', label: 'Detection Accuracy' },
              { number: '99%', label: 'Intrusion Recall' },
              { number: '97%', label: 'Overall F1-Score' }
            ].map((stat, index) => (
              <div key={index} className="cyber-card p-8 transition-transform duration-300 hover:scale-105 hover:-translate-y-2">
                <div className="text-4xl md:text-5xl font-bold text-cyberpulse-purple mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-xl">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-cyberpulse-dark border-t border-white/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to secure your network?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Protect your infrastructure with our advanced intrusion detection system.
            Deploy Cyber-Pulse today.
          </p>
          <Button asChild size="lg" className="bg-cyberpulse-purple hover:bg-cyberpulse-purple/90">
            <Link to="/dashboard">Get Started</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
