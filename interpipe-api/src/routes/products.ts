import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = Router();

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  features: z.array(z.string()),
  sizes: z.array(z.string()),
  image: z.string().url(),
  isFeatured: z.boolean().default(false),
  categoryId: z.string().min(1),
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get a single product
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { category: true },
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Create a product
router.post('/', async (req, res) => {
  try {
    const data = productSchema.parse(req.body);
    
    // Verify that the category exists
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });
    
    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }
    
    const product = await prisma.product.create({
      data,
      include: { category: true },
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Error creating product' });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const data = productSchema.parse(req.body);
    
    // Verify that the category exists
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });
    
    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }
    
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data,
      include: { category: true },
    });
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    res.status(500).json({ message: 'Error updating product' });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
});

export default router; 