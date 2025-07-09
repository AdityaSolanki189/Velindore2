'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { fetchProductsByLabel } from "@/backend/services/products";

type Product = {
  id: string | number;
  name?: string;
  price?: number;
  imageUrl?: string;
};

const Collection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchProductsByLabel("Featured Collections");
        console.log("Fetched products:", result); // Debug log
        setProducts(result);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleProductClick = (product: Product) => {
    sessionStorage.setItem("selectedProduct", JSON.stringify(product));
    router.push(`/product/${product.id}`);
  };

  // Helper function to validate image URL
  const getImageSrc = (imageUrl?: string) => {
    if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === '') {
      return "/assets/photo-3.jpg";
    }
    
    // Check if it's a valid URL format
    try {
      new URL(imageUrl);
      return imageUrl;
    } catch {
      // If it's not a valid URL, assume it's a relative path
      return imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    }
  };

  return (
    <div className="w-full px-4 py-8">
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : products.length > 0 ? (
        <div className="flex justify-between flex-wrap gap-4 max-w-[1300px] mx-auto">
          {products.slice(0, 5).map((product, index) => {
            const imageSrc = getImageSrc(product.imageUrl);
            console.log(`Product ${product.id} image URL:`, product.imageUrl, "-> Using:", imageSrc); // Debug log
            
            return (
              <div
                key={product.id || index}
                className="w-full sm:w-[48%] md:w-[30%] lg:w-[18%] bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300 text-center cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="w-full h-40 mb-4 rounded-lg overflow-hidden relative">
                  <Image
                    src={imageSrc}
                    alt={product.name || "Product"}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      console.error('Image failed to load:', imageSrc);
                      // Fallback to default image
                      e.currentTarget.src = "/assets/photo-3.jpg";
                    }}
                    unoptimized={imageSrc.startsWith('http')} // For external URLs
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name || "Product Name"}
                </h3>
                {product.price && (
                  <p className="text-md text-gray-700 font-medium mt-1">
                    ${parseFloat(product.price.toString()).toFixed(2)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-400">
          No products found for Featured Collections.
        </p>
      )}
    </div>
  );
};

export default Collection;