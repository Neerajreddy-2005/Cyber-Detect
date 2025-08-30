
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 text-xl font-bold">
      <Shield className="h-6 w-6 text-cyberpulse-purple" />
      <span className="cyber-heading">Cyber-Pulse</span>
    </Link>
  );
};

export default Logo;
