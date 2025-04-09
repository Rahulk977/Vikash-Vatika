
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import BackButton from '@/components/BackButton';
import { Card, CardContent } from '@/components/ui/card';

// Wedding service categories data
const weddingServices = [
  {
    id: 'stage',
    name: 'Stage Decoration',
    description: 'Beautiful stage setups for wedding ceremonies and receptions',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    path: '/wedding-decoration/stage'
  },
  {
    id: 'mandap',
    name: 'Mandap Decoration',
    description: 'Traditional mandap setups with beautiful decorations',
    image: 'https://images.unsplash.com/photo-1620162009840-7a61c6274bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
    path: '/wedding-decoration/mandap'
  },
  {
    id: 'gate',
    name: 'Gate Decoration',
    description: 'Grand entrance gates decorated with flowers and fabric',
    image: 'https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    path: '/wedding-decoration/gate'
  },
  {
    id: 'gallery',
    name: 'Gallery Decoration',
    description: 'Beautifully decorated pathways with flowers and photo frames',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80',
    path: '/wedding-decoration/gallery'
  },
  {
    id: 'reception',
    name: 'Reception Decoration',
    description: 'Elegant decoration for wedding receptions',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    path: '/wedding-decoration/reception'
  },
  {
    id: 'complete',
    name: 'Complete Wedding Packages',
    description: 'Comprehensive wedding decoration packages',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    path: '/wedding-decoration/complete'
  }
];

const WeddingServicesPage = () => {
  return (
    <div>
      <Hero 
        title="Wedding Decoration Services"
        subtitle="Create your dream wedding with our exquisite decoration packages and services"
        image="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        buttonText="Contact Us"
        buttonLink="/contact"
      />
      
      <div className="container-custom py-12">
        <BackButton className="mb-8" />
        
        <h2 className="font-serif text-3xl font-bold mb-8 text-center">Our Wedding Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {weddingServices.map((service) => (
            <Link key={service.id} to={service.path} className="block group">
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeddingServicesPage;
