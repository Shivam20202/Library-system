import { Link, useLocation } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

// 404 Page: shown for any undefined route — deliberately has NO Navbar/Header
const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-extrabold text-amber-400 mb-4 leading-none">404</div>
        <div className="flex justify-center mb-6">
          <AlertTriangle className="w-12 h-12 text-slate-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-slate-400 mb-4 leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        {/* Display the invalid route URL as required by the assignment */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 mb-8 text-sm font-mono text-red-400 break-all">
          {window.location.origin}
          <span className="text-amber-400">{location.pathname}</span>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-amber-400 text-slate-900 font-bold px-8 py-3 rounded-lg hover:bg-amber-300 transition-colors shadow-lg"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
