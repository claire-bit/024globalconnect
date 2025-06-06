import React from 'react';

const Header = () => {
  return (
    <header className="fixed w-full z-50 bg-white shadow">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        <a href="#" className="logo flex items-center space-x-2">
          <img src="/assets/024global_logo_200x200.png" alt="024 Global Logo" className="w-10 h-10 object-contain" />
          <span className="text-blue-700 font-bold">024 GLOBAL CONNECT</span>
        </a>
        <ul className="hidden md:flex space-x-6">
          <li><a href="#" className="hover:text-blue-600">Home</a></li>
          <li><a href="#mission" className="hover:text-blue-600">Mission</a></li>
          <li><a href="#features" className="hover:text-blue-600">Features</a></li>
          <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
        </ul>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="btn btn-outline">Login</a>
          <a href="#" className="btn btn-success">Register</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
