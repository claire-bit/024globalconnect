// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import ContactForm from './components/ContactForm';
import AboutUs from './pages/AboutUs';
import BlogForm from './components/BlogForm';

function App() {
  return (
    <div>
      /* Navigation bar */
      <nav className="bg-blue-night text-white p-4 flex gap-6">
        <Link to="/" className="hover:text-blue-light transition-colors">Home</Link>
        <Link to="/login" className="hover:text-blue-light transition-colors">Login</Link>
        <Link to="/register" className="hover:text-blue-light transition-colors">Register</Link>
        <Link to="/contact" className="hover:text-blue-light transition-colors">Contact</Link>
        <Link to="/aboutus" className="hover:text-blue-light transition-colors">About Us</Link>
        <Link to="/blog" className="hover:text-blue-light transition-colors">Create Blog</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/blog" element={<BlogForm />} />
      </Routes>
    </div>
  );
}

export default App;
