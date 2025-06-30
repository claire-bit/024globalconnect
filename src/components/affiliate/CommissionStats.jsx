// src/components/affiliate/CommissionStats.jsx
import React, { useEffect, useState } from "react";
import { Coins, Gift, ClipboardCheck, TrendingUp } from "lucide-react";
import axios from "axios";

const CommissionStats = () => {
  const [stats, setStats] = useState({
    total_commission: 0,
    total_referrals: 0,
    total_purchases: 0,
    conversion_rate: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/affiliate/summary/");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching commission stats", err);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Commission",
      value: `KES ${stats.total_commission}`,
      icon: Coins,
      bg: "bg-green-100 text-green-700",
    },
    {
      label: "Total Referrals",
      value: stats.total_referrals,
      icon: Gift,
      bg: "bg-blue-100 text-blue-700",
    },
    {
      label: "Purchases",
      value: stats.total_purchases,
      icon: ClipboardCheck,
      bg: "bg-yellow-100 text-yellow-700",
    },
    {
      label: "Conversion Rate",
      value: `${stats.conversion_rate}%`,
      icon: TrendingUp,
      bg: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {statCards.map(({ label, value, icon: Icon, bg }, i) => (
        <div key={i} className={`p-4 rounded-xl shadow-sm flex items-center space-x-4 ${bg}`}>
          <div className="p-2 rounded-lg bg-white">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-medium">{label}</div>
            <div className="text-lg font-bold">{value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommissionStats;
