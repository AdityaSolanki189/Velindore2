'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full border-t border-gray-200 mt-4"></div>

      <main className="flex-grow bg-orange-50 pt-4 md:pt-8 pb-8 md:pb-16">
        <div className="w-full px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Mobile View */}
            <div className="md:hidden w-full">
              <h1 className="text-3xl font-bold text-black leading-tight">
                <span className="block mb-2">Find beds that beckon you to rest,</span>
                <span className="block mb-2">Pillow</span>
                <div className="flex justify-center my-2">
                  <Image 
                    src="/assets/image 36.png"
                    alt="Sofa"
                    width={48}
                    height={48}
                    className="object-contain transform transition-transform duration-300 hover:translate-y-1 hover:scale-110"
                  />
                </div>
                <span className="block mb-2">plumped perfectly where</span>
                <span className="block mb-2">are blessed with</span>
                <div className="flex justify-center my-2">
                  <Image 
                    src="/assets/image 35.png"
                    alt="Blue pillow"
                    width={32}
                    height={32}
                    className="object-contain transform transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
                  />
                </div>
                <span className="block">mattresses.</span>
              </h1>

              <Link href="/accessories">
                <button className="mt-8 px-6 py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors cursor-pointer">
                  VIEW COLLECTION
                </button>
              </Link>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold text-black leading-tight relative">
                <div className="flex flex-wrap justify-center items-center gap-3">
                  <span>Find beds that beckon you to rest,</span>
                  <Image
                    src="/assets/image-1.png"
                    alt="Cozy furniture"
                    width={56}
                    height={56}
                    className="object-contain transform transition-transform duration-300 hover:-translate-y-2 hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-center gap-4 lg:gap-6 mt-6">
                  <span className="text-4xl lg:text-5xl font-bold">Pillow</span>
                  <Image 
                    src="/assets/image 36.png"
                    alt="Sofa"
                    width={64}
                    height={64}
                    className="object-contain transform transition-transform duration-300 hover:translate-y-2 hover:scale-110"
                  />
                  <span className="text-4xl lg:text-5xl font-bold">plumped perfectly where</span>
                </div>
                <div className="flex items-center justify-center gap-4 lg:gap-6 mt-6">
                  <span className="text-4xl lg:text-5xl font-bold">are blessed with</span>
                  <Image 
                    src="/assets/image 35.png"
                    alt="Blue pillow"
                    width={48}
                    height={48}
                    className="object-contain transform transition-transform duration-300 hover:-translate-y-2 hover:rotate-6"
                  />
                  <span className="text-4xl lg:text-5xl font-bold">mattresses.</span>
                </div>
              </h1>

              <Link href="/accessories">
                <button className="mt-8 px-6 py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-colors cursor-pointer">
                  VIEW COLLECTION
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
