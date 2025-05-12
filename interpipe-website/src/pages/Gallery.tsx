import { useState, useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import Hero from '../components/Hero';
import { useStore } from '../store/useStore';
import { getGalleryImagePath, getApiGalleryImagePath } from '../services/assets';

export default function Gallery() {
  const { groupedGalleryData, categories, isLoading, error, fetchData } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Log the state received from the store - REMOVE LATER
  // console.log('Gallery Component - groupedGalleryData:', groupedGalleryData);
  // console.log('Gallery Component - categories:', categories);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter categories to only include those with images
  const visibleCategories = useMemo(() => {
    const categoryImageMap = groupedGalleryData?.categories;
    if (!categories || !categoryImageMap) {
      return [];
    }
    
    return categories.filter(category => {
      if (!category || !category.id) {
        return false; // Skip if category or its id is invalid
      }
      const images = categoryImageMap[category.id];
      return images && images.length > 0;
    });
  }, [categories, groupedGalleryData]);

  // Set initial selected category once visible categories are determined
  useEffect(() => {
    if (visibleCategories.length > 0 && !selectedCategory) {
      const firstVisibleCategory = visibleCategories[0];
      if (firstVisibleCategory && firstVisibleCategory.id) {
        setSelectedCategory(firstVisibleCategory.id);
      }
    } else if (visibleCategories.length === 0) {
      // If no categories have images, clear selection
      setSelectedCategory('');
    }
    // Only re-run if visibleCategories changes OR selectedCategory is still initial ('')
  }, [visibleCategories, selectedCategory]);

  // Helper to get the correct image path, preferring API paths when available
  // const getImagePath = (category: string, image: string) => {
  //   // Use the image URL/filename directly as stored in groupedGalleryData
  //   return getApiGalleryImagePath(category, image); // Assuming this helper still works with category ID/name and filename
  //   // OR if the stored URL is already absolute:
  //   // return image; 
  // };

  // Find first available image for hero
  const heroImage = useMemo(() => {
    // Use groupedGalleryData
    if (!groupedGalleryData || !groupedGalleryData.categories) return '';
    
    const categoryKeys = Object.keys(groupedGalleryData.categories);
    if (categoryKeys.length === 0) return '';
    
    // Find the first category key that actually has images
    const firstCategoryWithImages = categoryKeys.find(key => 
      groupedGalleryData.categories[key] && groupedGalleryData.categories[key].length > 0
    );
    
    if (!firstCategoryWithImages) return ''; // No category has images
    
    const images = groupedGalleryData.categories[firstCategoryWithImages];
    
    if (!images || images.length === 0) return ''; // Should not happen due to find condition
    const firstImage = images[0];
    if (!firstImage) return '';
    
    // Return the image URL directly
    return firstImage; 
  }, [groupedGalleryData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => fetchData()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Hero
        title="Gallery"
        subtitle="Explore our product gallery showcasing our range of high-quality pipes and fittings."
        image={heroImage}
      />

      {/* Category Selection - Uses VISIBLE categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {/* Map over visibleCategories */} 
          {visibleCategories.length > 0 ? visibleCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              aria-label={`View ${category.name} gallery`}
            >
              {category.name}
            </button>
          )) : (
            <div className="text-center py-4">
              {/* Update message based on whether categories loaded but were empty */} 
              {isLoading ? (
                 <p className="text-gray-600">Loading categories...</p> 
              ) : (
                 <p className="text-gray-600">No gallery categories with images available.</p>
              )}
            </div>
          )}
        </div>

        {/* Image Grid - Uses groupedGalleryData */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groupedGalleryData && groupedGalleryData.categories && selectedCategory && groupedGalleryData.categories[selectedCategory] ? 
            groupedGalleryData.categories[selectedCategory].map((imageUrl) => imageUrl && (
              <div
                key={imageUrl} 
                className="relative aspect-square cursor-pointer group"
                onClick={() => setSelectedImage(imageUrl)} 
              >
                <img
                  // Use the imageUrl directly from the store
                  src={imageUrl} 
                  alt={imageUrl} 
                  className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
                />
              </div>
            )) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-600">No images available for this category.</p>
              </div>
            )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            aria-label="Close image viewer"
          >
            <X size={24} />
          </button>
          <img
            // Use the selectedImage URL directly for the modal
            src={selectedImage} 
            alt={selectedImage}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </div>
  );
} 