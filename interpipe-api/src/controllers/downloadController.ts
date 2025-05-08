import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { downloadItemSchema } from '../validations';

export const getDownloadItems = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    
    const items = await prisma.downloadItem.findMany({
      where: category ? { category: category as string } : undefined,
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(items);
  } catch (error) {
    console.error('Error fetching download items:', error);
    res.status(500).json({ message: 'Error fetching download items' });
  }
};

export const getDownloadItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await prisma.downloadItem.findUnique({
      where: { id }
    });
    
    if (!item) {
      return res.status(404).json({ message: 'Download item not found' });
    }
    
    res.json(item);
  } catch (error) {
    console.error('Error fetching download item:', error);
    res.status(500).json({ message: 'Error fetching download item' });
  }
};

export const createDownloadItem = async (req: Request, res: Response) => {
  try {
    const validatedData = downloadItemSchema.parse(req.body);
    
    const item = await prisma.downloadItem.create({
      data: validatedData
    });
    
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating download item:', error);
    if (error.name === 'ZodError') {
      return res.status(400).json({ message: 'Invalid download item data', errors: error.errors });
    }
    res.status(500).json({ message: 'Error creating download item' });
  }
};

export const updateDownloadItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = downloadItemSchema.parse(req.body);
    
    const item = await prisma.downloadItem.update({
      where: { id },
      data: validatedData
    });
    
    res.json(item);
  } catch (error) {
    console.error('Error updating download item:', error);
    if (error.name === 'ZodError') {
      return res.status(400).json({ message: 'Invalid download item data', errors: error.errors });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Download item not found' });
    }
    res.status(500).json({ message: 'Error updating download item' });
  }
};

export const deleteDownloadItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await prisma.downloadItem.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting download item:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Download item not found' });
    }
    res.status(500).json({ message: 'Error deleting download item' });
  }
}; 