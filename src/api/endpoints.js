// endpoints.js

export const API_ENDPOINTS = {
  // ✅ Authentication endpoints (JWT-based)
  TOKEN_OBTAIN: '/token/',
  LOGIN: '/users/login/',                   // ✅ Your custom JWT login route
  REFRESH_TOKEN: '/users/token/refresh/',   // ✅ Your custom refresh route
  LOGOUT: '/users/logout/',                 // ✅ Your custom logout endpoint
  REGISTER: '/users/register/',             // ✅ Your custom registration route
  CURRENT_USER: '/users/me/',               // ✅ Fetch current user

  // ✅ Account activation
  ACTIVATE_ACCOUNT: (uid, token) => `/api/users/auth/activate/${uid}/${token}/`,
  RESEND_ACTIVATION_EMAIL: '/api/users/registration/resend-email/',

  // ✅ Password reset
  FORGOT_PASSWORD: '/api/users/password/reset/',
  RESET_PASSWORD_CONFIRM: '/api/users/password/reset/confirm/',

  // ✅ User profile
  USER_PROFILE: '/api/users/me/',
  UPDATE_PROFILE: '/api/users/update/',

  // ✅ Contact form
  CONTACT_FORM: '/api/contact/submit/',

  // ✅ Blog endpoints
  BLOGS: '/api/blogs/',
  BLOG_CREATE: '/api/blogs/',
  BLOG_UPDATE: (id) => `/api/blogs/${id}/`,
  BLOG_DELETE: (id) => `/api/blogs/${id}/`,
  BLOG_PUBLISH: (id) => `/api/blogs/${id}/publish/`,

  // ✅ 024 Global Connect-specific
  OPPORTUNITIES: '/api/opportunities/',
  PARTNERSHIPS: '/api/partnerships/',
  SERVICES: '/api/services/',

  // ✅ Utility
  HELLO: '/api/hello/',
  PROTECTED: '/api/protected/',
};

// Helper: Full URL
export const getFullUrl = (endpoint, baseUrl = '') => {
  if (typeof endpoint === 'function') {
    throw new Error('Use the endpoint function first, then pass the result to getFullUrl');
  }
  return `${baseUrl}${endpoint}`;
};

// Validation helper
export const validateEndpoint = (endpoint) => {
  if (!endpoint) throw new Error('Endpoint is required');
  if (!endpoint.startsWith('/')) {
    console.warn(`Endpoint "${endpoint}" should start with "/"`);
  }
  return endpoint;
};

// Grouped shortcut for auth
export const AUTH_ENDPOINTS = {
  LOGIN: API_ENDPOINTS.LOGIN,
  LOGOUT: API_ENDPOINTS.LOGOUT,
  REGISTER: API_ENDPOINTS.REGISTER,
  CURRENT_USER: API_ENDPOINTS.CURRENT_USER,
  GET_TOKEN: API_ENDPOINTS.LOGIN,
  REFRESH_TOKEN: API_ENDPOINTS.REFRESH_TOKEN,
  ACTIVATE: API_ENDPOINTS.ACTIVATE_ACCOUNT,
  RESEND_EMAIL: API_ENDPOINTS.RESEND_ACTIVATION_EMAIL,
};
