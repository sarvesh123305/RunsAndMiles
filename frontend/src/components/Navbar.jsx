import { useState, useCallback, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, MapPin } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll spy effect - update active section based on scroll position
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const sections = ['events', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200; // Offset for navbar height

      // Check if we're at the top of the page
      if (window.scrollY < 300) {
        setActiveSection('');
        if (window.location.hash) {
          window.history.replaceState(null, '', '/');
        }
        return;
      }

      // Find which section is currently visible
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            if (window.location.hash !== `#${sectionId}`) {
              window.history.replaceState(null, '', `#${sectionId}`);
            }
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events', scrollId: 'events' },
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/#contact' },
  ];

  const isActive = (path, scrollId) => {
    // For Events - check if on Events page OR on home page viewing events section
    if (path === '/events') {
      return location.pathname === '/events' || (location.pathname === '/' && activeSection === 'events');
    }
    
    // For hash links like /#about or /#contact
    if (path.startsWith('/#')) {
      const hash = path.replace('/#', '');
      // Check if we're on home page and if this section is active (from scroll or click)
      return location.pathname === '/' && (activeSection === hash || location.hash === `#${hash}`);
    }
    
    // For Home page - should be active when on home page with no active section
    if (path === '/') {
      return location.pathname === '/' && !activeSection && !location.hash;
    }
    
    // Fallback for other paths
    return location.pathname === path;
  };

  const handleNavClick = useCallback((e, link) => {
    if (link.path.startsWith('/#')) {
      e.preventDefault();
      const sectionId = link.path.replace('/#', '');

      if (location.pathname === '/') {
        // Already on home page — update hash using window.location.hash
        window.location.hash = sectionId;
        const el = document.getElementById(sectionId);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 0);
        }
      } else {
        // Navigate to home first with hash, then scroll after render
        navigate(`/#${sectionId}`);
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (link.path === '/') {
      // Home link — scroll to top and clear hash if already on home
      if (location.pathname === '/') {
        e.preventDefault();
        window.location.hash = '';
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
                className={`font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 relative ${
                  isActive(link.path, link.scrollId)
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
                {isActive(link.path, link.scrollId) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 to-primary-500"></span>
                )}
              </Link>
            ))}
            <a
              href="https://www.townscript.com/e/runs-miles-half-marathon-1st-edition-run-for-health-wellness-201310"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-bold px-6 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
                className={`block py-3 px-5 rounded-lg font-semibold transition-all relative ${
                  isActive(link.path, link.scrollId)
                    ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
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
              className="block text-center bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold px-8 py-4 rounded-lg mt-4 shadow-lg"
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
