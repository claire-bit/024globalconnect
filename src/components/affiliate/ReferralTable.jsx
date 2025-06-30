// src/components/affiliate/ReferralTable.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { authService } from "../../api/services/authService";
import { API_ENDPOINTS } from "../../api/endpoints";

const ReferralTable = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferrals = async () => {
      const token = authService.getAuthToken();
      if (!token) {
        console.warn("No auth token available");
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/api/users/affiliate/referrals/", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


        console.log("Referrals API response:", res.data);

        if (Array.isArray(res.data)) {
          setReferrals(res.data);
        } else if (Array.isArray(res.data.results)) {
          setReferrals(res.data.results);
        } else if (Array.isArray(res.data.referrals)) {
          setReferrals(res.data.referrals);
        } else {
          console.error("Unexpected referral data format:", res.data);
          setReferrals([]);
        }
      } catch (err) {
        console.error("Error fetching referrals:", err.response?.data || err.message);
        setReferrals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  const formatKES = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="overflow-x-auto bg-white border shadow rounded-xl">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2 font-semibold">Date</th>
            <th className="px-4 py-2 font-semibold">Product</th>
            <th className="px-4 py-2 font-semibold">Buyer</th>
            <th className="px-4 py-2 font-semibold">Amount</th>
            <th className="px-4 py-2 font-semibold">Commission</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                Loading referrals...
              </td>
            </tr>
          ) : referrals.length > 0 ? (
            referrals.map((referral) => (
              <tr key={referral.id} className="border-t">
                <td className="px-4 py-2">
                  {format(new Date(referral.created_at), "dd MMM yyyy")}
                </td>
                <td className="px-4 py-2">{referral.product_name}</td>
                <td className="px-4 py-2">
                  {referral.buyer_username || "—"}
                </td>
                <td className="px-4 py-2">{formatKES(referral.purchase_amount)}</td>
                <td className="px-4 py-2 font-bold text-green-600">
                  {formatKES(referral.commission_earned)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No referral activity yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReferralTable;
