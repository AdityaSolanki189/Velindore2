"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import { CalendarIcon, ClockIcon, UserIcon, PhoneIcon, MailIcon, MessageCircleIcon} from 'lucide-react';
// import { format } from 'date-fns';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

// Define types for our form
interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  furnitureType: string;
  message: string;
}

// Available time slots
const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', 
  '12:00 PM', '01:00 PM', '02:00 PM', 
  '03:00 PM', '04:00 PM', '05:00 PM'
];

// Furniture types
const FURNITURE_TYPES = [
  'Living Room', 'Dining Room', 'Bedroom', 
  'Office', 'Outdoor', 'Custom Design', 'Other'
];

const BookAppointment: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState<AppointmentFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    furnitureType: '',
    message: '',
  });

  // Form handling
  const [errors, setErrors] = useState<Partial<AppointmentFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is updated
    if (errors[name as keyof AppointmentFormData]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<AppointmentFormData> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.furnitureType) newErrors.furnitureType = 'Please select a furniture type';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // If successful
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        furnitureType: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error booking appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <>

    <Navbar />
      <Head>
        <title>Book an Appointment | Luxury Furniture</title>
        <meta name="description" content="Schedule a consultation with our furniture experts" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <section className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
              Book Your Personal Consultation
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
              Schedule a one-on-one appointment with our furniture experts to discuss your space, style preferences, and find the perfect pieces for your home.
            </p>
          </section>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left side - Appointment info */}
              <div className="bg-neutral-800 text-white p-8 lg:p-12 flex flex-col justify-between lg:w-2/5">
                <div>
                  <h2 className="text-2xl font-semibold mb-6">What to expect</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-white/10 p-2 rounded-full mr-4 flex-shrink-0">
                        <ClockIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">60-minute consultation</p>
                        <p className="text-neutral-300 text-sm">With our expert interior designers</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-white/10 p-2 rounded-full mr-4 flex-shrink-0">
                        <CalendarIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Flexible scheduling</p>
                        <p className="text-neutral-300 text-sm">Monday to Saturday, 9AM - 5PM</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-white/10 p-2 rounded-full mr-4 flex-shrink-0">
                        <UserIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Personalized experience</p>
                        <p className="text-neutral-300 text-sm">Tailored to your home and needs</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-12">
                  <p className="text-neutral-300 text-sm">Need immediate assistance?</p>
                  <p className="font-medium text-lg">Call us at (555) 123-4567</p>
                </div>
              </div>
              
              {/* Right side - Appointment form */}
              <div className="p-8 lg:p-12 lg:w-3/5">
                <h2 className="text-2xl font-semibold text-neutral-800 mb-6">Book your appointment</h2>
                
                {isSuccess ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
                    <h3 className="font-medium text-lg">Thank you for booking!</h3>
                    <p>Your appointment request has been received. We'll contact you shortly to confirm your consultation.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Info */}
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <UserIcon className="h-5 w-5 text-neutral-400" />
                          </div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3 border ${errors.name ? 'border-red-300' : 'border-neutral-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                            placeholder="John Doe"
                          />
                        </div>
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                          Email Address *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <MailIcon className="h-5 w-5 text-neutral-400" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-300' : 'border-neutral-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                            placeholder="john@example.com"
                          />
                        </div>
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <PhoneIcon className="h-5 w-5 text-neutral-400" />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3 border ${errors.phone ? 'border-red-300' : 'border-neutral-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                      </div>
                    </div>
                    
                    {/* Appointment Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-1">
                          Preferred Date *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <CalendarIcon className="h-5 w-5 text-neutral-400" />
                          </div>
                          <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            min={today}
                            className={`w-full pl-10 pr-4 py-3 border ${errors.date ? 'border-red-300' : 'border-neutral-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                          />
                        </div>
                        {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-neutral-700 mb-1">
                          Preferred Time *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <ClockIcon className="h-5 w-5 text-neutral-400" />
                          </div>
                          <select
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3 border ${errors.time ? 'border-red-300' : 'border-neutral-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-none`}
                          >
                            <option value="">Select a time</option>
                            {TIME_SLOTS.map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
                      </div>
                    </div>
                    
                    {/* Furniture Type */}
                    <div>
                      <label htmlFor="furnitureType" className="block text-sm font-medium text-neutral-700 mb-1">
                        What type of furniture are you interested in? *
                      </label>
                      <select
                        id="furnitureType"
                        name="furnitureType"
                        value={formData.furnitureType}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${errors.furnitureType ? 'border-red-300' : 'border-neutral-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      >
                        <option value="">Select furniture type</option>
                        {FURNITURE_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.furnitureType && <p className="mt-1 text-sm text-red-600">{errors.furnitureType}</p>}
                    </div>
                    
                    {/* Additional message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                        Additional Information (Optional)
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                          <MessageCircleIcon className="h-5 w-5 text-neutral-400" />
                        </div>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Tell us about your project, specific requirements, or any questions you may have..."
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="privacy"
                        name="privacy"
                        type="checkbox"
                        required
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-neutral-300 rounded"
                      />
                      <label htmlFor="privacy" className="ml-2 block text-sm text-neutral-600">
                        I agree to the <span className="text-blue-600 hover:text-blue-800 cursor-pointer">Privacy Policy</span> and consent to being contacted about my appointment.
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 font-medium transition duration-200 ease-in-out flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Book Appointment'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
          
         <Footer />
        </div>
      </main>
    </>
  );
};

export default BookAppointment;