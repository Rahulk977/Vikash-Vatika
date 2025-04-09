
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGallery = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="aspect-square overflow-hidden rounded-md cursor-pointer" 
            onClick={() => openGallery(index)}
          >
            <img 
              src={image} 
              alt={`Gallery image ${index + 1}`} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
            />
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 max-w-5xl w-screen h-screen max-h-[90vh] flex items-center justify-center bg-black">
          <button 
            onClick={() => setOpen(false)} 
            className="absolute right-4 top-4 z-50 text-white bg-black/50 p-2 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
          
          <button 
            onClick={handlePrevious} 
            className="absolute left-4 z-10 text-white bg-black/50 p-2 rounded-full"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            onClick={handleNext} 
            className="absolute right-4 z-10 text-white bg-black/50 p-2 rounded-full"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          <div className="w-full h-full flex items-center justify-center">
            <img 
              src={images[currentIndex]} 
              alt={`Gallery image ${currentIndex + 1}`} 
              className="max-w-full max-h-full object-contain" 
            />
          </div>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="bg-black/70 px-4 py-2 rounded-full text-white text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
