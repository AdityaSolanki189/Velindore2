import React, { useState, useRef } from 'react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);
  
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(index === openIndex ? -1 : index);
  };

  const faqItems = [
    {
      question: "WHAT SHIPPING METHODS ARE AVAILABLE?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet tincidunt nisl, eu euismod libero. Nunc aliquam finibus nisl, quis congue mauris vestibulum venenatis. Curabitur pulvinar, urna porttitor vulputate eleifend, enim ante accumsan lorem, vel condimentum nisi nunc volutpat diam. Fusce tincidunt turpis id risus dignissim tempor. Maecenas fermentum, mauris vel hendrerit accumsan, est sapien commodo turpis, a aliquet tortor purus et felis. Etiam consequat, diam vel venenatis molestie, orci leo aliquam dolor, sit amet aliquet augue tellus quis massa. Sed in tempor risus. Nulla eu eros nec sem imperdiet volutpat ac euismod arcu. Duis sapien massa, auctor id finibus ut, feugiat in odio. Sed ac faucibus arcu. Sed id ex mauris. Pellentesque dictum nisi sem, non placerat urna faucibus non."
    },
    {
      question: "HOW LONG WILL IT TAKE TO GET MY PACKAGE?",
      answer: "Shipping times vary based on your location and the shipping method selected at checkout. Standard shipping typically takes 3-7 business days within the continental US. Express shipping options are available for faster delivery, usually within 1-3 business days. International orders generally take 7-14 business days but may be subject to customs processing times in your country."
    },
    {
      question: "WHERE ARE YOUR PRODUCTS SENT FROM?",
      answer: "Our products are shipped from our main warehouse facilities located in Atlanta, Georgia and Portland, Oregon. Depending on your location and product availability, your order may be fulfilled from either location to ensure the fastest possible delivery time. For larger furniture items, we may ship directly from our manufacturing partners' facilities."
    },
    {
      question: "HOW TO CHANGE OR MODIFY BILLING ADDRESS?",
      answer: "You can change or modify your billing address by logging into your account and navigating to the 'Account Settings' section. From there, select 'Addresses' and choose to edit your billing address. If you're checking out as a guest, you'll be able to enter your billing address during the checkout process. For any assistance with changing your billing address on an existing order, please contact our customer support team."
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-600">If you have any problems, consult the FAQs on our website.</p>
      </div>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="border border-gray-300 rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <button 
              className={`w-full text-left p-4 flex justify-between items-center focus:outline-none transition-all duration-300 ease-in-out ${
                openIndex === index ? 'bg-emerald-500 text-white' : 'bg-white hover:bg-gray-50'
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium">{item.question}</span>
              <span className={`ml-2 transform transition-transform duration-300 ${openIndex === index ? 'rotate-0' : 'rotate-90'}`}>
                {openIndex === index ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </span>
            </button>
            
            <div 
              className="overflow-hidden  transition-all duration-500 ease-in-out"
              style={{ 
                maxHeight: openIndex === index ? '2000px' : '0px',
                opacity: openIndex === index ? 1 : 0,
                transition: openIndex === index 
                  ? 'max-height 0.5s ease-in-out, opacity 0.4s ease-in-out 0.1s' 
                  : 'max-height 0.5s ease-in-out, opacity 0.2s ease-in-out'
              }}
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              >
              <div className="p-4 bg-white border-t">
                <p className="text-gray-700">{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="relative mt-8">
        <a 
          href="#top" 
          className="fixed bottom-6 right-6 bg-emerald-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default FAQ;