import api from '@/lib/api';
import { API_ROUTES } from '@/constants/api';

/**
 * Create a shortened URL
 */
export const createShortUrl = async (originalUrl) => {
  const response = await api.post(API_ROUTES.URL.SHORTEN, { originalUrl });
  return response.data;
};

/**
 * Get user's shortened URLs
 */
export const getUserUrls = async () => {
  const response = await api.get(API_ROUTES.URL.MY_URLS);
  return response.data;
};

/**
 * Update a shortened URL
 */
export const updateUrl = async (id, updates) => {
  const response = await api.patch(API_ROUTES.URL.UPDATE_URL(id), updates);
  return response.data;
};

/**
 * Delete a shortened URL
 */
export const deleteUrl = async (id) => {
  const response = await api.delete(API_ROUTES.URL.DELETE_URL(id));
  return response.data;
};
