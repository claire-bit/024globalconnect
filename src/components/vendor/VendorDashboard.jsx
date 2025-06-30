// src/components/vendor/VendorDashboard.jsx
import React from 'react';

const VendorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Vendor Dashboard</h1>
      <p className="text-gray-700">Welcome, Vendor. You can upload and manage your products here.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">My Products</h2>
          <p className="text-sm text-gray-600">View, update, or delete your listed products.</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Add New Product</h2>
          <p className="text-sm text-gray-600">Upload a new product for affiliates to promote.</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Product Performance</h2>
          <p className="text-sm text-gray-600">Track clicks, conversions, and affiliate-driven sales.</p>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
