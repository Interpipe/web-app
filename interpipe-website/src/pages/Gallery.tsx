import { useState } from 'react';
import { Image, Filter } from 'lucide-react';
import Hero from '../components/Hero';

const galleryItems = [
  {
    id: 1,
    title: 'PVC Irrigation System',
    category: 'Agriculture',
    image: '/src/assets/Products/PVC/Pvc edited 5.jpg',
    description: 'High-quality PVC pipes for irrigation systems',
  },
  {
    id: 2,
    title: 'HDPE Pipe Installation',
    category: 'Industrial',
    image: '/src/assets/Products/POLY PIPES/HDPE Re edited.jpg',
    description: 'Durable HDPE pipes for industrial applications',
  },
  {
    id: 3,
    title: 'Sewer Pipe Systems',
    category: 'Infrastructure',
    image: '/src/assets/Products/SEWER/Sewer brown (1).png',
    description: 'Reliable sewer pipe solutions',
  },
  {
    id: 4,
    title: 'Borehole Casings',
    category: 'Water Systems',
    image: '/src/assets/Products/Borehole Casings/CASINGS.jpg',
    description: 'Professional borehole casing installation',
  },
  {
    id: 5,
    title: 'Blue PVC Pipes',
    category: 'Agriculture',
    image: '/src/assets/Home/blue.jpg',
    description: 'Blue PVC pipes for agricultural applications',
  },
  {
    id: 6,
    title: 'Irrigation System Components',
    category: 'Infrastructure',
    image: '/src/assets/Home/18141aef4ce07193b2ce5f2fb7429047.jpg',
    description: 'Complete irrigation system components',
  },
];

const categories = ['All', 'Agriculture', 'Industrial', 'Infrastructure', 'Water Systems'];

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
        image="/src/assets/Home/65d56d8922e5ce44d0d07309ab1899ae.jpg"
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
                  {/* Display actual image */}
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-48"
                  />
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
                    {/* Display actual image */}
                    <img 
                      src={galleryItems.find(item => item.id === selectedImage)?.image}
                      alt={galleryItems.find(item => item.id === selectedImage)?.title}
                      className="object-cover w-full h-full rounded-lg"
                    />
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