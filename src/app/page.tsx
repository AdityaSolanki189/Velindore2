"use client";
import { useState, useEffect, useRef } from "react";
import "animate.css";
import "swiper/css";
import "./globals.css";
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "./components/navbar";
import { useSwipeable } from "react-swipeable";
import Collection from "./components/collection";
import Footer from "./components/footer";
import HomefixProductSection from "./components/Homeflix";
import ShopByCategory from "./components/shopcategory";
// import ProductCard from "./components/product";
import HeroSection from "./components/Herosection";
import Testimonials from "./components/Testimonials";
import { fetchLabelsWithProducts } from "@/backend/services/labels";

// Define interfaces for type safety
interface CarouselItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  backgroundColor: string;
  buttonText: string;
  promoText: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  quantity: number;
  threeDImage: string | null;
  status: "active" | "inactive";
  categoryId: number;
  labelId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Label {
  id: number;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  products?: Product[];
}

export default function Home() {
  const carouselData: CarouselItem[] = [
    {
      id: 1,
      title: "Sleep Sanctuary",
      subtitle: "Furnishing",
      image: "/assets/photo-1.jpg",
      backgroundColor: "",
      buttonText: "VIEW COLLECTION",
      promoText: "EXTRA 10% OFF WITH CODE: DEAL2024",
    },
    {
      id: 2,
      title: "BEDROOM",
      subtitle: "COMFORT DESIGNS",
      image: "/assets/photo-2.jpg",
      backgroundColor: "",
      buttonText: "VIEW COLLECTION",
      promoText: "EXTRA 10% OFF WITH CODE: DEAL2024",
    },
    {
      id: 3,
      title: "KITCHEN",
      subtitle: "MODERN STYLES",
      image: "/assets/photo-3.jpg",
      backgroundColor: "",
      buttonText: "DISCOVER MORE",
      promoText: "EXTRA 10% OFF WITH CODE: DEAL2024",
    },
  ];

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [labels, setLabels] = useState<Label[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const shopCategoryRef = useRef<HTMLElement>(null);
  const featuredCollectionsRef = useRef<HTMLElement>(null);
  const homeFixRef = useRef<HTMLElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const latestCollectionRef = useRef<HTMLElement>(null);
  const interiorDesignRef = useRef<HTMLElement>(null);
  const shopLookRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const subscribeRef = useRef<HTMLElement>(null);

  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

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

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const section = target.dataset.section;
          if (section) {
            setVisibleSections(prev => new Set([...prev, section]));
          }
        }
      });
    }, observerOptions);

    const refs = [
      shopCategoryRef,
      featuredCollectionsRef,
      homeFixRef,
      heroSectionRef,
      latestCollectionRef,
      interiorDesignRef,
      shopLookRef,
      testimonialsRef,
      subscribeRef
    ];

    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const getLabels = async (): Promise<void> => {
    try {
      const labelsData = await fetchLabelsWithProducts();
      setLabels(labelsData);
      setLoading(false);
      // console.log('Labels with products fetched:', labelsData);
    } catch (error) {
      console.error('Error fetching labels:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getLabels();
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (activeIndex < labels.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    },
    trackMouse: false,
  });

  const [activeSlide, setActiveSlide] = useState<number>(0);

  const nextSlide = (): void => {
    setActiveSlide((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (): void => {
    setActiveSlide((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
  };

  const getAnimationClass = (section: string, defaultClass: string = "animate__fadeInUp"): string => {
    return visibleSections.has(section)
      ? `animate__animated ${defaultClass}`
      : "opacity-0 translate-y-8";
  };

  return (
    <div className="bg-[#FEF8EF]">
      <Navbar />

      <section className="relative w-full h-screen max-h-[700px] overflow-hidden">
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${carouselData[activeSlide].backgroundColor}`}
        >
          <div className="relative w-full h-full">
            {carouselData.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ${index === activeSlide ? "opacity-100" : "opacity-0"
                  }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-0">
          <div className="flex flex-col h-full justify-center px-8 md:px-16 lg:px-32">
            <div className="text-white max-w-2xl">
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-0">
                {activeSlide === 0 ? (
                  <div>
                    <div className="font-bold text-white">Sleep</div>
                    <div className="relative mb-4">
                      <div className="font-light italic text-white">
                        Sanctuary
                      </div>
                      <div className="absolute top-0 left-0 w-full">
                        <svg
                          viewBox="0 0 600 120"
                          className="w-full h-20 overflow-visible"
                        >
                          <path
                            d="M10,60 Q150,20 300,60 Q450,100 590,60"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-4xl md:text-6xl lg:text-8xl font-bold mb-28">
                      {carouselData[activeSlide].subtitle}
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-xl font-medium mb-2">
                      {carouselData[activeSlide].subtitle}
                    </p>
                    <div className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
                      {carouselData[activeSlide].title}
                    </div>
                  </>
                )}
              </h1>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <button className="bg-white text-[#321900] px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition">
                  {carouselData[activeSlide].buttonText}
                </button>
                <span className="text-white text-sm md:text-base">
                  {carouselData[activeSlide].promoText}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4 md:px-8">
          <button
            onClick={prevSlide}
            className="bg-white/20 cursor-pointer backdrop-blur-sm hover:bg-white/30 p-2 rounded-full text-white transition"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white/20 cursor-pointer backdrop-blur-sm hover:bg-white/30 p-2 rounded-full text-white transition"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      <section
        ref={shopCategoryRef}
        data-section="shopCategory"
        className={`container mt-10 font-sans transition-all duration-1000 ${getAnimationClass('shopCategory')}`}
      >
        <div className="text-[#321900] flex justify-center text-3xl font-bold">
          <h2 className="text-center md:ml-20 text-[#321900] lg:text-left mt-6">
            Shop by category
          </h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 p-4">
          <ShopByCategory />
        </div>
      </section>

      <section
        ref={featuredCollectionsRef}
        data-section="featuredCollections"
        className={`transition-all duration-1000 ${getAnimationClass('featuredCollections', 'animate__fadeInUp')}`}
      >
        <div className="text-center">
          <h2 className="text-[#321900] font-sans mt-20 text-3xl font-bold">
            Featured Collections
          </h2>
          <p className="mb-10 text-gray-500 mt-2 font-sans">
            Shop our best selling collections for a range of styles loved by you
          </p>
        </div>

        {!loading && (
          <>
            <div className="hidden md:flex m-10 rounded-3xl justify-center gap-2 space-x-5 font-sans">
              {(labels as Label[])
                .filter(label => label.name !== "Featured Collections")
                .map((label, index) => (
                  <Collection
                    key={label.id || index}
                    {...{
                      ...label,
                      products: (label.products || []).slice(0, 5),
                    }}
                  />
                ))}

            </div>

            {isMobile && (
              <div className="md:hidden w-full overflow-hidden px-4">
                <div
                  {...handlers}
                  className="flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {labels
                    .filter(label => label.name !== "Featured Collections")
                    .map((label, index) => (
                      <div key={label.id || index} className="min-w-full px-2">
                        <Collection
                          key={label.id || index}
                          {...({ ...label, products: (label.products || []).slice(0, 5) } as Label)}
                        />
                      </div>
                    ))}
                </div>

                <div className="flex justify-center mt-4 space-x-2">
                  {labels
                    .filter(label => label.name !== "Featured Collections")
                    .map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${activeIndex === index ? "bg-black" : "bg-gray-300"
                          }`}
                        onClick={() => setActiveIndex(index)}
                      />
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>



      <section
        ref={homeFixRef}
        data-section="homeFix"
      >
        <HomefixProductSection />
      </section>

      <section
        ref={heroSectionRef}
        data-section="heroSection"
        className={`font-sans transition-all duration-1000 ${getAnimationClass('heroSection', 'animate__fadeIn')}`}
      >
        <HeroSection />
      </section>

      {/* <section 
        ref={latestCollectionRef}
        data-section="latestCollection"
        className={`mt-[-370px] md:mt-[-130px] font-sans transition-all duration-1000 ${getAnimationClass('latestCollection', 'animate__fadeIn')}`}
      >
        <div>
          <h1 className="text-[#321900] text-center font-extrabold text-4xl mt-36 md:mt-4 mb-10">
            Latest collection
          </h1>

          <div className="flex justify-center mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-4 max-w-screen-xl p-4">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
      </section> */}

      <section
        ref={interiorDesignRef}
        data-section="interiorDesign"
        className={`relative w-full overflow-hidden py-8 md:py-16 mt-[-320px] md:mt-2 font-sans transition-all duration-1000 ${getAnimationClass('interiorDesign', 'animate__slideInUp')}`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-4">
          <div className="w-full md:w-1/3 mb-10 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Velindore Interior Design Collection
            </h2>
            <p className="text-gray-600 mb-6 md:mb-10">
              Discover the beauty of Scandinavian interior design with its
              minimalist approach. Learn how to create a stylish and functional
              space with our expert tips
            </p>
            <button className="bg-gray-900 cursor-pointer text-white px-6 md:px-8 py-2 md:py-3 rounded-full hover:bg-gray-800 transition-colors">
              SHOP NOW
            </button>
          </div>

          <div className="w-full md:w-2/3 lg:ml-20 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-6 md:mt-0">
            <div className="rounded-lg overflow-hidden w-full">
              <Image
                src="/assets/purple.jpg"
                alt="Scandinavian bedroom with mint green walls, white bedding, and minimalist furniture"
                width={800}
                height={600}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden w-full md:mt-20">
              <Image
                src="/assets/purple.jpg"
                alt="Modern green sofa with large plants and decorative pillows"
                width={800}
                height={600}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        ref={testimonialsRef}
        data-section="testimonials"
        className={`text-[#321900] font-sans transition-all duration-1000 ${getAnimationClass('testimonials', 'animate__fadeIn')}`}
      >
        <Testimonials />
      </section>

      <section
        ref={subscribeRef}
        data-section="subscribe"
        className={`px-4 py-10 font-sans transition-all duration-1000 ${getAnimationClass('subscribe', 'animate__fadeInUp')}`}
      >
        <div className="text-[#321900] text-center">
          <h2 className="text-3xl font-extrabold">
            Subscribe & Get 10% Discount
          </h2>
          <p className="text-sm mt-2 max-w-lg mx-auto">
            Get 15% off your first purchase! Plus, be the first to know about
            sales, new product launches and exclusive offers!
          </p>

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