
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import BackButton from '@/components/BackButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

// Stage decoration services data
const stageDecorationServices = [
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
];

const StageDecorationPage = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  
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
        title="Stage Decoration"
        subtitle="Beautiful stage setups for wedding ceremonies and receptions"
        image="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
        buttonText="Contact Us"
        buttonLink="/contact"
      />
      
      <div className="container-custom py-12">
        <BackButton className="mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stageDecorationServices.map((item) => (
            <Card key={item.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <Link to={`/wedding/${item.serviceType}/${item.id}`} className="block">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
              </Link>
              <CardContent className="p-6">
                <Link to={`/wedding/${item.serviceType}/${item.id}`}>
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

export default StageDecorationPage;
