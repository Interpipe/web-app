import { create } from 'zustand';
import { 
  partners as mockPartners, 
  features as mockFeatures, 
  stats as mockStats, 
  featuredProducts as mockFeaturedProducts, 
  products as mockProducts, 
  // downloads as mockDownloads, // We'll derive this now
  // galleryData as mockGalleryData // We'll derive this now
} from '../services/mockData';
import { 
  fetchPartners, 
  fetchFeatures, 
  fetchStats, 
  fetchFeaturedProducts, 
  fetchProducts, 
  fetchDownloads, // Now fetches FlatDownloadItem[]
  fetchGalleryData, // Now fetches FlatGalleryItem[]
  fetchCategories,
  Partner,
  Feature,
  Stat,
  FeaturedProduct,
  Product,
  DownloadItem, // Keep this for the grouped structure
  DownloadCategory, // Keep this for the grouped structure
  GalleryData, // Keep this for the grouped structure
  Category,
  FlatDownloadItem, // Import new flat type
  FlatGalleryItem, // Import new flat type
} from '../services/apiServices';

// // Convert readonly mock gallery data to mutable format - No longer needed directly
// const convertedGalleryData: GalleryData = {
//   categories: Object.fromEntries(
//     Object.entries(mockGalleryData.categories).map(
//       ([key, value]) => [key, [...value]]
//     )
//   ),
//   displayNames: { ...mockGalleryData.displayNames }
// };

// Convert mock data to match API types
const transformedMockFeatures: Feature[] = mockFeatures.map(feature => ({
  ...feature,
  icon: feature.icon?.displayName ?? feature.icon?.name ?? ''
}));

const transformedMockStats: Stat[] = mockStats.map(stat => ({
  ...stat,
  icon: stat.icon?.displayName ?? stat.icon?.name ?? ''
}));

interface StoreState {
  // Data
  partners: Partner[];
  features: Feature[];
  stats: Stat[];
  featuredProducts: FeaturedProduct[];
  products: Product[];
  categories: Category[];
  
  // Store flat data fetched from API
  flatDownloads: FlatDownloadItem[]; 
  flatGalleryItems: FlatGalleryItem[];

  // Expose grouped data derived from flat data + categories
  groupedDownloads: DownloadCategory[];
  groupedGalleryData: GalleryData;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchData: () => Promise<void>;
}

// Helper to create default empty grouped data
const defaultGroupedDownloads: DownloadCategory[] = [];
const defaultGroupedGalleryData: GalleryData = { categories: {}, displayNames: {} };

export const useStore = create<StoreState>((set) => ({
  // Initial state
  partners: mockPartners as Partner[],
  features: transformedMockFeatures,
  stats: transformedMockStats,
  featuredProducts: mockFeaturedProducts as FeaturedProduct[],
  products: mockProducts as Product[],
  // downloads: mockDownloads as DownloadCategory[], // Use derived state
  // galleryData: convertedGalleryData, // Use derived state
  categories: [],
  flatDownloads: [], 
  flatGalleryItems: [],
  groupedDownloads: defaultGroupedDownloads,
  groupedGalleryData: defaultGroupedGalleryData,
  isLoading: false,
  error: null,

  // Actions
  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      // Run all API requests in parallel
      const [
        partnersData,
        featuresData,
        statsData,
        featuredProductsData,
        productsData,
        flatDownloadsData, // Fetches FlatDownloadItem[]
        flatGalleryData,   // Fetches FlatGalleryItem[]
        categoriesData,
      ] = await Promise.all([
        fetchPartners().catch(() => mockPartners as Partner[]),
        fetchFeatures().catch(() => transformedMockFeatures),
        fetchStats().catch(() => transformedMockStats),
        fetchFeaturedProducts().catch(() => mockFeaturedProducts as FeaturedProduct[]),
        fetchProducts().catch(() => mockProducts as Product[]),
        fetchDownloads().catch(() => []), // Fetch flat downloads
        fetchGalleryData().catch(() => []), // Fetch flat gallery items
        fetchCategories().catch(() => []),
      ]);

      // --- Client-side Grouping Logic ---
      const validCategories = categoriesData ?? [];
      const validFlatDownloads = flatDownloadsData ?? [];
      const validFlatGallery = flatGalleryData ?? [];

      // Create maps for efficient lookup
      const categoryMapById = validCategories.reduce((acc, cat) => {
        if (cat && cat.id) {
          acc[cat.id] = cat.name; // Map ID to Name
        }
        return acc;
      }, {} as Record<string, string>);
      
      const categoryMapByName = validCategories.reduce((acc, cat) => {
         if (cat && cat.name) {
           acc[cat.name] = cat.id; // Map Name to ID
         }
         return acc;
      }, {} as Record<string, string>);

      // Group Downloads using category NAME from flat data
      const groupedDownloadsMap: Record<string, DownloadCategory> = {};
      validFlatDownloads.forEach(item => {
        // Use item.category (name) to find the category ID
        if (!item || !item.category) return;
        const catId = categoryMapByName[item.category]; // Get ID from name map
        if (!catId) return; // Skip if category name doesn't match any known category ID
        const catName = item.category; // Keep the name from the item

        if (!groupedDownloadsMap[catId]) {
          groupedDownloadsMap[catId] = {
            id: catId,
            category: catName, // Use the name from the item
            categoryName: catName,
            items: [],
          };
        }
        groupedDownloadsMap[catId].items.push({
          id: item.id,
          title: item.title,
          description: item.description,
          fileSize: item.fileSize,
          type: item.fileType, // Use fileType from flat data
          url: item.fileUrl, // Use fileUrl from flat data
        });
      });
      const finalGroupedDownloads = Object.values(groupedDownloadsMap);

      // Group Gallery using category NAME from flat data
      const groupedGalleryCategories: Record<string, string[]> = {};
      validFlatGallery.forEach(item => {
         // Use item.category (name) to find the category ID
         if (!item || !item.category || !item.imageUrl) return;
         const catId = categoryMapByName[item.category]; // Get ID from name map
         if (!catId) return; // Skip if category name doesn't match any known category ID

         if (!groupedGalleryCategories[catId]) {
           groupedGalleryCategories[catId] = [];
         }
         // Store the full imageUrl
         groupedGalleryCategories[catId].push(item.imageUrl); 
      });
      const finalGroupedGalleryData: GalleryData = {
          categories: groupedGalleryCategories,
          displayNames: categoryMapById 
      };
      
      // --- End Grouping ---
      
      set({
        partners: partnersData ?? [],
        features: featuresData ?? [],
        stats: statsData ?? [],
        featuredProducts: featuredProductsData ?? [],
        products: productsData ?? [],
        categories: validCategories,
        flatDownloads: validFlatDownloads, 
        flatGalleryItems: validFlatGallery,
        groupedDownloads: finalGroupedDownloads.length > 0 ? finalGroupedDownloads : defaultGroupedDownloads, 
        groupedGalleryData: Object.keys(finalGroupedGalleryData.categories).length > 0 ? finalGroupedGalleryData : defaultGroupedGalleryData, 
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to fetch data:', error);
      // Fallback to empty/default structures on error
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred', 
        isLoading: false, 
        groupedDownloads: defaultGroupedDownloads, 
        groupedGalleryData: defaultGroupedGalleryData, 
        categories: [],
        flatDownloads: [],
        flatGalleryItems: []
      });
    }
  },
})); 