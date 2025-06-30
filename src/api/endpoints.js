// ✅ FINAL endpoints.js

export const API_ENDPOINTS = {
  // ✅ Authentication endpoints (JWT-based)
  TOKEN_OBTAIN: '/token/',                          // JWT login (email or username)
  REFRESH_TOKEN: '/token/refresh/',                 // Refresh token
  LOGOUT: '/users/logout/',                         // Logout user
  REGISTER: '/users/register/',                     // Register (affiliate/vendor)
  CURRENT_USER: '/users/me/',                       // Get logged-in user details

  // ✅ Account activation
  ACTIVATE_ACCOUNT: (uid, token) => `/users/auth/activate/${uid}/${token}/`,
  RESEND_ACTIVATION_EMAIL: '/users/registration/resend-email/',

  // ✅ Password reset
  FORGOT_PASSWORD: '/users/password/reset/',
  RESET_PASSWORD_CONFIRM: '/users/password/reset/confirm/',

  // ✅ User profile
  USER_PROFILE: '/users/me/',
  UPDATE_PROFILE: '/users/update/',

  // ✅ Affiliate-specific
  AFFILIATE_SUMMARY: '/users/affiliate/summary/',
  AFFILIATE_REFERRALS: '/referrals/',
  AFFILIATE_PAYOUT_REQUEST: '/users/affiliate/payout-request/',

  // ✅ Vendor-specific
  VENDOR_PRODUCTS: '/products/',
  VENDOR_PRODUCT_DETAIL: (id) => `/products/${id}/`,

  // ✅ Admin-specific
  ADMIN_REPORTS: '/admin/reports/',
  ADMIN_PAYOUT_APPROVAL: '/admin/payouts/approve/',
  ADMIN_ANALYTICS: '/admin/analytics/',

  // ✅ M-Pesa Integration
  MPESA_INITIATE_PAYMENT: '/payments/mpesa/initiate/',
  MPESA_PAYMENT_CALLBACK: '/payments/mpesa/callback/',

  // ✅ Contact
  CONTACT_FORM: '/contact/submit/',

  // ✅ 024 Global Connect-specific
  OPPORTUNITIES: '/opportunities/',
  PARTNERSHIPS: '/partnerships/',
  SERVICES: '/services/',

  // ✅ Utility
  HELLO: '/hello/',
  PROTECTED: '/protected/',
};

// 🌐 Helper: Compose full URL
export const getFullUrl = (endpoint, baseUrl = '') => {
  if (typeof endpoint === 'function') {
    throw new Error('Use the endpoint function first, then pass the result to getFullUrl');
  }
  return `${baseUrl}${endpoint}`;
};

// 🧪 Helper: Validate endpoint format
export const validateEndpoint = (endpoint) => {
  if (!endpoint) throw new Error('Endpoint is required');
  if (!endpoint.startsWith('/')) {
    console.warn(`Endpoint "${endpoint}" should start with "/"`);
  }
  return endpoint;
};

// ⚙️ Shortcut group for auth
export const AUTH_ENDPOINTS = {
  LOGIN: API_ENDPOINTS.TOKEN_OBTAIN,
  LOGOUT: API_ENDPOINTS.LOGOUT,
  REGISTER: API_ENDPOINTS.REGISTER,
  CURRENT_USER: API_ENDPOINTS.CURRENT_USER,
  GET_TOKEN: API_ENDPOINTS.TOKEN_OBTAIN,
  REFRESH_TOKEN: API_ENDPOINTS.REFRESH_TOKEN,
  ACTIVATE: API_ENDPOINTS.ACTIVATE_ACCOUNT,
  RESEND_EMAIL: API_ENDPOINTS.RESEND_ACTIVATION_EMAIL,
};
