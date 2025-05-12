import api from './api';

// Types for API responses
export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export interface Feature {
  id: string;
  icon?: string;
  title: string;
  description: string;
}

export interface Stat {
  id: string;
  number: string;
  label: string;
  icon?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  features?: string[];
  sizes?: string[];
  image: string;
  specPdf?: string;
  pdfName?: string;
}

export interface FeaturedProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  description: string;
  fileSize: string;
  type: string;
  url: string;
}

export interface DownloadCategory {
  id: string;
  category: string;
  categoryName?: string;
  items: DownloadItem[];
}

export interface FlatDownloadItem {
  id: string;
  title: string;
  description: string;
  fileSize: string;
  fileType: string;
  fileUrl: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryData {
  categories: Record<string, string[]>;
  displayNames: Record<string, string>;
}

export interface FlatGalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

// API services
export const fetchPartners = async (): Promise<Partner[]> => {
  const response = await api.get('/api/partners');
  return response.data;
};

export const fetchFeatures = async (): Promise<Feature[]> => {
  const response = await api.get('/api/features');
  return response.data;
};

export const fetchStats = async (): Promise<Stat[]> => {
  const response = await api.get('/api/stats');
  return response.data;
};

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get('/api/products');
  return response.data;
};

export const fetchFeaturedProducts = async (): Promise<FeaturedProduct[]> => {
  // Use regular products endpoint and mark some as featured in the client
  const response = await api.get('/api/products');
  const products: Product[] = response.data;
  
  // Transform products to featured products
  return products.slice(0, 5).map((product: Product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    image: product.image,
    link: `/products#${product.id}`
  }));
};

export const fetchDownloads = async (): Promise<FlatDownloadItem[]> => {
  const response = await api.get('/api/downloads');
  return response.data;
};

export const fetchGalleryData = async (): Promise<FlatGalleryItem[]> => {
  const response = await api.get('/api/gallery');
  return response.data;
};

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await api.get('/api/categories');
  return response.data;
};

export const submitContactForm = async (formData: Record<string, unknown>): Promise<{ success: boolean; message: string }> => {
  // If api.post succeeds (2xx status), it won't throw an error.
  // Errors (non-2xx) will be thrown by axios and caught by the caller.
  await api.post('/api/contact', formData);
  
  // Return the standardized success response for the frontend.
  return { success: true, message: "Message sent successfully." };
}; 