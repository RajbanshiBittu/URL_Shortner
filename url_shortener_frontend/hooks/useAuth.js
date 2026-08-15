'use client';

import { useState, useEffect, useCallback, useContext } from 'react';
import { AuthContext } from '@/context/auth.context';

/**
 * Hook for using auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
};

/**
 * Hook for handling auth in components (login, register, logout, etc.)
 * Returns auth state and methods
 */
export const useAuthActions = () => {
  const { user, token, login, register, logout, updateProfile, deleteAccount } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      await login(email, password);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, [login]);

  const handleRegister = useCallback(async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      await register(name, email, password);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, [register]);

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  return {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    error,
    handleLogin,
    handleRegister,
    handleLogout,
    updateProfile,
    deleteAccount,
  };
};
