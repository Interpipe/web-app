import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { downloadItemSchema } from '../validations';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export const getDownloads = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    
    const downloads = await prisma.downloadItem.findMany({
      where: category ? { category: category as string } : undefined,
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(downloads);
  } catch (error) {
    console.error('Error fetching downloads:', error);
    res.status(500).json({ message: 'Error fetching downloads' });
  }
};

export const getDownloadById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const download = await prisma.downloadItem.findUnique({
      where: { id }
    });
    
    if (!download) {
      return res.status(404).json({ message: 'Download item not found' });
    }
    
    res.json(download);
  } catch (error) {
    console.error('Error fetching download item:', error);
    res.status(500).json({ message: 'Error fetching download item' });
  }
};

export const createDownload = async (req: Request, res: Response) => {
  try {
    const validatedData = downloadItemSchema.parse(req.body);
    
    const download = await prisma.downloadItem.create({
      data: validatedData
    });
    
    res.status(201).json(download);
  } catch (error) {
    console.error('Error creating download item:', error);
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Invalid download item data', errors: error.errors });
    }
    res.status(500).json({ message: 'Error creating download item' });
  }
};

export const updateDownload = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = downloadItemSchema.parse(req.body);
    
    const download = await prisma.downloadItem.update({
      where: { id },
      data: validatedData
    });
    
    res.json(download);
  } catch (error) {
    console.error('Error updating download item:', error);
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Invalid download item data', errors: error.errors });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: 'Download item not found' });
    }
    res.status(500).json({ message: 'Error updating download item' });
  }
};

export const deleteDownload = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await prisma.downloadItem.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting download item:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: 'Download item not found' });
    }
    res.status(500).json({ message: 'Error deleting download item' });
  }
}; 