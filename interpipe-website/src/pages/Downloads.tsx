import { Download, FileCheck } from 'lucide-react';
import Hero from '../components/Hero';
import pvcPipesImage from '../assets/Home/PVC PIpes.png';

// Import PDF files
import productListPdf from '../assets/Downloads/Interpipe Product List.pdf';
import companyProfilePdf from '../assets/Downloads/InterPipe Company Profile.pdf.pdf';

const downloads = [
  {
    id: 'company-docs',
    category: 'Company Documents',
    items: [
      {
        id: 'company-profile',
        title: 'InterPipe Company Profile',
        description: 'Comprehensive overview of our company, products and services',
        fileSize: '2.5 MB',
        type: 'PDF',
        url: companyProfilePdf,
      },
      {
        id: 'product-list',
        title: 'InterPipe Product List',
        description: 'Complete list of our products and specifications',
        fileSize: '106 KB',
        type: 'PDF',
        url: productListPdf,
      }
    ],
  }
];

const Downloads = () => {
  return (
    <div>
      <Hero 
        title="Downloads"
        subtitle="Access our product specifications, standards, and documentation"
        image={pvcPipesImage}
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