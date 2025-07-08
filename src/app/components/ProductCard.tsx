import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Updated ProductType to match your API structure
export interface ProductType {
  id: number;
  name: string;
  imageUrl: string[];
  discount?: number;
  hot?: boolean;
  quantity?: number;
  categoryName?: string;
  price?: number;
}

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, imageUrl, discount, hot, price } = product;

  const handleProductClick = () => {
    // Store the product data in sessionStorage so the ProductPage can access it
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedProduct', JSON.stringify(product));
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log('Added to wishlist:', id);
  };

  return (
    <div className="group relative">
      <div className="relative w-full h-64 overflow-hidden mb-3">
        <Link href={`/product/${id}`} onClick={handleProductClick}>
          <div className="w-full h-full relative">
            <Image
              src={imageUrl && imageUrl.length > 0 ? imageUrl[0] : '/assets/placeholder.jpg'}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
            />
            
            {discount && (
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-sm z-10">
                -{discount}%
              </div>
            )}
            
            {hot && (
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded z-10">
                Hot
              </div>
            )}

            {/* Hover overlay effect similar to HomefixProductSection */}
            <div className="absolute inset-0 backdrop-blur-sm backdrop-filter opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
          </div>
        </Link>
        
        <button 
          className="absolute top-2 right-2 w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-md hover:bg-black hover:text-white transition-colors duration-200 z-10"
          onClick={handleWishlistClick}
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="text-center">
        <h3 className="text-base font-medium mb-1">
          <Link href={`/product/${product.id}`} className="hover:text-gray-700" onClick={handleProductClick}>
            {name}
          </Link>
        </h3>
        
        {price && (
          <div className="flex items-center justify-center space-x-1">
  {discount ? (
    <>
      <span className="text-gray-400 line-through text-sm">${price.toFixed(2)}</span>
      <span className="font-medium">${(price * (1 - discount / 100)).toFixed(2)}</span>
    </>
  ) : (
<span className="font-medium">
  ₹{Number(price).toFixed(2)}
</span>
  )}
</div>

        )}
        
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