import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div>
          <h3 className="text-lg font-semibold mb-4">024 GLOBAL CONNECT</h3>
          <p>Empowering communities through innovative digital solutions across Africa.</p>
          <div className="flex gap-3 mt-4">
            <a href="#"><i className="fab fa-facebook-f text-xl"></i></a>
            <a href="#"><i className="fab fa-twitter text-xl"></i></a>
            <a href="#"><i className="fab fa-linkedin-in text-xl"></i></a>
            <a href="#"><i className="fab fa-instagram text-xl"></i></a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Solutions</h3>
          <ul>
            <li><a href="#" className="hover:text-white text-gray-400">Employment Services</a></li>
            <li><a href="#" className="hover:text-white text-gray-400">Financial Inclusion</a></li>
            <li><a href="#" className="hover:text-white text-gray-400">Market Access</a></li>
            <li><a href="#" className="hover:text-white text-gray-400">Digital Training</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul>
            <li><a href="/aboutus" className="hover:text-white text-gray-400">About Us</a></li>
            <li><a href="#" className="hover:text-white text-gray-400">Our Team</a></li>
            <li><a href="#" className="hover:text-white text-gray-400">Partners</a></li>
            <li><a href="#" className="hover:text-white text-gray-400">Careers</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul>
            <li><a href="#" className="hover:text-white text-gray-400">Support Center</a></li>
            <li><a href="/contact" className="hover:text-white text-gray-400">Contact Us</a></li>
            <li><a href="#" className="hover:text-white text-gray-400">Regional Offices</a></li>
            <li><a href="#" className="hover:text-white text-gray-400">Feedback</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-400 text-sm border-t border-slate-600 pt-4">
        &copy; 2025 024 GLOBAL CONNECT. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
