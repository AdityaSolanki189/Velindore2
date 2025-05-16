import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductType } from '../accessories/page';

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, minPrice, maxPrice, images, discount, isNew } = product;

  return (
    <div className="group relative">
      <div className="relative w-full h-64 overflow-hidden mb-3">
        <Link href={`/product`}>
          <div className="w-full h-full relative">
            <Image
              src={images[0]}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
            />
            
            {discount && (
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-sm">
                -{discount}%
              </div>
            )}
            
            {isNew && (
              <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-sm">
                NEW
              </div>
            )}
          </div>
        </Link>
        
        <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors duration-200">
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      
      <div className="text-center">
        <h3 className="text-base font-medium mb-1">
          <Link href={`/product`} className="hover:text-gray-700">
            {name}
          </Link>
        </h3>
        
        <div className="flex items-center justify-center space-x-1">
          {discount ? (
            <>
              <span className="text-gray-400 line-through text-sm">${minPrice.toFixed(2)}</span>
              <span className="font-medium">${(minPrice * (1 - discount / 100)).toFixed(2)}</span>
            </>
          ) : (
            <span className="font-medium">
              ${minPrice.toFixed(2)}
              {maxPrice && ` - $${maxPrice.toFixed(2)}`}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-center mt-1">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;