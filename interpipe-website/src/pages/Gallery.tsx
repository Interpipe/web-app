import { useState } from 'react';
import Hero from '../components/Hero';

// Import with the correct filename that exists in the assets directory
import heroImage from '../assets/Home/PVC PIpes.png';

// Define product categories and their images
const productCategories = {
  BoreholeCasings: [
    'Borehole-Casings-1.jpg',
    'Borehole-Casings-2.png',
    'Borehole-Casings-3.jpg',
    'Borehole-Casings-4.jpg',
    'Borehole-Casings-5.jpg',
    'Borehole-Casings-6.jpg',
  ],
  PolyPipes: [
    'Poly-pipes-1.png',
    'Poly-pipes-2.png',
    'Poly-pipes-3.jpg',
    'Poly-pipes-4.jpg',
    'Poly-pipes-5.png',
  ],
  Conduits: [
    'Conduits-1.jpg',
    'Conduits-2.png',
    'Conduits-3.jpg',
    'Conduits-4.png',
  ],
  Sewer: [
    'sewer-pipes-1.jpg',
    'sewer-pipes-2.jpg',
    'sewer-pipes-3.jpg',
    'sewer-pipes-4.jpg',
    'sewer-pipes-5.jpg',
  ],
  PVC: ['pvc-1.jpg', 'pvc-2.jpg'],
} as const; // Add 'as const' for stricter typing of keys

// Removed old galleryItems array

type ProductCategory = keyof typeof productCategories;

const categories = Object.keys(productCategories) as ProductCategory[];

// Mapping for display names
const displayNames: Record<ProductCategory, string> = {
  BoreholeCasings: 'Borehole Casings',
  PolyPipes: 'Poly Pipes',
  Conduits: 'Conduits',
  Sewer: 'Sewer',
  PVC: 'PVC',
};

const Gallery = () => {
  // Explicitly type the state using ProductCategory and assert initial value is not null/undefined
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(categories[0]!);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Store full image path

  // Get image filenames for the selected category (index access is now safe)
  const filteredItems = productCategories[selectedCategory] ?? [];

  // Pre-import specific directory images to ensure they're included in the build
  const boreholeImages = import.meta.glob('../assets/Products/BoreholeCasings/*', { eager: true, as: 'url' });
  const polyImages = import.meta.glob('../assets/Products/PolyPipes/*', { eager: true, as: 'url' });
  const conduitImages = import.meta.glob('../assets/Products/Conduits/*', { eager: true, as: 'url' });
  const sewerImages = import.meta.glob('../assets/Products/Sewer/*', { eager: true, as: 'url' });
  const pvcImages = import.meta.glob('../assets/Products/PVC/*', { eager: true, as: 'url' });
  
  // Map category to its image collection
  const categoryImageCollections = {
    BoreholeCasings: boreholeImages,
    PolyPipes: polyImages,
    Conduits: conduitImages,
    Sewer: sewerImages,
    PVC: pvcImages
  };
  
  const getImagePath = (category: ProductCategory, filename: string) => {
    try {
      // Get the appropriate image collection for this category
      const imageCollection = categoryImageCollections[category];
      const imagePath = `../assets/Products/${category}/${filename}`;
      
      // With as: 'url', the image is directly the string URL
      const asset = imageCollection[imagePath];
      
      if (asset) {
        return asset; // Now a direct URL string
      }
      
      // Fallback: Log an error and try URL approach (works in dev)
      console.warn(`Image not found in preloaded collection: ${imagePath}`);
      return new URL(imagePath, import.meta.url).href;
    } catch (error) {
      console.error(`Failed to load image: ${category}/${filename}`, error);
      // Return empty string or placeholder
      return '';
    }
  };

  return (
    <div>
      <Hero 
        title="Product Gallery" // Updated title
        subtitle="Explore images of our products across different categories" // Updated subtitle
        image={heroImage}
      />
      <div className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg border border-gray-200 p-1 flex-wrap justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-sky-500 text-white'
                      : 'text-gray-600 hover:text-sky-500'
                  }`}
                >
                  {displayNames[category]}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((filename: string) => {
              const imagePath = getImagePath(selectedCategory, filename);
              return (
                <div
                  key={imagePath} // Use imagePath as key
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
                  onClick={() => setSelectedImage(imagePath)} // Pass full path to modal
                >
                  <div className="w-80 h-64 bg-gray-200 relative overflow-hidden">
                    <img 
                      src={imagePath}
                      alt={`${selectedCategory} - ${filename}`}
                      className="object-cover w-full h-full absolute top-0 left-0 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Removed title, description, and category labels */}
                </div>
              );
            })}
          </div>

          {/* Image Modal */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50 p-4" onClick={() => setSelectedImage(null)}>
              {/* Added close on backdrop click */}
              <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] w-auto h-auto relative overflow-hidden" onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking inside modal */}
                {/* Close button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1.5 hover:bg-opacity-75 transition-colors z-10"
                  aria-label="Close image viewer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {/* Image container */}
                <div className="flex items-center justify-center h-full">
                    {/* Display actual image - Removed title and description */}
                    <img 
                      src={selectedImage}
                      alt="Enlarged product image"
                      className="object-contain max-w-full max-h-[85vh] rounded-lg"
                    />
                  </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery; 