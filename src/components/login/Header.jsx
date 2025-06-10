import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from "../../assets/024global_logo_200x200.png";


const Header = () => {
  return (
    <header className="fixed w-full z-50 bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="logo flex items-center space-x-2">
          <img
            src={logoImage}
            alt="024 Global Logo"
            className="w-6 h-6 object-contain" // Much smaller
          />
          <span className="text-blue-700 font-bold text-base">024 GLOBAL CONNECT</span>
        </Link>

        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li><a href="#mission" className="hover:text-blue-600">Mission</a></li>
          <li><a href="#features" className="hover:text-blue-600">Features</a></li>
          <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
          <li><Link to="/about-us" className="hover:text-blue-600">About Us</Link></li>
        </ul>

        <div className="hidden md:flex space-x-4">
          <Link to="/login" className="btn btn-outline">Login</Link>
          <Link to="/register" className="btn btn-success">Register</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;