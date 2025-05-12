import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
// Import logo
import logoImage from '../assets/Home/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={logoImage} 
              alt="Interpipe Logo" 
              className="h-32 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-sky-500 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-sky-500 after:transition-all after:duration-300 hover:after:w-full">
              Home
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-sky-500 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-sky-500 after:transition-all after:duration-300 hover:after:w-full">
              Products
            </Link>
            <Link to="/downloads" className="text-gray-600 hover:text-sky-500 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-sky-500 after:transition-all after:duration-300 hover:after:w-full">
              Downloads
            </Link>
            <Link to="/gallery" className="text-gray-600 hover:text-sky-500 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-sky-500 after:transition-all after:duration-300 hover:after:w-full">
              Gallery
            </Link>
            <Link
              to="/contact"
              className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-sky-500 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} className="transition-transform duration-300 rotate-90" /> : <Menu size={24} className="transition-transform duration-300 hover:rotate-12" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden py-4 overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-sky-500 transition-all duration-300 transform hover:translate-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-600 hover:text-sky-500 transition-all duration-300 transform hover:translate-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/downloads"
              className="text-gray-600 hover:text-sky-500 transition-all duration-300 transform hover:translate-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Downloads
            </Link>
            <Link
              to="/gallery"
              className="text-gray-600 hover:text-sky-500 transition-all duration-300 transform hover:translate-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/testimonials"
              className="text-gray-600 hover:text-sky-500 transition-all duration-300 transform hover:translate-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              to="/contact"
              className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition-all duration-300 text-center shadow-md hover:shadow-lg transform hover:-translate-y-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 