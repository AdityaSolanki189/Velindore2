'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FiMinus, FiPlus } from 'react-icons/fi';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const CartPage = () => {
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Adjustable leather sofa set",
      price: 35.00,
      originalPrice: 40.00,
      image: "/assets/photo-2.jpg",
      quantity: 2,
      description: "Small in its size yet functional in its appeal, this wardrobe has storage space for..."
    }
  ]);
  
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const subtotal = calculateSubtotal();
  const total = subtotal;
  
  return (
    <div className="bg-gray-50 min-h-screen text-black">

        <Navbar />
        
      <div className="relative w-full h-48 mb-8">
        <Image 
          src="/assets/living room.jpg" 
          alt="Cart Banner" 
          fill
          style={{ objectFit: 'cover' }}
          className="brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white tracking-wider">CART</h1>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">PRODUCT</h2>
                  <h2 className="text-xl font-semibold text-gray-800">TOTAL</h2>
                </div>
                
                {cartItems.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  cartItems.map(item => (
                    <div key={item.id} className="py-6 border-b border-gray-100 last:border-0">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        <div className="sm:w-20 w-full mb-4 sm:mb-0">
                          <Image 
                            src={item.image} 
                            alt={item.name}
                            width={80}
                            height={80}
                            className="rounded"
                          />
                        </div>
                        
                        <div className="flex-1 px-4">
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <div className="flex items-center mt-2">
                            <span className="text-gray-900 font-medium">${item.price.toFixed(2)}</span>
                            {item.originalPrice > item.price && (
                              <span className="ml-2 text-gray-500 line-through text-sm">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                          
                          <div className="mt-4 flex items-center">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 border border-gray-300 rounded"
                            >
                              <FiMinus size={16} />
                            </button>
                            
                            <span className="mx-3 w-8 text-center">{item.quantity}</span>
                            
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 border border-gray-300 rounded"
                            >
                              <FiPlus size={16} />
                            </button>
                            
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="ml-6 text-red-500 hover:text-red-700"
                            >
                              Remove item
                            </button>
                          </div>
                        </div>
                        
                        <div className="font-medium text-lg mt-4 sm:mt-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-6">CART TOTALS</h2>
              
              <div className="mb-6">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setCouponOpen(!couponOpen)}
                >
                  <span className="text-gray-700">Add a coupon</span>
                  <svg 
                    className={`w-5 h-5 transform transition-transform ${couponOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {couponOpen && (
                  <div className="mt-4">
                    <div className="flex">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon code"
                        className="flex-1 border border-gray-300 p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="bg-gray-800 text-white px-4 py-2 rounded-r hover:bg-gray-700 transition">
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-200 pt-4 pb-2">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 pb-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <button className="w-full bg-black text-white py-3 rounded font-medium hover:bg-gray-800 transition uppercase tracking-wide">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;