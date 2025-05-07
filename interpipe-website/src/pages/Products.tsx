import { Download } from 'lucide-react';
import Hero from '../components/Hero';
// Import actual images
import pvcImage from '../assets/Products/PVC/pvc-1.jpg';
import polyImage from '../assets/Products/PolyPipes/Poly-pipes-2.png';
import sewerImage from '../assets/Products/Sewer/sewer-pipes-1.jpg';
import boreholeImage from '../assets/Products/BoreholeCasings/Borehole-Casings-1.jpg';
import conduitImage from '../assets/Products/Conduits/Conduits-1.jpg';
import productsHeroImage from '../assets/Products/BoreholeCasings/Borehole-Casings-1.jpg';

// Import PDF specifications
import productListPdf from '../assets/Downloads/Interpipe Product List.pdf';
import companyProfilePdf from '../assets/Downloads/InterPipe Company Profile.pdf.pdf';

const products = [
  {
    id: 'pvc-pipes',
    name: 'PVC Pressure Pipes',
    description: 'High-quality PVC pipes manufactured for water supply, irrigation, and industrial applications. Our PVC pipes are durable, easy to install, and resistant to corrosion.',
    features: [
      'UV resistant and long-lasting',
      'Corrosion and chemical resistant',
      'Smooth inner surface for optimal flow',
      'Easy installation and maintenance',
      'Cost-effective solution'
    ],
    sizes: ['25mm to 315mm'],
    image: pvcImage,
    specPdf: productListPdf,
    pdfName: 'Interpipe Product List'
  },
  {
    id: 'poly-pipes',
    name: 'HDPE Poly Pipes',
    description: 'Durable polyethylene pipes for specialized applications. Our HDPE pipes are flexible, lightweight, and ideal for water supply, irrigation, and industrial systems.',
    features: [
      'Flexible and lightweight',
      'Excellent impact resistance',
      'Long service life',
      'Chemical and corrosion resistant',
      'Suitable for trenchless installation'
    ],
    sizes: ['25mm to 75mm'],
    image: polyImage,
    specPdf: productListPdf,
    pdfName: 'Interpipe Product List'
  },
  {
    id: 'sewer-pipes',
    name: 'Sewer & Drainage Pipes',
    description: 'Reliable PVC solutions for waste water management, sewerage, and drainage systems. Our sewer pipes are designed for efficient waste transport and long-term durability.',
    features: [
      'High stiffness for ground load support',
      'Non-corrosive material',
      'Smooth interior for optimal flow',
      'Simple installation with push-fit connections',
      'Long service life'
    ],
    sizes: ['50mm to 315mm'],
    image: sewerImage,
    specPdf: productListPdf,
    pdfName: 'Interpipe Product List'
  },
  {
    id: 'casings',
    name: 'Borehole Casings',
    description: 'Quality PVC casings for water well and borehole applications. Our borehole casings provide reliable protection for wells and allow efficient water extraction.',
    features: [
      'High impact resistance',
      'Corrosion resistant',
      'Smooth inner and outer surface',
      'Available with threaded connections',
      'UV stabilized material'
    ],
    sizes: ['110mm to 180mm'],
    image: boreholeImage,
    specPdf: productListPdf,
    pdfName: 'Interpipe Product List'
  },
  {
    id: 'conduits',
    name: 'Electrical Conduits',
    description: 'Safe and durable conduit systems for electrical installations. Our electrical conduits provide secure pathways for wiring and cables in various environments.',
    features: [
      'Flame retardant properties',
      'High impact resistance',
      'UV stabilized for outdoor use',
      'Smooth interior for easy wire pulling',
      'Complete range of fittings available'
    ],
    sizes: ['19mm to 25mm'],
    image: conduitImage,
    specPdf: productListPdf,
    pdfName: 'Interpipe Product List'
  }
];

const Products = () => {
  return (
    <div>
      <Hero 
        title="Our Products"
        subtitle="Comprehensive range of quality pipe solutions for your needs"
        image={productsHeroImage}
      />
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Our Products</h1>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {products.map((product) => (
              <div key={product.id} id={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="object-cover w-full h-64"
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
                      href={product.specPdf}
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
                      download={product.pdfName}
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
                  and provide reliable performance in various conditions. We maintain strict quality control
                  throughout the manufacturing process.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Technical Support</h3>
                <p className="text-gray-600">
                  Our team of experts is always ready to provide technical assistance and guidance for
                  product selection and installation. We offer comprehensive support to ensure optimal
                  performance of our products.
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