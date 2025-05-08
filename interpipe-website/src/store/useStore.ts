import { create } from 'zustand';
import { partners, features, stats, featuredProducts, products, downloads, galleryData } from '../services/mockData';

interface StoreState {
  // Data
  partners: typeof partners;
  features: typeof features;
  stats: typeof stats;
  featuredProducts: typeof featuredProducts;
  products: typeof products;
  downloads: typeof downloads;
  galleryData: typeof galleryData;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchData: () => Promise<void>;
}

export const useStore = create<StoreState>((set) => ({
  // Initial state
  partners: [],
  features: [],
  stats: [],
  featuredProducts: [],
  products: [],
  downloads: [],
  galleryData: galleryData,
  isLoading: false,
  error: null,

  // Actions
  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({
        partners,
        features,
        stats,
        featuredProducts,
        products,
        downloads,
        galleryData,
        isLoading: false,
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred', 
        isLoading: false 
      });
    }
  },
})); 