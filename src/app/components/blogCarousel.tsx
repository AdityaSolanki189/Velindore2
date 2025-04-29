import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Blog from "./blog";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BlogCarousel = () => {
  const [mounted, setMounted] = useState(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const blogs = [
    {
      id: 1,
      date: "18 July 2025",
      author: "John Doe",
      comments: "5 comments",
      image: "/assets/bed room.jpg",
    },
    {
      id: 2,
      date: "20 July 2025",
      author: "Jane Smith",
      comments: "3 comments",
      image: "/assets/bed room.jpg",
    },
    {
      id: 3,
      date: "22 July 2025",
      author: "Subhajit Bhattacharjee",
      comments: "8 comments",
      image: "/assets/bed room.jpg",
    },
    {
      id: 4,
      date: "25 July 2025",
      author: "Sarah Williams",
      comments: "2 comments",
      image: "/assets/bed room.jpg",
    },
    {
      id: 5,
      date: "28 July 2025",
      author: "David Brown",
      comments: "6 comments",
      image: "/assets/bed room.jpg",
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <section className="mt-20 px-6 relative">
      <h2 className="text-black text-2xl ml-4 mb-10 font-black">
        From Latest News
      </h2>

      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation === 'object') {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="blog-carousel"
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog.id}>
              <Blog
                date={blog.date}
                author={blog.author}
                comments={blog.comments}
                image={blog.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute top-1/3 -translate-y-1/2 -left-4 z-10">
          <button
            ref={prevRef}
            className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        <div className="absolute top-1/3 -translate-y-1/2 -right-4 z-10">
          <button
            ref={nextRef}
            className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        /* Hide default Swiper navigation */
        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          display: none;
        }

        /* Add some media queries for responsive positioning */
        @media (max-width: 768px) {
          .absolute.-left-4 {
            left: 0;
          }
          .absolute.-right-4 {
            right: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default BlogCarousel;
