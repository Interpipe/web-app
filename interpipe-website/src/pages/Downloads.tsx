import { Download, FileCheck } from 'lucide-react';
import Hero from '../components/Hero';
import pvcPipesImage from '../assets/Home/PVC PIpes.png';

// Import PDF files
import priceListPdf from '../assets/Downloads/Inter Pipe Price List 02.12.2024.pdf';
import companyProfilePdf from '../assets/Downloads/InterPipe Company Profile.pdf.pdf';
import pvcUStandardsPdf from '../assets/Downloads/STANDARDS FOR PVC-U Pipes .pdf';
import pvcMStandardsPdf from '../assets/Downloads/STANDARDS FOR PVC-M Pipes.pdf';
import electricalConduitsPdf from '../assets/Downloads/Standards Value for Electrical Conduits.pdf';
import valuePEPipesPdf from '../assets/Downloads/Standards for Value PE Pipes.pdf';
import pePipesPdf from '../assets/Downloads/STANDARDS FOR PE Pipes .pdf';
import sdrSewerPipesPdf from '../assets/Downloads/STANDARDS FOR SDR (Standard Dimensional Ratio) Sewer Drain Pipes .pdf';

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
        id: 'price-list',
        title: 'Inter Pipe Price List (Dec 2024)',
        description: 'Current price list for all our products',
        fileSize: '189 KB',
        type: 'PDF',
        url: priceListPdf,
      }
    ],
  },
  {
    id: 'standards',
    category: 'Product Standards & Specifications',
    items: [
      {
        id: 'pvc-u-standards',
        title: 'Standards for PVC-U Pipes',
        description: 'Technical standards and specifications for PVC-U pipes',
        fileSize: '105 KB',
        type: 'PDF',
        url: pvcUStandardsPdf,
      },
      {
        id: 'pvc-m-standards',
        title: 'Standards for PVC-M Pipes',
        description: 'Technical standards and specifications for PVC-M pipes',
        fileSize: '108 KB',
        type: 'PDF',
        url: pvcMStandardsPdf,
      },
      {
        id: 'pe-standards',
        title: 'Standards for PE Pipes',
        description: 'Technical standards and specifications for Polyethylene pipes',
        fileSize: '90 KB',
        type: 'PDF',
        url: pePipesPdf,
      },
      {
        id: 'value-pe-standards',
        title: 'Standards for Value PE Pipes',
        description: 'Technical standards and specifications for Value PE pipes',
        fileSize: '84 KB',
        type: 'PDF',
        url: valuePEPipesPdf,
      },
      {
        id: 'sdr-sewer-standards',
        title: 'Standards for SDR Sewer Drain Pipes',
        description: 'Technical standards for Standard Dimensional Ratio sewer and drain pipes',
        fileSize: '81 KB',
        type: 'PDF',
        url: sdrSewerPipesPdf,
      },
      {
        id: 'electrical-conduits-standards',
        title: 'Standards Value for Electrical Conduits',
        description: 'Technical standards and specifications for electrical conduit pipes',
        fileSize: '64 KB',
        type: 'PDF',
        url: electricalConduitsPdf,
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