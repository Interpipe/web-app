import dotenv from 'dotenv';

// Ensure dotenv is configured if this file is imported before index.ts has a chance to run it.
// However, index.ts should be the primary place for dotenv.config().
if (!process.env.JWT_SECRET) {
  dotenv.config(); 
}

export const JWT_SECRET = process.env.JWT_SECRET ?? 'your-very-default-secret-key';

if (JWT_SECRET === 'your-very-default-secret-key') {
  console.warn('WARNING: Using default JWT_SECRET. Please set JWT_SECRET in your .env file for production.');
}

console.log('[config.ts] Exporting JWT_SECRET:', JWT_SECRET); 