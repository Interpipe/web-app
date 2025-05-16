import { Request, Response } from 'express';
import prisma from '../lib/prisma.js';
import { contactFormSchema, contactStatusSchema } from '../validations/index.js';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const validatedData = contactFormSchema.parse(req.body);
    
    const submission = await prisma.contactSubmission.create({
      data: validatedData
    });
    
    res.status(201).json(submission);
  } catch (error) {
    console.error('Error submitting contact form:', error);
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Invalid contact form data', errors: error.errors });
    }
    res.status(500).json({ message: 'Error submitting contact form' });
  }
};

export const getContactSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({ message: 'Error fetching contact submissions' });
  }
};

export const getContactSubmissionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const submission = await prisma.contactSubmission.findUnique({
      where: { id }
    });
    
    if (!submission) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    
    res.json(submission);
  } catch (error) {
    console.error('Error fetching contact submission:', error);
    res.status(500).json({ message: 'Error fetching contact submission' });
  }
};

export const deleteContactSubmission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    await prisma.contactSubmission.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting contact submission:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    res.status(500).json({ message: 'Error deleting contact submission' });
  }
};

export const updateContactStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = contactStatusSchema.parse(req.body);
    
    const submission = await prisma.contactSubmission.update({
      where: { id },
      data: { status }
    });
    
    res.json(submission);
  } catch (error) {
    console.error('Error updating contact status:', error);
    if (error instanceof ZodError) {
      return res.status(400).json({ message: 'Invalid status data', errors: error.errors });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    res.status(500).json({ message: 'Error updating contact status' });
  }
};
