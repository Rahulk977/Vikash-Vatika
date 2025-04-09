
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import EventCard from '@/components/EventCard';
import BackButton from '@/components/BackButton';

// Sample data for different categories
const categoryData = {
  wedding: {
    title: "Wedding Decorations & Services",
    subtitle: "Create your dream wedding with our exquisite decoration packages and services.",
    hero: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    items: [
      {
        id: '101',
        name: 'Elegant Stage Decoration',
        description: 'Beautiful stage setup with floral arrangements, fabric draping, and elegant lighting.',
        price: 85000,
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
        category: 'wedding',
        subcategory: 'stage-decoration',
        path: '/events/wedding/details/101'
      },
      {
        id: '102',
        name: 'Royal Gate Decoration',
        description: 'Grand entrance gate decorated with flowers, lights and fabric to welcome your guests.',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
        category: 'wedding',
        subcategory: 'gate-decoration',
        path: '/events/wedding/details/102'
      },
      {
        id: '103',
        name: 'Gallery Walkway Decoration',
        description: 'Beautifully decorated pathways with flowers, candles, and photo frames displaying your memories.',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80',
        category: 'wedding',
        subcategory: 'gallery-decoration',
        path: '/events/wedding/details/103'
      },
      {
        id: '104',
        name: 'Traditional Mandap Setup',
        description: 'Complete mandap setup with traditional elements and beautiful decorations for the wedding ceremony.',
        price: 70000,
        image: 'https://images.unsplash.com/photo-1620162009840-7a61c6274bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
        category: 'wedding',
        subcategory: 'mandap-decoration',
        path: '/events/wedding/details/104'
      },
      {
        id: '105',
        name: 'Complete Wedding Package',
        description: 'Comprehensive wedding decoration package including stage, gate, gallery, mandap, and seating arrangements.',
        price: 200000,
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        category: 'wedding',
        subcategory: 'complete-package',
        path: '/events/wedding/details/105'
      },
      {
        id: '106',
        name: 'Wedding Reception Decor',
        description: 'Elegant decoration for wedding reception with beautiful table settings, backdrop, and ambient lighting.',
        price: 65000,
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        category: 'wedding',
        subcategory: 'reception-decoration',
        path: '/events/wedding/details/106'
      }
    ]
  },
  birthday: {
    title: "Birthday Party Packages",
    subtitle: "Make your birthday celebrations special with our themed decorations and party packages.",
    hero: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    items: [
      {
        id: '201',
        name: 'Kids Birthday Package',
        description: 'Colorful decorations, balloon arrangements, and themed setups for children\'s birthdays.',
        price: 25000,
        image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        category: 'birthday',
        subcategory: 'kids',
        path: '/events/birthday/details/201'
      },
      {
        id: '202',
        name: 'Teen Birthday Package',
        description: 'Cool and trendy decorations with music setup and interactive games for teen celebrations.',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        category: 'birthday',
        subcategory: 'teen',
        path: '/events/birthday/details/202'
      },
      {
        id: '203',
        name: 'Adult Birthday Celebration',
        description: 'Elegant setup with sophisticated decorations for adult birthday celebrations.',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80',
        category: 'birthday',
        subcategory: 'adult',
        path: '/events/birthday/details/203'
      },
      {
        id: '204',
        name: 'Milestone Birthday Package',
        description: 'Special decorations and setups for milestone birthdays (18th, 21st, 50th, etc.).',
        price: 60000,
        image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        category: 'birthday',
        subcategory: 'milestone',
        path: '/events/birthday/details/204'
      }
    ]
  },
  corporate: {
    title: "Corporate Event Solutions",
    subtitle: "Professional event planning and decoration services for corporate meetings, conferences, and celebrations.",
    hero: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80",
    items: [
      {
        id: '301',
        name: 'Conference Setup',
        description: 'Professional arrangement for corporate conferences with stage, seating, and technical setup.',
        price: 75000,
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80',
        category: 'corporate',
        subcategory: 'conference',
        path: '/events/corporate/details/301'
      },
      {
        id: '302',
        name: 'Product Launch Event',
        description: 'Impressive setups for product launches including stage, branding elements, and lighting.',
        price: 90000,
        image: 'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        category: 'corporate',
        subcategory: 'product-launch',
        path: '/events/corporate/details/302'
      },
      {
        id: '303',
        name: 'Annual Party Decoration',
        description: 'Festive decorations for corporate annual celebrations and parties.',
        price: 60000,
        image: 'https://images.unsplash.com/photo-1561489413-985b06da5bee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
        category: 'corporate',
        subcategory: 'party',
        path: '/events/corporate/details/303'
      },
      {
        id: '304',
        name: 'Award Ceremony Setup',
        description: 'Elegant arrangement for corporate award ceremonies with stage, lighting, and seating.',
        price: 85000,
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
        category: 'corporate',
        subcategory: 'award-ceremony',
        path: '/events/corporate/details/304'
      }
    ]
  }
};

const EventCategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  
  if (!category || !categoryData[category as keyof typeof categoryData]) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-serif font-bold mb-4">Category Not Found</h1>
        <p className="mb-8">The event category you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary">Return Home</Link>
      </div>
    );
  }
  
  const data = categoryData[category as keyof typeof categoryData];
  
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
            <EventCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCategoryPage;
