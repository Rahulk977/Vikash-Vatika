


import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Hero from '@/components/Hero';
import BackButton from '@/components/BackButton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

const MandapDecorationPage = () => {
  const { subcategory } = useParams(); // Get subcategory from URL
  const { addItem } = useCart(); // Use addItem from CartContext
  const { toast } = useToast();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/events/wedding/${subcategory}`);
        if (!response.ok) throw new Error('Failed to fetch services');
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [subcategory]);

  // ✅ Simplified and context-aware
  const handleAddToCart = async (item) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast({
        title: "Error",
        description: "Please log in to add items to your cart.",
        variant: "destructive",
      });
      return;
    }

    await addItem({
      eventId: item._id,
      name: item.name,
      category: "Wedding",
      subcategory: item.subcategory,
      price: item.price,
      image: item.images?.[0] || "",
    });

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  if (loading) return <p className="text-center py-12">Loading services...</p>;
  if (error) return <p className="text-center text-red-500 py-12">Error: {error}</p>;

  return (
    <div>
      <Hero 
        title={`${subcategory} Decoration`}
        subtitle="Beautiful decoration setups for wedding ceremonies."
        image="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
        buttonText="Contact Us"
        buttonLink="/contact"
      />

      <div className="container-custom py-12">
        <BackButton className="mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item) => (
            <Card key={item._id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <Link to={`/wedding/${subcategory}/${item._id}`} className="block">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={item.images?.[0]} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
              </Link>
              <CardContent className="p-6">
                <Link to={`/wedding/${subcategory}/${item._id}`}>
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

export default MandapDecorationPage;
