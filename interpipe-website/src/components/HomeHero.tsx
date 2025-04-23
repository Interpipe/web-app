import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import slide images from hero_slides directory
import slideImage1 from '../assets/Home/hero_slides/pvc.png';
import slideImage2 from '../assets/Home/hero_slides/hde.png';
import slideImage3 from '../assets/Home/hero_slides/sewer-pipes.jpg';
import slideImage4 from '../assets/Home/hero_slides/borehole-casings.jpg';
import slideImage5 from '../assets/Home/hero_slides/conduit.jpg';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  linkText: string;
}

const slides: Slide[] = [
  {
    id: 'slide1',
    title: "PVC Pressure Systems",
    subtitle: "Your trusted partner in PVC  Pipes and fittings",
    image: slideImage1,
    link: "/products#pvc-pipes",
    linkText: "Explore PVC Products"
  },
  {
    id: 'slide2',
    title: "HDPE Pipes and fittings",
    subtitle: " lightweight, flexible and corrosion resistant. Perfect for water supply, irrigation and industrial applications",
    image: slideImage2,
    link: "/products#poly-pipes",
    linkText: "View HDPE Solutions"
  },
  {
    id: 'slide3',
    title: "Borehole Casings",
    subtitle: "Designed for water well and borehole applications",
    image: slideImage4,
    link: "/products#casings",
    linkText: "View Borehole Products"
  },
  {
    id: 'slide4',
    title: "Drainage and Sewer Pipes",
    subtitle: "Manage water flow, prevent flooding and support effective waste management",
    image: slideImage3,
    link: "/products#sewer-pipes",
    linkText: "Discover Sewer Systems"
  },
  {
    id: 'slide5',
    title: "Electrical Conduit pipes",
    subtitle: "Safely protect electrical wiring with durable and compliant solutions",
    image: slideImage5,
    link: "/products#conduits",
    linkText: "Explore Conduit Range"
  }
];

const HomeHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[600px] lg:h-screen">
      {/* Slides */}
      {slides.map((slide) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            slides.indexOf(slide) === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{slide.title}</h1>
            <p className="text-xl md:text-2xl lg:text-3xl max-w-2xl lg:max-w-3xl mb-8">{slide.subtitle}</p>
            <Link
              to={slide.link}
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              {slide.linkText}
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ArrowRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((slide) => (
          <button
            key={`indicator-${slide.id}`}
            onClick={() => setCurrentSlide(slides.indexOf(slide))}
            className={`w-3 h-3 rounded-full transition-colors ${
              slides.indexOf(slide) === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${slides.indexOf(slide) + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeHero; 