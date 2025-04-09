
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import BackButton from '@/components/BackButton';
import { useNavigate } from 'react-router-dom';


const CartPage: React.FC = () => {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const { items } = state;
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Please login",
        description: "You need to be logged in to complete your booking",
        variant: "destructive"
      });
      return;
    }

   

    // clearCart();
    navigate('/checkoutpage');
  };

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="container-custom py-16">
        <BackButton className="mb-8" />

        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <h1 className="font-serif text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <BackButton className="mb-8" />

      <h1 className="font-serif text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="font-serif text-xl font-semibold">
                  Shopping Cart ({items.length} items)
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-gray-500 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear Cart
                </Button>
              </div>
            </div>

            <ul className="divide-y">
              {items.map((item) => (
                <li
                  key={item.eventId}
                  className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-gray-500 text-sm">{item.category}</p>
                    <p className="font-bold text-primary mt-1">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.eventId, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>

                    <span className="mx-3 w-8 text-center">{item.quantity}</span>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.eventId, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-destructive"
                    onClick={() => removeItem(item.eventId)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-serif text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.eventId} className="flex justify-between">
                  <span className="text-gray-600">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-medium">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <Button
              className="w-full"
              disabled={!items.length}
              onClick={handleCheckout}
            >
              {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
            </Button>

            <p className="text-sm text-gray-500 mt-4 text-center">
              By proceeding, you agree to our terms and conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
