import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = Router();

const downloadItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  fileUrl: z.string().url(),
  fileSize: z.string().min(1),
  fileType: z.string().min(1),
  category: z.string().min(1),
});

// Get all download items
router.get('/', async (req, res) => {
  try {
    const items = await prisma.downloadItem.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching download items' });
  }
});

// Get a single download item
router.get('/:id', async (req, res) => {
  try {
    const item = await prisma.downloadItem.findUnique({
      where: { id: req.params.id },
    });
    if (!item) {
      return res.status(404).json({ message: 'Download item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching download item' });
  }
});

// Create a download item
router.post('/', async (req, res) => {
  try {
    const data = downloadItemSchema.parse(req.body);
    const item = await prisma.downloadItem.create({ data });
    res.status(201).json(item);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Error creating download item' });
  }
});

// Update a download item
router.put('/:id', async (req, res) => {
  try {
    const data = downloadItemSchema.parse(req.body);
    const item = await prisma.downloadItem.update({
      where: { id: req.params.id },
      data,
    });
    res.json(item);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Error updating download item' });
  }
});

// Delete a download item
router.delete('/:id', async (req, res) => {
  try {
    await prisma.downloadItem.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting download item' });
  }
});

export default router; 