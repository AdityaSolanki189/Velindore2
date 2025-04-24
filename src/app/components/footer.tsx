// components/Footer.jsx
import Link from 'next/link';
import { Phone, Mail, Calendar } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Us Column */}
          <div>
            <h3 className="text-lg font-bold mb-6">CONTACT US</h3>
            <p className="mb-4">Morbi ullamcorper ligula sit amet efficitur pellentesque. Aliquam ornare quam tellus ultricies molestie tortor.</p>
            
            <div className="mt-6">
              <p className="font-bold">HOTLINE :</p>
              <div className="flex items-center mt-2">
                <Phone size={20} className="mr-2" />
                <span>+123-456-789</span>
              </div>
              
              <div className="flex items-center mt-4">
                <Mail size={20} className="mr-2" />
                <span>info@example.com</span>
              </div>
              
              <div className="flex items-center mt-4">
                <Calendar size={20} className="mr-2" />
                <span>Monday till Friday 10 to 6 EST</span>
              </div>
            </div>
          </div>
          
          {/* Help Column */}
          <div className='ml-20'>
            <h3 className="text-lg font-bold mb-6">HELP</h3>
            <ul className="space-y-3">
              <li><Link href="/help" className="hover:text-gray-300">Help Center</Link></li>
              <li><Link href="/shipping" className="hover:text-gray-300">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-gray-300">Returns</Link></li>
              <li><Link href="/how-to-order" className="hover:text-gray-300">How To Order</Link></li>
              <li><Link href="/track" className="hover:text-gray-300">How To Track</Link></li>
              <li><Link href="/size-guide" className="hover:text-gray-300">Size Guide</Link></li>
            </ul>
          </div>
          
          {/* Company Column */}
          <div className='ml-20'>
            <h3 className="text-lg font-bold mb-6">COMPANY</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-gray-300">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-gray-300">Our Blog</Link></li>
              <li><Link href="/careers" className="hover:text-gray-300">Careers</Link></li>
              <li><Link href="/locations" className="hover:text-gray-300">Store Locations</Link></li>
              <li><Link href="/testimonial" className="hover:text-gray-300">Testimonial</Link></li>
              <li><Link href="/sitemap" className="hover:text-gray-300">Sitemap</Link></li>
            </ul>
          </div>
          
          {/* Our Shop Column */}
          <div className='ml-20'>
            <h3 className="text-lg font-bold mb-6">OUR SHOP</h3>
            <ul className="space-y-3">
              <li><Link href="/category/accessories" className="hover:text-gray-300">Accessories</Link></li>
              <li><Link href="/category/living-room" className="hover:text-gray-300">Living Room</Link></li>
              <li><Link href="/category/bedroom" className="hover:text-gray-300">Bedroom</Link></li>
              <li><Link href="/category/dining-room" className="hover:text-gray-300">Dining Room</Link></li>
              <li><Link href="/category/home-office" className="hover:text-gray-300">Home Office</Link></li>
              <li><Link href="/category/kitchen" className="hover:text-gray-300">Kitchen</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-slate-800 mt-12 pt-6">
          <p className="text-sm">Copyright © 2024 Vinovathemes. All rights reserved.</p>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <div className="fixed bottom-6 right-6">
        <button 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          className="bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600 transition-colors"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;