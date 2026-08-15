import api from '@/lib/api';
import { API_ROUTES } from '@/constants/api';

/**
 * Register a new user
 */
export const registerUser = async (userData) => {
  const response = await api.post(API_ROUTES.AUTH.REGISTER, userData);
  return response.data;
};

/**
 * Login user
 */
export const loginUser = async (credentials) => {
  const response = await api.post(API_ROUTES.AUTH.LOGIN, credentials);
  return response.data;
};

/**
 * Get user profile
 */
export const getUserProfile = async () => {
  const response = await api.get(API_ROUTES.AUTH.PROFILE);
  return response.data;
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userData) => {
  const response = await api.patch(API_ROUTES.AUTH.UPDATE_PROFILE, userData);
  return response.data;
};

/**
 * Delete user account
 */
export const deleteUserAccount = async () => {
  const response = await api.delete(API_ROUTES.AUTH.DELETE_PROFILE);
  return response.data;
};
