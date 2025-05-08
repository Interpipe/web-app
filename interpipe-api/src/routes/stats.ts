import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = Router();

const statSchema = z.object({
  number: z.string().min(1),
  label: z.string().min(1),
  icon: z.string().min(1),
  order: z.number().int().min(0),
});

// Get all stats
router.get('/', async (req, res) => {
  try {
    const stats = await prisma.stat.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

// Get a single stat
router.get('/:id', async (req, res) => {
  try {
    const stat = await prisma.stat.findUnique({
      where: { id: req.params.id },
    });
    if (!stat) {
      return res.status(404).json({ message: 'Stat not found' });
    }
    res.json(stat);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stat' });
  }
});

// Create a stat
router.post('/', async (req, res) => {
  try {
    const data = statSchema.parse(req.body);
    const stat = await prisma.stat.create({ data });
    res.status(201).json(stat);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Error creating stat' });
  }
});

// Update a stat
router.put('/:id', async (req, res) => {
  try {
    const data = statSchema.parse(req.body);
    const stat = await prisma.stat.update({
      where: { id: req.params.id },
      data,
    });
    res.json(stat);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Error updating stat' });
  }
});

// Delete a stat
router.delete('/:id', async (req, res) => {
  try {
    await prisma.stat.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting stat' });
  }
});

export default router; 