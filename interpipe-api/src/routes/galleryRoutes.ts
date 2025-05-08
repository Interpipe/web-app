import { Router } from 'express';
import {
  getGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} from '../controllers/galleryController';

const router = Router();

// Public routes
router.get('/', getGalleryItems);
router.get('/:id', getGalleryItemById);

// Protected routes (add authentication middleware later)
router.post('/', createGalleryItem);
router.put('/:id', updateGalleryItem);
router.delete('/:id', deleteGalleryItem);

export default router; 