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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logoImage} 
              alt="Interpipe Logo" 
              className="h-32 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-sky-500 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-sky-500 transition-colors">
              Products
            </Link>
            <Link to="/downloads" className="text-gray-600 hover:text-sky-500 transition-colors">
              Downloads
            </Link>
            <Link to="/gallery" className="text-gray-600 hover:text-sky-500 transition-colors">
              Gallery
            </Link>
            <Link to="/testimonials" className="text-gray-600 hover:text-sky-500 transition-colors">
              Testimonials
            </Link>
            <Link
              to="/contact"
              className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-sky-500 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-sky-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-600 hover:text-sky-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/downloads"
                className="text-gray-600 hover:text-sky-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Downloads
              </Link>
              <Link
                to="/gallery"
                className="text-gray-600 hover:text-sky-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                to="/testimonials"
                className="text-gray-600 hover:text-sky-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                to="/contact"
                className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 