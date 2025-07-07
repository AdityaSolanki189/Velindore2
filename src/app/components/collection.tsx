'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchProductsByLabel } from "@/backend/services/products";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchProductsByLabel("Featured Collections");
        setProducts(result);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleProductClick = (product) => {
    sessionStorage.setItem("selectedProduct", JSON.stringify(product));
    router.push(`/product/${product.id}`);
  };

  return (
    <div className="w-full px-4 py-8">
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : products.length > 0 ? (
        <div className="flex justify-between flex-wrap gap-4 max-w-[1300px] mx-auto">
          {products.slice(0, 5).map((product, index) => (
            <div
              key={product.id || index}
              className="w-full sm:w-[48%] md:w-[30%] lg:w-[18%] bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300 text-center cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="w-full h-40 mb-4 rounded-lg overflow-hidden">
                <img
                  src={product.imageUrl || "/assets/photo-3.jpg"}
                  alt={product.name || "Product"}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {product.name || "Product Name"}
              </h3>
              {product.price && (
                <p className="text-md text-gray-700 font-medium mt-1">
                  ${parseFloat(product.price).toFixed(2)}
                </p>
              )}
            </div>
          ))}
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
