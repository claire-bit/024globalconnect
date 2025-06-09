// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import ContactForm from './components/ContactForm';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <div>
      {/* Optional navigation bar */}
      <nav className="bg-blue-700 text-white p-4 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/aboutus">About Us</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
