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

// Helper to ensure response is array
const ensureArray = <T>(data: any): T[] => {
  if (!data) return [];
  return Array.isArray(data) ? data : [];
};

// API services
export const fetchPartners = async (): Promise<Partner[]> => {
  try {
    const response = await api.get('/api/partners');
    return ensureArray<Partner>(response.data);
  } catch (error) {
    console.error('Error fetching partners:', error);
    return [];
  }
};

export const fetchFeatures = async (): Promise<Feature[]> => {
  try {
    const response = await api.get('/api/features');
    return ensureArray<Feature>(response.data);
  } catch (error) {
    console.error('Error fetching features:', error);
    return [];
  }
};

export const fetchStats = async (): Promise<Stat[]> => {
  try {
    const response = await api.get('/api/stats');
    return ensureArray<Stat>(response.data);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return [];
  }
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/api/products');
    return ensureArray<Product>(response.data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchFeaturedProducts = async (): Promise<FeaturedProduct[]> => {
  try {
    // Use regular products endpoint and mark some as featured in the client
    const response = await api.get('/api/products');
    const products = ensureArray<Product>(response.data);
    
    // Transform products to featured products
    return products.slice(0, 5).map((product: Product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      link: `/products#${product.id}`
    }));
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
};

export const fetchDownloads = async (): Promise<FlatDownloadItem[]> => {
  try {
    const response = await api.get('/api/downloads');
    return ensureArray<FlatDownloadItem>(response.data);
  } catch (error) {
    console.error('Error fetching downloads:', error);
    return [];
  }
};

export const fetchGalleryData = async (): Promise<FlatGalleryItem[]> => {
  try {
    const response = await api.get('/api/gallery');
    return ensureArray<FlatGalleryItem>(response.data);
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    return [];
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get('/api/categories');
    return ensureArray<Category>(response.data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const submitContactForm = async (formData: Record<string, unknown>): Promise<{ success: boolean; message: string }> => {
  try {
    // If api.post succeeds (2xx status), it won't throw an error.
    // Errors (non-2xx) will be thrown by axios and caught by the caller.
    await api.post('/api/contact', formData);
    
    // Return the standardized success response for the frontend.
    return { success: true, message: "Message sent successfully." };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, message: "Failed to send message. Please try again." };
  }
}; 