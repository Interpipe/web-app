import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-sky-500 mb-4">Interpipe</h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner in irrigation solutions, committed to sustainable water management.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-sky-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-sky-500 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="text-gray-400 hover:text-sky-500 transition-colors">
                  Downloads
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-sky-500 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-sky-500 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-sky-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-400 hover:text-sky-500 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-sky-500 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-sky-500 transition-colors">
                  Warranty
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-sky-500 mt-1" />
                <span className="text-gray-400">
                  123 Irrigation Street<br />
                  Water City, WC 12345<br />
                  United States
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-sky-500" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-sky-500" />
                <span className="text-gray-400">info@interpipe.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Interpipe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 