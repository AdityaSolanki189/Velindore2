"use client";
import { useState } from 'react';
import Image from 'next/image';
import Navbar from './components/navbar';
import ProductGrid from './components/productGrid';
import Collection from './components/collection';

export default function Home() {
  const carouselData = [
    {
      id: 1,
      title: "LIVING ROOM",
      subtitle: "NEW COLLECTIONS",
      image: "/assets/living room.jpg",
      backgroundColor: "bg-green-700",
      buttonText: "SHOP NOW"
    },
    {
      id: 2,
      title: "BEDROOM",
      subtitle: "COMFORT DESIGNS",
      image: "/assets/bed room.jpg",
      backgroundColor: "bg-blue-700",
      buttonText: "VIEW COLLECTION"
    },
    {
      id: 3,
      title: "KITCHEN",
      subtitle: "MODERN STYLES",
      image: "/assets/downloa.jpg",
      backgroundColor: "bg-amber-700",
      buttonText: "DISCOVER MORE"
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const handleDotClick = (index) => {
    setActiveSlide(index);
  };

  return (
    <div>
      <Navbar />
  
      <section className="relative w-full h-[700px]">
        <div className={`absolute inset-0 transition-opacity duration-500 ${carouselData[activeSlide].backgroundColor}`}>
          <div className="relative w-full h-full">
            {carouselData.map((slide, index) => (
              <div 
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === activeSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="w-full h-full relative">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    layout="fill"
                    objectFit="cover"
                    priority={index === activeSlide}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-start justify-center text-white px-32">
          <p className="text-xl font-medium mb-2">{carouselData[activeSlide].subtitle}</p>
          <h1 className="text-6xl font-bold mb-8">{carouselData[activeSlide].title}</h1>
          <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition">
            {carouselData[activeSlide].buttonText}
          </button>
        </div>

        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                index === activeSlide 
                  ? 'bg-teal-400 w-4 h-4' 
                  : 'bg-white opacity-70 hover:opacity-100'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>


      <ProductGrid />

        <section>
          <div className='text-center'>
            <h2 className='text-center text-black mt-20 text-3xl font-bold'>Featured Collections</h2>
            <p className='mb-10 text-gray-500 mt-2'>Shop our best selling collections for a range of styles loved by you</p>
          </div>

          <div className='flex rounded-3xl justify-center items-center mx-auto gap-2 space-x-5'>
            <Collection />
            <Collection />
            <Collection />
            <Collection />
            <Collection />
          </div>
        </section>
    </div>
  );
}