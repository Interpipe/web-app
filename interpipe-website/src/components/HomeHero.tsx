import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import slide images
import slideImage1 from '../assets/Home/blue.jpg';
import slideImage2 from '../assets/Home/polyy.jpg';
import slideImage3 from '../assets/Home/IMG-20250402-WA0008.jpg';

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
    title: "Committed to Flow",
    subtitle: "Your trusted partner in PVC and HDPE systems",
    image: slideImage1,
    link: "/products",
    linkText: "Explore Products"
  },
  {
    id: 'slide2',
    title: "Sustainable Irrigation",
    subtitle: "Efficient water management for a greener future",
    image: slideImage2,
    link: "/gallery",
    linkText: "View Projects"
  },
  {
    id: 'slide3',
    title: "Expert Support",
    subtitle: "Professional guidance for your irrigation needs",
    image: slideImage3,
    link: "/contact",
    linkText: "Contact Us"
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