'use client';

import { useState, useCallback } from 'react';
import * as urlService from '@/services/url.service';
import { toast } from 'sonner';

/**
 * Hook for managing shortened URLs
 */
export const useUrls = () => {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUrls = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await urlService.getUserUrls();
      setUrls(response.data || []);
      return response.data || [];
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch URLs';
      setError(message);
      toast.error(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createUrl = useCallback(async (originalUrl) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await urlService.createShortUrl(originalUrl);
      const newUrl = response.data;
      setUrls((prev) => [newUrl, ...prev]);
      toast.success('Short URL created successfully');
      return newUrl;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create short URL';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUrl = useCallback(async (id, updates) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await urlService.updateUrl(id, updates);
      const updated = response.data;
      setUrls((prev) =>
        prev.map((url) => (url.id === id || url._id === id ? updated : url))
      );
      toast.success('URL updated successfully');
      return updated;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update URL';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteUrl = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await urlService.deleteUrl(id);
      setUrls((prev) => prev.filter((url) => url.id !== id && url._id !== id));
      toast.success('URL deleted successfully');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete URL';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    urls,
    isLoading,
    error,
    fetchUrls,
    createUrl,
    updateUrl,
    deleteUrl,
  };
};
