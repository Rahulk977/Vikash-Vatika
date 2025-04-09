
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Cloudinary } from '@cloudinary/url-gen';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from '@/components/ui/use-toast';

const cld = new Cloudinary({ cloud: { cloudName: 'dj5wygre5' } });

// Sample data
const weddingServices = [
  { id: 1, name: 'Elegant Stage Decoration', subcategory: 'stage', price: 85000, active: true },
  { id: 2, name: 'Royal Gate Decoration', subcategory: 'gate', price: 35000, active: true },
  { id: 3, name: 'Gallery Walkway Decoration', subcategory: 'gallery', price: 45000, active: true },
  { id: 4, name: 'Traditional Mandap Setup', subcategory: 'mandap', price: 70000, active: true },
  { id: 5, name: 'Complete Wedding Package', subcategory: 'complete', price: 200000, active: true },
  { id: 6, name: 'Wedding Reception Decor', subcategory: 'reception', price: 65000, active: true },
  { id: 7, name: 'Royal Stage Setup', subcategory: 'stage', price: 120000, active: true },
  { id: 8, name: 'Contemporary Mandap Design', subcategory: 'mandap', price: 85000, active: true },
];

const WeddingServicesTab = () => {
  const { toast } = useToast();
  const [newService, setNewService] = useState({
    name: '',
    subcategory: 'stage',
    price: 0,
    active: true,
    images: [],
    video: '',
    description: '',
    features: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService(prev => ({
      ...prev,
      [name]: name === 'price' ? (value === '' ? '' : Number(value)) : value
    }));
  };

  const [selectedFiles, setSelectedFiles] = useState({ image: [], video: null });

  const handleFileChange = (e, type) => {
    const files = e.target.files;
    if (files.length > 0) {
      setSelectedFiles(prev => ({
        ...prev,
        [type]: type === "image" ? Array.from(files) : files[0],
      }));
    }
  };
  
  const handleFileUpload = async (type) => {
    const files = selectedFiles[type];
    if (!files || (type === "image" && files.length === 0)) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }
  
    try {
      const uploadPromises = (type === "image" ? files : [files]).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "mswiresandcables");
  
        const res = await fetch(`https://api.cloudinary.com/v1_1/dulcnzla9/${type}/upload`, {
          method: "POST",
          body: formData,
        });
  
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(`Cloudinary Error: ${errorData.error?.message || "Unknown error"}`);
        }
  
        const data = await res.json();
        return data.secure_url;
      });
  
      const uploadedUrls = await Promise.all(uploadPromises);
      setNewService(prev => ({
        ...prev,
        [type === "image" ? "images" : "video"]: type === "image" ? uploadedUrls : uploadedUrls[0],
      }));
  
      toast({
        title: "Upload Successful",
        description: `Uploaded ${uploadedUrls.length} ${type}(s) successfully.`,
      });
  
      setSelectedFiles(prev => ({
        ...prev,
        [type]: type === "image" ? [] : null,
      }));
    } catch (error) {
      console.error("Upload Error:", error);
      toast({
        title: "Upload Error",
        description: error.message || "There was a problem uploading the file.",
        variant: "destructive",
      });
    }
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!newService.name || newService.price <= 0 || newService.images.length === 0) {
      toast({
        title: "Invalid input",
        description: "Please fill in all required fields with valid values",
        variant: "destructive",
      });
      return;
    }
  
    const subcategoryMap = {
      stage: "Stage Decoration",
      gate: "Gate Decoration",
      gallery: "Gallery Decoration",
      mandap: "Mandap Decoration",
    };
  
    try {
      const response = await fetch("http://localhost:5001/api/events/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newService.name,
          category: "Wedding",
          subcategory: subcategoryMap[newService.subcategory] || newService.subcategory,
          price: newService.price,
          images: newService.images,
          video: newService.video || "",
          description: newService.description,
          features: newService.features.split('\n').map(f => f.trim()).filter(f => f !== ""),
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      console.log("✅ Service added:", data);
  
      toast({
        title: "Service Added",
        description: `${newService.name} has been added to the wedding services.`,
      });
  
      setNewService({
        name: "",
        subcategory: "stage",
        price: 0,
        active: true,
        images: [],
        video: "",
        description: "",
        features: "",
      });
    } catch (error) {
      console.error("❌ Error adding service:", error);
  
      toast({
        title: "Error",
        description: error.message || "Failed to add service.",
        variant: "destructive",
      });
    }
  };
  
  const [services, setServices] = useState([]); // State to store services

  const toggleServiceStatus = (id) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, active: !service.active } : service
      )
    );
  
    const updatedService = services.find((s) => s.id === id);
    if (!updatedService) return;
  
    toast({
      title: updatedService.active ? "Service deactivated" : "Service activated",
      description: `${updatedService.name} has been ${updatedService.active ? "deactivated" : "activated"}`,
    });
  };
  
  
  
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="font-serif text-xl font-semibold mb-4">Add New Wedding Service</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-2">
      <label className="text-sm font-medium">Service Name*</label>
      <Input
        name="name"
        value={newService.name}
        onChange={handleInputChange}
        placeholder="Enter service name"
        required
      />
    </div>
    
    <div className="space-y-2">
      <label className="text-sm font-medium">Subcategory*</label>
      <select
        name="subcategory"
        value={newService.subcategory}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border rounded-md"
        required
      >
        <option value="">Select Subcategory</option>
        <option value="stage">Stage Decoration</option>
        <option value="mandap">Mandap Decoration</option>
        <option value="gate">Gate Decoration</option>
        <option value="gallery">Gallery Decoration</option>
        <option value="reception">Reception Decoration</option>
        <option value="complete">Complete Package</option>
      </select>
    </div>
    
    <div className="space-y-2">
      <label className="text-sm font-medium">Price (₹)*</label>
      <Input
        type="number"
        name="price"
        value={newService.price}
        onChange={handleInputChange}
        placeholder="Enter price"
        required
        min="0"
      />
    </div>
    
    <div className="flex items-center space-x-2 pt-8">
      <Checkbox 
        id="active" 
        checked={newService.active}
        onCheckedChange={(checked) => setNewService(prev => ({...prev, active: checked === true }))}
      />
      <label
        htmlFor="active"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Active
      </label>
    </div>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-2">
      <label className="text-sm font-medium">Main Image URL*</label>
      <Input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'image')} multiple />
