import React from 'react';
import Image from 'next/image';
// import Link from 'next/link';
import { NextPage } from 'next';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const AboutUs: NextPage = () => {
  return (
    <>

    <Navbar />
    <div className="max-w-6xl mx-auto px-4 py-8 text-black font-sans">
      {/* About us heading section */}
      <div className="text-center mb-8">
        <h2 className="text-gray-600 text-lg mb-2">About us</h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          A proficient team with <br />
          extensive knowledge
        </h1>
      </div>

      {/* Team Image */}
      <div className="mb-12">
        <div className="relative w-full h-80 md:h-96 rounded-md overflow-hidden">
          <Image 
            src="/assets/office.jpg" 
            alt="Our professional team" 
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>

      {/* Statistics Section */}
      <div className="flex flex-wrap justify-between text-center mb-16">
        <div className="w-full sm:w-1/2 md:w-1/5 mb-8 md:mb-0">
          <h3 className="text-3xl font-bold">50+</h3>
          <p className="text-gray-600">Employees</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/5 mb-8 md:mb-0">
          <h3 className="text-3xl font-bold">10+</h3>
          <p className="text-gray-600">Countries</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/5 mb-8 md:mb-0">
          <h3 className="text-3xl font-bold">35+</h3>
          <p className="text-gray-600">Finished projects</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/5 mb-8 md:mb-0">
          <h3 className="text-3xl font-bold">21+</h3>
          <p className="text-gray-600">Offices</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/5">
          <h3 className="text-3xl font-bold">15+</h3>
          <p className="text-gray-600">Awarded Projects</p>
        </div>
      </div>

      {/* How can we help section */}
      <div className="text-center mb-8">
        <h2 className="text-gray-600 text-lg mb-2">How can we help?</h2>
        <h1 className="text-4xl font-bold mb-12">Flexibility for your lifestyle</h1>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Exploration */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Exploration</h3>
          <p className="text-gray-600 mb-4">
            If something happens to your home - or any attached structures on your property - well cover the repairs or the rebuild.
          </p>
            {/* <a href='' className="flex items-center text-gray-600 hover:text-black">
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a> */}
          
        </div>

        {/* Work assignments */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Work assignments</h3>
          <p className="text-gray-600 mb-4">
            If not just stuff, its your life. And if theres ever a theft, fire, or other unfortunate event, well help with the repair or replacement.
          </p>
            {/* <a className="flex items-center text-gray-600 hover:text-black">
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a> */}
        </div>

        {/* Extended stays */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">Extended stays</h3>
          <p className="text-gray-600 mb-4">
            Our coverage protects you from bodily injury or property damage to others (or their stuff) - at home or anywhere else.
          </p>
            {/* <a className="flex items-center text-gray-600 hover:text-black">
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a> */}
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden mb-12">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 relative h-64 md:h-auto">
            <Image 
              src="/assets/sofa-rr.jpg" 
              alt="Corporate Housing" 
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-4">Landing for Corporate Housing</h2>
            <p className="text-gray-600 mb-6">
              From catering firms and sports leagues to individual business travelers, our fully furnished apartments are crafted to make your team feel perfectly at home.
            </p>
            <div className="flex space-x-4">
              <a href='/contact' className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
                Contact us
              </a>
              
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />

    </>
  );
};

export default AboutUs;