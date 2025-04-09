
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/BackButton';
import WeddingServicesTab from '@/components/admin/WeddingServicesTab';

// Sample data
const bookings = [
  { 
    id: 'B001', 
    customer: 'Priya Sharma', 
    event: 'Wedding Reception', 
    date: '2023-12-15', 
    amount: 125000,
    status: 'Confirmed'
  },
  { 
    id: 'B002', 
    customer: 'Rajat Mehta', 
    event: 'Corporate Conference', 
    date: '2023-11-05', 
    amount: 85000,
    status: 'Pending'
  },
  { 
    id: 'B003', 
    customer: 'Ananya Patel', 
    event: 'Birthday Party', 
    date: '2023-11-20', 
    amount: 35000,
    status: 'Confirmed'
  },
  { 
    id: 'B004', 
    customer: 'Vikram Singh', 
    event: 'Wedding Ceremony', 
    date: '2023-12-10', 
    amount: 150000,
    status: 'Confirmed'
  },
];

const AdminDashboard = () => {
  const { isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [newMedia, setNewMedia] = useState({
    title: '',
    category: 'wedding',
    type: 'image',
    file: null as File | null
  });
  
  React.useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You must be an admin to access this page",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [isAuthenticated, isAdmin, navigate, toast]);
  
  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMedia(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewMedia(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };
  
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMedia.title || !newMedia.file) {
      toast({
        title: "Error",
        description: "Please fill in all fields and select a file",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate upload
    toast({
      title: "Upload successful",
      description: `${newMedia.type} has been uploaded successfully`,
    });
    
    // Reset form
    setNewMedia({
      title: '',
      category: 'wedding',
      type: 'image',
      file: null
    });
  };
  
  const handleBookingStatusChange = (id: string, status: string) => {
    toast({
      title: "Status updated",
      description: `Booking ${id} status changed to ${status}`,
    });
  };
  
  if (!isAuthenticated || !isAdmin) {
    return null;
  }
  
  return (
    <div className="container-custom py-12">
      <BackButton className="mb-8" />
      
      <h1 className="font-serif text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="bookings">
        <TabsList className="mb-8">
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="wedding-services">Wedding Services</TabsTrigger>
          <TabsTrigger value="upload">Upload Media</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookings">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-serif text-xl font-semibold mb-4">Recent Bookings</h2>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.id}</TableCell>
                      <TableCell>{booking.customer}</TableCell>
                      <TableCell>{booking.event}</TableCell>
                      <TableCell>{booking.date}</TableCell>
                      <TableCell>₹{booking.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          booking.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleBookingStatusChange(booking.id, 'Confirmed')}
                          >
                            Confirm
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-gray-500"
                            onClick={() => handleBookingStatusChange(booking.id, 'Cancelled')}
                          >
                            Cancel
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="wedding-services">
          <WeddingServicesTab />
        </TabsContent>
        
        <TabsContent value="upload">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-serif text-xl font-semibold mb-4">Upload Media</h2>
            
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    name="title"
                    value={newMedia.title}
                    onChange={handleMediaChange}
                    placeholder="Enter a title for the media"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select
                    name="category"
                    value={newMedia.category}
                    onChange={handleMediaChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  >
                    <option value="wedding">Wedding</option>
                    <option value="birthday">Birthday</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Media Type</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="image"
                      checked={newMedia.type === 'image'}
                      onChange={handleMediaChange}
                      className="mr-2"
                    />
                    Image
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="video"
                      checked={newMedia.type === 'video'}
                      onChange={handleMediaChange}
                      className="mr-2"
                    />
                    Video
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Upload File</label>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  accept={newMedia.type === 'image' ? 'image/*' : 'video/*'}
                  required
                />
              </div>
              
              <Button type="submit">Upload Media</Button>
            </form>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-serif text-xl font-semibold mb-4">Settings</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <Input defaultValue="Vikash Vatika" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Email</label>
                <Input defaultValue="info@vikashvatika.com" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Phone</label>
                <Input defaultValue="+91 98765 43210" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Currency</label>
                  <select className="w-full px-3 py-2 border rounded-md">
                    <option value="INR">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tax Rate (%)</label>
                  <Input type="number" defaultValue="18" />
                </div>
              </div>
              
              <Button>Save Settings</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
