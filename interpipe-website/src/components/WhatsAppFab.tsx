import { useState, useEffect } from 'react';
import WhatsAppBusinessIcon from './WhatsAppBusinessIcon';

const WhatsAppFab = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '+263777418618';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}`;

  // Show button after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check in case page loads scrolled down
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {isHovered && (
        <div 
          className="bg-white text-green-600 font-medium px-4 py-2 rounded-full shadow-lg text-sm mb-2 transform transition-all duration-300 scale-100 opacity-100"
          style={{ 
            transformOrigin: 'bottom right',
            animation: 'fadeInUp 0.3s ease-out forwards' 
          }}
        >
          Chat with us on WhatsApp
        </div>
      )}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-500 flex items-center justify-center ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        } ${isHovered ? 'animate-pulse shadow-xl' : ''}`}
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          animation: isVisible ? 'bounceIn 0.5s ease-out forwards' : '',
          boxShadow: isHovered ? '0 0 15px rgba(37, 211, 102, 0.5)' : ''
        }}
      >
        <WhatsAppBusinessIcon size={24} color="white" />
      </a>
    </div>
  );
};

// Add these keyframes to your global CSS (src/index.css or App.css)
const styleTag = document.createElement('style');
styleTag.innerHTML = `
  @keyframes bounceIn {
    0% { transform: scale(0); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
  
  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleTag);

export default WhatsAppFab; 