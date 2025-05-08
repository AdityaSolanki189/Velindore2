import Link from 'next/link';
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
                <div className="relative overflow-hidden ">
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-red-600 text-black text-xs font-medium px-2 py-1 rounded z-10">
                      -{product.discount}%
                    </div>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full lg:w-72 h-84 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center opacity-0 transition-all w-[294px] duration-500 origin-top group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0">
                    <Link href='/product' className="bg-white text-black px-4 py-2  font-medium transform translate-y-4 group-hover:translate-y-0 rounded-xl transition-transform duration-300">
                      Quick View
                    </Link>
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