import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // ✅ Switched to react-hot-toast

import Header from './components/login/Header';

import Home from './pages/Home';
import LoginForm from './components/login/LoginForm';
import RegistrationForm from './components/login/RegistrationForm';
import ContactForm from './components/login/ContactForm';
import AboutUs from './pages/AboutUs';
import BlogForm from './components/login/BlogForm';
import AffiliatePartner from './components/affiliate/AffiliatePartner';
import Dashboard from './components/login/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import ProtectedData from './pages/ProtectedData';

function App() {
  return (
    <div>
      <Header />

      {/* ✅ react-hot-toast global config */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/blog" element={<BlogForm />} />
        <Route path="/affiliate-partner" element={<AffiliatePartner />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/protected-test"
          element={
            <PrivateRoute>
              <ProtectedData />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
