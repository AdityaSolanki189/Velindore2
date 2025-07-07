import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ShopByCategory = ({ 
  backgroundColor = "bg-amber-50"
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  
  const getItemsToShow = () => {
    if (isMobile) return 1;
    return 4;
  };
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  const itemsToShow = getItemsToShow();
  const maxIndex = Math.max(0, categories.length - itemsToShow);
  
  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };
  
  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };
  
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNext();
    }
    
    if (touchStart - touchEnd < -50) {
      handlePrev();
    }
  };
  
  if (loading) {
    return (
      <div className={`w-full py-8 px-4 ${backgroundColor}`}>
        <div className="mx-auto md:ml-20">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Loading categories...</div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={`w-full py-8 px-4 ${backgroundColor}`}>
        <div className="mx-auto md:ml-20">
          <div className="flex justify-center items-center h-64">
            <div className="text-red-500">Error: {error}</div>
          </div>
        </div>
      </div>
    );
  }
  
  if (categories.length === 0) {
    return (
      <div className={`w-full py-8 px-4 ${backgroundColor}`}>
        <div className="mx-auto md:ml-20">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">No categories available</div>
          </div>
        </div>
      </div>
    );
  }
  
  const visibleCategories = categories.slice(currentIndex, currentIndex + itemsToShow);

  return (
    <div className={`w-full py-8 px-4 ${backgroundColor}`}>
      <div className="mx-auto md:ml-20">
        
        <div className="relative">
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
            aria-label="Previous categories"
          >
            <ChevronLeft size={24} className="text-black" />
          </button>
          
          <button 
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md ${currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
            aria-label="Next categories"
          >
            <ChevronRight size={24} className="text-black" />
          </button>
          
          <div 
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {categories.map((category) => (
                <div 
                  key={category.id} 
                  className="px-2"
                  style={{ flex: `0 0 ${100 / itemsToShow}%` }}
                >
                  <Link 
                    href={`/accessories/`}
                    className="block text-black"
                  >
                    <div className="overflow-hidden rounded-lg mb-3">
                      <div className="relative h-64 w-full bg-gray-100 group">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center opacity-0 transition-all duration-500 origin-top group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0">
                        <div className="bg-white px-6 py-2 rounded-full transform scale-0 opacity-0 transition-all duration-300 delay-300 group-hover:scale-100 group-hover:opacity-100">
                            <span className="font-medium text-sm text-black">VIEW COLLECTION</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-center text-lg font-medium">{category.name}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          
          {isMobile && (
            <div className="flex justify-center mt-4">
              {Array.from({ length: categories.length }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 mx-1 rounded-full ${i === currentIndex ? 'bg-black' : 'bg-gray-300'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;