"use client";

import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import ProductCard from '../components/product';

const page = () => {
  return (
    <>
        <Navbar />
            <div className='text-center mt-10 mb-20 text-black font-bold text-3xl'>
                <h2 className='mb-10'>WISHLIST</h2>
                <div className="container justify-center px-4 py-8">
      <div className="flex flex-wrap gap-2 justify-center">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
            </div>
        <Footer />
    </>
  )
}

export default page