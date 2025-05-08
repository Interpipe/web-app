import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  features: z.array(z.string()),
  sizes: z.array(z.string()),
  image: z.string().url(),
  specPdf: z.string().url(),
  pdfName: z.string(),
  category: z.string(),
  isFeatured: z.boolean().optional()
});

export const galleryItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().url(),
  category: z.string()
});

export const downloadItemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  fileUrl: z.string().url('Invalid file URL'),
  fileSize: z.string().min(1, 'File size is required'),
  fileType: z.string().min(1, 'File type is required'),
  category: z.string().min(1, 'Category is required')
});

export const contactFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
  company: z.string().optional(),
  phone: z.string().optional()
});

export const contactStatusSchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'RESPONDED', 'CLOSED'])
});

export const partnerSchema = z.object({
  name: z.string().min(1),
  logo: z.string().url(),
  order: z.number().int().min(0)
});

export const featureSchema = z.object({
  icon: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
  order: z.number().int().min(0)
});

export const statSchema = z.object({
  number: z.string(),
  label: z.string().min(1),
  icon: z.string(),
  order: z.number().int().min(0)
}); 