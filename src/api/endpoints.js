// endpoints.js

export const API_ENDPOINTS = {
  // Authentication endpoints (dj-rest-auth)
  LOGIN: '/auth/login/',
  LOGOUT: '/auth/logout/',
  REGISTER: '/auth/registration/',
  CURRENT_USER: '/auth/user/', // ✅ Used in fetchCurrentUser()

  // JWT Token endpoints
  TOKEN_OBTAIN: '/api/token/',            // For login if not using dj-rest-auth
  REFRESH_TOKEN: '/api/token/refresh/',   // Used in token refresh flow
  REFRESH: '/api/token/refresh/',         // Alias for consistency

  // Password reset endpoints (dj-rest-auth)
  FORGOT_PASSWORD: '/auth/password/reset/',
  RESET_PASSWORD: '/auth/password/reset/confirm/',

  // User profile endpoints (dj-rest-auth or custom)
  USER_PROFILE: '/auth/user/',
  UPDATE_PROFILE: '/auth/user/',

  // Optional custom auth endpoints
  CUSTOM_REGISTER: '/api/auth/custom-register/',
  CUSTOM_LOGIN: '/api/auth/custom-login/',

  // Contact endpoints
  CONTACT_FORM: '/api/contact/submit/',

  // Blog endpoints
  BLOGS: '/api/blogs/',
  BLOG_CREATE: '/api/blogs/',
  BLOG_UPDATE: (id) => `/api/blogs/${id}/`,
  BLOG_DELETE: (id) => `/api/blogs/${id}/`,
  BLOG_PUBLISH: (id) => `/api/blogs/${id}/publish/`,

  // 024 Global Connect-specific
  OPPORTUNITIES: '/api/opportunities/',
  PARTNERSHIPS: '/api/partnerships/',
  SERVICES: '/api/services/',

  // Test and utility
  HELLO: '/api/hello/',
  PROTECTED: '/api/protected/',
};

// Helper function to get full URL
export const getFullUrl = (endpoint, baseUrl = '') => {
  if (typeof endpoint === 'function') {
    throw new Error('Use the endpoint function first, then pass the result to getFullUrl');
  }
  return `${baseUrl}${endpoint}`;
};

// Validation helper
export const validateEndpoint = (endpoint) => {
  if (!endpoint) {
    throw new Error('Endpoint is required');
  }
  if (!endpoint.startsWith('/')) {
    console.warn(`Endpoint "${endpoint}" should start with "/"`);
  }
  return endpoint;
};

// Shortcut groupings
export const AUTH_ENDPOINTS = {
  LOGIN: API_ENDPOINTS.LOGIN,
  LOGOUT: API_ENDPOINTS.LOGOUT,
  REGISTER: API_ENDPOINTS.REGISTER,
  CURRENT_USER: API_ENDPOINTS.CURRENT_USER,
  GET_TOKEN: API_ENDPOINTS.TOKEN_OBTAIN,
  REFRESH_TOKEN: API_ENDPOINTS.REFRESH_TOKEN,
  CUSTOM_LOGIN: API_ENDPOINTS.CUSTOM_LOGIN,
  CUSTOM_REGISTER: API_ENDPOINTS.CUSTOM_REGISTER,
};

/*
Example usage:

// Login
fetch(API_ENDPOINTS.LOGIN, { method: 'POST', body: ... })

// Token refresh
fetch(API_ENDPOINTS.REFRESH_TOKEN, { method: 'POST', body: ... })

// Dynamic endpoint
fetch(API_ENDPOINTS.BLOG_UPDATE(42), { method: 'PUT', body: ... })

// Full URL with base
getFullUrl(API_ENDPOINTS.LOGIN, 'https://api.024global.com')

// Validate usage
validateEndpoint('/auth/login/')
*/
