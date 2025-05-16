"use client";

import { useState } from 'react';
import { CheckCircle, ArrowRight, Mail, ChevronDown } from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    console.log('Subscribing email:', email);
    setSubscribed(true);
    setError('');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      <Navbar />

      <div className="bg-amber-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Stay inspired with our furniture newsletter
          </h1>
          <p className="text-lg md:text-xl text-stone-600 mb-8 md:mb-12 max-w-2xl">
            Join our community and be the first to discover new collections, exclusive offers, and design inspiration for your home.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Subscribe to our newsletter</h2>
            
            {subscribed ? (
              <div className="text-center py-8">
                <div className="inline-flex justify-center items-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-medium mb-2">Thank you for subscribing!</h3>
                <p className="text-stone-600">
                  You'll now receive our latest updates and offers directly to your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail size={20} className="text-stone-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full py-3 pl-10 pr-4 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="privacy"
                      type="checkbox"
                      className="w-4 h-4 accent-amber-600"
                      required
                    />
                  </div>
                  <label htmlFor="privacy" className="ml-2 text-sm text-stone-600">
                    I agree to receive marketing emails and accept the <a href="#" className="text-amber-600 underline">privacy policy</a>
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition flex items-center justify-center"
                >
                  Subscribe Now
                  <ArrowRight size={18} className="ml-2" />
                </button>
              </form>
            )}
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8">Why join our mailing list?</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <CheckCircle size={24} className="text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Exclusive Offers</h3>
                  <p className="text-stone-600">Get access to subscriber-only discounts and promotions on our premium furniture collections.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <CheckCircle size={24} className="text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">New Arrivals</h3>
                  <p className="text-stone-600">Be the first to know when we launch new products, styles, and limited collections.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <CheckCircle size={24} className="text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Design Inspiration</h3>
                  <p className="text-stone-600">Receive curated design tips, style guides, and inspiration for your home from our interior experts.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <CheckCircle size={24} className="text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Seasonal Updates</h3>
                  <p className="text-stone-600">Stay updated with seasonal trends and special holiday promotions throughout the year.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Preview our latest newsletter</h2>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-64 md:h-96 bg-stone-200 flex items-center justify-center">
              <img src="/api/placeholder/800/600" alt="Newsletter Preview" className="w-full h-full object-cover" />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-medium mb-4">Spring Collection 2025: Bringing Nature Indoors</h3>
              <p className="text-stone-600 mb-6">Discover our latest spring collection featuring natural materials, earthy tones, and sustainable designs for a fresh, organic look that brings the outdoors into your home...</p>
              <a href="#" className="text-amber-600 font-medium flex items-center hover:text-amber-700">
                Read more
                <ArrowRight size={18} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-24">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">How often will I receive emails?</h3>
              <p className="text-stone-600">We send our newsletter once every two weeks. For special events or promotions, you may receive additional emails, but we promise not to overwhelm your inbox.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">Can I unsubscribe at any time?</h3>
              <p className="text-stone-600">Absolutely! You can unsubscribe with a single click from any email we send. There's an unsubscribe link at the bottom of every newsletter.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">Are the subscriber discounts significant?</h3>
              <p className="text-stone-600">Yes! Our subscribers typically get access to exclusive discounts ranging from 10-25% off selected items, plus early access to sales and special promotions.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">Do you share my email with third parties?</h3>
              <p className="text-stone-600">We value your privacy and will never sell or share your email address with third parties. Your information is used solely for our newsletter and related communications.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-stone-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-12 text-center">What our subscribers say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold">JD</div>
                <div className="ml-4">
                  <h3 className="font-medium">Jessica Daniels</h3>
                  <p className="text-sm text-stone-500">Subscriber since 2023</p>
                </div>
              </div>
              <p className="text-stone-600">
                "I love receiving design inspiration in my inbox every two weeks. The exclusive discounts have helped me furnish my entire living room for less!"
              </p>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold">MR</div>
                <div className="ml-4">
                  <h3 className="font-medium">Michael Rodriguez</h3>
                  <p className="text-sm text-stone-500">Subscriber since 2024</p>
                </div>
              </div>
              <p className="text-stone-600">
                "The style guides and seasonal updates keep me informed about the latest trends. I've completely transformed my home office thanks to their recommendations."
              </p>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold">LP</div>
                <div className="ml-4">
                  <h3 className="font-medium">Laura Peterson</h3>
                  <p className="text-sm text-stone-500">Subscriber since 2022</p>
                </div>
              </div>
              <p className="text-stone-600">
                "Being a subscriber has saved me money and time. I get early access to sales and can plan my purchases around upcoming collections and promotions."
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}