<Button onClick={() => handleFileUpload('image')}>Upload Image</Button>
      <p className="text-xs text-gray-500">This will be the main image of the service</p>
    </div>
    
    <div className="space-y-2">
      <label className="text-sm font-medium">Video URL (optional)</label>
      <Input type="file" accept="video/*" onChange={(e) => handleFileChange(e, 'video')} />
      <Button onClick={() => handleFileUpload('video')}>Upload Video</Button>
      <p className="text-xs text-gray-500">Provide a public video URL</p>
    </div>
  </div>
  
  <div className="space-y-2">
    <label className="text-sm font-medium">Description*</label>
    <textarea
      name="description"
      value={newService.description}
      onChange={handleInputChange}
      placeholder="Enter service description"
      className="w-full px-3 py-2 border rounded-md"
      rows={3}
      required
    />
  </div>
  
  <div className="space-y-2">
    <label className="text-sm font-medium">Features (one per line)*</label>
    <textarea
      name="features"
      value={newService.features}
      onChange={handleInputChange}
      placeholder="Enter service features (one feature per line)"
      className="w-full px-3 py-2 border rounded-md"
      rows={4}
      required
    />
    <p className="text-xs text-gray-500">Enter each feature on a new line</p>
  </div>
  
  <Button type="submit">Add Service</Button>
</form>

      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="font-serif text-xl font-semibold mb-4">Wedding Services</h2>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Subcategory</TableHead>
                <TableHead>Price (₹)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.id}</TableCell>
                  <TableCell>{service.name}</TableCell>
                  <TableCell className="capitalize">{service.subcategory}</TableCell>
                  <TableCell>₹{service.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      service.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {service.active ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleServiceStatus(service.id)}
                      >
                        {service.active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-gray-500"
                      >
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default WeddingServicesTab;
