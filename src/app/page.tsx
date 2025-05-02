"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import 'swiper/css';
import './globals.css';
// import { Poppins } from 'next/font/google';
import Navbar from "./components/navbar";
import { useSwipeable } from "react-swipeable";
import ProductGrid from "./components/productGrid";
import Collection from "./components/collection";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTruckFast, faCalendar, faUser, faComment, faArrowRight, } from "@fortawesome/free-solid-svg-icons";
import FAQ from "./components/faq";
import Footer from "./components/footer";
// import Blog from "./components/blog";
import BlogCarousel from "./components/blogCarousel";
import HomefixProductSection from "./components/Homeflix";
import ProductCard from "./components/product";
import HeroSection from "./components/Herosection";
import Testimonials from "./components/Testimonials";

export default function Home() {
  const carouselData = [
    {
      id: 1,
      title: "LIVING ROOM",
      subtitle: "NEW COLLECTIONS",
      image: "/assets/bed.jpg",
      backgroundColor: "bg-green-700",
      buttonText: "SHOP NOW",
    },
    {
      id: 2,
      title: "BEDROOM",
      subtitle: "COMFORT DESIGNS",
      image: "/assets/bed room.jpg",
      backgroundColor: "bg-blue-700",
      buttonText: "VIEW COLLECTION",
    },
    {
      id: 3,
      title: "KITCHEN",
      subtitle: "MODERN STYLES",
      image: "/assets/downloa.jpg",
      backgroundColor: "bg-amber-700",
      buttonText: "DISCOVER MORE",
    },
  ];

  

    const [isMobile, setIsMobile] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const collections = [1, 2, 3, 4, 5]; 
  
    
    useEffect(() => {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768); 
      };
      
      checkIfMobile();
      window.addEventListener("resize", checkIfMobile);
      
      return () => {
        window.removeEventListener("resize", checkIfMobile);
      };
    }, []);
  
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
      // preventDefaultTouchmoveEvent: true,
      trackMouse: false
    });

  const [activeSlide, setActiveSlide] = useState(0);

  const handleDotClick = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <div className="bg-[#FEF8EF]">
      <Navbar />

      <section className="relative w-full h-[700px]">
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${carouselData[activeSlide].backgroundColor}`}
        >
          <div className="relative w-full h-full">
            {carouselData.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === activeSlide ? "opacity-100" : "opacity-0"
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
          <p className="text-xl font-medium mb-2">
            {carouselData[activeSlide].subtitle}
          </p>
          <h1 className="text-6xl font-bold mb-8">
            {carouselData[activeSlide].title}
          </h1>
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
                  ? "bg-teal-400 w-4 h-4"
                  : "bg-white opacity-70 hover:opacity-100"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <ProductGrid />

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

    <section className="mt-20 container mx-auto px-4 mb-20">
  <div className="text-center text-black">
    <p className="text-lg">Welcome to Velinodore</p>
    <h2 className="text-3xl mt-5 font-bold">
      Timeless Furniture, Endless Comfort
    </h2>
    <p className="p-4 md:p-8 text-gray-700">
      Discover the perfect blend of enduring elegance and unparalleled
      comfort with our timeless furniture collection. Each piece is
      thoughtfully crafted to offer you a lifetime of style and coziness,
      ensuring your home remains a haven of relaxation and sophistication.
    </p>
    
    <div className="flex flex-col md:flex-row items-center justify-center md:space-x-12 space-y-6 md:space-y-0">
      <div className="flex space-x-4 justify-center">
        <img src="/assets/delivery.png" alt="" className="w-10" />
        <p className="mt-2">Free Shipping on order over $200</p>
      </div>
      
      <div className="flex space-x-4 justify-center">
        <img src="/assets/logistics.png" alt="" className="w-10" />
        <p className="mt-2">Earn Points & Get Rewards</p>
      </div>
      
      <div className="flex space-x-4 justify-center">
        <img src="/assets/viber.png" alt="" className="w-10" />
        <p className="mt-2">Online Support 24 hours a day</p>
      </div>
    </div>
  </div>
</section>

<section>
  <HomefixProductSection />
</section>

<section>
  <HeroSection />
</section>

<section>
  <div>
    <h1 className="text-black text-center font-extrabold text-4xl mt-10 mb-10">Latest collection</h1>

    <div className="flex justify-center mx-auto">
  <div className="flex flex-wrap justify-center items-center gap-4 max-w-screen-xl p-4">
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
  </div>
</div>

  </div>
</section>

<section className="relative w-full overflow-hidden py-8 md:py-16 mt-20 md:mt-36">
  <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-4">
    <div className="w-full md:w-1/3 mb-10 md:mb-0 text-center md:text-left">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Velindore Interior Design Collection
      </h2>
      <p className="text-gray-600 mb-6 md:mb-10">
        Discover the beauty of Scandinavian interior design
        with its minimalist approach. Learn how to create a
        stylish and functional space with our expert tips
      </p>
      <button className="bg-gray-900 cursor-pointer text-white px-6 md:px-8 py-2 md:py-3 rounded-full hover:bg-gray-800 transition-colors">
        SHOP NOW
      </button>
    </div>
    
    <div className="w-full md:w-2/3 lg:ml-20 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-6 md:mt-0">
      <div className="rounded-lg overflow-hidden w-full">
        <img
          src="/assets/purple.jpg"
          alt="Scandinavian bedroom with mint green walls, white bedding, and minimalist furniture"
          className="w-full h-64 md:h-full object-cover"
        />
      </div>
      <div className="rounded-lg overflow-hidden w-full md:mt-20">
        <img
          src="/assets/purple.jpg"
          alt="Modern green sofa with large plants and decorative pillows"
          className="w-full h-64 md:h-full object-cover"
        />
      </div>
    </div>
  </div>
</section>



<section className="mt-20 px-4">
  <div className="text-black text-center">
    <h2 className="text-3xl font-extrabold">Shop The Look</h2>
    <p className="text-gray-700 mt-3">Getting the look you want has never been easier</p>
  </div>
  
  {/* Desktop view - visible only on md screens and above */}
  <div className="hidden md:flex mt-10 justify-center gap-2">
    <div>
      <img src="/assets/living room.jpg" alt="Living room design" className="w-80 lg:w-96 h-64 lg:h-96 object-cover" />
    </div>
    <div>
      <img src="/assets/living room.jpg" alt="Living room design" className="w-80 lg:w-96 h-64 lg:h-96 object-cover" />
    </div>
    <div>
      <img src="/assets/living room.jpg" alt="Living room design" className="w-80 lg:w-96 h-64 lg:h-96 object-cover" />
    </div>
  </div>
  
  {/* Mobile Swiper - visible only on smaller screens */}
  <div className="mt-8 md:hidden">
    <div className="relative">
      <div className="overflow-x-auto pb-8 flex snap-x snap-mandatory">
        <div className="flex-shrink-0 w-full snap-center px-2">
          <img src="/assets/living room.jpg" alt="Living room design" className="w-full h-64 object-cover" />
        </div>
        <div className="flex-shrink-0 w-full snap-center px-2">
          <img src="/assets/living room.jpg" alt="Living room design" className="w-full h-64 object-cover" />
        </div>
        <div className="flex-shrink-0 w-full snap-center px-2">
          <img src="/assets/living room.jpg" alt="Living room design" className="w-full h-64 object-cover" />
        </div>
      </div>
      
      {/* Pagination dots */}
      {/* <div className="flex justify-center mt-4 space-x-2">
        <div className="h-2 w-2 rounded-full bg-gray-900"></div>
        <div className="h-2 w-2 rounded-full bg-gray-300"></div>
        <div className="h-2 w-2 rounded-full bg-gray-300"></div>
      </div> */}
    </div>
  </div>
</section>


      <section className="mt-20">
        <BlogCarousel />
      </section>


      {/* <section className="text-black">
        <FAQ />
      </section> */}

<section className="text-black">
  <Testimonials />
</section>

      <section className="px-4 py-10">
  <div className="text-black text-center">
    <h2 className="text-3xl font-extrabold">Subscribe & Get 10% Discount</h2>
    <p className="text-sm mt-2 max-w-lg mx-auto">Get 15% off your first purchase! Plus, be the first to know about sales, new product launches and exclusive offers!</p>
    
    <div className="flex flex-col md:flex-row justify-center mt-10 gap-4 max-w-md mx-auto">
      <input 
        type="text" 
        placeholder="Your Email Address" 
        className="border text-sm pl-5 border-black p-3 w-full rounded-full" 
      />
      <button className="bg-black text-white py-3 px-8 rounded-full font-extrabold w-full md:w-auto">
        Subscribe
      </button>
    </div>
  </div>
</section>



        <section className="mt-20">
          <Footer />
        </section>
    </div>
  );
}
