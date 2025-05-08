import { Download, FileCheck } from 'lucide-react';
import Hero from '../components/Hero';
import { useStore } from '../store/useStore';
import { useEffect } from 'react';

const Downloads = () => {
  const { downloads, isLoading, error, fetchData } = useStore();

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

  return (
    <div>
      <Hero 
        title="Downloads"
        subtitle="Access our product specifications, standards, and documentation"
        image={downloads[0]?.items[0]?.url}
      />
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Downloads</h1>
          
          {/* Downloads Grid */}
          <div className="space-y-12">
            {downloads.map((category) => (
              <div key={category.id}>
                <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <FileCheck className="mr-1" size={16} />
                            <span>{item.fileSize}</span>
                            <span className="mx-2">•</span>
                            <span>{item.type}</span>
                          </div>
                        </div>
                        <a
                          href={item.url}
                          className="inline-flex items-center text-sky-500 hover:text-sky-600"
                          download
                        >
                          <Download size={20} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="mt-16 bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Need Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Technical Support</h3>
                <p className="text-gray-600">
                  Our technical team is available to assist you with any questions about our products
                  and their specifications.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                <p className="text-gray-600">
                  Can't find what you're looking for? Contact our support team for assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Downloads; 