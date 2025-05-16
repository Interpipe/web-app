import { ArrowRight, ChevronLeft, ChevronRight, Droplet, Shield, Zap, Users, Award, Clock } from 'lucide-react';
import HomeHero from '../components/HomeHero';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { getApiProductImagePath, getApiPartnerLogoPath } from '../services/assets';

// Icon mapping for dynamic rendering
const iconMap = {
  Droplet,
  Shield,
  Zap,
  Users,
  Award,
  Clock
};

const Home = () => {
  const { partners, features, stats, featuredProducts, isLoading, error, fetchData } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const visiblePartners = 3; // Number of partners visible at once
  
  // Products carousel state
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const productsCarouselRef = useRef<HTMLDivElement>(null);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Use the featuredProducts directly since they're already filtered by the API service
  // The API service already selects which products to feature - no need for additional filtering
  const safeFeaturedProducts = Array.isArray(featuredProducts) ? featuredProducts : [];

  // Ensure data is always arrays
  const safePartners = Array.isArray(partners) ? partners : [];
  const safeFeatures = Array.isArray(features) ? features : [];
  const safeStats = Array.isArray(stats) ? stats : [];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + visiblePartners >= safePartners.length 
        ? 0 
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 
        ? Math.max(0, safePartners.length - visiblePartners) 
        : prevIndex - 1
    );
  };
  
  // Products carousel controls
  const nextProduct = () => {
    setCurrentProductIndex((prevIndex) => 
      prevIndex + 1 >= safeFeaturedProducts.length 
        ? 0 
        : prevIndex + 1
    );
  };

  const prevProduct = () => {
    setCurrentProductIndex((prevIndex) => 
      prevIndex === 0 
        ? safeFeaturedProducts.length - 1 
        : prevIndex - 1
    );
  };

  // Auto-scroll effect for partners
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);
  
  // Auto-scroll effect for products
  useEffect(() => {
    const interval = setInterval(() => {
      nextProduct();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentProductIndex]);

  // Helper to render icons dynamically
  const renderIcon = (iconName: string | undefined, size = 24) => {
    if (!iconName) {
      console.warn('Feature is missing an icon name.');
      // Optionally return a default icon here if needed
      return null;
    }

    // Find the key in iconMap case-insensitively
    const matchedKey = Object.keys(iconMap).find(
      (key) => key.toLowerCase() === iconName.toLowerCase()
    );

    if (matchedKey) {
      const IconComponent = iconMap[matchedKey as keyof typeof iconMap];
      return <IconComponent size={size} className="text-sky-500" />;
    } else {
      console.warn(
        `Icon '${iconName}' not found in iconMap. Available icons: ${Object.keys(iconMap).join(', ')}`
      );
      // Optionally return a default icon here if needed
      return null;
    }
  };

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
      <HomeHero />
      
      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {safeStats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  {renderIcon(stat.icon as string, 40)}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 whitespace-pre-line">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Interpipe?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safeFeatures.map((feature) => (
              <div key={feature.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                  {renderIcon(feature.icon as string, 40)}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 pb-60 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-60 relative">Featured Products</h2>
          
          <div className="relative max-w-6xl mx-auto px-16">
            <div className="overflow-hidden">
              <div 
                ref={productsCarouselRef}
                className="flex justify-center items-center pt-10"
              >
                {safeFeaturedProducts.map((product, index) => {
                  // Calculate relative position
                  const normalizedIndex = (index - currentProductIndex + safeFeaturedProducts.length) % safeFeaturedProducts.length;
                  
                  // Only show 3 items: previous, current, and next
                  if (normalizedIndex > 2 && normalizedIndex < safeFeaturedProducts.length - 1) {
                    return null;
                  }
                  
                  let position = '';
                  let transformScale = 1;
                  let zIndex = 0;
                  let opacity = 1;
                  
                  if (normalizedIndex === 0) {
                    // Center item
                    position = 'center';
                    transformScale = 1;
                    zIndex = 30;
                    opacity = 1;
                  } else if (normalizedIndex === 1 || normalizedIndex === safeFeaturedProducts.length - 1) {
                    // Side items - make them smaller and further away
                    position = normalizedIndex === 1 ? 'right' : 'left';
                    transformScale = 0.65;
                    zIndex = 20;
                    opacity = 0.6;
                  } else {
                    // Hide other items
                    return null;
                  }
                  
                  const translateX = position === 'center' ? 0 : (position === 'left' ? -50 : 50) + '%';
                  
                  return (
                    <div 
                      key={product.id} 
                      className="absolute transition-all duration-500 ease-in-out"
                      style={{
                        transform: `translateX(${translateX}) scale(${transformScale})`,
                        zIndex,
                        opacity,
                        width: '50%',
                      }}
                    >
                      <Link to={product.link} className="block group">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                          <div className="aspect-w-16 aspect-h-9">
                            <img 
                              src={getApiProductImagePath(product.image)} 
                              alt={product.name}
                              className="object-cover w-full h-64"
                            />
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <div className="flex items-center text-sky-500 group-hover:text-sky-600">
                              Learn More
                              <ArrowRight className="ml-2" size={20} />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button
              onClick={prevProduct}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
              aria-label="Previous product"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextProduct}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
              aria-label="Next product"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Partners Carousel Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Customers</h2>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                ref={carouselRef}
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / visiblePartners)}%)` }}
              >
                {safePartners.map((partner) => (
                  <div 
                    key={partner.id} 
                    className="min-w-[33.333%] px-4 flex-shrink-0"
                  >
                    <div className="bg-white p-6 rounded-lg shadow-md h-40 flex items-center justify-center">
                      <img 
                        src={getApiPartnerLogoPath(partner.logo)} 
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 -ml-4"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-sky-500" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 -mr-4" 
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-sky-500" />
            </button>
          </div>
          
          <div className="flex justify-center mt-6">
            {Array.from({ length: Math.ceil(safePartners.length / visiblePartners) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx * visiblePartners)}
                className={`mx-1 w-3 h-3 rounded-full ${
                  Math.floor(currentIndex / visiblePartners) === idx
                    ? 'bg-sky-500'
                    : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Water Systems?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our PVC pipe products and get expert advice for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              to="/products"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 