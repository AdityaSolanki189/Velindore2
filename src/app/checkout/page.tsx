
"use client";
import { getSettingsData } from '@/backend/services/settings';
import { fetchSingleProduct } from '@/backend/services/products';
import { createOrder } from '@/backend/services/orders';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/navbar';
import { useSearchParams } from 'next/navigation';

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

type ShippingInfo = {
  userEmail: string;
  userName: string;
  userPhone: string;
  shippingStreetAddress: string;
  shippingCity: string;
  shippingStateProvince: string;
  shippingPostalCode: string;
  shippingCountry: string;
};

interface OrderInsert {
  id: string;
  productId: string;
  userEmail: string;
  userName: string;
  userPhone: string;
  shippingStreetAddress: string;
  shippingCity: string;
  shippingStateProvince: string;
  shippingPostalCode: string;
  shippingCountry: string;
  quantity: number;
  price: string;
  tax: string;
  totalPrice: string;
}

interface Settings {
  id: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  paymentApiKey: string | null;
  paymentTax: string | null;
  homeTitle: string | null;
  contactEmail: string | null;
  contactNumber: string | null;
  facebookLink: string | null;
  instagramLink: string | null;
  linkedinLink: string | null;
}

const CheckoutPage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [taxPercentage, setTaxPercentage] = useState<number>(0);
  const [taxDisplayPercentage, setTaxDisplayPercentage] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [productLoading, setProductLoading] = useState<boolean>(true);
  const [orderNumber, setOrderNumber] = useState<string>('');
  
  // Get product ID from URL params
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');

  const generateOrderId = () => {
  return 'xxxx-xxxx-xxxx'.replace(/[x]/g, () => {
    return (Math.random() * 16 | 0).toString(16);
  });
};
  
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>(() => {
    if (typeof window !== 'undefined') {
      const storedInfo = localStorage.getItem('shippingInfo');
      return storedInfo ? JSON.parse(storedInfo) : {
        userName: '',
        userPhone: '',
        userEmail: '',
        shippingStreetAddress: '',
        shippingCity: '',
        shippingStateProvince: '',
        shippingPostalCode: '',
        shippingCountry: ''
      };
    }
    return {
      userName: '',
      userPhone: '',
      userEmail: '',
      shippingStreetAddress: '',
      shippingCity: '',
      shippingStateProvince: '',
      shippingPostalCode: '',
      shippingCountry: ''
    };
  });

  // Toast notification function
  const showToast = (message: string, type: 'success' | 'error' = 'error') => {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white font-medium transition-all duration-300 transform translate-x-full ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
      toast.classList.remove('translate-x-full');
    }, 100);
    
    // Hide and remove toast after 4 seconds
    setTimeout(() => {
      toast.classList.add('translate-x-full');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 4000);
  };

  // Fetch product data from database
  useEffect(() => {
    const loadProductData = async () => {
      if (!productId) {
        console.error('No product ID provided');
        setProductLoading(false);
        return;
      }

      try {
        setProductLoading(true);
        const product = await fetchSingleProduct(productId);
        
        if (product) {
          // Convert database product to cart item format
          const cartItem: CartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.imageUrl && product.imageUrl.length > 0 
              ? product.imageUrl[0] 
              : '/assets/bed room.jpg',
            quantity: 1,
            description: product.description
          };
          
          setCartItems([cartItem]);
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setProductLoading(false);
      }
    };

    loadProductData();
  }, [productId]);

  // Fetch settings for tax calculation
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsData = await getSettingsData();
        
        if (settingsData) {
          setSettings(settingsData);
          
          if (settingsData.paymentTax) {
            const backendTaxPercentage = parseFloat(settingsData.paymentTax);
            setTaxDisplayPercentage(backendTaxPercentage);
            setTaxPercentage(backendTaxPercentage / 100);
          } else {
            setTaxDisplayPercentage(0);
            setTaxPercentage(0);
          }
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
        setTaxDisplayPercentage(0);
        setTaxPercentage(0);
      }
    };

    fetchSettings();
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * taxPercentage;
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
      shippingInfo.userName &&
      shippingInfo.userPhone &&
      shippingInfo.userEmail &&
      shippingInfo.shippingStreetAddress &&
      shippingInfo.shippingCity &&
      shippingInfo.shippingPostalCode &&
      shippingInfo.shippingCountry
    );
  };

  const handleSubmitOrder = async () => {
  if (!validateShippingInfo()) {
    showToast("Please fill out all required fields");
    return;
  }

  // Save shipping info to localStorage
    localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
  
  setLoading(true);
  
  try {
    const cartItem = cartItems[0];
    
    if (!cartItem) {
      throw new Error("No product found in cart");
    }

    const orderId = generateOrderId();
    
    const orderData: OrderInsert = {
      id: orderId,
      productId: cartItem.id,
      userEmail: shippingInfo.userEmail,
      userName: shippingInfo.userName,
      userPhone: shippingInfo.userPhone,
      shippingStreetAddress: shippingInfo.shippingStreetAddress,
      shippingCity: shippingInfo.shippingCity,
      shippingStateProvince: shippingInfo.shippingStateProvince,
      shippingPostalCode: shippingInfo.shippingPostalCode,
      shippingCountry: shippingInfo.shippingCountry,
      quantity: cartItem.quantity,
      price: cartItem.price.toString(),
      tax: tax.toFixed(2),
      totalPrice: total.toFixed(2),
    };

    const result = await createOrder(orderData);
    
    if (result.success) {
      setOrderNumber(`ORD-${orderId.substring(0, 8).toUpperCase()}`);
      setOrderComplete(true);
      setCartItems([]);
      

      
      showToast("Order placed successfully!", 'success');
      
      // Auto-scroll to top for better UX
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      throw new Error(result.message || "Failed to create order");
    }
    
  } catch (error) {
    console.error("Order creation failed:", error);
    showToast(error instanceof Error ? error.message : "Failed to create order. Please try again.");
  } finally {
    setLoading(false);
  }
};

  if (productLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!productId || (cartItems.length === 0 && !orderComplete)) {

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or is no longer available.</p>
          <button
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
            onClick={() => window.location.href = '/products'}
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

if (orderComplete) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <Head>
        <title>Order Confirmation | Your Store</title>
      </Head>
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center animate-fade-in">
          {/* Animated Success Icon */}
          <div className="mb-6 relative">
            <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
              <svg className="h-12 w-12 text-green-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            {/* Confetti animation */}
            <div className="absolute inset-0 animate-ping">
              <div className="h-2 w-2 bg-yellow-400 rounded-full absolute top-4 left-8 animate-bounce"></div>
              <div className="h-2 w-2 bg-blue-400 rounded-full absolute top-8 right-12 animate-bounce delay-100"></div>
              <div className="h-2 w-2 bg-red-400 rounded-full absolute bottom-8 left-12 animate-bounce delay-200"></div>
              <div className="h-2 w-2 bg-green-400 rounded-full absolute bottom-4 right-8 animate-bounce delay-300"></div>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-slide-up">
            Thank You For Your Order! 🎉
          </h2>
          
          <p className="text-lg text-gray-600 mb-6 animate-slide-up delay-200">
            Your order has been placed successfully. We've sent a confirmation email to{' '}
            <span className="font-semibold text-indigo-600">{shippingInfo.userEmail}</span>.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8 animate-slide-up delay-300">
            <p className="text-gray-700 mb-2">Order Number:</p>
            <p className="text-2xl font-bold text-indigo-600">{orderNumber}</p>
          </div>
          
          <div className="space-y-4 animate-slide-up delay-400">
            <button 
              className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              onClick={() => window.location.href = '/'}
            >
              Continue Shopping
            </button>
            
            <div className="text-sm text-gray-500 mt-4">
              <p>You will receive an email confirmation shortly.</p>
              <p>Estimated delivery: 3-5 business days</p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>
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
            {/* Progress Steps - Updated to only show 2 steps */}
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
                    Shipping & Order
                  </div>
                </div>
              </div>
            </div>

            {/* Step 1: Cart Review */}
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Review Your Cart</h2>
                
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
                          {item.description && (
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          )}
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
              </div>
            )}

            {/* Step 2: Shipping Information & Order Placement */}
            {step === 2 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="col-span-full">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="userName"
                      value={shippingInfo.userName}
                      onChange={handleShippingChange}
                      className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  
                  <div className="col-span-1">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="userPhone"
                      value={shippingInfo.userPhone}
                      onChange={handleShippingChange}
                      className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  
                  <div className="col-span-1">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="userEmail"
                      value={shippingInfo.userEmail}
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
                      name="shippingStreetAddress"
                      value={shippingInfo.shippingStreetAddress}
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
                      name="shippingCity"
                      value={shippingInfo.shippingCity}
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
                      name="shippingStateProvince"
                      value={shippingInfo.shippingStateProvince}
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
                      name="shippingPostalCode"
                      value={shippingInfo.shippingPostalCode}
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
                      name="shippingCountry"
                      value={shippingInfo.shippingCountry}
                      onChange={handleShippingChange}
                      className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    >
                      <option value="">Select a country</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                      <option value="India">India</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Back to Cart
                  </button>
                  <button
                    onClick={handleSubmitOrder}
                    disabled={loading || !validateShippingInfo()}
                    className={`px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center ${
                      loading || !validateShippingInfo() ? 'opacity-50 cursor-not-allowed' : ''
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
                      'Place Order'
                    )}
                  </button>
                </div>
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
                  <p>Tax ({taxDisplayPercentage}%)</p>
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