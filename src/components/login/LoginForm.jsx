import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from "../../hooks/useAuth";
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResendLink, setShowResendLink] = useState(false);

  const { login } = useAuth();
  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
    if (info) setInfo('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setShowResendLink(false);

    try {
      await login({
        username: formData.email,
        password: formData.password
      });

      console.log("✅ Login successful");
      window.location.href = '/dashboard';
    } catch (err) {
      // 🔍 Enhanced error logging
      console.error("🔥 Full login error object:", err);

      const apiData = err?.response?.data;
      const apiMessage =
        apiData?.detail ||
        apiData?.non_field_errors?.[0] ||
        "Login failed. Please check your credentials.";

      console.error("🛑 Login failed with message:", apiMessage);

      if (apiMessage.toLowerCase().includes("e-mail is not verified")) {
        setError("Please activate your account via the link sent to your email.");
        setShowResendLink(true);
      } else {
        setError(apiMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendActivation = async () => {
    if (!formData.email.trim()) {
      setError("Please enter your email first.");
      return;
    }

    setIsLoading(true);
    setError('');
    setInfo('');

    try {
      await axios.post("/api/auth/registration/resend-email/", {
        email: formData.email.trim(),
      });

      setInfo("✅ Activation email resent! Check your inbox.");
      setShowResendLink(false);
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.email?.[0] ||
        "Could not resend activation email.";
      console.error("Resend activation failed:", message);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('activated') === 'true') {
      setInfo('✅ Your account has been activated. You can now log in.');
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500">Sign in to your 024 Global Connect account</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {info && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-green-800">
              <p className="text-sm">{info}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email or Username
            </label>
            <div className="mt-1 flex items-center border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <input
                id="email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email or username"
                className="w-full focus:outline-none"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 flex items-center border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full focus:outline-none"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="mr-2"
                disabled={isLoading}
              />
              Remember me
            </label>
            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center py-2 px-4 rounded-lg transition duration-200 font-bold ${
              isLoading
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {showResendLink && (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Didn't get the email?{' '}
              <button
                onClick={handleResendActivation}
                className="text-blue-600 hover:underline font-medium"
              >
                Resend Activation Email
              </button>
            </p>
          </div>
        )}

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline font-medium">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
