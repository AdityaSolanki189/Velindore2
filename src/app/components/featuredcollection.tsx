import React from 'react'

import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

const FeaturedCollections = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const collections = [1, 2, 3, 4, 5]; // Representing 5 collections

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is standard md breakpoint
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Handle swipe gestures
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (activeIndex < collections.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: false
  });

  return (
    <section className="container">
      <div className="text-center">
        <h2 className="text-black mt-20 text-3xl font-bold">
          Featured Collections
        </h2>
        <p className="mb-10 text-gray-500 mt-2">
          Shop our best selling collections for a range of styles loved by you
        </p>
      </div>

      {/* Desktop view - Normal grid layout */}
      <div className="hidden md:flex container lg:ml-8 rounded-3xl justify-center gap-2 space-x-5">
        {collections.map((_, index) => (
          <Collection key={index} />
        ))}
      </div>

      {/* Mobile view - Swiper */}
      {isMobile && (
        <div className="md:hidden w-full overflow-hidden px-4">
          <div 
            {...handlers}
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {collections.map((_, index) => (
              <div key={index} className="min-w-full px-2">
                <Collection />
              </div>
            ))}
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {collections.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${activeIndex === index ? 'bg-black' : 'bg-gray-300'}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedCollections;