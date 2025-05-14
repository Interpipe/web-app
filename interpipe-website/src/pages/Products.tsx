import { Download } from 'lucide-react';
import Hero from '../components/Hero';
import { useStore } from '../store/useStore';
import { useEffect } from 'react';
import { getApiProductImagePath, getApiDocumentPath } from '../services/assets';

const Products = () => {
  const { products, isLoading, error, fetchData } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Error: {error}</p>
          <button 
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Ensure products is an array
  const safeProducts = Array.isArray(products) ? products : [];
  
  // Get hero image using API path
  const heroImage = safeProducts[0]?.image ? getApiProductImagePath(safeProducts[0].image) : '';

  return (
    <div>
      <Hero 
        title="Our Products"
        subtitle="Discover our range of high-quality PVC pipes and fittings"
        image={heroImage}
      />
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Our Products</h1>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={getApiProductImagePath(product.image)} 
                    alt={product.name}
                    className="object-cover w-full h-64"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  
                  {product.features && Array.isArray(product.features) && product.features.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Features</h3>
                      <ul className="list-disc list-inside text-gray-600">
                        {product.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">Available Sizes</h3>
                      <p className="text-gray-600">{product.sizes.join(', ')}</p>
                    </div>
                  )}
                  
                  {product.specPdf && (
                    <a
                      href={getApiDocumentPath(product.specPdf)}
                      className="inline-flex items-center text-sky-500 hover:text-sky-600"
                      download={product.pdfName ?? 'product-specifications.pdf'}
                    >
                      <Download className="mr-2" size={20} />
                      Download Specifications
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose Us Section */}
          <div className="mt-16 bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Why Choose Our Products?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Quality Assurance</h3>
                <p className="text-gray-600">
                  All our products undergo rigorous quality control processes to ensure they meet
                  international standards and your specific requirements.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Technical Support</h3>
                <p className="text-gray-600">
                  Our team of experts is available to provide technical guidance and support for
                  all your product-related queries and requirements.
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