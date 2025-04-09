
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import BackButton from '@/components/BackButton';
import ImageGallery from '@/components/ImageGallery';
import VideoPlayer from '@/components/VideoPlayer';
import { useToast } from '@/components/ui/use-toast';

// Sample data for the events
const eventsData = {
  '101': {
    id: '101',
    name: 'Elegant Stage Decoration',
    description: 'Beautiful stage setup with floral arrangements, fabric draping, and elegant lighting. This package includes complete stage decoration with a backdrop, flowers, fabric draping, lighting effects, and seating arrangement for the couple. Perfect for wedding receptions and sangeet ceremonies.',
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
      'https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-elegant-wedding-cake-on-a-bright-setting-39659-large.mp4',
    category: 'wedding'
  },
  '102': {
    id: '102',
    name: 'Royal Gate Decoration',
    description: 'Grand entrance gate decorated with flowers, lights and fabric to welcome your guests. This package includes a beautifully designed entrance gate with floral arrangements, fabric draping, and lighting. Make a grand first impression on your guests as they arrive at your event.',
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
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      'https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-palace-decorations-for-a-wedding-ceremony-23554-large.mp4',
    category: 'wedding'
  },
  '201': {
    id: '201',
    name: 'Kids Birthday Package',
    description: 'Colorful decorations, balloon arrangements, and themed setups for children\'s birthdays. This package includes themed decorations based on your child\'s favorite cartoon or character, balloon arrangements, banners, tableware, and party favors.',
    price: 25000,
    features: [
      'Themed decorations',
      'Colorful balloon arrangements',
      'Custom banner with name and age',
      'Table setup with themed tableware',
      'Party favors for guests',
      'Setup and cleanup included'
    ],
    mainImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    images: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-friends-celebrating-a-birthday-party-40069-large.mp4',
    category: 'birthday'
  },
  '301': {
    id: '301',
    name: 'Conference Setup',
    description: 'Professional arrangement for corporate conferences with stage, seating, and technical setup. This package includes stage setup, seating arrangements, sound system, projection setup, and branding elements to create a professional atmosphere for your corporate event.',
    price: 75000,
    features: [
      'Professional stage setup',
      'Seating arrangement for attendees',
      'Sound system with microphones',
      'Projection setup with screen',
      'Company branding elements',
      'Technical support throughout the event'
    ],
    mainImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80',
    images: [
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80',
      'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80',
      'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80',
      'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-colleagues-having-a-meeting-4626-large.mp4',
    category: 'corporate'
  }
};

const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  if (!id || !eventsData[id as keyof typeof eventsData]) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-serif font-bold mb-4">Event Not Found</h1>
        <p className="mb-8">The event you're looking for doesn't exist or has been removed.</p>
        <BackButton className="mx-auto" />
      </div>
    );
  }
  
  const event = eventsData[id as keyof typeof eventsData];
  
  const handleAddToCart = () => {
    addItem({
      id: event.id,
      name: event.name,
      price: event.price,
      image: event.mainImage,
      category: event.category
    });
  };
  
  const handleBookNow = () => {
    addItem({
      id: event.id,
      name: event.name,
      price: event.price,
      image: event.mainImage,
      category: event.category
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
            src={event.mainImage} 
            alt={event.name} 
            className="w-full h-auto rounded-lg shadow-md mb-8" 
          />
          
          <div className="mb-8">
            <h3 className="font-serif text-xl font-semibold mb-4">Gallery</h3>
            <ImageGallery images={event.images} />
          </div>
          
          <div>
            <h3 className="font-serif text-xl font-semibold mb-4">Video Preview</h3>
            <VideoPlayer src={event.video} poster={event.mainImage} className="w-full h-80" />
          </div>
        </div>
        
        {/* Right column - Details */}
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">{event.name}</h1>
          <p className="text-2xl font-bold text-primary mb-6">₹{event.price.toLocaleString()}</p>
          
          <div className="mb-8">
            <h3 className="font-serif text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{event.description}</p>
          </div>
          
          <div className="mb-8">
            <h3 className="font-serif text-xl font-semibold mb-2">Features</h3>
            <ul className="space-y-2">
              {event.features.map((feature, index) => (
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

export default EventDetailsPage;
