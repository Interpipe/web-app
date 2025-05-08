import { Router } from 'express';
import {
  getDownloadItems,
  getDownloadItemById,
  createDownloadItem,
  updateDownloadItem,
  deleteDownloadItem
} from '../controllers/downloadController';

const router = Router();

// Public routes
router.get('/', getDownloadItems);
router.get('/:id', getDownloadItemById);

// Protected routes (add authentication middleware later)
router.post('/', createDownloadItem);
router.put('/:id', updateDownloadItem);
router.delete('/:id', deleteDownloadItem);

export default router; 