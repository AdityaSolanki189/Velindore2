'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomefixProductSection() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All Products']);
  const [loading, setLoading] = useState(true);

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
        
        const fetchedProducts = await response.json();
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
        
      const fetchedCategories = await response.json();
        
      const categoryNames = ['All Products', ...fetchedCategories.map((cat: { name: string }) => cat.name)];
        setCategories(categoryNames);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories(['All Products']);
      }
    };

    fetchCategories();
  }, []);

  const handleProductClick = (product: { id: string }) => {
  console.log('Navigating to product:', product.id);
  sessionStorage.setItem('selectedProduct', JSON.stringify(product));
  router.push(`/product/${product.id}`);
};


  const handleWishlistClick = (e: React.MouseEvent<HTMLButtonElement>, productId: string) => {
  e.preventDefault();
  e.stopPropagation();
  console.log('Added to wishlist:', productId);
};


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
                        src={product.imageUrl && product.imageUrl.length > 0 ? product.imageUrl[0] : '/assets/placeholder.jpg'} 
                        alt={product.name}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      
                      <div className="absolute inset-0 backdrop-blur-sm backdrop-filter opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 transition-all duration-500 group-hover:opacity-100 z-10">
                        <div className="flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <button 
                            className="bg-white bg-opacity-90 p-3 rounded-full hover:bg-black hover:text-white transition-colors shadow-md backdrop-filter backdrop-blur-sm"
                            onClick={(e) => handleWishlistClick(e, product.id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                          </button>
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