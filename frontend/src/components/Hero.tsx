
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  image,
  buttonText,
  buttonLink
}) => {
  return (
    <div className="relative bg-black">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={image} 
          alt="Hero Background"
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container-custom min-h-[80vh] flex flex-col justify-center items-center text-center py-20">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight animate-fade-in">
          {title}
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
          {subtitle}
        </p>
        
        <Button 
          asChild
          size="lg" 
          className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg animate-scale-in"
          style={{animationDelay: '0.4s'}}
        >
          <Link to={buttonLink}>{buttonText}</Link>
        </Button>
      </div>
    </div>
  );
};

export default Hero;
