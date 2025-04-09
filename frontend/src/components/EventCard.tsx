
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export interface EventItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  path: string;
}

const EventCard: React.FC<EventItemProps> = ({
  id,
  name,
  description,
  price,
  image,
  category,
  path
}) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      name,
      price,
      image,
      category
    });
  };

  return (
    <div className="event-card group">
      <Link to={path} className="block">
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="event-card-image group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-white font-serif text-xl font-semibold">{name}</h3>
                <p className="text-white font-bold">₹{price.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <p className="text-gray-700 mb-4 line-clamp-2">{description}</p>
          
          <div className="flex justify-between items-center">
            <Button 
              onClick={handleAddToCart}
              variant="outline"
              className="text-primary border-primary hover:bg-primary hover:text-white"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            
            <Button asChild variant="default">
              <Link to={path}>Book Now</Link>
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
