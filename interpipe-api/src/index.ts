import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { authMiddleware } from './middleware/auth.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import galleryRoutes from './routes/gallery.js';
import downloadRoutes from './routes/downloads.js';
import contactRoutes from './routes/contact.js';
import partnerRoutes from './routes/partners.js';
import featureRoutes from './routes/features.js';
import statRoutes from './routes/stats.js';
import categoryRoutes from './routes/categories.js';
import uploadRoutes from './routes/upload.js';
import { 
  PORT, 
  ALLOWED_ORIGINS, 
  RESOURCE_POLICY, 
  OPENER_POLICY,
  UPLOAD_MAX_SIZE 
} from './config.js';

// ES module equivalent of __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const prisma = new PrismaClient();
const app = express();
const port = PORT;

// Configure CORS
const corsOptions = {
  origin: ALLOWED_ORIGINS,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(helmet({
  crossOriginResourcePolicy: { policy: RESOURCE_POLICY },
  crossOriginOpenerPolicy: { policy: OPENER_POLICY }
}));
app.use(morgan('dev'));
app.use(express.json({ limit: `${UPLOAD_MAX_SIZE}` }));
app.use(express.urlencoded({ limit: `${UPLOAD_MAX_SIZE}`, extended: true }));

// Serve uploaded files statically with proper headers
app.use('/uploads', express.static(path.join(__dirname, '../uploads'), {
  setHeaders: (res, path) => {
    res.set('Cross-Origin-Resource-Policy', RESOURCE_POLICY);
    res.set('Access-Control-Allow-Origin', '*');
  }
}));

// Public routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Middleware that only applies authentication for non-GET requests
// and allows POST to /api/contact
const conditionalAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Allow all GET requests, POST requests to /api/contact, and PATCH requests to contact status
  if (
    req.method === 'GET' || 
    (req.method === 'POST' && req.path === '/') ||
    (req.method === 'PATCH' && req.path.match(/^\/[^\/]+\/status$/))
  ) {
    return next();
  } else {
    return authMiddleware(req, res, next);
  }
};

// Routes with conditional auth (GET is public, other methods require auth)
app.use('/api/products', conditionalAuth, productRoutes);
app.use('/api/categories', conditionalAuth, categoryRoutes);
app.use('/api/gallery', conditionalAuth, galleryRoutes);
app.use('/api/downloads', conditionalAuth, downloadRoutes);
// Note: req.path will be '/' here because the middleware runs *before* contactRoutes
app.use('/api/contact', conditionalAuth, contactRoutes);
app.use('/api/partners', conditionalAuth, partnerRoutes);
app.use('/api/features', conditionalAuth, featureRoutes);
app.use('/api/stats', conditionalAuth, statRoutes);

// Always protected routes
app.use('/api/upload', authMiddleware, uploadRoutes);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;