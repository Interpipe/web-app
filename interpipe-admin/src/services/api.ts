import axios from 'axios';
import { getStoredToken } from './auth';
import type { Product, GalleryItem, DownloadItem, ContactSubmission, Partner, Feature, Stat, Category } from '../types';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}${import.meta.env.VITE_API_BASE_PATH ?? '/api'}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Don't redirect if we're already on the login page or if it's an auth endpoint
    const isAuthEndpoint = error.config?.url?.includes('/auth/');
    const isLoginPage = window.location.pathname === '/login';
    
    if (error.response?.status === 401 && !isAuthEndpoint && !isLoginPage) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Categories
export const getCategories = () => api.get<Category[]>('/categories').then(res => res.data);
export const getCategory = (id: string) => api.get<Category>(`/categories/${id}`).then(res => res.data);
export const createCategory = (data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => 
  api.post<Category>('/categories', data).then(res => res.data);
export const updateCategory = (id: string, data: Partial<Category>) => 
  api.put<Category>(`/categories/${id}`, data).then(res => res.data);
export const deleteCategory = (id: string) => 
  api.delete(`/categories/${id}`).then(res => res.data);

// Products
export const getProducts = () => api.get<Product[]>('/products').then(res => res.data);
export const getProduct = (id: string) => api.get<Product>(`/products/${id}`).then(res => res.data);
export const createProduct = (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => 
  api.post<Product>('/products', data).then(res => res.data);
export const updateProduct = (id: string, data: Partial<Product>) => 
  api.put<Product>(`/products/${id}`, data).then(res => res.data);
export const deleteProduct = (id: string) => 
  api.delete(`/products/${id}`).then(res => res.data);

// Gallery
export const getGalleryItems = () => api.get<GalleryItem[]>('/gallery').then(res => res.data);
export const getGalleryItem = (id: string) => api.get<GalleryItem>(`/gallery/${id}`).then(res => res.data);
export const createGalleryItem = (data: Omit<GalleryItem, 'id' | 'createdAt' | 'updatedAt'>) => 
  api.post<GalleryItem>('/gallery', data).then(res => res.data);
export const updateGalleryItem = (id: string, data: Partial<GalleryItem>) => 
  api.put<GalleryItem>(`/gallery/${id}`, data).then(res => res.data);
export const deleteGalleryItem = (id: string) => 
  api.delete(`/gallery/${id}`).then(res => res.data);

// Downloads
export const getDownloadItems = () => api.get<DownloadItem[]>('/downloads').then(res => res.data);
export const getDownloadItem = (id: string) => api.get<DownloadItem>(`/downloads/${id}`).then(res => res.data);
export const createDownloadItem = (data: Omit<DownloadItem, 'id' | 'createdAt' | 'updatedAt'>) => 
  api.post<DownloadItem>('/downloads', data).then(res => res.data);
export const updateDownloadItem = (id: string, data: Partial<DownloadItem>) => 
  api.put<DownloadItem>(`/downloads/${id}`, data).then(res => res.data);
export const deleteDownloadItem = (id: string) => 
  api.delete(`/downloads/${id}`).then(res => res.data);

// Contact Submissions
export const getContactSubmissions = () => api.get<ContactSubmission[]>('/contact').then(res => res.data);
export const getContactSubmission = (id: string) => api.get<ContactSubmission>(`/contact/${id}`).then(res => res.data);
export const deleteContactSubmission = (id: string) => 
  api.delete(`/contact/${id}`).then(res => res.data);
export const updateContactStatus = (id: string, status: string) =>
  api.patch<ContactSubmission>(`/contact/${id}/status`, { status }).then(res => res.data);

// Partners
export const getPartners = () => api.get<Partner[]>('/partners').then(res => res.data);
export const getPartner = (id: string) => api.get<Partner>(`/partners/${id}`).then(res => res.data);
export const createPartner = (data: Omit<Partner, 'id'>) => 
  api.post<Partner>('/partners', data).then(res => res.data);
export const updatePartner = (id: string, data: Partial<Partner>) => 
  api.put<Partner>(`/partners/${id}`, data).then(res => res.data);
export const deletePartner = (id: string) => 
  api.delete(`/partners/${id}`).then(res => res.data);

// Features
export const getFeatures = () => api.get<Feature[]>('/features').then(res => res.data);
export const getFeature = (id: string) => api.get<Feature>(`/features/${id}`).then(res => res.data);
export const createFeature = (data: Omit<Feature, 'id'>) => 
  api.post<Feature>('/features', data).then(res => res.data);
export const updateFeature = (id: string, data: Partial<Feature>) => 
  api.put<Feature>(`/features/${id}`, data).then(res => res.data);
export const deleteFeature = (id: string) => 
  api.delete(`/features/${id}`).then(res => res.data);

// Stats
export const getStats = () => api.get<Stat[]>('/stats').then(res => res.data);
export const getStat = (id: string) => api.get<Stat>(`/stats/${id}`).then(res => res.data);
export const createStat = (data: Omit<Stat, 'id'>) => 
  api.post<Stat>('/stats', data).then(res => res.data);
export const updateStat = (id: string, data: Partial<Stat>) => 
  api.put<Stat>(`/stats/${id}`, data).then(res => res.data);
export const deleteStat = (id: string) => 
  api.delete(`/stats/${id}`).then(res => res.data);