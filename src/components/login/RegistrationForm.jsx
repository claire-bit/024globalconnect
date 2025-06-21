import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, KeyRound, Lock, Mail } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import logoImage from "../../assets/024global_logo_200x200.png";

const RegistrationForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms and policies";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    return newErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setErrors({});

  console.log("Form data before submit:", formData);

  const formErrors = validateForm();
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    setIsLoading(false);
    return;
  }

  const registrationData = {
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    username: formData.username.trim(),
    email: formData.email.trim(),
    password: formData.password,
    confirmPassword: formData.confirmPassword,
  };

  try {
    const result = await register(registrationData);

    // ✅ Gracefully handle activation message
    if (result.success) {
      const activationNotice = result.requiresActivation !== false;
      toast.success(
        activationNotice
          ? "Account created! Please check your email to activate your account."
          : "Account created successfully!"
      );

      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
      });

      setTimeout(() => navigate("/login?registered=true"), 2500);
      return;
    }

    // ❌ Handle failed registration
    const backendErrors = result.errors || {};
    const mappedErrors = {};

    if (backendErrors.first_name) mappedErrors.firstName = Array.isArray(backendErrors.first_name) ? backendErrors.first_name[0] : backendErrors.first_name;
    if (backendErrors.last_name) mappedErrors.lastName = Array.isArray(backendErrors.last_name) ? backendErrors.last_name[0] : backendErrors.last_name;
    if (backendErrors.username) mappedErrors.username = Array.isArray(backendErrors.username) ? backendErrors.username[0] : backendErrors.username;
    if (backendErrors.email) mappedErrors.email = Array.isArray(backendErrors.email) ? backendErrors.email[0] : backendErrors.email;
    if (backendErrors.password1) mappedErrors.password = Array.isArray(backendErrors.password1) ? backendErrors.password1[0] : backendErrors.password1;
    if (backendErrors.password2) mappedErrors.confirmPassword = Array.isArray(backendErrors.password2) ? backendErrors.password2[0] : backendErrors.password2;

    if (backendErrors.non_field_errors || backendErrors.detail || backendErrors.message) {
      const errorMessage = 
        (Array.isArray(backendErrors.non_field_errors) ? backendErrors.non_field_errors[0] : backendErrors.non_field_errors) ||
        backendErrors.detail ||
        backendErrors.message ||
        "Registration failed.";
      toast.error(errorMessage);
    }

    if (Object.keys(mappedErrors).length > 0) {
      setErrors(mappedErrors);
    } else if (!backendErrors.message && !backendErrors.detail && !backendErrors.non_field_errors) {
      toast.error("Registration failed. Please check your information and try again.");
    }
  } catch (error) {
    console.error("Registration error:", error);
    toast.error("Unexpected error. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-light p-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-blue-night text-white p-8 text-center">
          <h1 className="text-3xl font-bold">Welcome to 024GLOBALCONNECT!</h1>
          <p className="text-lg mt-2 opacity-90">Join our Team for Unlimited Opportunities! 🌟</p>
        </div>

        <div className="p-8">
          <div className="flex flex-col items-center mb-8">
            <img src={logoImage} alt="Logo" className="w-20 h-20 rounded-full shadow-md" />
            <h2 className="text-2xl font-semibold mt-4 text-blue-night">REGISTRATION DETAILS</h2>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-blue-night mb-1">First Name</label>
                <div className={`flex items-center border rounded-lg px-3 py-2 ${errors.firstName ? "border-red-500" : ""}`}>
                  <User className="w-5 h-5 text-blue-deep mr-2" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full focus:outline-none"
                    required
                  />
                </div>
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-blue-night mb-1">Last Name</label>
                <div className={`flex items-center border rounded-lg px-3 py-2 ${errors.lastName ? "border-red-500" : ""}`}>
                  <User className="w-5 h-5 text-blue-deep mr-2" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full focus:outline-none"
                    required
                  />
                </div>
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-blue-night mb-1">Username</label>
              <div className={`flex items-center border rounded-lg px-3 py-2 ${errors.username ? "border-red-500" : ""}`}>
                <User className="w-5 h-5 text-blue-deep mr-2" />
                <input
                  type="text"
                  name="username"
                  placeholder="Choose username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full focus:outline-none"
                  required
                />
              </div>
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-blue-night mb-1">Email</label>
              <div className={`flex items-center border rounded-lg px-3 py-2 ${errors.email ? "border-red-500" : ""}`}>
                <Mail className="w-5 h-5 text-blue-deep mr-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full focus:outline-none"
                  required
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-blue-night mb-1">Password</label>
              <div className={`flex items-center border rounded-lg px-3 py-2 ${errors.password ? "border-red-500" : ""}`}>
                <KeyRound className="w-5 h-5 text-blue-deep mr-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full focus:outline-none"
                  required
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-blue-night mb-1">Confirm Password</label>
              <div className={`flex items-center border rounded-lg px-3 py-2 ${errors.confirmPassword ? "border-red-500" : ""}`}>
                <Lock className="w-5 h-5 text-blue-deep mr-2" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full focus:outline-none"
                  required
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mt-1 text-blue-deep rounded border-blue-bright"
                required
              />
              <label htmlFor="termsAccepted" className="ml-2 text-sm text-blue-night">
                I agree to the <a href="#" className="text-blue-marine hover:underline">terms and policies</a>
              </label>
            </div>
            {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium shadow-md transition duration-200 ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-deep text-white hover:bg-blue-bright"
              }`}
            >
              {isLoading ? "Registering..." : "Register Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;