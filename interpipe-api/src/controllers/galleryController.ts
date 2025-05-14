import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { galleryItemSchema } from '../validations';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export const getGalleryItems = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    
    const items = await prisma.galleryItem.findMany({
      where: category ? { category: category as string } : undefined,
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(items);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    res.status(500).json({ message: 'Error fetching gallery items' });
  }
};

export const getGalleryItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await prisma.galleryItem.findUnique({
      where: { id }
    });
    
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    
    res.json(item);
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    res.status(500).json({ message: 'Error fetching gallery item' });
  }
};

export const createGalleryItem = async (req: Request, res: Response) => {
  try {
    const validatedData = galleryItemSchema.parse(req.body);
    
    const item = await prisma.galleryItem.create({
      data: validatedData
    });
    
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating gallery item:', error);
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Invalid gallery item data', errors: error.errors });
    }
    res.status(500).json({ message: 'Error creating gallery item' });
  }
};

export const updateGalleryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = galleryItemSchema.parse(req.body);
    
    const item = await prisma.galleryItem.update({
      where: { id },
      data: validatedData
    });
    
    res.json(item);
  } catch (error) {
    console.error('Error updating gallery item:', error);
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Invalid gallery item data', errors: error.errors });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.status(500).json({ message: 'Error updating gallery item' });
  }
};

export const deleteGalleryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await prisma.galleryItem.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.status(500).json({ message: 'Error deleting gallery item' });
  }
}; 