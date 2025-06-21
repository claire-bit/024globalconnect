import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImage from "../../assets/024global_logo_200x200.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (href) => {
    if (href.startsWith('#')) {
      const targetId = href.substring(1);

      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 500); // wait for home to mount
      } else {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }

    setIsMenuOpen(false);
  };

  return (
    <header className="fixed w-full z-50 bg-white shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a 
            href="/" 
            className="flex items-center space-x-3 group cursor-pointer"
            onClick={(e) => { e.preventDefault(); handleNavClick('/'); }}
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-200">
              <img
                src={logoImage}
                alt="024 Global Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              024 GLOBAL CONNECT
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { label: 'Home', href: '/' },
              { label: 'Mission', href: '#mission' },
              { label: 'Blog', href: '/blog' },
              { label: 'Contact', href: '/contact' },
              { label: 'About Us', href: '/aboutus' }
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group cursor-pointer"
                onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/login"
              className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium border border-blue-600 hover:border-blue-700 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer"
              onClick={(e) => { e.preventDefault(); handleNavClick('/login'); }}
            >
              Login
            </a>
            <a
              href="/register"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
              onClick={(e) => { e.preventDefault(); handleNavClick('/register'); }}
            >
              Register
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 z-50 relative"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t transition-all duration-300 ${
          isMenuOpen 
            ? 'opacity-100 visible transform translate-y-0' 
            : 'opacity-0 invisible transform -translate-y-2'
        }`}>
          <nav className="flex flex-col py-4">
            {[
              { label: 'Home', href: '/' },
              { label: 'Mission', href: '#mission' },
              { label: 'Blog', href: '/blog' },
              { label: 'Contact', href: '/contact' },
              { label: 'About Us', href: '/aboutus' }
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 cursor-pointer"
                onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
              >
                {label}
              </a>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="px-4 py-3 space-y-2 border-t mt-2">
              <a
                href="/login"
                className="block w-full px-4 py-2 text-center text-blue-600 hover:text-blue-700 font-medium border border-blue-600 hover:border-blue-700 rounded-lg transition-all duration-200 cursor-pointer"
                onClick={(e) => { e.preventDefault(); handleNavClick('/login'); }}
              >
                Login
              </a>
              <a
                href="/register"
                className="block w-full px-4 py-2 text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 cursor-pointer"
                onClick={(e) => { e.preventDefault(); handleNavClick('/register'); }}
              >
                Register
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
