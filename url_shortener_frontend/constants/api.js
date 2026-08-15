// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
};

// API Routes
export const API_ROUTES = {
  // Auth routes
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    PROFILE: '/auth/profile',
    UPDATE_PROFILE: '/auth/profile',
    DELETE_PROFILE: '/auth/profile',
  },
  
  // URL routes
  URL: {
    SHORTEN: '/url/shorten',
    MY_URLS: '/url/my-urls',
    UPDATE_URL: (id) => `/url/${id}`,
    DELETE_URL: (id) => `/url/${id}`,
  },
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Your session has expired. Please log in again.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  USER_EXISTS: 'User already exists.',
  URL_NOT_FOUND: 'URL not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
};
