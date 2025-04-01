import { useState } from 'react';
import { Image, Filter } from 'lucide-react';
import Hero from '../components/Hero';

const galleryItems = [
  {
    id: 1,
    title: 'Agricultural Irrigation System',
    category: 'Agriculture',
    image: '/images/gallery/agriculture.jpg',
    description: 'Large-scale irrigation system installation for a commercial farm',
  },
  {
    id: 2,
    title: 'Golf Course Watering System',
    category: 'Sports',
    image: '/images/gallery/golf-course.jpg',
    description: 'Custom irrigation solution for a championship golf course',
  },
  {
    id: 3,
    title: 'Landscape Irrigation',
    category: 'Landscaping',
    image: '/images/gallery/landscape.jpg',
    description: 'Smart irrigation system for a residential landscape',
  },
  {
    id: 4,
    title: 'Greenhouse Installation',
    category: 'Agriculture',
    image: '/images/gallery/greenhouse.jpg',
    description: 'Precision drip irrigation in a modern greenhouse',
  },
  {
    id: 5,
    title: 'Sports Field Irrigation',
    category: 'Sports',
    image: '/images/gallery/sports-field.jpg',
    description: 'Professional sports field irrigation system',
  },
  {
    id: 6,
    title: 'Commercial Landscape',
    category: 'Landscaping',
    image: '/images/gallery/commercial.jpg',
    description: 'Large-scale commercial property irrigation',
  },
];

const categories = ['All', 'Agriculture', 'Sports', 'Landscaping'];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div>
      <Hero 
        title="Project Gallery"
        subtitle="Explore our successful irrigation installations across different sectors"
        image="/images/hero/gallery-hero.jpg"
      />
      <div className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg border border-gray-200 p-1">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedImage(item.id)}
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  {/* Replace with actual image */}
                  <div className="w-full h-48 bg-sky-100 flex items-center justify-center">
                    <Image className="text-sky-500" size={40} />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Filter className="mr-1" size={16} />
                    <span>{item.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image Modal */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg max-w-4xl w-full mx-4">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">
                      {galleryItems.find(item => item.id === selectedImage)?.title}
                    </h3>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-4">
                    {/* Replace with actual image */}
                    <div className="w-full h-64 bg-sky-100 flex items-center justify-center">
                      <Image className="text-sky-500" size={60} />
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {galleryItems.find(item => item.id === selectedImage)?.description}
                  </p>
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