import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-gray-700">Welcome, {user?.email || "user"}!</p>
    </div>
  );
};

export default Dashboard;
