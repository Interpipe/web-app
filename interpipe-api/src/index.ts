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
import { authMiddleware } from './middleware/auth';
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import galleryRoutes from './routes/gallery';
import downloadRoutes from './routes/downloads';
import contactRoutes from './routes/contact';
import partnerRoutes from './routes/partners';
import featureRoutes from './routes/features';
import statRoutes from './routes/stats';
import categoryRoutes from './routes/categories';
import uploadRoutes from './routes/upload';

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
const port = process.env.PORT || '3000';

// Configure CORS
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL ?? 'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
}));
app.use(morgan('dev'));
app.use(express.json());

// Serve uploaded files statically with proper headers
app.use('/uploads', express.static(path.join(__dirname, '../uploads'), {
  setHeaders: (res, path) => {
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    res.set('Access-Control-Allow-Origin', '*');
  }
}));

// Public routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// Protected routes
app.use('/api/gallery', authMiddleware, galleryRoutes);
app.use('/api/downloads', authMiddleware, downloadRoutes);
app.use('/api/contact', authMiddleware, contactRoutes);
app.use('/api/partners', authMiddleware, partnerRoutes);
app.use('/api/features', authMiddleware, featureRoutes);
app.use('/api/stats', authMiddleware, statRoutes);

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