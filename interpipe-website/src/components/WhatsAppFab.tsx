import WhatsAppBusinessIcon from './WhatsAppBusinessIcon';

const WhatsAppFab = () => {
  const phoneNumber = '+263777418618';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppBusinessIcon size={24} color="white" />
    </a>
  );
};

export default WhatsAppFab; 