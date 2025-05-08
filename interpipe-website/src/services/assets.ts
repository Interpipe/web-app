// Product Images
import pvcImage from '../assets/Products/PVC/pvc-1.jpg';
import hdpeImage from '../assets/Products/PolyPipes/Poly-pipes-2.png';
import boreholeImage from '../assets/Products/BoreholeCasings/Borehole-Casings-1.jpg';
import sewerImage from '../assets/Products/Sewer/sewer-pipes-1.jpg';
import conduitImage from '../assets/Products/Conduits/Conduits-1.jpg';

// Partner Logos
import jnmLogo from '../assets/Partners/j_n_m.png';
import makBokanoLogo from '../assets/Partners/mak_bokano.png';
import prevLogo from '../assets/Partners/prev.jpg';
import primeIrrigationLogo from '../assets/Partners/prime_irrigation.png';
import cityCouncilLogo from '../assets/Partners/city_council.png';
import icpLogo from '../assets/Partners/icp.png';
import macHomeLogo from '../assets/Partners/mac_home.webp';
import liquiLogo from '../assets/Partners/liqui.jpg';

// PDF Documents
import productListPdf from '../assets/Downloads/Interpipe Product List.pdf';
import companyProfilePdf from '../assets/Downloads/InterPipe Company Profile.pdf.pdf';

// Hero Images
import homeHeroImage from '../assets/Home/polyy.jpg';
import productsHeroImage from '../assets/Products/BoreholeCasings/Borehole-Casings-1.jpg';

// Gallery Images
export const productCategories = {
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
} as const;

export type ProductCategory = keyof typeof productCategories;

export const displayNames: Record<ProductCategory, string> = {
  BoreholeCasings: 'Borehole Casings',
  PolyPipes: 'Poly Pipes',
  Conduits: 'Conduits',
  Sewer: 'Sewer',
  PVC: 'PVC',
};

// Pre-import all gallery images
export const galleryImages = {
  BoreholeCasings: import.meta.glob('../assets/Products/BoreholeCasings/*', { eager: true, as: 'url' }),
  PolyPipes: import.meta.glob('../assets/Products/PolyPipes/*', { eager: true, as: 'url' }),
  Conduits: import.meta.glob('../assets/Products/Conduits/*', { eager: true, as: 'url' }),
  Sewer: import.meta.glob('../assets/Products/Sewer/*', { eager: true, as: 'url' }),
  PVC: import.meta.glob('../assets/Products/PVC/*', { eager: true, as: 'url' }),
};

// Export all assets
export const assets = {
  products: {
    pvc: pvcImage,
    hdpe: hdpeImage,
    borehole: boreholeImage,
    sewer: sewerImage,
    conduit: conduitImage,
  },
  partners: {
    jnm: jnmLogo,
    makBokano: makBokanoLogo,
    prev: prevLogo,
    primeIrrigation: primeIrrigationLogo,
    cityCouncil: cityCouncilLogo,
    icp: icpLogo,
    macHome: macHomeLogo,
    liqui: liquiLogo,
  },
  documents: {
    productList: productListPdf,
    companyProfile: companyProfilePdf,
  },
  heroes: {
    home: homeHeroImage,
    products: productsHeroImage,
  },
} as const;

// Helper function to get gallery image path
export const getGalleryImagePath = (category: ProductCategory, filename: string): string => {
  try {
    const imageCollection = galleryImages[category];
    const imagePath = `../assets/Products/${category}/${filename}`;
    
    const asset = imageCollection[imagePath];
    
    if (asset) {
      return asset;
    }
    
    console.warn(`Image not found in preloaded collection: ${imagePath}`);
    return new URL(imagePath, import.meta.url).href;
  } catch (error) {
    console.error(`Failed to load image: ${category}/${filename}`, error);
    return '';
  }
}; 