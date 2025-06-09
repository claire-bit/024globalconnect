import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/024global_logo_200x200.png';

const Header = () => {
  return (
    <header className="fixed w-full z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="logo flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="flex-shrink-0">
            <img
              src={logoImage}
              alt="024 Global Logo"
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
          </div>
          <span className="text-blue-700 font-bold text-lg md:text-xl">
            024 GLOBAL CONNECT
          </span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <a href="#mission" className="hover:text-blue-600 transition-colors">Mission</a>
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
          <Link to="/about-us" className="hover:text-blue-600 transition-colors">About Us</Link>
        </nav>

        <div className="hidden md:flex space-x-4">
          <Link 
            to="/login" 
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;