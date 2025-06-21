// services/authService.js
import axios from 'axios';
import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';

const API_BASE_URL = 'http://localhost:8000/api';

export const authService = {
  login: async ({ username, password }) => {
    try {
      const payload = { username, password };

      const response = await apiClient.post(API_ENDPOINTS.LOGIN, payload);

      if (response.data.access) {
        localStorage.setItem('authToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);

        if (!response.data.user) {
          const user = await authService.fetchCurrentUser();
          response.data.user = user;
        }

        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  register: async (userData) => {
    try {
      const registrationPayload = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        username: userData.username,
        email: userData.email,
        password1: userData.password1,
        password2: userData.password2,
      };

      console.log("📤 Payload being sent to backend:", registrationPayload);

      const response = await axios.post(`${API_BASE_URL}/accounts/register/`, registrationPayload, {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('✅ Registration successful:', response.data);

      if (response.data.access || response.data.access_token) {
        const token = response.data.access || response.data.access_token;
        const refresh = response.data.refresh || response.data.refresh_token;

        localStorage.setItem('authToken', token);
        if (refresh) {
          localStorage.setItem('refreshToken', refresh);
        }

        if (!response.data.user) {
          const user = await authService.fetchCurrentUser();
          response.data.user = user;
        }

        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return {
        success: true,
        ...response.data
      };
    } catch (error) {
      console.error('❌ Registration error:');

      if (error.response) {
        console.error('📡 Server responded with:', {
          status: error.response.status,
          data: error.response.data
        });

        const errorData = error.response.data;

        if (typeof errorData === 'object' && !errorData.message && !errorData.detail) {
          const formattedErrors = {};
          Object.keys(errorData).forEach(key => {
            formattedErrors[key] = Array.isArray(errorData[key])
              ? errorData[key][0]
              : errorData[key];
          });
          throw formattedErrors;
        }

        if (errorData.message || errorData.detail) {
          throw { general: errorData.message || errorData.detail };
        }

        if (errorData.non_field_errors) {
          throw {
            general: Array.isArray(errorData.non_field_errors)
              ? errorData.non_field_errors[0]
              : errorData.non_field_errors
          };
        }

        throw errorData;
      }

      if (error.request) {
        console.error('🛑 No response received from server:', error.request);
        throw { general: 'No response from server. Check your internet or server status.' };
      }

      console.error('🚨 Unexpected registration error:', error.message);
      throw { general: error.message || 'Unexpected registration error' };
    }
  },

  logout: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken && API_ENDPOINTS.LOGOUT) {
        await apiClient.post(API_ENDPOINTS.LOGOUT, { refresh: refreshToken });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to send reset email' };
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.RESET_PASSWORD, {
        token,
        password: newPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Password reset failed' };
    }
  },

  fetchCurrentUser: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CURRENT_USER, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      }

      throw new Error('No user data returned');
    } catch (error) {
      console.error('Fetching current user failed:', error);
      throw error.response?.data || { message: 'Failed to fetch user' };
    }
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
      return null;
    }
  },

  getAuthToken: () => {
    return localStorage.getItem('authToken');
  },

  getRefreshToken: () => {
    return localStorage.getItem('refreshToken');
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch (error) {
      console.error('Invalid token format:', error);
      return false;
    }
  },

  refreshAuthToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiClient.post(API_ENDPOINTS.REFRESH_TOKEN || API_ENDPOINTS.REFRESH, {
        refresh: refreshToken,
      });

      if (response.data.access) {
        localStorage.setItem('authToken', response.data.access);

        if (!response.data.user) {
          const user = await authService.fetchCurrentUser();
          response.data.user = user;
        }

        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
      }

      throw new Error('Invalid refresh token response');
    } catch (error) {
      await authService.logout();
      throw error;
    }
  }
};
