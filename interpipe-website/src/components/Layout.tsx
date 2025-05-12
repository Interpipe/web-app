import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [pageKey, setPageKey] = useState(location.pathname);
  const [prevPath, setPrevPath] = useState('');

  // Calculate transition direction based on a simple route hierarchy
  const getTransitionDirection = (currentPath: string, previousPath: string) => {
    const routeHierarchy = ['/', '/products', '/downloads', '/gallery', '/blog', '/contact'];
    
    if (!previousPath) return 'forward';
    
    const currentIndex = routeHierarchy.indexOf(currentPath);
    const previousIndex = routeHierarchy.indexOf(previousPath);
    
    if (currentIndex === -1 || previousIndex === -1) return 'forward';
    return currentIndex > previousIndex ? 'forward' : 'backward';
  };

  // Handle page transitions
  useEffect(() => {
    if (location.pathname !== prevPath) {
      const direction = getTransitionDirection(location.pathname, prevPath);
      
      // Start exit animation
      setIsPageTransitioning(true);
      
      // After animation completes, update the page key to trigger entrance animation
      const timer = setTimeout(() => {
        setPrevPath(location.pathname);
        setPageKey(location.pathname);
        setIsPageTransitioning(false);
      }, 400); // This should match the exit animation duration
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, prevPath]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/downloads', label: 'Downloads' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact Us' },
  ];

  // Determine the transition class based on state
  const getTransitionClass = () => {
    const direction = getTransitionDirection(location.pathname, prevPath);
    
    if (isPageTransitioning) {
      return direction === 'forward'
        ? 'opacity-0 transform translate-y-2'
        : 'opacity-0 transform -translate-y-2';
    }
    return 'opacity-100 transform translate-y-0';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600 transition-all duration-300 hover:text-indigo-700 transform hover:scale-105">
              Interpipe
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-gray-700 hover:text-indigo-600 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full ${
                    location.pathname === item.path ? 'text-indigo-600 font-semibold after:w-full' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden transition-transform duration-300 hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} className="transition-transform duration-300 rotate-90" /> : <Menu size={24} className="transition-transform duration-300 hover:rotate-12" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div 
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-2 text-gray-700 hover:text-indigo-600 transition-all duration-300 transform hover:translate-x-2 ${
                  location.pathname === item.path ? 'text-indigo-600 font-semibold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Content with Page Transitions */}
      <main className="flex-grow relative">
        <div 
          key={pageKey}
          className={`transition-all duration-400 ease-in-out will-change-transform ${getTransitionClass()}`}
          style={{ 
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="transition-all duration-300 hover:translate-y-[-5px]">
              <h3 className="text-xl font-bold mb-4 relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Interpipe</h3>
              <p className="text-gray-200">Committed to flow</p>
            </div>
            <div className="transition-all duration-300 hover:translate-y-[-5px]">
              <h3 className="text-xl font-bold mb-4 relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link 
                      to={item.path} 
                      className="text-gray-200 hover:text-white transition-all duration-300 flex items-center gap-1 group"
                    >
                      <span className="opacity-0 transform translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">→</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="transition-all duration-300 hover:translate-y-[-5px]">
              <h3 className="text-xl font-bold mb-4 relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Contact</h3>
              <p className="text-gray-200 hover:text-white transition-colors duration-300 flex items-start space-x-2">
                <span className="text-indigo-300">Email:</span>
                <a href="mailto:info@interpipe.com" className="hover:underline">info@interpipe.com</a>
              </p>
              <p className="text-gray-200 hover:text-white transition-colors duration-300 flex items-start space-x-2">
                <span className="text-indigo-300">Phone:</span>
                <span>(555) 123-4567</span>
              </p>
              <p className="text-gray-200 hover:text-white transition-colors duration-300 flex items-start space-x-2">
                <span className="text-indigo-300">Address:</span>
                <span>123 Pipe Street, City, Country</span>
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-indigo-500 text-center text-gray-200">
            <p className="transition-all duration-500 hover:tracking-wider">&copy; {new Date().getFullYear()} Interpipe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 