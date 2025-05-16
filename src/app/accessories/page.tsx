"use client";

import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { z } from 'zod';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const SortingSchema = z.enum(['default', 'price-low', 'price-high', 'newest', 'popularity']);
type SortingType = z.infer<typeof SortingSchema>;

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
    try {
      const value = SortingSchema.parse(e.target.value);
      setSorting(value);
    } catch (error) {
      console.error("Invalid sorting value:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Home Accessories - Homeflix</title>
        <meta name="description" content="Browse our collection of home accessories" />
      </Head>

      <Navbar />

      <div className="container mx-auto px-4 text-black">
        <div className="py-8">
          <h1 className="text-2xl font-bold mb-4">Product categories</h1>
          
          <div className="flex gap-8">
            {/* Product Categories Sidebar */}
            <div className="w-1/4">
              <ul>
                {categories.map((category, index) => (
                  <li key={index} className="mb-4 flex items-center">
                    <span className="mr-2">○</span>
                    <Link href="#" className="hover:text-gray-600">
                      {category.name}
                    </Link>
                    <span className="ml-auto">({category.count})</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Filter by price</h2>
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

            {/* Products Grid Section */}
            <div className="w-3/4">
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  <button className="p-2 border border-gray-300">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
                    </svg>
                  </button>
                  <button className="p-2 border border-gray-300">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                  </button>
                </div>

                <div className="flex items-center">
                  <select 
                    className="border border-gray-300 rounded px-4 py-2"
                    value={sorting}
                    onChange={handleSortChange}
                  >
                    <option value="default">Default sorting</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                    <option value="popularity">Popularity</option>
                  </select>
                  <span className="ml-4">Showing 1–9 of 12 results</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
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