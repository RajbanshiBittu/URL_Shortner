'use client';

import { createContext, useReducer, useCallback, useEffect } from 'react';
import * as authService from '@/services/auth.service';
import { toast } from 'sonner';

export const AuthContext = createContext(null);

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_TOKEN: 'SET_TOKEN',
  SET_ERROR: 'SET_ERROR',
  LOGOUT: 'LOGOUT',
  RESTORE_SESSION: 'RESTORE_SESSION',
};

// Initial state
const initialState = {
  user: null,
  token: null,
  isLoading: true,
  error: null,
};

// Reducer
function authReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload };
    case ACTIONS.SET_TOKEN:
      return { ...state, token: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    case ACTIONS.LOGOUT:
      return { ...initialState, isLoading: false };
    case ACTIONS.RESTORE_SESSION:
      return {
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
}

/**
 * Auth Provider Component
 */
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Restore session from localStorage on mount
  useEffect(() => {
    const restoreSession = () => {
      try {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        if (token && user) {
          dispatch({
            type: ACTIONS.RESTORE_SESSION,
            payload: {
              token,
              user: JSON.parse(user),
            },
          });
        } else {
          dispatch({ type: ACTIONS.SET_LOADING, payload: false });
        }
      } catch (error) {
        console.error('Failed to restore session:', error);
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }
    };

    restoreSession();
  }, []);

  // Login
  const login = useCallback(async (email, password) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS.SET_ERROR, payload: null });

    try {
      const response = await authService.loginUser({ email, password });
      const { accessToken, user } = response.data;

      // Store in localStorage
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      dispatch({ type: ACTIONS.SET_TOKEN, payload: accessToken });
      dispatch({ type: ACTIONS.SET_USER, payload: user });
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      dispatch({ type: ACTIONS.SET_ERROR, payload: message });
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      throw error;
    }
  }, []);

  // Register
  const register = useCallback(async (name, email, password) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS.SET_ERROR, payload: null });

    try {
      const response = await authService.registerUser({ name, email, password });
      const user = response.data;

      // Note: Backend doesn't auto-login after register
      // User will need to login manually
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });

      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      dispatch({ type: ACTIONS.SET_ERROR, payload: message });
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      throw error;
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: ACTIONS.LOGOUT });
  }, []);

  // Update Profile
  const updateProfile = useCallback(async (updates) => {
    try {
      const response = await authService.updateUserProfile(updates);
      const updatedUser = response.data;
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch({ type: ACTIONS.SET_USER, payload: updatedUser });
      
      toast.success('Profile updated successfully');
      return updatedUser;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
      throw error;
    }
  }, []);

  // Delete Account
  const deleteAccount = useCallback(async () => {
    try {
      await authService.deleteUserAccount();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch({ type: ACTIONS.LOGOUT });
      toast.success('Account deleted successfully');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete account';
      toast.error(message);
      throw error;
    }
  }, []);

  const value = {
    user: state.user,
    token: state.token,
    isLoading: state.isLoading,
    error: state.error,
    login,
    register,
    logout,
    updateProfile,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
