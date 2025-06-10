import React from 'react';
import { User, KeyRound, Lock } from 'lucide-react';

const RegistrationForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-light p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-blue-night text-white p-8 text-center">
          <h1 className="text-3xl font-bold">Welcome to 024GLOBALCONNECT!</h1>
          <p className="text-lg mt-2 opacity-90">Join our Team for Unlimited Opportunities! 🌟</p>
        </div>

        <div className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-blue-deep text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-md">
              024GLOBALCONNECT
            </div>
            <h2 className="text-2xl font-semibold mt-4 text-blue-night">REGISTRATION DETAILS</h2>
          </div>

          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-blue-night mb-1">First Name</label>
                <div className="flex items-center border border-blue-bright rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-bright">
                  <User className="w-5 h-5 text-blue-deep mr-2" />
                  <input
                    type="text"
                    placeholder="Enter first name"
                    className="w-full focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-night mb-1">Last Name</label>
                <div className="flex items-center border border-blue-bright rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-bright">
                  <User className="w-5 h-5 text-blue-deep mr-2" />
                  <input
                    type="text"
                    placeholder="Enter last name"
                    className="w-full focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-night mb-1">Username</label>
              <div className="flex items-center border border-blue-bright rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-bright">
                <User className="w-5 h-5 text-blue-deep mr-2" />
                <input
                  type="text"
                  placeholder="Choose username"
                  className="w-full focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-night mb-1">Password</label>
              <div className="flex items-center border border-blue-bright rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-bright">
                <KeyRound className="w-5 h-5 text-blue-deep mr-2" />
                <input
                  type="password"
                  placeholder="Create password"
                  className="w-full focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-night mb-1">Confirm Password</label>
              <div className="flex items-center border border-blue-bright rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-bright">
                <Lock className="w-5 h-5 text-blue-deep mr-2" />
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 text-blue-deep focus:ring-blue-deep rounded border-blue-bright"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-blue-night">
                I agree to the <a href="#" className="text-blue-marine hover:underline">terms and policies</a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-deep text-white py-3 px-4 rounded-lg hover:bg-blue-bright transition duration-200 font-medium shadow-md"
            >
              Register Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
