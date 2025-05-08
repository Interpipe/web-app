import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = Router();

const galleryItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().url(),
  category: z.string().min(1),
});

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gallery items' });
  }
});

// Get a single gallery item
router.get('/:id', async (req, res) => {
  try {
    const item = await prisma.galleryItem.findUnique({
      where: { id: req.params.id },
    });
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gallery item' });
  }
});

// Create a gallery item
router.post('/', async (req, res) => {
  try {
    const data = galleryItemSchema.parse(req.body);
    const item = await prisma.galleryItem.create({ data });
    res.status(201).json(item);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Error creating gallery item' });
  }
});

// Update a gallery item
router.put('/:id', async (req, res) => {
  try {
    const data = galleryItemSchema.parse(req.body);
    const item = await prisma.galleryItem.update({
      where: { id: req.params.id },
      data,
    });
    res.json(item);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Error updating gallery item' });
  }
});

// Delete a gallery item
router.delete('/:id', async (req, res) => {
  try {
    await prisma.galleryItem.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting gallery item' });
  }
});

export default router; 