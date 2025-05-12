import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import images from the src directory
import pvcImage from '../assets/Home/hero_slides/pvc.png';
import hdeImage from '../assets/Home/hero_slides/hde.png';
import sewerImage from '../assets/Home/hero_slides/sewer-pipes.jpg';
import boreholeImage from '../assets/Home/hero_slides/borehole-casings.jpg';
import conduitImage from '../assets/Home/hero_slides/conduit.jpg';

// Create an object with all image paths using relative URLs
// These will be processed by Vite and replaced with hashed URLs in production
const imagePaths = {
  // Using relative URLs from the public directory (more reliable in production)
  pvc: pvcImage,
  hde: hdeImage,
  sewer: sewerImage,
  borehole: boreholeImage,
  conduit: conduitImage,
};

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
    title: "PVC Pressure Pipes",
    subtitle: "Your trusted partner in PVC Pipes and fittings",
    image: imagePaths.pvc,
    link: "/products#pvc-pipes",
    linkText: "Explore PVC Products"
  },
  {
    id: 'slide2',
    title: "HDPE Pipes and fittings",
    subtitle: "Lightweight, flexible and corrosion resistant. Perfect for water supply, irrigation and industrial applications",
    image: imagePaths.hde,
    link: "/products#poly-pipes",
    linkText: "View HDPE Solutions"
  },
  {
    id: 'slide3',
    title: "Borehole Casings",
    subtitle: "Designed for water well and borehole applications",
    image: imagePaths.borehole,
    link: "/products#casings",
    linkText: "View Borehole Products"
  },
  {
    id: 'slide4',
    title: "Drainage and Sewer Pipes",
    subtitle: "Manage water flow, prevent flooding and support effective waste management",
    image: imagePaths.sewer,
    link: "/products#sewer-pipes",
    linkText: "Discover Sewer Systems"
  },
  {
    id: 'slide5',
    title: "Electrical Conduit pipes",
    subtitle: "Safely protect electrical wiring with durable and compliant solutions",
    image: imagePaths.conduit,
    link: "/products#conduits",
    linkText: "Explore Conduit Range"
  }
];

const HomeHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left'>('right');
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideDirection('right');
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setTimeout(() => {
          setIsAnimating(false);
        }, 100);
      }, 400);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    if (isAnimating) return;
    setSlideDirection('right');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }, 400);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setSlideDirection('left');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }, 400);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[600px] lg:h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            slides.indexOf(slide) === currentSlide 
              ? 'opacity-100 translate-x-0 z-10' 
              : slideDirection === 'right'
                ? 'opacity-0 translate-x-full z-0' 
                : 'opacity-0 -translate-x-full z-0'
          } ${isAnimating && slides.indexOf(slide) === currentSlide ? (slideDirection === 'right' ? '-translate-x-full' : 'translate-x-full') : ''}`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-10000 ease-in-out transform-gpu hover:scale-100"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center text-white">
            <h1 
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 opacity-0 transform translate-y-8 transition-all duration-700 delay-100 ease-out ${
                slides.indexOf(slide) === currentSlide ? 'opacity-100 translate-y-0' : ''
              }`}
            >
              {slide.title}
            </h1>
            <p 
              className={`text-xl md:text-2xl lg:text-3xl max-w-2xl lg:max-w-3xl mb-8 opacity-0 transform translate-y-8 transition-all duration-700 delay-300 ease-out ${
                slides.indexOf(slide) === currentSlide ? 'opacity-100 translate-y-0' : ''
              }`}
            >
              {slide.subtitle}
            </p>
            <Link
              to={slide.link}
              className={`inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 opacity-0 transform translate-y-8 delay-500 ${
                slides.indexOf(slide) === currentSlide ? 'opacity-100 translate-y-0' : ''
              }`}
            >
              {slide.linkText}
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm z-20"
        aria-label="Previous slide"
        disabled={isAnimating}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm z-20"
        aria-label="Next slide"
        disabled={isAnimating}
      >
        <ArrowRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((slide) => (
          <button
            key={`indicator-${slide.id}`}
            onClick={() => {
              if (isAnimating) return;
              setSlideDirection(slides.indexOf(slide) > currentSlide ? 'right' : 'left');
              setCurrentSlide(slides.indexOf(slide));
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              slides.indexOf(slide) === currentSlide 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${slides.indexOf(slide) + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeHero; 