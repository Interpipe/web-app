import { Router } from 'express';
import {
  getDownloads,
  getDownloadById,
  createDownload,
  updateDownload,
  deleteDownload
} from '../controllers/downloadController';

const router = Router();

// Public routes
router.get('/', getDownloads);
router.get('/:id', getDownloadById);

// Protected routes (add authentication middleware later)
router.post('/', createDownload);
router.put('/:id', updateDownload);
router.delete('/:id', deleteDownload);

export default router; 