
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import BackButton from '@/components/BackButton';
import ImageGallery from '@/components/ImageGallery';
import VideoPlayer from '@/components/VideoPlayer';
import { useToast } from '@/components/ui/use-toast';

// Sample wedding service items data
const weddingServiceItems = {
  'stage-elegant': {
    id: 'stage-elegant',
    name: 'Elegant Stage Decoration',
    description: 'Beautiful stage setup with floral arrangements, fabric draping, and elegant lighting. This package includes complete stage decoration with a backdrop, flowers, fabric draping, lighting effects, and seating arrangement for the couple.',
    price: 85000,
    features: [
      'Elegant floral arrangements',
      'Premium fabric draping',
      'Decorative lighting setup',
      'Comfortable seating for the couple',
      'Backdrop design of your choice',
      'Props and accessories included',
    ],
    mainImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    images: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      'https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      'https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-elegant-wedding-cake-on-a-bright-setting-39659-large.mp4',
    serviceType: 'stage'
  },
  'stage-royal': {
    id: 'stage-royal',
    name: 'Royal Stage Setup',
    description: 'Luxurious stage decoration with royal theme, golden accents, and premium flowers. Perfect for grand weddings and receptions where elegance is paramount.',
    price: 120000,
    features: [
      'Royal themed decorations',
      'Premium gold and silver accents',
      'Luxury floral arrangements',
      'Custom lighting design',
      'Plush seating for the couple',
      'Professional setup and dismantling',
    ],
    mainImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    images: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      'https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-elegant-wedding-cake-on-a-bright-setting-39659-large.mp4',
    serviceType: 'stage'
  },
  'stage-minimalist': {
    id: 'stage-minimalist',
    name: 'Minimalist Stage Design',
    description: 'Clean and elegant stage setup with minimalist design elements and subtle lighting.',
    price: 65000,
    features: [
      'Clean, modern design',
      'Subtle color palette',
      'Minimalist floral accents',
      'Elegant ambient lighting',
      'Contemporary couple seating',
      'Professional setup and dismantling',
    ],
    mainImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    images: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      'https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-elegant-wedding-cake-on-a-bright-setting-39659-large.mp4',
    serviceType: 'stage'
  },
  'mandap-traditional': {
    id: 'mandap-traditional',
    name: 'Traditional Mandap Setup',
    description: 'Complete mandap setup with traditional elements and beautiful decorations for the wedding ceremony. Includes pillars, ceiling, seating, and all ritual arrangements.',
    price: 70000,
    features: [
      'Traditional mandap structure',
      'Seasonal flower decorations',
      'Traditional fabrics and draping',
      'Ritual seating arrangements',
      'Customized color themes',
      'Complete setup and dismantling',
    ],
    mainImage: 'https://images.unsplash.com/photo-1620162009840-7a61c6274bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
    images: [
      'https://images.unsplash.com/photo-1620162009840-7a61c6274bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
      'https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      'https://images.unsplash.com/photo-1620162009840-7a61c6274bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-palace-decorations-for-a-wedding-ceremony-23554-large.mp4',
    serviceType: 'mandap'
  },
  'mandap-contemporary': {
    id: 'mandap-contemporary',
    name: 'Contemporary Mandap Design',
    description: 'Modern mandap setup with contemporary design elements while maintaining traditional essence.',
    price: 85000,
    features: [
      'Modern mandap structure',
      'Contemporary floral designs',
      'Elegant fabric draping',
      'Modern lighting setup',
      'Color themes of your choice',
      'Professional setup and dismantling',
    ],
    mainImage: 'https://images.unsplash.com/photo-1620162009840-7a61c6274bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
    images: [
      'https://images.unsplash.com/photo-1620162009840-7a61c6274bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
      'https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      'https://images.unsplash.com/photo-1620162009840-7a61c6274bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-palace-decorations-for-a-wedding-ceremony-23554-large.mp4',
    serviceType: 'mandap'
  },
  'gate-royal': {
    id: 'gate-royal',
    name: 'Royal Gate Decoration',
    description: 'Grand entrance gate decorated with flowers, lights and fabric to welcome your guests. Make a stunning first impression with our expertly designed entrance.',
    price: 35000,
    features: [
      'Impressive entrance structure',
      'Fresh floral decoration',
      'Elegant fabric draping',
      'Decorative lighting',
      'Customized welcome signage',
      'Setup and dismantling included'
    ],
    mainImage: 'https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    images: [
      'https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      'https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-palace-decorations-for-a-wedding-ceremony-23554-large.mp4',
    serviceType: 'gate'
  },
  'gate-floral': {
    id: 'gate-floral',
    name: 'Floral Arch Entrance',
    description: 'Beautiful arch entrance decorated with fresh flowers and subtle lighting.',
    price: 28000,
    features: [
      'Elegant arch structure',
      'Fresh seasonal flowers',
      'Subtle lighting effects',
      'Customizable design',
      'Professional setup',
      'Quality guaranteed'
    ],
    mainImage: 'https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    images: [
      'https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      'https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-palace-decorations-for-a-wedding-ceremony-23554-large.mp4',
    serviceType: 'gate'
  }
};

const WeddingServiceDetailsPage = () => {
  const { serviceType, id } = useParams<{ serviceType: string; id: string }>();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const serviceId = id || '';
  
  if (!serviceId || !weddingServiceItems[serviceId as keyof typeof weddingServiceItems]) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-serif font-bold mb-4">Service Not Found</h1>
        <p className="mb-8">The wedding service you're looking for doesn't exist or has been removed.</p>
        <BackButton className="mx-auto" />
      </div>
    );
  }
  
  const service = weddingServiceItems[serviceId as keyof typeof weddingServiceItems];
  
  const handleAddToCart = () => {
    addItem({
      id: service.id,
      name: service.name,
      price: service.price,
      image: service.mainImage,
      category: 'wedding'
    });
    
    toast({
      title: "Added to cart",
      description: `${service.name} has been added to your cart`,
    });
  };
  
  const handleBookNow = () => {
    addItem({
      id: service.id,
      name: service.name,
      price: service.price,
      image: service.mainImage,
      category: 'wedding'
    });
    
    toast({
      title: "Item added to cart",
      description: "Proceed to checkout to complete your booking.",
    });
    
    // Simulate redirect to checkout
    setTimeout(() => {
      window.location.href = '/cart';
    }, 1500);
  };
  
  return (
    <div className="container-custom py-12">
      <BackButton className="mb-8" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left column - Image */}
        <div>
          <img 
            src={service.mainImage} 
            alt={service.name} 
            className="w-full h-auto rounded-lg shadow-md mb-8" 
          />
          
          <div className="mb-8">
            <h3 className="font-serif text-xl font-semibold mb-4">Gallery</h3>
            <ImageGallery images={service.images} />
          </div>
          
          <div>
            <h3 className="font-serif text-xl font-semibold mb-4">Video Preview</h3>
            <VideoPlayer src={service.video} poster={service.mainImage} className="w-full h-80" />
          </div>
        </div>
        
        {/* Right column - Details */}
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">{service.name}</h1>
          <p className="text-2xl font-bold text-primary mb-6">₹{service.price.toLocaleString()}</p>
          
          <div className="mb-8">
            <h3 className="font-serif text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{service.description}</p>
          </div>
          
          <div className="mb-8">
            <h3 className="font-serif text-xl font-semibold mb-2">Features</h3>
            <ul className="space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button onClick={handleAddToCart} variant="outline" className="flex-1">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button onClick={handleBookNow} className="flex-1">Book Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingServiceDetailsPage;
