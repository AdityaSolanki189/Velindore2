"use client";

import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

// Using type assertion for enum since we can't use zod
const sortingOptions = ['default', 'price-low', 'price-high', 'newest', 'popularity'] as const;
type SortingType = typeof sortingOptions[number];

export type ProductType = {
  id: number;
  name: string;
  minPrice: number;
  maxPrice?: number;
  category: string;
  images: string[];
  discount?: number;
  isNew?: boolean;
};

const Accessories: NextPage = () => {
  const [sorting, setSorting] = useState<SortingType>('default');
  const [filterOpen, setFilterOpen] = useState(false);
  
  const products: ProductType[] = [
    {
      id: 1,
      name: "Adjustable Leather Sofa Set",
      minPrice: 35.00,
      maxPrice: 40.00,
      category: "Home Accesories",
      images: ["/assets/soffaaa.png"],
      discount: 13
    },
    {
      id: 2,
      name: "Adorable Living Room Table Set",
      minPrice: 55.00,
      maxPrice: 59.00,
      category: "Home Accesories",
      images: ["/assets/soffaaa.png"]
    },
    {
      id: 3,
      name: "Adventure Carpet Ready",
      minPrice: 15.00,
      maxPrice: 26.00,
      category: "Carpets",
      images: ["/assets/soffaaa.png"]
    },
    {
      id: 4,
      name: "Elegant Wall Mirror",
      minPrice: 45.00,
      category: "Home Accesories",
      images: ["/assets/soffaaa.png"],
      isNew: true
    },
    {
      id: 5,
      name: "Cozy Throw Pillow",
      minPrice: 19.99,
      category: "Pillow & Cushion",
      images: ["/assets/soffaaa.png"]
    },
    {
      id: 6,
      name: "Decorative Vase Set",
      minPrice: 29.50,
      maxPrice: 35.00,
      category: "Home Accesories",
      images: ["/assets/soffaaa.png"]
    },
    {
      id: 7,
      name: "Decorative Wall Clock",
      minPrice: 24.99,
      category: "Home Accesories",
      images: ["/assets/soffaaa.png"]
    },
    {
      id: 8,
      name: "Elegant Curtains",
      minPrice: 39.99,
      maxPrice: 49.99,
      category: "Curtains",
      images: ["/assets/soffaaa.png"],
      discount: 5
    },
    {
      id: 9,
      name: "Storage Basket Set",
      minPrice: 22.50,
      category: "Home Accesories",
      images: ["/assets/soffaaa.png"]
    }
  ];

  const categories = [
    { name: "Bedding", count: 1 },
    { name: "Bedsheet", count: 1 },
    { name: "Blanket", count: 1 },
    { name: "Carpets", count: 3 },
    { name: "Curtains", count: 9 },
    { name: "Home Accesories", count: 3 },
    { name: "Mattresses", count: 9 },
    { name: "Pillow", count: 1 },
    { name: "Pillow & Cushion", count: 7 },
    { name: "Sofa Cover", count: 3 },
  ];

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

  return (
    <>
      <Head>
        <title>Home Accessories - Homeflix</title>
        <meta name="description" content="Browse our collection of home accessories" />
      </Head>

      <Navbar />

      <div className="container mx-auto px-4 text-black">
        <div className="py-4 md:py-8">
          <h1 className="text-xl md:text-2xl font-bold mb-4">Product categories</h1>
          
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
                className={`transform transition-transform ${filterOpen ? 'rotate-180' : ''}`}
              >
                <path d="M6 9L0 3H12L6 9Z" fill="currentColor" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:gap-8">
            {/* Product Categories Sidebar */}
            <div className={`w-full md:w-1/4 ${filterOpen ? 'block' : 'hidden'} md:block`}>
              <div className="bg-white md:bg-transparent p-4 md:p-0 rounded-lg shadow-md md:shadow-none">
                <h3 className="text-lg font-bold mb-2 md:hidden">Categories</h3>
                <ul>
                  {categories.map((category, index) => (
                    <li key={index} className="mb-3 flex items-center">
                      <span className="mr-2">○</span>
                      <Link href="#" className="hover:text-gray-600 text-sm md:text-base">
                        {category.name}
                      </Link>
                      <span className="ml-auto text-sm">({category.count})</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 mb-4 md:mt-12">
                  <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Filter by price</h2>
                  <div className="flex items-center">
                    <div className="w-full">
                      <div className="w-full h-1 bg-gray-300 rounded-full relative">
                        <div className="absolute w-3/4 h-1 bg-black rounded-full"></div>
                        <div className="absolute w-full flex justify-between">
                          <span className="w-4 h-4 bg-black rounded-full relative -top-1.5 cursor-pointer"></span>
                          <span className="w-4 h-4 bg-black rounded-full relative -top-1.5 cursor-pointer"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                  <span className="hidden sm:inline ml-4 text-sm">Showing 1–9 of 12 results</span>
                </div>
                <span className="sm:hidden text-sm">Showing 1–9 of 12 results</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {products.slice(0, 9).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Accessories;