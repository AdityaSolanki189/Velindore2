"use client";

// ContactPage.tsx
import React, { useState } from 'react';
import Head from 'next/head';
// import Link from 'next/link';
// import Image from 'next/image';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-[#f2f9f9] min-h-screen flex flex-col">
      <Head>
        <title>Get In Touch | Uprankly</title>
        <meta name="description" content="Contact Uprankly for high-quality linkable content and high-authority links" />
      </Head>

        <Navbar />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 py-12 font-sans">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Well create high-quality linkable content and build at least 40 high-authority links to each
            asset, paving the way for you to grow your rankings, improve brand.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mt-12">
          <div className="bg-[#20140D] text-white rounded-lg p-8 md:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="mb-8">
              Well create high-quality linkable content and build at least 40 high-authority.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-[#1C0E0B] rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p>+8801717171785</p>
                  <p>+8886781363866</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-[#1C0E0B] rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p>Support@uprankly.com</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-[#1C0E0B] rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p>New York, USA</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-[#1C0E0B] opacity-20"></div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm md:w-2/3">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-600 mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full border-b text-gray-700 border-gray-300 py-2 focus:border-teal-500 focus:outline-none"
                    placeholder="John Trangely"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-600 mb-1">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full border-b text-gray-700 border-gray-300 py-2 focus:border-teal-500 focus:outline-none"
                    placeholder="hello@nurency.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm text-gray-600 mb-1">Your Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full border-b text-gray-700 border-gray-300 py-2 focus:border-teal-500 focus:outline-none"
                  placeholder="I want to hire you quickly"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-sm text-gray-600 mb-1">Message</label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full border-b text-gray-700 border-gray-300 py-2 focus:border-teal-500 focus:outline-none"
                    placeholder="Write here your message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <div className="absolute right-2 bottom-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#1C0E0B] cursor-pointer text-white px-6 py-3 rounded-md transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;