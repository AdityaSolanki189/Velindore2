// ProductCard.jsx
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ProductCard = ({ 
  product = {
    id: '1',
    title: 'Product Title',
    price: 99.99,
    discountPrice: 79.99,
    rating: 4.5,
    image: '/assets/flower.jpg',
    category: 'Category',
    inStock: true,
  }
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const {
    id,
    title,
    price,
    discountPrice,
    rating,
    image,
    category,
    inStock
  } = product;
  
  const discount = price && discountPrice 
    ? Math.round((1 - discountPrice / price) * 100) 
    : 0;

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden transition-all duration-300 w-64 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge for discount */}
      {discount > 0 && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 z-10">
          {discount}% OFF
        </div>
      )}
      
      {/* Out of stock overlay */}
      {!inStock && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <span className="text-white text-lg font-bold">Out of Stock</span>
        </div>
      )}
      
      {/* Product image */}
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
      </div>
      
      {/* Product info */}
      <div className="p-4">
        {/* <span className="text-xs text-gray-500 uppercase">{category}</span> */}
        <h3 className="font-medium text-gray-900 mt-1 text-lg truncate">{title}</h3>
        
        {/* Rating */}
        {/* <div className="flex items-center mt-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({rating})</span>
        </div> */}
        
        {/* Price */}
        <div className="mt-2 flex items-center">
          {discountPrice ? (
            <>
              <span className="text-lg font-bold text-gray-900">${discountPrice.toFixed(2)}</span>
              <span className="ml-2 text-sm text-gray-500 line-through">${price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
          )}
        </div>
        
        {/* Button */}
        {/* <div className="mt-4 flex justify-between items-center">
          <Link 
            href={`/products/${id}`}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            View Details
          </Link>
          
          <button 
            className={`px-3 py-1 rounded text-sm font-medium ${
              inStock 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!inStock}
          >
            {inStock ? 'Add to Cart' : 'Sold Out'}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;