"use client";
import { useState } from "react";
import Image from "next/image";
import 'swiper/css';
import Navbar from "./components/navbar";
import ProductGrid from "./components/productGrid";
import Collection from "./components/collection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast, faCalendar, faUser, faComment, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import FAQ from "./components/faq";
import Footer from "./components/footer";
import Blog from "./components/blog";
import BlogCarousel from "./components/blogCarousel";

export default function Home() {
  const carouselData = [
    {
      id: 1,
      title: "LIVING ROOM",
      subtitle: "NEW COLLECTIONS",
      image: "/assets/living room.jpg",
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

  const [activeSlide, setActiveSlide] = useState(0);

  const handleDotClick = (index) => {
    setActiveSlide(index);
  };

  return (
    <div>
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
          <h2 className="text-center text-black mt-20 text-3xl font-bold">
            Featured Collections
          </h2>
          <p className="mb-10 text-gray-500 mt-2">
            Shop our best selling collections for a range of styles loved by you
          </p>
        </div>

        <div className="container lg:ml-8 flex rounded-3xl justify-center gap-2 space-x-5">
          <Collection />
          <Collection />
          <Collection />
          <Collection />
          <Collection />
        </div>
      </section>

      <section className="mt-20 container">
        <div className="text-center text-black">
          <p className="text-lg">Welcome to Velinodore</p>
          <h2 className="text-3xl mt-5 font-bold">
            Timeless Furniture, Endless Comfort
          </h2>
          <p className="p-8 text-gray-700">
            Discover the perfect blend of enduring elegance and unparalleled
            comfort with our timeless furniture collection. Each piece is
            thoughtfully crafted to offer you a lifetime of style and coziness,
            ensuring your home remains a haven of relaxation and sophistication.
          </p>

          <div className="flex items-center justify-center space-x-12">
            <div className="flex space-x-4">
              <FontAwesomeIcon icon={faTruckFast} />
              <p>Free Shipping on order over $200</p>
            </div>

            <div className="flex space-x-4">
              <FontAwesomeIcon icon={faTruckFast} />
              <p>Earn Points & Get Rewards</p>
            </div>

            <div className="flex space-x-4">
              <FontAwesomeIcon icon={faTruckFast} />
              <p>Online Support 24 hours a day</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden py-16">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-4">
        <div className="md:w-1/3 mb-10 md:mb-0">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Scandinavian Interior Design Collection
          </h2>
          <p className="text-gray-600 mb-6">
            Discover the beauty of Scandinavian interior design
            with its minimalist approach. Learn how to create a
            stylish and functional space with our expert tips
          </p>
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
            SHOP NOW
          </button>
        </div>
        
        <div className="md:w-2/3 lg:ml-20 flex space-x-4">
          <div className="rounded-lg overflow-hidden">
            <img 
              src="/assets/purple.jpg" 
              alt="Scandinavian bedroom with mint green walls, white bedding, and minimalist furniture" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden mt-20">
            <img 
              src="/assets/purple.jpg" 
              alt="Modern green sofa with large plants and decorative pillows" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>

      <section className="mt-36">
        <div className="text-black text-center">
          <h2 className="text-3xl font-extrabold">Shop The Look</h2>
          <p className="text-gray-700 mt-3">Getting the look you want has never been easier</p>
        </div>

        <div className="flex mt-10 justify-center gap-2">
          <div>
            <img src="/assets/living room.jpg" alt="" className="w-[500px] h-96 object-cover" />
          </div>
          <div>
            <img src="/assets/living room.jpg" alt="" className="w-[500px] h-96 object-cover" />
          </div>
          <div>
            <img src="/assets/living room.jpg" alt="" className="w-[500px] h-96 object-cover" />
          </div>
        </div>
      </section>


      <section className="mt-20">
        <BlogCarousel />
      </section>


      <section className="text-black">
        <FAQ />
      </section>

      <section>
        <div className="text-black text-center">
          <h2 className="text-3xl font-extrabold">Subscrible & Get 10% Discount</h2>
          <p className="text-sm mt-2">Get 15% off your first purchaxse! Plus, be the first to know about sales new product launches and exclusive offers!</p>

          <div className="flex justify-center mt-10 gap-2">
            <input type="text" placeholder="Your Email Address" className="border text-sm pl-5 border-black p-5 py-3 px-36 rounded-4xl" />
            <button className="bg-black text-white p-5 py-4 px-10 rounded-4xl font-extrabold">Subscribe</button>
          </div>
        </div>
      </section>

        <section className="mt-20">
          <Footer />
        </section>
    </div>
  );
}
