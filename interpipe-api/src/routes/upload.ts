import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Request, Response, NextFunction } from 'express';
import { UPLOAD_MAX_SIZE } from '../config';

const router = Router();

// Get current directory path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Get uploadType from query parameter
    const uploadType = (typeof req.query.uploadType === 'string' ? req.query.uploadType : 'general').toLowerCase();
    const uploadPath = path.join(__dirname, '../../uploads', uploadType);

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Use a timestamp and original name to make filename unique
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, uniqueSuffix + '-' + sanitizedFilename);
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: UPLOAD_MAX_SIZE }, // File size limit from environment
});

// POST /api/upload
router.post('/', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  // Get uploadType from query parameter
  const uploadType = (typeof req.query.uploadType === 'string' ? req.query.uploadType : 'general').toLowerCase();
  
  // Construct the file URL or path to return to the client
  const filePath = `/uploads/${uploadType}/${req.file.filename}`;

  res.status(201).json({
    message: 'File uploaded successfully',
    filePath: filePath,
    fileName: req.file.filename,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
  });
}, (error: Error, req: Request, res: Response, next: NextFunction) => {
  // Handle multer errors (e.g., file size limit exceeded)
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ message: error.message });
  }
  // Handle other errors
  if (error) {
    return res.status(500).json({ message: error.message || 'File upload failed.' });
  }
  next();
});

export default router; 