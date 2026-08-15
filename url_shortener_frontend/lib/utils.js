import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Truncate long URLs for display
 */
export function truncateUrl(url, maxLength = 50) {
  if (!url) return '';
  if (url.length <= maxLength) return url;
  return url.substring(0, maxLength - 3) + '...';
}

/**
 * Format date for display
 */
export function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format date and time
 */
export function formatDateTime(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Check if URL is expired
 */
export function isUrlExpired(expiresAt) {
  if (!expiresAt) return false;
  return new Date(expiresAt) < new Date();
}

/**
 * Format number with commas
 */
export function formatNumber(num) {
  return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '0';
}

/**
 * Get color class for badge based on status
 */
export function getStatusColor(isActive, isExpired) {
  if (isExpired) return 'bg-gray-100 text-gray-800';
  return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
}

/**
 * Get status text
 */
export function getStatusText(isActive, isExpired) {
  if (isExpired) return 'Expired';
  return isActive ? 'Active' : 'Inactive';
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
}

/**
 * Validate email
 */
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate URL
 */
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate password strength
 */
export function validatePassword(password) {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('At least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('One uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('One lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('One number');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('One special character');
  }
  
  return errors;
}
