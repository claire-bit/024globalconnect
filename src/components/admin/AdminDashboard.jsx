// src/components/admin/AdminDashboard.jsx
import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Admin Dashboard</h1>
      <p className="text-gray-700">Welcome, Admin. Use the tools below to manage vendors, affiliates, and commissions.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Users</h2>
          <p className="text-sm text-gray-600">View, filter, and manage all registered users (vendors, affiliates).</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Commission Reports</h2>
          <p className="text-sm text-gray-600">Review payout requests, approve commissions, and export summaries.</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Product Listings</h2>
          <p className="text-sm text-gray-600">Browse all vendor product submissions for compliance and content checks.</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">System Logs</h2>
          <p className="text-sm text-gray-600">Track user activity, errors, and referral link usage.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
