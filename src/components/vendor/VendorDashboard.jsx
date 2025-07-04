// src/components/vendor/VendorDashboard.jsx
import React, { useState } from "react";
import MyProduct from "./MyProducts";
import AddProductForm from "./AddProductForm";
import SalesOverview from "./SalesOverview";

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");

  const renderTab = () => {
    switch (activeTab) {
      case "products":
        return <MyProduct />;
      case "add":
        return <AddProductForm />;
      case "sales":
        return <SalesOverview />;
      default:
        return <MyProduct />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Vendor Dashboard</h1>

      {/* Tab Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 rounded ${
            activeTab === "products" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border"
          }`}
        >
          📦 My Products
        </button>
        <button
          onClick={() => setActiveTab("add")}
          className={`px-4 py-2 rounded ${
            activeTab === "add" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border"
          }`}
        >
          ➕ Add Product
        </button>
        <button
          onClick={() => setActiveTab("sales")}
          className={`px-4 py-2 rounded ${
            activeTab === "sales" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border"
          }`}
        >
          📊 Sales Overview
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl p-6 shadow border border-gray-200">
        {renderTab()}
      </div>
    </div>
  );
};

export default VendorDashboard;
