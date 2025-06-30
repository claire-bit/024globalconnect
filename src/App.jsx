// ✅ FINAL App.jsx with Role-Based Dashboard
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Header from './components/login/Header';

import Home from './pages/Home';
import LoginForm from './components/login/LoginForm';
import RegistrationForm from './components/login/RegistrationForm';
import ContactForm from './components/login/ContactForm';
import AboutUs from './pages/AboutUs';
import AffiliatePartner from './components/affiliate/AffiliatePartner';

import PrivateRoute from './components/PrivateRoute';
import ProtectedData from './pages/ProtectedData';

// Dashboards
import AffiliateDashboard from './components/affiliate/AffiliateDashboard';
import VendorDashboard from './components/vendor/VendorDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

import { useAuth } from './hooks/useAuth';

function App() {
  const { user } = useAuth();

  const roleBasedDashboard = () => {
    if (!user) return <Navigate to="/login" replace />;
    if (user.role === 'vendor') return <VendorDashboard />;
    if (user.role === 'admin') return <AdminDashboard />;
    return <AffiliateDashboard />;
  };

  return (
    <div>
      <Header />
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/affiliate-partner" element={<AffiliatePartner />} />

        {/* Role-based dashboard */}
        <Route
          path="/dashboard"
          element={<PrivateRoute>{roleBasedDashboard()}</PrivateRoute>}
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
