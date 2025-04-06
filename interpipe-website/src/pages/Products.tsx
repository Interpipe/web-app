import { Download } from 'lucide-react';
import Hero from '../components/Hero';
// Import actual images
import pvcImage from '../assets/Products/PVC/edited 1 pvc.jpg';
import polyImage from '../assets/Products/POLY PIPES/Untitled design (2).png';
import sewerImage from '../assets/Products/SEWER/Sewer brown 2 (1).png';
import productsHeroImage from '../assets/Home/IMG-20250224-WA0027.jpg';

const products = [
  {
    id: 1,
    name: 'PVC Irrigation Pipes',
    description: 'High-quality PVC pipes designed for efficient water distribution in agricultural and landscaping applications.',
    features: ['UV resistant', 'Corrosion free', 'Easy installation'],
    sizes: ['1/2" to 12"', 'Custom sizes available'],
    image: pvcImage,
  },
  {
    id: 2,
    name: 'Drip Irrigation Systems',
    description: 'Complete drip irrigation solutions for precise water delivery to plants and crops.',
    features: ['Water efficient', 'Pressure compensated', 'Anti-clogging'],
    sizes: ['Various configurations', 'Customizable'],
    image: polyImage,
  },
  {
    id: 3,
    name: 'Fittings & Connectors',
    description: 'Comprehensive range of fittings and connectors for seamless pipe connections.',
    features: ['Leak-proof', 'Durable', 'Easy to maintain'],
    sizes: ['Compatible with all pipe sizes', 'Standard and custom options'],
    image: sewerImage,
  },
];

const Products = () => {
  return (
    <div>
      <Hero 
        title="Our Products"
        subtitle="Discover our comprehensive range of irrigation solutions"
        image={productsHeroImage}
      />
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Our Products</h1>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  {/* Replace with actual image */}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="object-cover w-full h-48"
                  />
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Key Features:</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Available Sizes:</h3>
                    <p className="text-gray-600">{product.sizes.join(', ')}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <a
                      href={`/downloads/${product.id}`}
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
                    >
                      <Download className="mr-2" size={20} />
                      Download Specs
                    </a>
                    <a
                      href="/contact"
                      className="inline-block bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition-colors"
                    >
                      Contact Sales
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="mt-16 bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Why Choose Our Products?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Quality Assurance</h3>
                <p className="text-gray-600">
                  All our products undergo rigorous quality testing to ensure they meet international standards
                  and provide reliable performance in various conditions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Technical Support</h3>
                <p className="text-gray-600">
                  Our team of experts is always ready to provide technical assistance and guidance for
                  product selection and installation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products; 