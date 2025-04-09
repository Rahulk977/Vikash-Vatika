import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';

interface Address {
  id: number;
  name: string;
  email: string;
  phone: string;
  altPhone: string;
  flat: string;
  street: string;
  landmark: string;
  zipcode: string;
}

export default function CheckoutPage() {
  const { state, clearCart } = useCart();
  const { items: cartItems } = state;

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [form, setForm] = useState<Address>({
    id: Date.now(),
    name: '',
    email: '',
    phone: '',
    altPhone: '',
    flat: '',
    street: '',
    landmark: '',
    zipcode: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (!form.name || !form.email || !form.phone || !form.flat || !form.street || !form.zipcode) {
      alert('Please fill all required fields!');
      return;
    }
    if (isEditing) {
      setAddresses((prev) => prev.map((addr) => (addr.id === form.id ? form : addr)));
      setIsEditing(false);
    } else {
      setAddresses((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setForm({
      id: Date.now(),
      name: '',
      email: '',
      phone: '',
      altPhone: '',
      flat: '',
      street: '',
      landmark: '',
      zipcode: '',
    });
  };

  const handleEdit = (address: Address) => {
    setForm(address);
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    if (selectedAddressId === id) {
      setSelectedAddressId(null);
    }
  };

  const handleSelect = (id: number) => {
    setSelectedAddressId(id);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast({
        title: 'No address selected',
        description: 'Please select an address before placing the order.',
        variant: 'destructive',
      });
      return;
    }
  
    if (cartItems.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Please add items to your cart before checking out.',
        variant: 'destructive',
      });
      return;
    }
  
    const selectedAddress = addresses.find((addr) => addr.id === selectedAddressId);
    const orderId = `ORD-${Date.now()}`;
  
    // Format cart items to match backend schema
    const formattedItems = cartItems.map((item) => ({
      eventId: item.eventId,
      name: item.name,
      category: item.category,
      subcategory: item.subcategory,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    }));
  
    const orderData = {
      order_id: orderId,
      address: selectedAddress,
      items: formattedItems,
      total_amount: formattedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    };
  
    try {
      const response = await fetch('http://localhost:5001/api/orders/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(orderData),
      });
  
      if (response.ok) {
        toast({
          title: 'Order Placed!',
          description: `Your order ${orderId} has been placed successfully.`,
        });
  
        clearCart(); // ✅ Clear cart only after successful order
      } else {
        toast({
          title: 'Order Failed',
          description: 'Something went wrong while placing your order.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: 'Network Error',
        description: 'Could not connect to server. Please try again later.',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Address Form */}
      <Card className="mb-10">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-6">{isEditing ? 'Edit Address' : 'Add New Address'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Name', name: 'name', placeholder: 'John Doe' },
              { label: 'Email', name: 'email', placeholder: 'john@example.com' },
              { label: 'Phone Number', name: 'phone', placeholder: '1234567890' },
              { label: 'Alternate Phone Number', name: 'altPhone', placeholder: '0987654321' },
              { label: 'Flat / Building', name: 'flat', placeholder: 'Flat 101, Sunshine Residency' },
              { label: 'Street', name: 'street', placeholder: 'MG Road' },
              { label: 'Landmark', name: 'landmark', placeholder: 'Near Big Bazaar' },
              { label: 'Zipcode', name: 'zipcode', placeholder: '400001' },
            ].map(({ label, name, placeholder }) => (
              <div key={name}>
                <Label>{label}</Label>
                <Input
                  name={name}
                  value={(form as any)[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>
          <Button className="mt-6" onClick={handleAddOrUpdate}>
            {isEditing ? 'Update Address' : 'Add Address'}
          </Button>
        </CardContent>
      </Card>

      {/* Address List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Select Delivery Address</h2>
        {addresses.length === 0 && <p className="text-gray-500">No address added yet.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <Card
              key={address.id}
              className={`cursor-pointer transition-all ${
                selectedAddressId === address.id ? 'border-2 border-blue-500 shadow-lg' : ''
              }`}
              onClick={() => handleSelect(address.id)}
            >
              <CardContent className="p-6 space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{address.name}</h3>
                    <p className="text-sm text-gray-500">{address.email}</p>
                    <p className="text-sm">
                      {address.phone} {address.altPhone && `/ ${address.altPhone}`}
                    </p>
                  </div>
                </div>
                <hr />
                <div>
                  <p className="font-semibold">{address.flat}</p>
                  <p>{address.street}</p>
                  {address.landmark && <p>{address.landmark}</p>}
                  <p>{address.zipcode}</p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); handleEdit(address); }}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); handleDelete(address.id); }}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cart Items */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.eventId} className="flex justify-between border p-4 rounded">
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <div className="font-bold">₹{item.price * item.quantity}</div>
              </div>
            ))}
            <div className="text-right font-bold text-lg">
              Total: ₹{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </div>
          </div>
        )}
      </div>

      {/* Selected Address and Place Order */}
      <div className="mt-12">
        {selectedAddressId && (
          <div className="p-6 border-2 border-green-400 rounded-lg bg-green-100 text-green-800 mb-6">
            <h3 className="font-bold text-xl mb-2">Deliver To:</h3>
            {(() => {
              const a = addresses.find((addr) => addr.id === selectedAddressId);
              return a && (
                <>
                  <p>{a.name}</p>
                  <p>{a.phone}</p>
                  <p>{a.flat}, {a.street}</p>
                  {a.landmark && <p>{a.landmark}</p>}
                  <p>{a.zipcode}</p>
                </>
              );
            })()}
          </div>
        )}
        <Button className="w-full text-lg py-6" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </div>
    </div>
  );
}
