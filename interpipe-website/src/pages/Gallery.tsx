import { useState } from 'react';
import Hero from '../components/Hero';

// Removed old image imports
import heroImage from '../assets/Home/65d56d8922e5ce44d0d07309ab1899ae.jpg';

// Define product categories and their images
const productCategories = {
  'Borehole Casings': [
    'Borehole Casings Edit 1.jpg',
    'BOrehole Casings.png',
    'PVC.jpg',
    'cassings 3.jpg',
    'CASINGS 2.jpg',
    'CASINGS.jpg',
  ],
  'Poly Pipes': [
    'polyy 1.jpg',
    'polyy.jpg',
    'Untitled design (2).png',
    'POly edited 1.png',
    'poly.png',
  ],
  Conduits: [
    'Copy of Untitled design (3).jpg',
    'Copy of Untitled design.png',
    'Untitled design (3).jpg',
    'Untitled design.png',
  ],
  Sewer: [
    'IMG-20250402-WA0012.jpg',
    'IMG-20250402-WA0009.jpg',
    'IMG-20250227-WA0010.jpg',
    'IMG-20250227-WA0011.jpg',
    'sewer-pipes.jpg',
  ],
  PVC: ['65d56d8922e5ce44d0d07309ab1899ae.jpg', 'hh.jpg'],
} as const; // Add 'as const' for stricter typing of keys

// Removed old galleryItems array

type ProductCategory = keyof typeof productCategories;

const categories = Object.keys(productCategories) as ProductCategory[];

const Gallery = () => {
  // Explicitly type the state using ProductCategory and assert initial value is not null/undefined
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(categories[0]!);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Store full image path

  // Get image filenames for the selected category (index access is now safe)
  const filteredItems = productCategories[selectedCategory] ?? [];

  // Use Vite's new URL pattern for dynamic asset handling
  const getImagePath = (category: ProductCategory, filename: string) => {
    const imagePath = `../assets/Products/${category}/${filename}`;
    return new URL(imagePath, import.meta.url).href;
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
                  {category}
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