import { Request, Response } from 'express';
import prisma from '../lib/prisma.js';
import { productSchema } from '../validations/index.js';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    
    const products = await prisma.product.findMany({
      where: category ? { 
        category: {
          name: category as string
        } 
      } : undefined,
      include: {
        category: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true
      }
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const validatedData = productSchema.parse(req.body);
    const { category, ...productData } = validatedData;
    
    // Find or create the category
    let categoryRecord = await prisma.category.findUnique({
      where: { name: category }
    });
    
    if (!categoryRecord) {
      categoryRecord = await prisma.category.create({
        data: {
          name: category,
          description: `Category for ${category}`
        }
      });
    }
    
    const product = await prisma.product.create({
      data: {
        ...productData,
        category: {
          connect: { id: categoryRecord.id }
        }
      },
      include: {
        category: true
      }
    });
    
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Invalid product data', errors: error.errors });
    }
    res.status(500).json({ message: 'Error creating product' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = productSchema.parse(req.body);
    const { category, ...productData } = validatedData;
    
    // Find or create the category
    let categoryRecord = await prisma.category.findUnique({
      where: { name: category }
    });
    
    if (!categoryRecord) {
      categoryRecord = await prisma.category.create({
        data: {
          name: category,
          description: `Category for ${category}`
        }
      });
    }
    
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...productData,
        category: {
          connect: { id: categoryRecord.id }
        }
      },
      include: {
        category: true
      }
    });
    
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Invalid product data', errors: error.errors });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Error updating product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await prisma.product.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting product:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Error deleting product' });
  }
};

export const getFeaturedProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: { isFeatured: true },
      include: {
        category: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ message: 'Error fetching featured products' });
  }
}; 