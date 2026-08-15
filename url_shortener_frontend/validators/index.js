import { z } from 'zod';

// Auth Validators

export const loginSchema = z.object({
  email: z
    .string()
    .email('Please provide a valid email.')
    .min(1, 'Email is required.'),
  password: z
    .string()
    .min(1, 'Password is required.')
    .min(8, 'Password must be at least 8 characters.'),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters.')
    .max(50, 'Name must not exceed 50 characters.')
    .min(1, 'Name is required.'),
  email: z
    .string()
    .email('Please provide a valid email.')
    .min(1, 'Email is required.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character.'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password.'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword'],
});

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters.')
    .max(50, 'Name must not exceed 50 characters.')
    .optional(),
  email: z
    .string()
    .email('Please provide a valid email.')
    .optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: 'Please provide at least one field to update.',
});

// URL Validators

export const createUrlSchema = z.object({
  originalUrl: z
    .string()
    .url('Please provide a valid URL.')
    .min(1, 'URL is required.')
    .max(2048, 'URL is too long.'),
});

export const updateUrlSchema = z.object({
  originalUrl: z
    .string()
    .url('Please provide a valid URL.')
    .max(2048, 'URL is too long.')
    .optional(),
  isActive: z
    .boolean()
    .optional(),
  expiresAt: z
    .string()
    .datetime()
    .optional()
    .nullable(),
}).refine((data) => Object.values(data).some((val) => val !== undefined && val !== null), {
  message: 'Please provide at least one field to update.',
});
