import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles

import Header from './components/login/Header';

import Home from './pages/Home';
import LoginForm from './components/login/LoginForm';
import RegistrationForm from './components/login/RegistrationForm';
import ContactForm from './components/login/ContactForm';
import AboutUs from './pages/AboutUs';
import BlogForm from './components/login/BlogForm';
import AffiliateSignup from './components/affiliate/AffiliateSignup';
import AffiliateLogin from './components/affiliate/AffiliateLogin';
import AffiliatePartner from './components/affiliate/AffiliatePartner';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import ProtectedData from './pages/ProtectedData';

function App() {
  return (
    <div>
      <Header />

      {/* ✅ Toasts globally available */}
      <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/blog" element={<BlogForm />} />
        <Route path="/affiliate-signup" element={<AffiliateSignup />} />
        <Route path="/affiliate-login" element={<AffiliateLogin />} />
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
