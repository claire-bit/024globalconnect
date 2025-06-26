// useAuth.jsx
import { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '../api/services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      try {
        const currentUser = authService.getCurrentUser();
        const isAuth = authService.isAuthenticated();

        if (currentUser && isAuth) {
          setUser(currentUser);
        } else {
          authService.logout();
          setUser(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const loginData = {
        username: credentials.username || credentials.email,
        password: credentials.password,
      };

      const data = await authService.login(loginData);

      const loggedInUser = {
        username: data.user?.username || loginData.username,
        email: data.user?.email || '',
        first_name: data.user?.first_name || '',
        last_name: data.user?.last_name || '',
        id: data.user?.id || data.id,
        ...data.user,
      };

      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));

      return { success: true, data };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, errors: error };
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      console.log("🔍 Received formData:", formData);

      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password,
        country: formData.country,
        city: formData.city,
        website: formData.website,
        experience: formData.experience,
        promotion_methods: formData.promotion_methods,
      };

      console.log("📦 Final registration payload:", payload);

      const registrationResult = await authService.register(payload);

      if (registrationResult.success) {
        return {
          success: true,
          message: 'Registration successful. Please check your email.',
          requiresActivation: true,
        };
      }

      return {
        success: false,
        errors: registrationResult.errors || registrationResult,
      };
    } catch (error) {
      console.error("🔥 useAuth registration error:", error);
      return { success: false, errors: error };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      setLoading(false);
    }
  };

  const refreshAuth = async () => {
    try {
      const newToken = await authService.refreshAuthToken();

      if (newToken.user) {
        const updatedUser = { ...user, ...newToken.user };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      return newToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      await logout();
      throw error;
    }
  };

  const updateUser = (updatedUserData) => {
    const updatedUser = { ...user, ...updatedUserData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const isAuthenticated = () => {
    return authService.isAuthenticated() && user !== null;
  };

  const value = {
    user,
    login,
    register,
    logout,
    refreshAuth,
    updateUser,
    loading,
    isAuthenticated: isAuthenticated(),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
