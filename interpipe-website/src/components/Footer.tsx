import { Link } from 'react-router-dom';
import { Facebook, Mail, Phone, MapPin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.2] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="transition-all duration-300 hover:translate-y-[-5px]">
            <h3 className="text-2xl font-bold text-sky-500 mb-4 relative inline-block">
              Interpipe
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 transition-all duration-500 group-hover:w-full"></span>
            </h3>
            <p className="text-gray-400 mb-4">
              Manufacturer of PVC and HDPE systems.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1ANPDa5jqC/" 
                className="text-gray-400 hover:text-sky-500 transition-all duration-300 hover:scale-125"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-sky-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-500 transition-colors">
                <Linkedin size={20} />
              </a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div className="transition-all duration-300 hover:translate-y-[-5px]">
            <h4 className="text-lg font-semibold mb-4 relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-sky-500 after:transition-all after:duration-300 hover:after:w-full">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-sky-500 transition-all duration-300 flex items-center gap-1 group">
                  <span className="opacity-0 transform translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">→</span>
                  <span>Products</span>
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="text-gray-400 hover:text-sky-500 transition-all duration-300 flex items-center gap-1 group">
                  <span className="opacity-0 transform translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">→</span>
                  <span>Downloads</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-sky-500 transition-all duration-300 flex items-center gap-1 group">
                  <span className="opacity-0 transform translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">→</span>
                  <span>Gallery</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="transition-all duration-300 hover:translate-y-[-5px]">
            <h4 className="text-lg font-semibold mb-4 relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-sky-500 after:transition-all after:duration-300 hover:after:w-full">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-sky-500 transition-all duration-300 flex items-center gap-1 group">
                  <span className="opacity-0 transform translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">→</span>
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-sky-500 transition-all duration-300 flex items-center gap-1 group">
                  <span className="opacity-0 transform translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">→</span>
                  <span>FAQ</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-sky-500 transition-all duration-300 flex items-center gap-1 group">
                  <span className="opacity-0 transform translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">→</span>
                  <span>Warranty</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="transition-all duration-300 hover:translate-y-[-5px]">
            <h4 className="text-lg font-semibold mb-4 relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-sky-500 after:transition-all after:duration-300 hover:after:w-full">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 text-sky-500 mt-1 group-hover:animate-bounce" />
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  Interpipe PVT Ltd<br />
                  1236 Tynwald South Industries<br />
                  Harare, Zimbabwe
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <Phone className="w-5 h-5 text-sky-500 mt-1 transition-transform duration-300 group-hover:rotate-12" />
                <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  +263 777 418 618<br />
                  +263 777 418 942
                </span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 text-sky-500 transition-transform duration-300 group-hover:scale-110" />
                <a href="mailto:sales@interpipe.co.zw" className="text-gray-400 hover:text-sky-500 transition-all duration-300">
                  sales@interpipe.co.zw
                </a>
              </li>
              <li className="flex items-center space-x-3 group">
                <Globe className="w-5 h-5 text-sky-500 transition-transform duration-300 group-hover:rotate-45" />
                <a href="https://www.interpipe.co.zw" className="text-gray-400 hover:text-sky-500 transition-all duration-300">
                  www.interpipe.co.zw
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p className="transition-all duration-500 hover:tracking-wider">&copy; {new Date().getFullYear()} Interpipe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 