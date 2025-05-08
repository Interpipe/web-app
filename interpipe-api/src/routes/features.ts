import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = Router();

const featureSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  order: z.number().int().min(0),
});

// Get all features
router.get('/', async (req, res) => {
  try {
    const features = await prisma.feature.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(features);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching features' });
  }
});

// Get a single feature
router.get('/:id', async (req, res) => {
  try {
    const feature = await prisma.feature.findUnique({
      where: { id: req.params.id },
    });
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }
    res.json(feature);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feature' });
  }
});

// Create a feature
router.post('/', async (req, res) => {
  try {
    const data = featureSchema.parse(req.body);
    const feature = await prisma.feature.create({ data });
    res.status(201).json(feature);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Error creating feature' });
  }
});

// Update a feature
router.put('/:id', async (req, res) => {
  try {
    const data = featureSchema.parse(req.body);
    const feature = await prisma.feature.update({
      where: { id: req.params.id },
      data,
    });
    res.json(feature);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Error updating feature' });
  }
});

// Delete a feature
router.delete('/:id', async (req, res) => {
  try {
    await prisma.feature.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feature' });
  }
});

export default router; 