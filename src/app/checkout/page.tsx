"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/navbar';

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  rating?: number;
  reviews?: number;
  quantity?: number;
  stock?: number;
  categories?: string[];
  tag?: string;
  imageUrl?: string[];
  categoryName?: string;
  discount?: number;
  hot?: boolean;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description?: string;
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentInfo {
  cardNumber: string;
  nameOnCard: string;
  expiryDate: string;
  cvv: string;
}

const CheckoutPage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: ''
  });

  // Load product data and convert to cart items
  useEffect(() => {
    const loadCartItems = () => {
      // First, try to get existing cart items
      const existingCart = sessionStorage.getItem('cartItems');
      if (existingCart) {
        const parsedCart = JSON.parse(existingCart);
        setCartItems(parsedCart);
        return;
      }

      // If no cart exists, check for selected product from product page
      const storedProduct = sessionStorage.getItem('selectedProduct');
      if (storedProduct) {
        const product: Product = JSON.parse(storedProduct);
        
        // Convert product to cart item
        const cartItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.imageUrl && product.imageUrl.length > 0 
            ? product.imageUrl[0] 
            : '/assets/bed room.jpg', // fallback image
          quantity: 1, // Default quantity
          description: product.description
        };
        
        setCartItems([cartItem]);
        
        // Save to sessionStorage for persistence
        sessionStorage.setItem('cartItems', JSON.stringify([cartItem]));
      } else {
        // Fallback to default items if no product data
        const defaultItems: CartItem[] = [
          {
            id: '1',
            name: 'Premium Wireless Headphones',
            price: 249.99,
            image: '/assets/image-1.png',
            quantity: 1
          },
          {
            id: '2',
            name: 'Smart Fitness Watch',
            price: 179.99,
            image: '/assets/image-2.png',
            quantity: 1
          }
        ];
        setCartItems(defaultItems);
        sessionStorage.setItem('cartItems', JSON.stringify(defaultItems));
      }
    };

    loadCartItems();
  }, []);

  // Save cart items to sessionStorage whenever they change
  useEffect(() => {
    if (cartItems.length > 0) {
      sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? {...item, quantity: newQuantity} : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const validateShippingInfo = (): boolean => {
    return !!(
      shippingInfo.firstName &&
      shippingInfo.lastName &&
      shippingInfo.email &&
      shippingInfo.address &&
      shippingInfo.city &&
      shippingInfo.state &&
      shippingInfo.zipCode
    );
  };

  const validatePaymentInfo = (): boolean => {
    return !!(
      paymentInfo.cardNumber &&
      paymentInfo.nameOnCard &&
      paymentInfo.expiryDate &&
      paymentInfo.cvv
    );
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateShippingInfo() || !validatePaymentInfo()) {
      alert("Please fill out all required fields");
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setOrderComplete(true);
      
      // Clear cart and product data after successful order
      setCartItems([]);
      sessionStorage.removeItem('cartItems');
      sessionStorage.removeItem('selectedProduct');
    }, 2000);
  };

  // Add item to cart (for future use)
  const addToCart = (product: Product, quantity: number = 1) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl && product.imageUrl.length > 0 
        ? product.imageUrl[0] 
        : '/assets/bed room.jpg',
      quantity: quantity,
      description: product.description
    };

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, cartItem];
    });
  };

  useEffect(() => {
    if (cartItems.length === 0 && !orderComplete) {
      // In a real app, redirect to products page
      // router.push('/products');
    }
  }, [cartItems, orderComplete]);

  // Render order confirmation
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Head>
          <title>Order Confirmation | Your Store</title>
        </Head>
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Thank You For Your Order!</h2>
            <p className="text-gray-600 mb-6">
              Your order has been placed successfully. We&apos;ve sent a confirmation email to {shippingInfo.email}.
            </p>
            <p className="text-gray-600 mb-8">
              Order #: <span className="font-medium">ORD-{Math.floor(Math.random() * 10000)}</span>
            </p>
            <button 
              className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
              onClick={() => window.location.href = '/'}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Checkout | Your Store</title>
      </Head>

      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 font-sans">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="mb-8">
              <div className="flex items-center">
                <div className={`flex items-center relative ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
                  <div className={`rounded-full transition-colors flex items-center justify-center h-12 w-12 py-3 border-2 ${step >= 1 ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300'}`}>
                    1
                  </div>
                  <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-sm font-medium">
                    Cart Review
                  </div>
                </div>
                <div className={`flex-auto border-t-2 transition-colors ${step > 1 ? 'border-indigo-600' : 'border-gray-300'}`}></div>
                <div className={`flex items-center relative ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
                  <div className={`rounded-full transition-colors flex items-center justify-center h-12 w-12 py-3 border-2 ${step >= 2 ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300'}`}>
                    2
                  </div>
                  <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-sm font-medium">
                    Shipping
                  </div>
                </div>
                <div className={`flex-auto border-t-2 transition-colors ${step > 2 ? 'border-indigo-600' : 'border-gray-300'}`}></div>
                <div className={`flex items-center relative ${step >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
                  <div className={`rounded-full transition-colors flex items-center justify-center h-12 w-12 py-3 border-2 ${step >= 3 ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300'}`}>
                    3
                  </div>
                  <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-sm font-medium">
                    Payment
                  </div>
                </div>
              </div>
            </div>

            {step === 1 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Review Your Cart</h2>
                
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">Your cart is empty</p>
                    <button
                      className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                      onClick={() => window.location.href = '/'}
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="border-b border-gray-200 pb-4">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex flex-col sm:flex-row items-center py-4 border-b border-gray-100 last:border-0">
                          <div className="relative h-24 w-24 sm:mr-6 mb-4 sm:mb-0 flex-shrink-0">
                            <img
  src={item.image}
  alt={item.name}
  className="h-24 w-24 object-contain rounded-md"
/>

                          </div>
                          <div className="flex-1 sm:flex sm:justify-between w-full">
                            <div className="flex-1">
                              <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                              {/* <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)}</p>
                              {item.description && (
                                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{item.description}</p>
                              )} */}
                            </div>
                            <div className="flex items-center justify-between sm:justify-end mt-4 sm:mt-0 w-full sm:w-auto">
                              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
                                >
                                  -
                                </button>
                                <span className="px-4 py-1 text-center text-black">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
                                >
                                  +
                                </button>
                              </div>
                              <div className="ml-6 sm:ml-8">
                                <p className="text-lg font-medium text-black">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                              <button 
                                onClick={() => removeItem(item.id)}
                                className="ml-4 text-red-500 hover:text-red-700"
                              >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={nextStep}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                      >
                        Continue to Shipping
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Information</h2>
                
                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="col-span-1">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                      className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  
                  <div className="col-span-1">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleShippingChange}
                      className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  
                  <div className="col-span-full">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  
                  <div className="col-span-full">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  
                  <div className="col-span-1">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  
                  <div className="col-span-1">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  
                  <div className="col-span-1">
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP/Postal Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingChange}
                      className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  
                  <div className="col-span-1">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleShippingChange}
                      className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                    </select>
                  </div>
                </form>
                
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Back to Cart
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!validateShippingInfo()}
                    className={`px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors ${!validateShippingInfo() ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Information</h2>
                
                <form onSubmit={handleSubmitOrder} className="space-y-6">
                  <div className="mb-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="flex items-center">
                        <input 
                          id="creditCard" 
                          name="paymentMethod" 
                          type="radio" 
                          checked 
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" 
                        />
                        <label htmlFor="creditCard" className="ml-2 block text-sm font-medium text-gray-700">
                          Credit Card
                        </label>
                      </div>
                      <div className="flex space-x-2">
                        <svg className="h-8 w-auto" viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
                          <rect width="36" height="24" rx="4" fill="#1A1F71"/>
                          <path d="M15.4 14.3L13.3 9.7H11.5L14.7 16.9H16.1L19.3 9.7H17.5L15.4 14.3Z" fill="white"/>
                          <path d="M21.5 9.7H19.8V16.9H21.5V9.7Z" fill="white"/>
                          <path d="M27.1 11.2C26.4 10.9 25.9 10.7 25.9 10.3C25.9 10 26.2 9.7 26.8 9.7C27.2 9.7 27.6 9.8 28 10.1L28.3 9.9L28.7 8.5C28.3 8.3 27.6 8.1 26.9 8.1C25.3 8.1 24.2 9 24.2 10.3C24.2 11.4 24.9 11.9 25.5 12.2C26.1 12.5 26.3 12.7 26.3 13C26.3 13.4 25.9 13.7 25.2 13.7C24.7 13.7 24.2 13.6 23.7 13.3L23.3 13.1L22.9 14.5C23.4 14.8 24.2 15 25 15C26.7 15 27.8 14.1 27.8 12.7C27.9 11.8 27.7 11.5 27.1 11.2Z" fill="white"/>
                        </svg>
                        <svg className="h-8 w-auto" viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
                          <rect width="36" height="24" rx="4" fill="#231F20"/>
                          <path d="M13.5 7H22.5V17H13.5V7Z" fill="#FF5F00"/>
                          <path d="M14.2 12C14.2 9.9 15.3 8.1 16.9 7C15.6 6 13.9 5.5 12.1 5.5C8.3 5.5 5.2 8.4 5.2 12C5.2 15.6 8.3 18.5 12.1 18.5C13.9 18.5 15.6 18 16.9 17C15.3 15.9 14.2 14.1 14.2 12Z" fill="#EB001B"/>
                          <path d="M30.8 12C30.8 15.6 27.7 18.5 23.9 18.5C22.1 18.5 20.4 18 19.1 17C20.7 15.9 21.8 14.1 21.8 12C21.8 9.9 20.7 8.1 19.1 7C20.4 6 22.1 5.5 23.9 5.5C27.7 5.5 30.8 8.4 30.8 12Z" fill="#F79E1B"/>
                        </svg>
                        <svg className="h-8 w-auto" viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
                          <rect width="36" height="24" rx="4" fill="#016FD0"/>
                          <path d="M18.5 15.1L17.1 10.2L15.7 15.1H18.5ZM25.5 13.6L24.6 12.8L23.8 15.1H22.9L24.1 11.7C24.1 11.6 24.2 11.5 24.3 11.5H25.6L27.3 15.1H26.2L25.5 13.6ZM20.7 13.1C20.7 12.9 20.5 12.7 20.3 12.7H18.9V13.5H20.3C20.5 13.5 20.7 13.3 20.7 13.1ZM19.9 11.9C19.9 11.7 19.7 11.5 19.5 11.5H18.9V12.2H19.5C19.7 12.2 19.9 12.1 19.9 11.9ZM21.5 13.2C21.5 13.8 21 14.3 20.4 14.3H18V11H20.2C20.7 11 21.1 11.4 21.1 11.9C21.1 12.2 20.9 12.5 20.6 12.6C21 12.7 21.5 13 21.5 13.2ZM17 15.1L14.8 11H13.8V15.1H12.8V9.2C12.8 9.1 12.9 9 13 9H15.6C16.2 9 16.8 9.5 16.8 10.2C16.8 10.8 16.4 11.4 15.8 11.5L18.1 15.1H17Z" fill="white"/>
                        </svg>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentInfo.cardNumber}
                          onChange={handlePaymentChange}
                          className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          id="nameOnCard"
                          name="nameOnCard"
                          value={paymentInfo.nameOnCard}
                          onChange={handlePaymentChange}
                          className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={paymentInfo.expiryDate}
                            onChange={handlePaymentChange}
                            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV *
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={paymentInfo.cvv}
                            onChange={handlePaymentChange}
                            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Billing Address</h3>
                    
                    <div className="flex items-center mb-4">
                      <input
                        id="sameAsShipping"
                        name="sameAsShipping"
                        type="checkbox"
                        checked
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="sameAsShipping" className="ml-2 block text-sm text-gray-700">
                        Same as shipping address
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Back to Shipping
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !validatePaymentInfo()}
                      className={`px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center ${
                        loading || !validatePaymentInfo() ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Complete Order'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="flow-root">
                <ul className="-my-4 divide-y divide-gray-200">
                  {cartItems.map(item => (
                    <li key={item.id} className="py-4 flex">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-sm font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t border-gray-200 mt-6 pt-6 space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Shipping</p>
                  <p>${shipping.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Tax</p>
                  <p>${tax.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="rounded-md bg-gray-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-800">Secure Checkout</h3>
                      <div className="mt-2 text-sm text-gray-500">
                        <p>Your payment information is processed securely.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {step === 3 && (
                <div className="mt-6">
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-900">Need Help?</h3>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <svg className="h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>
                        Questions about your order? <a href="#" className="text-indigo-600 hover:text-indigo-500">Contact support</a>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;