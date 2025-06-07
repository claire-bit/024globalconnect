import React from 'react';

const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img
        src="/globalaati.jpg"
        alt="024 Global Logo"
        className="w-48 h-auto mb-4"
      />
      <h1 className="text-2xl font-bold text-gray-800">024 GLOBAL</h1>
    </div>
  );
};

export default Logo;
