"use client";

import { useState, useEffect } from 'react';
import { Heart, Check, X, Box } from 'lucide-react';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  reviews: number;
  stock: number;
  categories: string[];
  tag: string;
}

type NavigationDirection = 'next' | 'prev';

export default function ProductPage() {
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  // Mock product data
  const product: Product = {
    id: 'IN0021',
    name: 'Purecomfort pillows & cushions',
    price: 20.00,
    description: 'Morbi vitae erat auctor, eleifend nunc a, lobortis neque. Praesent aliquam dignissim viverra. Maecenas lacus odio, feugiat eu nunc sit amet, maximus sagittis dolor',
    rating: 5,
    reviews: 1,
    stock: 98,
    categories: ['Carpets', 'Pillow', 'Sofa Cover'],
    tag: 'Carpets'
  };

  const images: string[] = [
    '/assets/bed room.jpg', 
    '/assets/image-2.png',
    '/assets/image-2.png',
    '/assets/image-1.png',
    '/assets/image-4.png',
    '/assets/image-3.png',
  ];

  const openLightbox = (index: number): void => {
    setSelectedImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = (): void => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: NavigationDirection): void => {
    if (direction === 'next') {
      setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else {
      setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent): void => {
    if (!lightboxOpen) return;
  
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      navigateImage('next');
    } else if (e.key === 'ArrowLeft') {
      navigateImage('prev');
    }
  };
  
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => handleKeyDown(e);
    
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = 'auto';
    };
  }, [lightboxOpen]);

  const handle3DView = () => {
    alert('3D Model viewer would open here!');
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4 font-sans">
        <div className="text-sm text-gray-600 mb-4">
          {product.tag}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div 
              className="w-full aspect-square border border-gray-200 mb-4 overflow-hidden cursor-pointer bg-white rounded-lg shadow-sm relative group"
              onClick={() => openLightbox(selectedImage)}
            >
              <img 
                src={images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
              
              {/* 3D Model Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handle3DView();
                }}
                className="absolute top-3 right-3 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110 group-hover:opacity-100 opacity-80"
                title="View 3D Model"
              >
                <Box className="w-6 h-6 text-gray-700 hover:text-black transition-colors" />
              </button>
            </div>
            
            <div className="grid grid-cols-6 gap-2">
              {images.map((image: string, index: number) => (
                <div 
                  key={index}
                  className={`aspect-square border ${selectedImage === index ? 'border-black border-2' : 'border-gray-200'} cursor-pointer overflow-hidden bg-white rounded`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 lg:pl-4">
            <h1 className="text-3xl font-bold mb-4 text-black">{product.name}</h1>
            
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i: number) => (
                <span key={i} className={`text-xl ${i < product.rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
              ))}
              <span className="ml-2 text-sm text-gray-600">({product.reviews} customer review)</span>
            </div>
            
            <div className="text-sm text-gray-600 mb-4">SKU: {product.id}</div>
            
            <div className="text-3xl text-black font-bold mb-4">${product.price.toFixed(2)}</div>
            
            <div className="mb-6 text-gray-600 leading-relaxed">
              <p>{product.description} <a href="#" className="text-black font-semibold">Read More</a></p>
            </div>
            
            <div className="flex items-center mb-6 text-green-600">
              <Check className="w-5 h-5 mr-2" />
              <span>{product.stock} in stock</span>
            </div>
            
            <div className="flex gap-3 mb-6">
              <div className="w-20">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full h-12 px-2 text-center border text-black border-gray-300 rounded"
                />
              </div>
              
              <button className="flex-1 bg-black text-white h-12 font-semibold rounded hover:bg-gray-800 transition-colors">
                ADD TO CART
              </button>
              
              <button 
  className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded hover:border-black transition-colors"
  onClick={() => setIsFavorite(!isFavorite)}
>
  <Heart 
    className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${isFavorite ? 'fill-red-500 text-red-500' : 'stroke-gray-500'}`} 
    stroke={isFavorite ? 'none' : 'gray'} 
    strokeWidth={1.5}
  />
</button>

            </div>
            
            <div className="mb-4 text-sm text-gray-600">
              <span>Categories: </span>
              {product.categories.map((category: string, index: number) => (
                <span key={index} className="text-black">
                  {category}{index < product.categories.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
            
            <div className="mb-4 text-sm text-gray-600">
              <span>Tag: </span>
              <span className="text-black">{product.tag}</span>
            </div>
            
            <button className="w-full bg-black text-white py-3 mb-6 font-semibold rounded hover:bg-gray-800 transition-colors">
              BUY IT NOW
            </button>
            
            <div className="mb-6">
              <img 
                src="/api/placeholder/300/40" 
                alt="Payment methods"
                className="h-10"
              />
            </div>
            
            <div className="border border-gray-200 p-4 rounded mt-6">
              <div className="flex items-center mb-2">
                <span className="mr-2 text-xl">🔥</span>
                <span className="text-red-500 font-semibold">SPECIAL OFFERS</span>
              </div>
              <div className="text-sm text-gray-800">
                Get 1,000/- Off on your first order!! USE CODE HEY1000
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </button>
            
            <button 
              onClick={() => navigateImage('prev')}
              className="absolute left-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <span className="text-2xl px-1">&lsaquo;</span>
            </button>
            
            <button 
              onClick={() => navigateImage('next')}
              className="absolute right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <span className="text-2xl px-1">&rsaquo;</span>
            </button>
            
            <div className="w-full h-full max-w-4xl max-h-4xl flex items-center justify-center">
              <div className="relative w-full h-full max-w-3xl max-h-3xl">
                <img 
                  src={images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black bg-opacity-50 py-2 mx-4 rounded">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}