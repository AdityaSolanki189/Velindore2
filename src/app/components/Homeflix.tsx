// import Link from 'next/link';
import { useState } from 'react';

export default function HomefixProductSection() {
  const [activeCategory, setActiveCategory] = useState('All Products');

  const categories = [
    'All Products',
    'Cushions',
    'Mattresses',
    'Curtains',
    'Sofa cover',
    'Carpets'
  ];

  const products = [
    {
      id: 1,
      name: 'Adjustable Leather Sofa Set',
      price: 35.00,
      oldPrice: 40.00,
      discount: 13,
      image: '/assets/photo-1.jpg',
      hot: true
    },
    {
      id: 2,
      name: 'Purecomfort Pillows & Cushions',
      price: 20.00,
      image: '/assets/photo-1.jpg',
    },
    {
      id: 3,
      name: 'Adventure Carpet Ready',
      price: 15.00,
      maxPrice: 26.00,
      image: '/assets/photo-1.jpg',
    },
    {
      id: 4,
      name: 'Modern Wall Art Frames',
      price: 45.00,
      image: '/assets/photo-2.jpg',
    },
    {
      id: 5,
      name: 'Luxury Curtain Set',
      price: 32.00,
      oldPrice: 38.00,
      discount: 16,
      image: '/assets/photo-3.jpg',
    },
    {
      id: 6,
      name: 'Designer Throw Pillows',
      price: 18.50,
      image: '/assets/photo-2.jpg',
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 text-black">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/5">
          <div className="space-y-2">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className={`p-4 border border-gray-500 rounded-md cursor-pointer transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-black text-white' 
                    : 'hover:bg-black hover:text-white'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {index === 0 && <span className="mr-2">•</span>}
                {category}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-4/5 text-black">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="relative overflow-hidden">
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded z-10">
                      -{product.discount}%
                    </div>
                  )}
                  {product.hot && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-medium px-4 py-1 rounded z-10">
                      Hot
                    </div>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 backdrop-blur-sm backdrop-filter opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 transition-all duration-500 group-hover:opacity-100 z-10">
                    <button className="bg-white bg-opacity-90 text-black px-8 py-3 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-black hover:text-white backdrop-filter backdrop-blur-sm">
                      ADD TO CART
                    </button>
                    
                    <div className="flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <button className="bg-white bg-opacity-90 p-3 rounded-full hover:bg-black hover:text-white transition-colors shadow-md backdrop-filter backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </button>
                      {/* <button className="bg-white bg-opacity-90 p-3 rounded-full hover:bg-black hover:text-white transition-colors shadow-md backdrop-filter backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button className="bg-white bg-opacity-90 p-3 rounded-full hover:bg-black hover:text-white transition-colors shadow-md backdrop-filter backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                        </svg>
                      </button> */}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 space-y-1">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <div className="flex items-center">
                    {product.oldPrice ? (
                      <>
                        <span className="font-semibold">${product.price.toFixed(2)}</span>
                        <span className="ml-2 text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
                      </>
                    ) : product.maxPrice ? (
                      <span className="font-semibold">${product.price.toFixed(2)} – ${product.maxPrice.toFixed(2)}</span>
                    ) : (
                      <span className="font-semibold">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}