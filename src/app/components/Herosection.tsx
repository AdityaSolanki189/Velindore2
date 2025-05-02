import React from 'react';
// import { Search } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Divider */}
      <div className="w-full border-t border-gray-200 mt-4"></div>
      
      {/* Hero Section */}
      <main className="flex-grow bg-orange-50 pt-4 md:pt-8 pb-8 md:pb-16">
        <div className="w-full px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Mobile Version (visible only on small screens) */}
            <div className="md:hidden w-full">
              <h1 className="text-3xl font-bold text-black leading-tight">
                <span className="block mb-2">Find beds that beckon you to rest,</span>
                <span className="block mb-2">Pillow</span>
                <div className="flex justify-center my-2">
                  <img src="/assets/image 36.png" alt="Sofa" className="h-12 object-contain" />
                </div>
                <span className="block mb-2">plumped perfectly where</span>
                <span className="block mb-2">are blessed with</span>
                <div className="flex justify-center my-2">
                  <img src="/assets/image 35.png" alt="Blue pillow" className="h-8 w-8 object-contain" />
                </div>
                <span className="block">mattresses.</span>
              </h1>
              
              <button className="mt-8 px-6 py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors">
                VIEW COLLECTION
              </button>
            </div>
            
            {/* Desktop Version (hidden on small screens) */}
            <div className="hidden md:block max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold text-black leading-tight relative">
                <span className="block">Find beds that beckon you to rest,</span>
                <img 
                  src="/assets/image-1.png" 
                  alt="Cozy furniture" 
                  className="absolute top-0 right-4 lg:right-20 h-20 lg:h-24 object-contain" 
                />
                <div className="flex items-center justify-center gap-4 lg:gap-6 mt-6">
                  <span className="text-4xl lg:text-5xl font-bold">Pillow</span>
                  <img src="/assets/image 36.png" alt="Sofa" className="h-14 lg:h-16 object-contain" />
                  <span className="text-4xl lg:text-5xl font-bold">plumped perfectly where</span>
                </div>
                <div className="flex items-center justify-center gap-4 lg:gap-6 mt-6">
                  <span className="text-4xl lg:text-5xl font-bold">are blessed with</span>
                  <img src="/assets/image 35.png" alt="Blue pillow" className="h-10 w-10 lg:h-12 lg:w-12 object-contain" />
                  <span className="text-4xl lg:text-5xl font-bold">mattresses.</span>
                </div>
              </h1>
              
              <button className="mt-12 lg:mt-16 px-8 lg:px-10 py-4 bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-colors">
                VIEW COLLECTION
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}