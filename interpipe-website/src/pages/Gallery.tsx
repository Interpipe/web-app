import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Hero from '../components/Hero';
import { useStore } from '../store/useStore';
import { getGalleryImagePath } from '../services/assets';
import type { ProductCategory } from '../services/mockData';

export default function Gallery() {
  const { galleryData, isLoading, error, fetchData } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('BoreholeCasings');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        image={getGalleryImagePath('BoreholeCasings', 'Borehole-Casings-1.jpg')}
      />

      {/* Category Selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {Object.entries(galleryData.displayNames).map(([key, name]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key as ProductCategory)}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              aria-label={`View ${name} gallery`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryData.categories[selectedCategory].map((image) => (
            <div
              key={image}
              className="relative aspect-square cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={getGalleryImagePath(selectedCategory, image)}
                alt={image}
                className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
              />
            </div>
          ))}
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
            src={getGalleryImagePath(selectedCategory, selectedImage)}
            alt={selectedImage}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </div>
  );
} 