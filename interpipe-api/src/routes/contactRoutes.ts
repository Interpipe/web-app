import { Router } from 'express';
import {
  submitContactForm,
  getContactSubmissions,
  getContactSubmissionById,
  deleteContactSubmission,
  updateContactStatus
} from '../controllers/contactController';

const router = Router();

// Public routes
router.post('/', submitContactForm);

// Protected routes (add authentication middleware later)
router.get('/', getContactSubmissions);
router.get('/:id', getContactSubmissionById);
router.delete('/:id', deleteContactSubmission);
router.patch('/:id/status', updateContactStatus);

export default router; 