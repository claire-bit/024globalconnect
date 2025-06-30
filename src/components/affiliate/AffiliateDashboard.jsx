// src/components/affiliate/AffiliateDashboard.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { ClipboardCheck, Gift, TrendingUp, Coins } from "lucide-react";
import ProductList from "./ProductList";
import ReferralTable from "./ReferralTable";
import ProfileOverview from "./ProfileOverview"; // ✅ Import the new profile component

const AffiliateDashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalCommission: 0,
    totalReferrals: 0,
    totalPurchases: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    // TODO: Replace with real API call to /api/affiliate/summary/
    setStats({
      totalCommission: 3600,
      totalReferrals: 75,
      totalPurchases: 24,
      conversionRate: 32,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Welcome Message */}
        <div>
          <h1 className="text-3xl font-bold text-blue-700">
            Welcome back, {user?.first_name || user?.username || "Affiliate"} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Start promoting and track your earnings.
          </p>
        </div>

        {/* ✅ Profile Overview */}
        <ProfileOverview />

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard
            icon={Coins}
            label="Total Commission"
            value={`KES ${stats.totalCommission}`}
            color="bg-green-100 text-green-700"
          />
          <StatCard
            icon={Gift}
            label="Referrals"
            value={stats.totalReferrals}
            color="bg-blue-100 text-blue-700"
          />
          <StatCard
            icon={ClipboardCheck}
            label="Purchases"
            value={stats.totalPurchases}
            color="bg-yellow-100 text-yellow-700"
          />
          <StatCard
            icon={TrendingUp}
            label="Conversion Rate"
            value={`${stats.conversionRate}%`}
            color="bg-purple-100 text-purple-700"
          />
        </div>

        {/* Product List Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Promote Products
          </h2>
          <ProductList />
        </section>

        {/* Referral Earnings Table */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Referral Earnings
          </h2>
          <ReferralTable />
        </section>
      </div>
    </div>
  );
};

export default AffiliateDashboard;

// 📦 Stat Card UI Component
const StatCard = ({ icon: Icon, label, value, color }) => (
  <div
    className={`rounded-xl p-4 flex items-center space-x-4 shadow-sm ${color} bg-opacity-60`}
  >
    <div className="p-2 rounded-lg bg-white">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <div className="text-sm font-medium">{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  </div>
);
