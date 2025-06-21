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
      console.log("🔍 Raw formData received in useAuth register:", formData);

      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        username: formData.username,
        email: formData.email,
        password1: formData.password,
        password2: formData.confirmPassword || formData.password,
      };
      console.log("🔐 Registration Payload", payload);

      const registrationResult = await authService.register(payload);

      if (
        registrationResult.success ||
        registrationResult.id ||
        registrationResult.username ||
        registrationResult.key
      ) {
        return {
          success: true,
          message: 'Registration successful. Please check your email to activate your account.',
          requiresActivation: true,
        };
      } else {
        const errors = registrationResult.errors || registrationResult;
        console.error('Registration failed:', errors);
        return { success: false, errors };
      }
    } catch (error) {
      console.error("Registration error:", {
        status: error?.response?.status,
        data: error?.response?.data,
        message: error?.message,
      });

      const errorData = error?.response?.data || error;
      return { success: false, errors: errorData };
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
