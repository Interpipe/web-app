import { Download, FileText, FileCheck } from 'lucide-react';

const downloads = [
  {
    category: 'Product Specifications',
    items: [
      {
        title: 'PVC Irrigation Pipes Technical Specs',
        description: 'Detailed specifications for our PVC irrigation pipe range',
        fileSize: '2.4 MB',
        type: 'PDF',
        url: '/downloads/pvc-pipes-specs.pdf',
      },
      {
        title: 'Drip Irrigation System Manual',
        description: 'Installation and maintenance guide for drip irrigation systems',
        fileSize: '1.8 MB',
        type: 'PDF',
        url: '/downloads/drip-irrigation-manual.pdf',
      },
      {
        title: 'Fittings Catalog',
        description: 'Complete catalog of available fittings and connectors',
        fileSize: '3.2 MB',
        type: 'PDF',
        url: '/downloads/fittings-catalog.pdf',
      },
    ],
  },
  {
    category: 'Certifications & Standards',
    items: [
      {
        title: 'ISO 9001:2015 Certification',
        description: 'Quality management system certification',
        fileSize: '1.2 MB',
        type: 'PDF',
        url: '/downloads/iso-certification.pdf',
      },
      {
        title: 'Product Safety Standards',
        description: 'Compliance documentation for safety standards',
        fileSize: '980 KB',
        type: 'PDF',
        url: '/downloads/safety-standards.pdf',
      },
    ],
  },
  {
    category: 'Installation Guides',
    items: [
      {
        title: 'Basic Installation Guide',
        description: 'Step-by-step guide for basic pipe installation',
        fileSize: '1.5 MB',
        type: 'PDF',
        url: '/downloads/installation-guide.pdf',
      },
      {
        title: 'Maintenance Manual',
        description: 'Comprehensive maintenance procedures and schedules',
        fileSize: '2.1 MB',
        type: 'PDF',
        url: '/downloads/maintenance-manual.pdf',
      },
    ],
  },
];

const Downloads = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Downloads</h1>
        
        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search downloads..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
              <FileText className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
        </div>

        {/* Downloads Grid */}
        <div className="space-y-12">
          {downloads.map((category) => (
            <div key={category.category}>
              <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <div
                    key={item.title}
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
  );
};

export default Downloads; 