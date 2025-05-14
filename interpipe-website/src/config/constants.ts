export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: import.meta.env['VITE_API_AUTH_LOGIN'] ?? '/auth/login',
    REGISTER: import.meta.env['VITE_API_AUTH_REGISTER'] ?? '/auth/register',
    LOGOUT: import.meta.env['VITE_API_AUTH_LOGOUT'] ?? '/auth/logout',
    REFRESH: import.meta.env['VITE_API_AUTH_REFRESH'] ?? '/auth/refresh',
  },
  USER: {
    PROFILE: import.meta.env['VITE_API_USER_PROFILE'] ?? '/user/profile',
    SETTINGS: import.meta.env['VITE_API_USER_SETTINGS'] ?? '/user/settings',
  },
} as const;

export const APP_CONFIG = {
  APP_NAME: import.meta.env['VITE_APP_NAME'] ?? 'Interpipe',
  DEFAULT_THEME: import.meta.env['VITE_DEFAULT_THEME'] ?? 'light',
  API_TIMEOUT: Number(import.meta.env['VITE_API_TIMEOUT'] ?? 30000),
  MAX_FILE_SIZE: Number(import.meta.env['VITE_MAX_FILE_SIZE'] ?? 5 * 1024 * 1024), // 5MB
  SUPPORTED_FILE_TYPES: (import.meta.env['VITE_SUPPORTED_FILE_TYPES'] ?? 'image/jpeg,image/png,image/gif').split(','),
} as const;

export const ROUTES = {
  HOME: import.meta.env['VITE_ROUTE_HOME'] ?? '/',
  LOGIN: import.meta.env['VITE_ROUTE_LOGIN'] ?? '/login',
  REGISTER: import.meta.env['VITE_ROUTE_REGISTER'] ?? '/register',
  DASHBOARD: import.meta.env['VITE_ROUTE_DASHBOARD'] ?? '/dashboard',
  PROFILE: import.meta.env['VITE_ROUTE_PROFILE'] ?? '/profile',
  SETTINGS: import.meta.env['VITE_ROUTE_SETTINGS'] ?? '/settings',
} as const; 