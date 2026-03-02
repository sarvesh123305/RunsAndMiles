import { useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, MapPin } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/#contact' },
  ];

  const isActive = (path) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  const handleNavClick = useCallback((e, link) => {
    if (link.path.startsWith('/#')) {
      e.preventDefault();
      const sectionId = link.path.replace('/#', '');

      if (location.pathname === '/') {
        // Already on home page — just scroll
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Navigate to home first, then scroll after render
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (link.path === '/') {
      // Home link — scroll to top if already on home
      if (location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [location.pathname, navigate]);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-primary-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="font-display font-black text-2xl bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                Runs & Miles
              </h1>
              <p className="text-xs text-gray-600 -mt-1 font-semibold">Marathon Events India</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleNavClick(e, link)}
                className={`font-bold px-5 py-2.5 rounded-full transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg scale-105'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://www.townscript.com/e/runs-miles-half-marathon-1st-edition-run-for-health-wellness-201310"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Register Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block py-3 px-5 rounded-xl font-bold transition-all ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
                onClick={(e) => { handleNavClick(e, link); setIsOpen(false); }}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://www.townscript.com/e/runs-miles-half-marathon-1st-edition-run-for-health-wellness-201310"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold px-8 py-4 rounded-full mt-4 shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              Register Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
