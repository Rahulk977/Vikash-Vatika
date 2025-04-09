
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import BackButton from '@/components/BackButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

// Wedding service subcategories data with specific items
const weddingServiceData = {
  stage: {
    title: "Stage Decoration",
    subtitle: "Beautiful stage setups for wedding ceremonies and receptions",
    hero: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
    items: [
      {
        id: 'stage-elegant',
        name: 'Elegant Stage Decoration',
        description: 'Beautiful stage setup with floral arrangements, fabric draping, and elegant lighting.',
        price: 85000,
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
        category: 'wedding',
        serviceType: 'stage'
      },
      {
        id: 'stage-royal',
        name: 'Royal Stage Setup',
        description: 'Luxurious stage decoration with royal theme, golden accents, and premium flowers.',
        price: 120000,
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
        category: 'wedding',
        serviceType: 'stage'
      },
      {
        id: 'stage-minimalist',
        name: 'Minimalist Stage Design',
        description: 'Clean and elegant stage setup with minimalist design elements and subtle lighting.',
        price: 65000,
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
        category: 'wedding',
        serviceType: 'stage'
      }
    ]
  },
  mandap: {
    title: "Mandap Decoration",
    subtitle: "Traditional mandap setups with beautiful decorations for the wedding ceremony",
    hero: "https://images.unsplash.com/photo-1620162009840-7a61c6274bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
    items: [
      {
        id: 'mandap-traditional',
        name: 'Traditional Mandap Setup',
        description: 'Complete mandap setup with traditional elements and beautiful decorations for the wedding ceremony.',
        price: 70000,
        image: 'https://images.unsplash.com/photo-1620162009840-7a61c6274bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
        category: 'wedding',
        serviceType: 'mandap'
      },
      {
        id: 'mandap-contemporary',
        name: 'Contemporary Mandap Design',
        description: 'Modern mandap setup with contemporary design elements while maintaining traditional essence.',
        price: 85000,
        image: 'https://images.unsplash.com/photo-1620162009840-7a61c6274bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
        category: 'wedding',
        serviceType: 'mandap'
      }
    ]
  },
  gate: {
    title: "Gate Decoration",
    subtitle: "Grand entrance gates decorated with flowers, lights and fabric to welcome your guests",
    hero: "https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
    items: [
      {
        id: 'gate-royal',
        name: 'Royal Gate Decoration',
        description: 'Grand entrance gate decorated with flowers, lights and fabric to welcome your guests.',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
        category: 'wedding',
        serviceType: 'gate'
      },
      {
        id: 'gate-floral',
        name: 'Floral Arch Entrance',
        description: 'Beautiful arch entrance decorated with fresh flowers and subtle lighting.',
        price: 28000,
        image: 'https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
        category: 'wedding',
        serviceType: 'gate'
      }
    ]
  },
  gallery: {
    title: "Gallery Walkway Decoration",
    subtitle: "Beautifully decorated pathways with flowers, candles, and photo frames displaying your memories",
    hero: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80",
    items: [
      {
        id: 'gallery-walkway',
        name: 'Gallery Walkway Decoration',
        description: 'Beautifully decorated pathways with flowers, candles, and photo frames displaying your memories.',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80',
        category: 'wedding',
        serviceType: 'gallery'
      },
      {
        id: 'gallery-memory',
        name: 'Memory Lane Setup',
        description: 'Elegant pathway decorated with your cherished photos and memories with premium lighting.',
        price: 55000,
        image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80',
        category: 'wedding',
        serviceType: 'gallery'
      }
    ]
  },
  reception: {
    title: "Reception Decoration",
    subtitle: "Elegant decoration for wedding receptions with beautiful table settings and ambient lighting",
    hero: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    items: [
      {
        id: 'reception-standard',
        name: 'Wedding Reception Decor',
        description: 'Elegant decoration for wedding reception with beautiful table settings, backdrop, and ambient lighting.',
        price: 65000,
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        category: 'wedding',
        serviceType: 'reception'
      },
      {
        id: 'reception-premium',
        name: 'Premium Reception Setup',
        description: 'Luxurious reception decoration with premium floral arrangements and sophisticated lighting.',
        price: 90000,
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        category: 'wedding',
        serviceType: 'reception'
      }
    ]
  },
  complete: {
    title: "Complete Wedding Packages",
    subtitle: "Comprehensive wedding decoration package including all services for a hassle-free experience",
    hero: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    items: [
      {
        id: 'complete-standard',
        name: 'Complete Wedding Package',
        description: 'Comprehensive wedding decoration package including stage, gate, gallery, mandap, and seating arrangements.',
        price: 200000,
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        category: 'wedding',
        serviceType: 'complete'
      },
      {
        id: 'complete-premium',
        name: 'Premium Wedding Package',
        description: 'Luxurious wedding decoration package with premium materials and personalized design.',
        price: 300000,
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        category: 'wedding',
        serviceType: 'complete'
      }
    ]
  }
};

const WeddingServiceCategoryPage = () => {
  const { serviceType } = useParams<{ serviceType: string }>();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  if (!serviceType || !weddingServiceData[serviceType as keyof typeof weddingServiceData]) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-serif font-bold mb-4">Service Not Found</h1>
        <p className="mb-8">The wedding service you're looking for doesn't exist.</p>
        <Link to="/wedding" className="btn-primary">Return to Wedding Services</Link>
      </div>
    );
  }
  
  const data = weddingServiceData[serviceType as keyof typeof weddingServiceData];
  
  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: 'wedding'
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });
  };
  
  return (
    <div>
      <Hero 
        title={data.title}
        subtitle={data.subtitle}
        image={data.hero}
        buttonText="Contact Us"
        buttonLink="/contact"
      />
      
      <div className="container-custom py-12">
        <BackButton className="mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item) => (
            <Card key={item.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <Link to={`/wedding/${serviceType}/${item.id}`} className="block">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
              </Link>
              <CardContent className="p-6">
                <Link to={`/wedding/${serviceType}/${item.id}`}>
                  <h3 className="font-serif text-xl font-semibold mb-2">{item.name}</h3>
                </Link>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <p className="font-bold text-xl text-primary">₹{item.price.toLocaleString()}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center gap-1"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeddingServiceCategoryPage;
