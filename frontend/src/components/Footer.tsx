
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-4">Vikash Vatika</h3>
            <p className="text-gray-300 mb-4">
              Premium event planning and management services for weddings, 
              birthdays, corporate events, and more. Making your special moments unforgettable.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/events/wedding" className="text-gray-300 hover:text-primary transition-colors">Weddings</Link>
              </li>
              <li>
                <Link to="/events/birthday" className="text-gray-300 hover:text-primary transition-colors">Birthday Parties</Link>
              </li>
              <li>
                <Link to="/events/corporate" className="text-gray-300 hover:text-primary transition-colors">Corporate Events</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/events/wedding/stage-decoration" className="text-gray-300 hover:text-primary transition-colors">
                  Stage Decoration
                </Link>
              </li>
              <li>
                <Link to="/events/wedding/gate-decoration" className="text-gray-300 hover:text-primary transition-colors">
                  Gate Decoration
                </Link>
              </li>
              <li>
                <Link to="/events/wedding/gallery-decoration" className="text-gray-300 hover:text-primary transition-colors">
                  Gallery Decoration
                </Link>
              </li>
              <li>
                <Link to="/events/wedding/mandap-decoration" className="text-gray-300 hover:text-primary transition-colors">
                  Mandap Decoration
                </Link>
              </li>
              <li>
                <Link to="/events/catering" className="text-gray-300 hover:text-primary transition-colors">
                  Catering Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-300">123 Wedding Lane, Celebration City, 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <span className="text-gray-300">info@vikashvatika.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Vikash Vatika. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
