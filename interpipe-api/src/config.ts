import dotenv from 'dotenv';

// Ensure dotenv is configured if this file is imported before index.ts has a chance to run it.
// However, index.ts should be the primary place for dotenv.config().
if (!process.env.JWT_SECRET) {
  dotenv.config(); 
}

// API configuration
export const PORT = process.env.PORT ?? '3000';
export const NODE_ENV = process.env.NODE_ENV ?? 'development';

// Security
export const JWT_SECRET = process.env.JWT_SECRET ?? 'your-very-default-secret-key';
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION ?? '7d';

// CORS configuration
export const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:5173';
export const ALLOWED_ORIGINS = [
  FRONTEND_URL,
  process.env.ADDITIONAL_ORIGIN_1 ?? 'http://localhost:5174',
  process.env.ADDITIONAL_ORIGIN_2 ?? 'http://127.0.0.1:5173',
  process.env.ADDITIONAL_ORIGIN_3 ?? 'http://127.0.0.1:5174'
];

// Security policies
export const RESOURCE_POLICY = (process.env.RESOURCE_POLICY ?? 'cross-origin') as 'cross-origin' | 'same-origin' | 'same-site';
export const OPENER_POLICY = (process.env.OPENER_POLICY ?? 'same-origin-allow-popups') as 'same-origin-allow-popups' | 'same-origin' | 'unsafe-none';

// Upload configuration
export const UPLOAD_MAX_SIZE = parseInt(process.env.UPLOAD_MAX_SIZE ?? '10485760', 10); // 10MB default

if (JWT_SECRET === 'your-very-default-secret-key' && NODE_ENV === 'production') {
  console.warn('WARNING: Using default JWT_SECRET in production. Please set JWT_SECRET in your .env file.');
}

console.log('[config.ts] Exporting JWT_SECRET:', JWT_SECRET); 