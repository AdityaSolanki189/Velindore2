"use client";

import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const sortingOptions = [
  "default",
  "price-low",
  "price-high",
  "newest",
  "popularity",
] as const;
type SortingType = (typeof sortingOptions)[number];

// Updated ProductType to match your API structure
export type ProductType = {
  id: number;
  name: string;
  imageUrl: string[];
  discount?: number;
  hot?: boolean;
  description?: string;
  quantity?: number;
  categoryName?: string;
  price?: number;
};

export type CategoryType = {
  id: number;
  name: string;
  count?: number;
};

const Accessories: NextPage = () => {
  const [sorting, setSorting] = useState<SortingType>("default");
  const [filterOpen, setFilterOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Products");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  interface Category {
    id: number;
    name: string;
    count: number;
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const categoriesData: Category[] = await response.json();

        const sanitizedCategories = categoriesData.map((category) => ({
          id: category.id || 0,
          name: category.name || "Unknown Category",
          count: category.count || 0,
        }));

        setCategories(sanitizedCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  // Fetch all products on component mount
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const productsData = await response.json();

        const sanitizedProducts = productsData.map((product: ProductType) => {
          const p = product 
          return {
            id: p.id || 0,
            name: p.name || "Unnamed Product",
            imageUrl: Array.isArray(p.imageUrl) ? p.imageUrl : [],
            discount: p.discount,
            hot: p.hot || false,
            description: p.description,
            quantity: p.quantity,
            categoryName: p.categoryName,
            price: p.price || 0,
          };
        });

        setAllProducts(sanitizedProducts);
        setProducts(sanitizedProducts); // Initially show all products
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Filter products when category changes
  useEffect(() => {
    if (selectedCategory === "All Products") {
      setProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter(
        (product) => product.categoryName === selectedCategory
      );
      setProducts(filteredProducts);
    }
  }, [selectedCategory, allProducts]);

  // Calculate dynamic category counts based on actual products
  const getCategoryCount = (categoryName: string): number => {
    if (categoryName === "All Products") {
      return allProducts.length;
    }
    return allProducts.filter(
      (product) => product.categoryName === categoryName
    ).length;
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortingType;
    if (sortingOptions.includes(value)) {
      setSorting(value);
    } else {
      console.error("Invalid sorting value:", value);
    }
  };

  const toggleFilters = () => {
    setFilterOpen(!filterOpen);
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    // Close mobile filter menu after selection
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setFilterOpen(false);
    }
  };

  // Sort products based on selected sorting option
  const sortedProducts = React.useMemo(() => {
    const productsCopy = [...products];

    switch (sorting) {
      case "price-low":
        return productsCopy.sort((a, b) => (a.price || 0) - (b.price || 0));
      case "price-high":
        return productsCopy.sort((a, b) => (b.price || 0) - (a.price || 0));
      case "newest":
        return productsCopy.sort((a, b) => (b.hot ? 1 : 0) - (a.hot ? 1 : 0));
      case "popularity":
        return productsCopy.sort(
          (a, b) => (b.discount || 0) - (a.discount || 0)
        );
      default:
        return productsCopy;
    }
  }, [products, sorting]);

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Home Accessories - Homeflix</title>
        <meta
          name="description"
          content="Browse our collection of home accessories"
        />
      </Head>

      <Navbar />

      <div className="container mx-auto px-4 text-black font-sans">
        <div className="py-4 md:py-8">
          <h1 className="text-xl md:text-2xl font-bold mb-4">
            Product categories
          </h1>

          {/* Mobile Filter Toggle Button - Only visible on small screens */}
          <div className="md:hidden mb-4">
            <button
              onClick={toggleFilters}
              className="w-full py-2 bg-gray-100 border border-gray-300 rounded flex justify-between items-center px-4"
            >
              <span className="font-medium">Filters</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transform transition-transform ${
                  filterOpen ? "rotate-180" : ""
                }`}
              >
                <path d="M6 9L0 3H12L6 9Z" fill="currentColor" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:gap-8">
            {/* Product Categories Sidebar */}
            <div
              className={`w-full md:w-1/4 ${
                filterOpen ? "block" : "hidden"
              } md:block`}
            >
              <div className="bg-white md:bg-transparent p-4 md:p-0 rounded-lg shadow-md md:shadow-none">
                <h3 className="text-lg font-bold mb-2 md:hidden">Categories</h3>
                <ul>
                  {/* All Products option */}
                  <li className="mb-3 flex items-center">
                    <span className="mr-2">○</span>
                    <button
                      onClick={() => handleCategoryClick("All Products")}
                      className={`hover:text-gray-600 text-sm md:text-base text-left ${
                        selectedCategory === "All Products"
                          ? "font-bold text-blue-600"
                          : ""
                      }`}
                    >
                      All Products
                    </button>
                    <span className="ml-auto text-sm">
                      ({getCategoryCount("All Products")})
                    </span>
                  </li>

                  {/* Dynamic categories from API */}
                  {categories.map((category) => (
                    <li key={category.id} className="mb-3 flex items-center">
                      <span className="mr-2">○</span>
                      <button
                        onClick={() => handleCategoryClick(category.name)}
                        className={`hover:text-gray-600 text-sm md:text-base text-left ${
                          selectedCategory === category.name
                            ? "font-bold text-blue-600"
                            : ""
                        }`}
                      >
                        {category.name}
                      </button>
                      <span className="ml-auto text-sm">
                        ({getCategoryCount(category.name)})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Products Grid Section */}
            <div className="w-full md:w-3/4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
                  <select
                    className="border border-gray-300 rounded px-2 py-1 md:px-4 md:py-2 text-sm w-full sm:w-auto"
                    value={sorting}
                    onChange={handleSortChange}
                  >
                    <option value="default">Default sorting</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                    <option value="popularity">Popularity</option>
                  </select>
                  <span className="hidden sm:inline ml-4 text-sm">
                    Showing 1–{Math.min(9, sortedProducts.length)} of{" "}
                    {sortedProducts.length} results
                    {selectedCategory !== "All Products" &&
                      ` in ${selectedCategory}`}
                  </span>
                </div>
                <span className="sm:hidden text-sm">
                  Showing 1–{Math.min(9, sortedProducts.length)} of{" "}
                  {sortedProducts.length} results
                  {selectedCategory !== "All Products" &&
                    ` in ${selectedCategory}`}
                </span>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 animate-pulse rounded-lg h-64"
                    >
                      <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                      <div className="p-4">
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {sortedProducts.length > 0 ? (
                    sortedProducts
                      .slice(0, 9)
                      .map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <div className="bg-gray-50 rounded-lg p-8">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400 mb-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H6a1 1 0 00-1 1v1M7 7h10v3H7V7z"
                          />
                        </svg>
                        <p className="text-gray-600 text-lg mb-2">
                          No products found
                        </p>
                        <p className="text-gray-500 text-sm">
                          {selectedCategory !== "All Products"
                            ? `No products available in "${selectedCategory}" category.`
                            : "No products available at the moment."}
                        </p>
                        {selectedCategory !== "All Products" && (
                          <button
                            onClick={() => handleCategoryClick("All Products")}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            View All Products
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {sortedProducts.length > 9 && (
                <div className="mt-8 text-center">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    Load More Products
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Accessories;
