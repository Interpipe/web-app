import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = Router();

const contactSubmissionSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
  company: z.string().optional(),
  phone: z.string().optional(),
});

const contactStatusSchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'RESPONDED', 'CLOSED'])
});

// Get all contact submissions
router.get('/', async (req, res) => {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact submissions' });
  }
});

// Get a single contact submission
router.get('/:id', async (req, res) => {
  try {
    const submission = await prisma.contactSubmission.findUnique({
      where: { id: req.params.id },
    });
    if (!submission) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact submission' });
  }
});

// Create a contact submission
router.post('/', async (req, res) => {
  try {
    const data = contactSubmissionSchema.parse(req.body);
    const submission = await prisma.contactSubmission.create({ data });
    res.status(201).json(submission);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Error creating contact submission' });
  }
});

// Delete a contact submission
router.delete('/:id', async (req, res) => {
  try {
    await prisma.contactSubmission.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact submission' });
  }
});

// Update contact status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = contactStatusSchema.parse(req.body);
    const submission = await prisma.contactSubmission.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json(submission);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    res.status(500).json({ message: 'Error updating contact status' });
  }
});

export default router; 