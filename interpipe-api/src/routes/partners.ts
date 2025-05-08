import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = Router();

const partnerSchema = z.object({
  name: z.string().min(1),
  logo: z.string().url(),
  order: z.number().int().min(0),
});

// Get all partners
router.get('/', async (req, res) => {
  try {
    const partners = await prisma.partner.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching partners' });
  }
});

// Get a single partner
router.get('/:id', async (req, res) => {
  try {
    const partner = await prisma.partner.findUnique({
      where: { id: req.params.id },
    });
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.json(partner);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching partner' });
  }
});

// Create a partner
router.post('/', async (req, res) => {
  try {
    console.log('Received partner data:', req.body);
    const data = partnerSchema.parse(req.body);
    console.log('Validated partner data:', data);
    const partner = await prisma.partner.create({ data });
    res.status(201).json(partner);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log('Validation errors:', error.errors);
      return res.status(400).json({ 
        message: 'Invalid input', 
        errors: error.errors,
        receivedData: req.body 
      });
    }
    console.error('Error creating partner:', error);
    res.status(500).json({ message: 'Error creating partner' });
  }
});

// Update a partner
router.put('/:id', async (req, res) => {
  try {
    const data = partnerSchema.parse(req.body);
    const partner = await prisma.partner.update({
      where: { id: req.params.id },
      data,
    });
    res.json(partner);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Error updating partner' });
  }
});

// Delete a partner
router.delete('/:id', async (req, res) => {
  try {
    await prisma.partner.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting partner' });
  }
});

export default router; 