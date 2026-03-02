import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-dark-900 via-secondary-900 to-dark-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 p-3 rounded-xl shadow-lg group-hover:shadow-primary-500/50 transition-all duration-300 group-hover:scale-105">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="font-display font-black text-2xl">
                  Runs <span className="text-primary-400">&</span> Miles
                </h1>
                <p className="text-xs text-gray-400 -mt-1 font-medium">Marathon Events India</p>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Pune's newest running community where miles meet movement. From marathon training
              to weekend group runs, we bring runners together on and off the track.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/runs._and._miles?igsh=bDJ4YXVnb3hkdDh0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-gradient-to-r hover:from-primary-600 hover:to-primary-500 p-3 rounded-xl transition-all duration-300 hover:scale-110 border border-white/10"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-white border-b-2 border-primary-500/30 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Events', 'About Us', 'Contact', 'FAQs'].map((link) => (
                <li key={link}>
                  <Link 
                    to={link === 'Events' ? '/events' : '/'} 
                    className="text-gray-300 hover:text-primary-400 transition-colors flex items-center group"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming Cities */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-white border-b-2 border-primary-500/30 pb-2 inline-block">Marathon Cities</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/events" 
                  className="text-gray-300 hover:text-primary-400 transition-colors flex items-center group"
                >
                  <MapPin className="w-4 h-4 mr-2 text-primary-500 group-hover:scale-110 transition-transform" />
                  Pune, Maharashtra
                </Link>
              </li>
              <li className="text-gray-500 text-sm italic flex items-center">
                <span className="w-4 h-4 mr-2">🔜</span>
                More cities coming soon
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-white border-b-2 border-primary-500/30 pb-2 inline-block">Get in Touch</h3>
            <div className="space-y-4">
              <a
                href="mailto:contact@runsandmiles.com"
                className="flex items-center text-gray-300 hover:text-primary-400 transition-colors group"
              >
                <div className="bg-primary-500/10 p-2 rounded-lg mr-3 group-hover:bg-primary-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email us</p>
                  <span className="text-sm font-medium">contact@runsandmiles.com</span>
                </div>
              </a>
              <a
                href="tel:+917447288206"
                className="flex items-center text-gray-300 hover:text-primary-400 transition-colors group"
              >
                <div className="bg-accent-500/10 p-2 rounded-lg mr-3 group-hover:bg-accent-500/20 transition-colors">
                  <Phone className="w-5 h-5 text-accent-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Call us</p>
                  <span className="text-sm font-medium">+91 74472 88206</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 <span className="text-primary-400 font-semibold">Runs and Miles</span>. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Privacy Policy</Link>
              <Link to="/" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Terms & Conditions</Link>
              <Link to="/" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Refund Policy</Link>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-xs">
              Made with <span className="text-red-500">❤️</span> for runners, by runners
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
