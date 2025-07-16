'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Define the Product interface
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string[];
  discount?: number;
  hot?: boolean;
  categoryName?: string;
}

// Define the Category interface
interface Category {
  name: string;
}

export default function HomefixProductSection() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('All Products');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['All Products']);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = '/api/products';
        if (activeCategory !== 'All Products') {
          url = `/api/products?category=${encodeURIComponent(activeCategory)}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const fetchedProducts: Product[] = await response.json();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const fetchedCategories: Category[] = await response.json();
        
        const categoryNames = ['All Products', ...fetchedCategories.map((cat: Category) => cat.name)];
        setCategories(categoryNames);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories(['All Products']);
      }
    };

    fetchCategories();
  }, []);

  const handleProductClick = (product: Product) => {
    // Using localStorage instead of sessionStorage (you can change this back if needed)
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    router.push(`/product/${product.id}`);
  };

  // const handleWishlistClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   // console.log('Added to wishlist:', productId);
  // };

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
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-lg">Loading products...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="block">
                  <div 
                    className="group relative cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    {/* Fixed image container with proper positioning and dimensions */}
                    <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square">
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
                      
                      <Image 
                        src={(product.imageUrl?.[0]?.trim()) || '/assets/placeholder.jpg'} 
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/assets/placeholder.jpg';
                        }}
                      />
                      
                      <div className="absolute inset-0 bg-opacity-20 backdrop-blur-sm opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 transition-all duration-500 group-hover:opacity-100 z-10">
                        <div className="flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <Image
                            src="/assets/LOGO-PNG.png"
                            alt="Logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 space-y-1">
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <div className="flex items-center">
                        <span className="font-semibold">
                          ${Number(product.price).toFixed(2)}
                        </span>

                        {product.categoryName && (
                          <span className="ml-2 text-xs text-gray-500 capitalize">({product.categoryName})</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}