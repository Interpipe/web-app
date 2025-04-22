import { ArrowRight, Droplet, Shield, Zap, Users, Award, Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import HomeHero from '../components/HomeHero';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

// Import product images
import pvcImage from '../assets/Products/PVC/65d56d8922e5ce44d0d07309ab1899ae.jpg';
import hdpeImage from '../assets/Products/POLY PIPES/poly.png';
import boreholeImage from '../assets/Products/Borehole Casings/Borehole Casings Edit 1.jpg';
import sewerImage from '../assets/Products/SEWER/sewer-pipes.jpg';
import conduitImage from '../assets/Products/Conduits/Untitled design (3).jpg';

// Import partner logos
import jnmLogo from '../assets/Partners/j_n_m.png';
import makBokanoLogo from '../assets/Partners/mak_bokano.png';
import prevLogo from '../assets/Partners/prev.jpg';
import primeIrrigationLogo from '../assets/Partners/prime_irrigation.png';
import cityCouncilLogo from '../assets/Partners/city_council.png';
import icpLogo from '../assets/Partners/icp.png';
import macHomeLogo from '../assets/Partners/mac_home.webp';
import liquiLogo from '../assets/Partners/liqui.jpg';

const partnerImages = [
  { id: 'jnm', name: 'J & M', logo: jnmLogo },
  { id: 'mak_bokano', name: 'Mak Bokano', logo: makBokanoLogo },
  { id: 'prev', name: 'Prev', logo: prevLogo },
  { id: 'prime_irrigation', name: 'Prime Irrigation', logo: primeIrrigationLogo },
  { id: 'city_council', name: 'City Council', logo: cityCouncilLogo },
  { id: 'icp', name: 'ICP', logo: icpLogo },
  { id: 'mac_home', name: 'Mac Home', logo: macHomeLogo },
  { id: 'liqui', name: 'Liquitech', logo: liquiLogo },
];

const features = [
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

const stats = [
  { id: 'customers', number: "150+", label: "Happy Customers", icon: Users },
  { id: 'experience', number: "3+", label: "Years Experience", icon: Award },
  { id: 'worktime', number: "Open", label: "Mon-Fri: 0730-1700hrs\nSaturday: 0730-1400hrs", icon: Clock }
];

const featuredProducts = [
  {
    id: 'pvc',
    name: "PVC Pressure Pipes",
    description: "High-quality PVC pipes for water distribution and irrigation systems",
    image: pvcImage,
    link: "/products#pvc-pipes"
  },
  {
    id: 'hdpe',
    name: "HDPE Pipes",
    description: "Durable polyethylene pipes for specialized and demanding applications",
    image: hdpeImage,
    link: "/products#poly-pipes"
  },
  {
    id: 'sewer',
    name: "Sewer & Drainage Pipes",
    description: "Reliable solutions for waste water management and drainage",
    image: sewerImage,
    link: "/products#sewer-pipes"
  },
  {
    id: 'casings',
    name: "Borehole Casings",
    description: "Quality PVC casings for water well and borehole applications",
    image: boreholeImage,
    link: "/products#casings"
  },
  {
    id: 'conduits',
    name: "Electrical Conduits",
    description: "Safe and durable conduit systems for electrical installations",
    image: conduitImage,
    link: "/products#conduits"
  }
];

const testimonials = [
  {
    id: 'icp',
    quote: "Interpipe has been a great blessing to our business. They do not just meet our requirements but go beyond in providing the best possible products, support, pricing and technical assistance.",
    author: "Intergrated Construction Projects",
    role: "Company",
    company: "ICP",
    category: "Construction"
  },
  {
    id: 'liquitech',
    quote: "Working with Interpipe has been a delight on all of our sites and projects. They always had everything we needed and provided excellent service in terms of material supply.",
    author: "LIQUITECH",
    role: "Company",
    company: "LIQUITECH",
    category: "Industry"
  }
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const visiblePartners = 3; // Number of partners visible at once
  
  // Products carousel state
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const productsCarouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + visiblePartners >= partnerImages.length 
        ? 0 
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 
        ? Math.max(0, partnerImages.length - visiblePartners) 
        : prevIndex - 1
    );
  };
  
  // Products carousel controls
  const nextProduct = () => {
    setCurrentProductIndex((prevIndex) => 
      prevIndex + 1 >= featuredProducts.length 
        ? 0 
        : prevIndex + 1
    );
  };

  const prevProduct = () => {
    setCurrentProductIndex((prevIndex) => 
      prevIndex === 0 
        ? featuredProducts.length - 1 
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

  return (
    <div>
      <HomeHero />
      
      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <stat.icon className="w-12 h-12 text-sky-500 mx-auto mb-4" />
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
            {features.map((feature) => (
              <div key={feature.id} className="bg-white p-6 rounded-lg shadow-md">
                <feature.icon className="text-sky-500 mb-4" size={40} />
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
      <section className="py-24  pb-60 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-60 relative z-50">Featured Products</h2>
          
          <div className="relative max-w-6xl mx-auto px-16">
            <div className="overflow-hidden">
              <div 
                ref={productsCarouselRef}
                className="flex justify-center items-center pt-10"
              >
                {featuredProducts.map((product, index) => {
                  // Calculate relative position
                  const normalizedIndex = (index - currentProductIndex + featuredProducts.length) % featuredProducts.length;
                  
                  // Only show 3 items: previous, current, and next
                  if (normalizedIndex > 2 && normalizedIndex < featuredProducts.length - 1) {
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
                  } else if (normalizedIndex === 1 || normalizedIndex === featuredProducts.length - 1) {
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
                          <div className="h-72 w-full overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <div className="text-sky-500 font-semibold flex items-center">
                              Learn More
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <button 
              onClick={prevProduct}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-40"
              aria-label="Previous product"
            >
              <ChevronLeft className="w-6 h-6 text-sky-500" />
            </button>
            
            <button 
              onClick={nextProduct}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-40" 
              aria-label="Next product"
            >
              <ChevronRight className="w-6 h-6 text-sky-500" />
            </button>
          </div>
          
          <div className="flex justify-center mt-16">
            {featuredProducts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentProductIndex(idx)}
                className={`mx-1 w-3 h-3 rounded-full ${
                  currentProductIndex === idx ? 'bg-sky-500' : 'bg-gray-300'
                }`}
                aria-label={`Go to product ${idx + 1}`}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block bg-sky-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors"
            >
              View All Products
            </Link>
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
                {partnerImages.map((partner) => (
                  <div 
                    key={partner.id} 
                    className="min-w-[33.333%] px-4 flex-shrink-0"
                  >
                    <div className="bg-white p-6 rounded-lg shadow-md h-40 flex items-center justify-center">
                      <img 
                        src={partner.logo} 
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
            {Array.from({ length: Math.ceil(partnerImages.length / visiblePartners) }).map((_, idx) => (
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

      {/* Testimonials Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center mr-4">
                    <span className="text-sky-500 font-bold">
                      {testimonial.company.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.role} | {testimonial.category}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <div className="flex text-yellow-400 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={`${testimonial.id}-star-${star}`} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/testimonials"
              className="inline-block bg-white text-sky-500 px-8 py-3 rounded-lg font-semibold border-2 border-sky-500 hover:bg-sky-50 transition-colors"
            >
              Read More Testimonials
            </Link>
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