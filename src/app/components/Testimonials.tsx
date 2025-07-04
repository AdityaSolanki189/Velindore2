import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  text: string;
  name: string;
  title: string;
  avatar: string;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
  heading?: string;
  className?: string;
}

const Testimonials = ({
  testimonials = [
    {
      id: 1,
      text: "Maecenas consequat nunc purus, non maximus nunc gravida nec Vestibulum quis ipsum elementum, pulvinar enim eget, suscipit nisl. Nulla bibendum volutpat nisl, in ullamcorper sem vehicula non reviews Ut quis lectus sodales enim eget laoreet nisl ut",
      name: "Emma Smael",
      title: "Customer",
      avatar: "/assets/downloa.jpg"
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl ac rhoncus tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Nullam auctor, nisl ac rhoncus tincidunt, nisl nisl aliquam nisl, eget aliquam.",
      name: "John Doe",
      title: "Customer",
      avatar: "/assets/downloa.jpg"
    },
    {
      id: 3,
      text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.",
      name: "Jane Smith",
      title: "Customer",
      avatar: "/assets/downloa.jpg"
    }
  ],
  heading = "Customers experience",
  className = "",
}: TestimonialsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className={`w-full py-16 bg-white ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-16">{heading}</h2>
        
        <div className="flex items-center justify-center">
          <div className="w-full max-w-4xl relative">
            <button 
              onClick={handlePrev}
              className="absolute left-0 top-1/5 -translate-y-1/2 rounded-full border border-gray-300 p-2 z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-8">
                <img 
                  src={currentTestimonial.avatar} 
                  alt={currentTestimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-center max-w-3xl mx-auto mb-6">
                <p className="text-lg italic">
                &quot; {currentTestimonial.text} &quot;
                </p>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <span className="font-semibold">{currentTestimonial.name}</span>
                <span className="text-gray-500">, {currentTestimonial.title}</span>
              </div>
            </div>
            
            <button 
              onClick={handleNext}
              className="absolute right-0 top-1/5 -translate-y-1/2 rounded-full border border-gray-300 p-2 z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;