// RegistrationForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, KeyRound, Lock, Mail, Info } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import logoImage from "../../assets/024global_logo_200x200.png";

const countryCityData = {
  Kenya: ["Nairobi", "Mombasa", "Kisumu", "Eldoret", "Nakuru"],
  Nigeria: ["Lagos", "Abuja", "Ibadan", "Port Harcourt"],
  Ghana: ["Accra", "Kumasi", "Takoradi", "Tamale"],
  Uganda: ["Kampala", "Entebbe", "Jinja"],
  "South Africa": ["Johannesburg", "Cape Town", "Durban"],
  "United States": ["New York", "Los Angeles", "Chicago"],
  "United Kingdom": ["London", "Manchester", "Birmingham"],
  Other: ["Other"]
};

const RegistrationForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    termsAccepted: false,
    country: "",
    city: "",
    website: "",
    experience: "",
    promotion_methods: []
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "country" ? { city: "" } : {})
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckboxGroupChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((item) => item !== value)
        : [...prev[name], value]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 8) newErrors.password1 = "Password must be at least 8 characters";
    if (formData.password !== formData.confirm_password) newErrors.confirm_password = "Passwords do not match";
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms and policies";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false);
      return;
    }

    try {
      const result = await register(formData);
      if (result.success) {
        toast.success("Registration successful! Please check your email to activate your account.");
        setTimeout(() => navigate("/login?registered=true"), 2000);
      } else {
        toast.error(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const countryOptions = Object.keys(countryCityData);
  const cityOptions = formData.country ? countryCityData[formData.country] || [] : [];

  return (
 <div className="min-h-screen pt-28 flex items-center justify-center bg-blue-light p-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
<div className="bg-blue-night text-white p-6 flex flex-col md:flex-row items-center gap-6">
  {/* Logo on the left */}
  <img
    src={logoImage}
    alt="024 Global Connect Logo"
 className="w-24 h-24 rounded-full shadow-md bg-white p-1"
  />

  {/* Welcome message on the right */}
  <div className="text-center md:text-left">
    <h1 className="text-3xl font-bold">Welcome to 024GLOBALCONNECT!</h1>
    <p className="text-lg mt-2 opacity-90">
      Unlock your potential with us — let's grow, connect, and succeed together. 🚀
    </p>
  </div>
</div>


        <form className="p-8 space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* First Name */}
  <div>
    <label className="block text-sm font-medium text-blue-night mb-1">First Name</label>
    <input
      type="text"
      name="first_name"
      value={formData.first_name}
      onChange={handleChange}
      className="w-full border rounded px-3 py-2"
    />
  </div>

  {/* Last Name */}
  <div>
    <label className="block text-sm font-medium text-blue-night mb-1">Last Name</label>
    <input
      type="text"
      name="last_name"
      value={formData.last_name}
      onChange={handleChange}
      className="w-full border rounded px-3 py-2"
    />
  </div>

  {/* Username */}
  <div>
    <label className="block text-sm font-medium text-blue-night mb-1">Username</label>
    <input
      type="text"
      name="username"
      value={formData.username}
      onChange={handleChange}
      className="w-full border rounded px-3 py-2"
    />
  </div>

  {/* Email */}
  <div>
    <label className="block text-sm font-medium text-blue-night mb-1">Email</label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="w-full border rounded px-3 py-2"
    />
  </div>

  {/* Password */}
  <div>
    <label className="block text-sm font-medium text-blue-night mb-1">Password</label>
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      className="w-full border rounded px-3 py-2"
    />
  </div>

  {/* Confirm Password */}
  <div>
    <label className="block text-sm font-medium text-blue-night mb-1">Confirm Password</label>
    <input
      type="password"
      name="confirm_password"
      value={formData.confirm_password}
      onChange={handleChange}
      className="w-full border rounded px-3 py-2"
    />
  </div>

  {/* Country */}
  <div>
    <label className="block text-sm font-medium text-blue-night mb-1">Country</label>
    <select
      name="country"
      value={formData.country}
      onChange={handleChange}
      className="w-full border rounded px-3 py-2"
    >
      <option value="">Select Country</option>
      {countryOptions.map((country) => (
        <option key={country} value={country}>{country}</option>
      ))}
    </select>
  </div>

  {/* City */}
  <div>
    <label className="block text-sm font-medium text-blue-night mb-1">City</label>
    <select
      name="city"
      value={formData.city}
      onChange={handleChange}
      className="w-full border rounded px-3 py-2"
    >
      <option value="">Select City</option>
      {cityOptions.map((city) => (
        <option key={city} value={city}>{city}</option>
      ))}
    </select>
  </div>

  {/* Website / Blog URL */}
  <div className="md:col-span-2">
    <label className="block text-sm font-medium text-blue-night mb-1">Website / Blog URL <span className="text-gray-500 text-xs">(optional)</span></label>
    <div className="flex items-center gap-2">
      <input
        type="url"
        name="website"
        value={formData.website}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        placeholder="https://yourblog.com"
      />
      <Info className="w-4 h-4 text-gray-400" title="If you don’t have a blog, leave this blank." />
    </div>
  </div>

  {/* Experience Level */}
  <div className="md:col-span-2">
    <label className="block text-sm font-medium text-blue-night mb-1">Experience Level <span className="text-gray-500 text-xs">(optional)</span></label>
    <div className="flex items-center gap-2">
      <input
        type="text"
        name="experience"
        value={formData.experience}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        placeholder="Beginner, Intermediate, Expert..."
      />
      <Info className="w-4 h-4 text-gray-400" title="Let us know your marketing experience. You can leave this blank if unsure." />
    </div>
  </div>

  {/* Promotion Methods */}
  <div className="md:col-span-2">
    <label className="block text-sm font-medium text-blue-night mb-1">How do you plan to promote our services?</label>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {["Blog", "Social Media", "Email Marketing", "YouTube", "Referral", "Other"].map((method) => (
        <label key={method} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.promotion_methods.includes(method)}
            onChange={() => handleCheckboxGroupChange("promotion_methods", method)}
            className="w-4 h-4"
          />
          <span className="text-sm">{method}</span>
        </label>
      ))}
    </div>
  </div>

  {/* Terms Checkbox */}
  <div className="md:col-span-2 flex items-start">
    <input
      type="checkbox"
      id="termsAccepted"
      name="termsAccepted"
      checked={formData.termsAccepted}
      onChange={handleChange}
      className="mt-1"
    />
    <label htmlFor="termsAccepted" className="ml-2 text-sm text-blue-night">
      I agree to the <a href="#" className="text-blue-marine hover:underline">terms and policies</a>
    </label>
  </div>

  {/* Submit Button */}
  <div className="md:col-span-2">
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full py-3 px-4 rounded-lg font-medium shadow-md transition duration-200 ${
        isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-deep text-white hover:bg-blue-bright"
      }`}
    >
      {isLoading ? "Registering..." : "Register Now"}
    </button>
  </div>
</div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
