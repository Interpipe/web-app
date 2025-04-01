import { cn } from '../lib/utils';

interface HeroProps {
  title: string;
  subtitle?: string;
  image: string;
  className?: string;
}

const Hero = ({ title, subtitle, image, className }: HeroProps) => {
  return (
    <div className={cn("relative w-full h-[400px] md:h-[600px] lg:h-screen", className)}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{title}</h1>
        {subtitle && (
          <p className="text-xl md:text-2xl lg:text-3xl max-w-2xl lg:max-w-3xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default Hero; 