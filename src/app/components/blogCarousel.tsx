// BlogCarousel.tsx
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Blog from './blog';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BlogCarousel = () => {
  // For hydration issues with Next.js SSR
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sample blog data (replace with your actual data)
  const blogs = [
    { id: 1, date: '18 July 2025', author: 'John Doe', comments: '5 comments', image: '/assets/bed room.jpg' },
    { id: 2, date: '20 July 2025', author: 'Jane Smith', comments: '3 comments', image: '/assets/bed room.jpg' },
    { id: 3, date: '22 July 2025', author: 'Subhajit Bhattacharjee', comments: '8 comments', image: '/assets/bed room.jpg' },
    { id: 4, date: '25 July 2025', author: 'Sarah Williams', comments: '2 comments', image: '/assets/bed room.jpg' },
    { id: 5, date: '28 July 2025', author: 'David Brown', comments: '6 comments', image: '/assets/bed room.jpg' },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <section className="mt-20 px-6">
      <h2 className="text-black text-2xl ml-4 mb-10 font-black">From Latest News</h2>
      
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        // pagination={{ clickable: true }}
        breakpoints={{
          // When screen width is >= 640px (tablet)
          640: {
            slidesPerView: 2,
          },
          // When screen width is >= 1024px (desktop)
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
    </section>
  );
};

export default BlogCarousel;