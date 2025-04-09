
import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import EventCard from '@/components/EventCard';

// Sample data
const featuredEvents = [
  {
    id: '1',
    name: 'Royal Wedding Package',
    description: 'Comprehensive wedding planning and decoration for a royal wedding experience.',
    price: 250000,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'wedding',
    path: '/events/wedding/details/1'
  },
  {
    id: '2',
    name: 'Birthday Bash Package',
    description: 'Colorful and fun decoration setup for a memorable birthday celebration.',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'birthday',
    path: '/events/birthday/details/2'
  },
  {
    id: '3',
    name: 'Corporate Conference Setup',
    description: 'Professional arrangement for corporate meetings, conferences, and seminars.',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80',
    category: 'corporate',
    path: '/events/corporate/details/3'
  }
];

const services = [
  {
    title: 'Wedding Planning',
    description: 'Comprehensive wedding planning services from venue selection to day-of coordination.',
    icon: '💍',
    link: '/events/wedding'
  },
  {
    title: 'Decoration Services',
    description: 'Stunning decorations for all types of events, customized to your theme and preferences.',
    icon: '🎨',
    link: '/services/decoration'
  },
  {
    title: 'Catering',
    description: 'Delicious food and beverage service for your guests, with customizable menu options.',
    icon: '🍽️',
    link: '/services/catering'
  },
  {
    title: 'Entertainment',
    description: 'Book musicians, DJs, dancers, and more to keep your guests entertained.',
    icon: '🎭',
    link: '/services/entertainment'
  }
];

const testimonials = [
  {
    name: 'Priya & Rahul',
    quote: 'Vikash Vatika made our wedding day absolutely perfect. The decorations were even more beautiful than we imagined!',
    image: 'https://images.unsplash.com/photo-1537884944318-390069bb8665?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'Ananya Shah',
    quote: 'The birthday party they arranged for my daughter was magical. Every child and parent was impressed!',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80'
  },
  {
    name: 'Vikram Technologies',
    quote: 'Our annual conference was handled with utmost professionalism. The setup was perfect and the service was excellent.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2149&q=80'
  }
];

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero 
        title="Create Unforgettable Celebrations"
        subtitle="From elegant weddings to corporate gatherings, let Vikash Vatika transform your vision into a remarkable event."
        image="https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
        buttonText="Plan Your Event"
        buttonLink="/events/wedding"
      />

      {/* Services Section */}
      <section className="py-16 bg-accent">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive event planning and management services to make your special occasions memorable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-serif text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link to={service.link} className="text-primary hover:underline font-medium">
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Featured Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our most popular event packages designed to make your celebration special.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/events">View All Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear what our clients have to say about their experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <h3 className="font-serif font-semibold">{testimonial.name}</h3>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Plan Your Event?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Contact us today to discuss your event needs and let us create a memorable experience for you and your guests.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="secondary" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link to="/events">Explore Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
