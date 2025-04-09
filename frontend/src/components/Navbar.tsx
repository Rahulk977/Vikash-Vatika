import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/* <img src="/logo.png" alt="Vikash Vatika" className="h-10 w-auto" /> */}
            <span className="font-serif text-xl font-bold text-primary">Vikash Vatika</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium">Home</Link>

            {/* Wedding Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-700 hover:text-primary font-medium bg-transparent">
                  Wedding Services
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={() => navigate('/wedding')}>
                  All Wedding Services
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/wedding-decoration/stage')}>
                  Stage Decoration
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/wedding-decoration/mandap')}>
                  Mandap Decoration
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/wedding-decoration/gate')}>
                  Gate Decoration
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/wedding-decoration/gallery')}>
                  Gallery Decoration
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/wedding-decoration/reception')}>
                  Reception Decoration
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/wedding-decoration/complete')}>
                  Complete Packages
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/events/birthday" className="text-gray-700 hover:text-primary font-medium">Birthday</Link>
            <Link to="/events/corporate" className="text-gray-700 hover:text-primary font-medium">Corporate</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary font-medium">Contact</Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-primary" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-primary text-white" variant="destructive">
                  {totalItems}
                </Badge>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/bookings')}>
                    My Bookings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button variant="default" size="sm" onClick={() => navigate('/register')}>
                  Register
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative mr-4">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-primary text-white" variant="destructive">
                  {totalItems}
                </Badge>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t mt-4 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 py-2 px-3 rounded-md hover:bg-accent">Home</Link>

              {/* Wedding Services Section */}
              <div className="border-t border-b py-2">
                <div className="px-3 py-1 text-sm font-medium text-gray-500">Wedding Services</div>
                <Link to="/wedding" className="text-gray-700 py-1 px-6 block hover:bg-accent">All Wedding Services</Link>
                <Link to="/wedding-decoration/stage" className="text-gray-700 py-1 px-6 block hover:bg-accent">Stage Decoration</Link>
                <Link to="/wedding-decoration/mandap" className="text-gray-700 py-1 px-6 block hover:bg-accent">Mandap Decoration</Link>
                <Link to="/wedding-decoration/gate" className="text-gray-700 py-1 px-6 block hover:bg-accent">Gate Decoration</Link>
                <Link to="/wedding-decoration/gallery" className="text-gray-700 py-1 px-6 block hover:bg-accent">Gallery Decoration</Link>
                <Link to="/wedding-decoration/reception" className="text-gray-700 py-1 px-6 block hover:bg-accent">Reception Decoration</Link>
                <Link to="/wedding-decoration/complete" className="text-gray-700 py-1 px-6 block hover:bg-accent">Complete Packages</Link>
              </div>

              <Link to="/events/birthday" className="text-gray-700 py-2 px-3 rounded-md hover:bg-accent">Birthday</Link>
              <Link to="/events/corporate" className="text-gray-700 py-2 px-3 rounded-md hover:bg-accent">Corporate</Link>
              <Link to="/contact" className="text-gray-700 py-2 px-3 rounded-md hover:bg-accent">Contact</Link>

              {isAuthenticated ? (
                <>
                  <div className="text-sm text-gray-500 px-3">Signed in as {user?.name}</div>
                  {isAdmin && (
                    <Link to="/admin" className="text-gray-700 py-2 px-3 rounded-md hover:bg-accent">
                      Admin Dashboard
                    </Link>
                  )}
                  <Link to="/profile" className="text-gray-700 py-2 px-3 rounded-md hover:bg-accent">
                    My Profile
                  </Link>
                  <Link to="/bookings" className="text-gray-700 py-2 px-3 rounded-md hover:bg-accent">
                    My Bookings
                  </Link>
                  <Button
                    variant="ghost"
                    className="justify-start text-gray-700 hover:bg-accent hover:text-gray-700 py-2 px-3 h-auto font-normal"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Button variant="outline" onClick={() => navigate('/login')}>Login</Button>
                  <Button variant="default" onClick={() => navigate('/register')}>Register</Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
