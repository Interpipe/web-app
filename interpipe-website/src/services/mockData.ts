import { Droplet, Shield, Zap, Users, Award, Clock } from 'lucide-react';
import { assets } from './assets';

export const partners = [
  { id: 'jnm', name: 'J & M', logo: assets.partners.jnm },
  { id: 'mak_bokano', name: 'Mak Bokano', logo: assets.partners.makBokano },
  { id: 'prev', name: 'Prev', logo: assets.partners.prev },
  { id: 'prime_irrigation', name: 'Prime Irrigation', logo: assets.partners.primeIrrigation },
  { id: 'city_council', name: 'City Council', logo: assets.partners.cityCouncil },
  { id: 'icp', name: 'ICP', logo: assets.partners.icp },
  { id: 'mac_home', name: 'Mac Home', logo: assets.partners.macHome },
  { id: 'liqui', name: 'Liquitech', logo: assets.partners.liqui },
];

export const features = [
  {
    id: 'quality',
    icon: Droplet,
    title: "Superior Quality",
    description: "Our PVC pipes are manufactured using the highest quality materials and advanced technology, ensuring durability and long-lasting performance."
  },
  {
    id: 'reliability',
    icon: Shield,
    title: "Reliable Performance",
    description: "Built to withstand the toughest conditions, our PVC pipes deliver consistent performance year after year in various applications."
  },
  {
    id: 'efficiency',
    icon: Zap,
    title: "Energy Efficient",
    description: "Optimized design ensures maximum water flow with minimal energy consumption, making our PVC pipes an economical choice."
  }
];

export const stats = [
  { id: 'customers', number: "150+", label: "Happy Customers", icon: Users },
  { id: 'experience', number: "3+", label: "Years Experience", icon: Award },
  { id: 'worktime', number: "Open", label: "Mon-Fri: 0730-1630hrs\nSaturday: 0800-1400hrs", icon: Clock }
];

export const featuredProducts = [
  {
    id: 'pvc',
    name: "PVC Pressure Pipes",
    description: "High-quality PVC pipes for water distribution and irrigation systems",
    image: assets.products.pvc,
    link: "/products#pvc-pipes"
  },
  {
    id: 'hdpe',
    name: "HDPE Pipes",
    description: "Durable polyethylene pipes for specialized and demanding applications",
    image: assets.products.hdpe,
    link: "/products#poly-pipes"
  },
  {
    id: 'sewer',
    name: "Sewer & Drainage Pipes",
    description: "Reliable solutions for waste water management and drainage",
    image: assets.products.sewer,
    link: "/products#sewer-pipes"
  },
  {
    id: 'casings',
    name: "Borehole Casings",
    description: "Quality PVC casings for water well and borehole applications",
    image: assets.products.borehole,
    link: "/products#casings"
  },
  {
    id: 'conduits',
    name: "Electrical Conduits",
    description: "Safe and durable conduit systems for electrical installations",
    image: assets.products.conduit,
    link: "/products#conduits"
  }
];

export const products = [
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
    image: assets.products.pvc,
    specPdf: assets.documents.productList,
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
    image: assets.products.hdpe,
    specPdf: assets.documents.productList,
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
    image: assets.products.sewer,
    specPdf: assets.documents.productList,
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
    image: assets.products.borehole,
    specPdf: assets.documents.productList,
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
    image: assets.products.conduit,
    specPdf: assets.documents.productList,
    pdfName: 'Interpipe Product List'
  }
];

export const downloads = [
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
        url: assets.documents.companyProfile,
      },
      {
        id: 'product-list',
        title: 'InterPipe Product List',
        description: 'Complete list of our products and specifications',
        fileSize: '106 KB',
        type: 'PDF',
        url: assets.documents.productList,
      }
    ],
  }
];

export const galleryData = {
  categories: {
    BoreholeCasings: [
      'Borehole-Casings-1.jpg',
      'Borehole-Casings-2.png',
      'Borehole-Casings-3.jpg',
      'Borehole-Casings-4.jpg',
      'Borehole-Casings-5.jpg',
      'Borehole-Casings-6.jpg',
    ],
    PolyPipes: [
      'Poly-pipes-1.png',
      'Poly-pipes-2.png',
      'Poly-pipes-3.jpg',
      'Poly-pipes-4.jpg',
      'Poly-pipes-5.png',
    ],
    Conduits: [
      'Conduits-1.jpg',
      'Conduits-2.png',
      'Conduits-3.jpg',
      'Conduits-4.png',
    ],
    Sewer: [
      'sewer-pipes-1.jpg',
      'sewer-pipes-2.jpg',
      'sewer-pipes-3.jpg',
      'sewer-pipes-4.jpg',
      'sewer-pipes-5.jpg',
    ],
    PVC: ['pvc-1.jpg', 'pvc-2.jpg'],
  },
  displayNames: {
    BoreholeCasings: 'Borehole Casings',
    PolyPipes: 'Poly Pipes',
    Conduits: 'Conduits',
    Sewer: 'Sewer',
    PVC: 'PVC',
  },
} as const;

export type ProductCategory = keyof typeof galleryData.categories; 