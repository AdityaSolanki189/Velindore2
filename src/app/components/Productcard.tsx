import { useState } from 'react';
import Link from 'next/link';
// import Image from 'next/image';

const ProductCard = ({ 
  product = {
    id: 0,
    name: '',
    price: 0,
    oldPrice: null,
    maxPrice: null,
    discount: null,
    image: '',
    slug: '',
    isHot: false
  }
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Product Image Container */}
      <div 
        className="relative overflow-hidden mb-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-none z-10">
            -{product.discount}%
          </div>
        )}
        
        {/* Hot Badge */}
        {product.isHot && (
          <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-none z-10">
            Hot
          </div>
        )}
        
        {/* Product Image */}
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        
        {/* Hover Overlay with Add to Cart and Action Buttons */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col items-center justify-center gap-4">
            {/* Add to Cart Button */}
            <button className="bg-white text-black font-medium px-8 py-2 rounded-full hover:bg-gray-100 transition-colors">
              ADD TO CART
            </button>
            
            {/* Action Icons */}
            <div className="flex gap-2">
              {/* Wishlist Button */}
              <button className="bg-white rounded-full p-3 hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
              
              {/* Quick View Button */}
              <button className="bg-white rounded-full p-3 hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
              
              {/* Compare Button */}
              <button className="bg-white rounded-full p-3 hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="3" y1="15" x2="21" y2="15"></line>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <Link href={`/product/${product.slug || product.id}`} className="block">
        <h3 className="text-gray-900 font-medium text-lg mb-2 hover:text-black transition-colors">
          {product.name}
        </h3>
      </Link>
      
      {/* Price Display */}
      <div className="flex items-center">
        {product.oldPrice ? (
          // Discounted price
          <>
            <span className="font-semibold text-base">${product.price.toFixed(2)}</span>
<span className="ml-2 text-gray-500 line-through text-base">
  ${(product.oldPrice as number).toFixed(2)}
</span>
          </>
        ) : product.maxPrice ? (
          // Price range
<span className="font-semibold text-base">
  ${(product.price as number).toFixed(2)} – ${(product.maxPrice as number).toFixed(2)}
</span>
        ) : (
          // Regular price
          <span className="font-semibold text-base">${product.price.toFixed(2)}</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;