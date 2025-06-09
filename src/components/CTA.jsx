import React from 'react';

const CTA = () => {
  return (
    <section id="contact" className="bg-blue-700 text-white py-20 text-center">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4">Ready to Join the Digital Revolution?</h2>
        <p className="mb-8 max-w-xl mx-auto">Become part of our growing community and access opportunities through our platform.</p>
        <div className="flex justify-center gap-4">
          <a href="/login" className="btn bg-white text-blue-700">Login to Your Account</a>
          <a href="/register" className="btn btn-outline border-white text-white">Create New Account</a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
