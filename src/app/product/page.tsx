"use client";

import { useState } from 'react';
import { Heart, Check } from 'lucide-react';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data
  const product = {
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

  const images = [
    '/assets/bed room.jpg', 
    '/assets/image-2.png',
    '/assets/image-2.png',
    '/assets/image-1.png',
    '/assets/image-4.png',
    '/assets/image-3.png',
  ];

  return (
    <>
    <Navbar />
    <div className="max-w-6xl mx-auto p-4 font-sans">
      <div className="text-sm text-gray-600 mb-4">
        {product.tag}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="border border-gray-200 mb-4 overflow-hidden">
            <img 
              src={images[selectedImage]} 
              alt={product.name}
              className="w-full h-auto object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {images.map((image, index) => (
              <div 
                key={index}
                className={`border ${selectedImage === index ? 'border-black border-2' : 'border-gray-200'} cursor-pointer overflow-hidden`}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4 text-black">{product.name}</h1>
          
          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
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
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full h-12 px-2 text-center border border-gray-300 rounded"
              />
            </div>
            
            <button className="flex-1 bg-black text-white h-12 font-semibold rounded hover:bg-gray-800 transition-colors">
              ADD TO CART
            </button>
            
            <button 
              className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded hover:border-black transition-colors"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
          
          <div className="mb-4 text-sm text-gray-600">
            <span>Categories: </span>
            {product.categories.map((category, index) => (
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


            <Footer />
    </>
  );
}