'use client';

import Link from "next/link";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { getSettingsData } from "@/backend/services/settings";
import { SettingType } from "@/backend/types";

const Footer = () => {
  const [settings, setSettings] = useState<SettingType | null>(null);

  const getSettings = async () => {
    setSettings(await getSettingsData());
  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <footer className="text-black pt-12 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="ml-20">
            <h3 className="text-lg font-bold mb-3">CONTACT INFO</h3>
            <p className="font-bold text-lg">Hotline free 24/7</p>

            {/* <p className="mb-4">
              Morbi ullamcorper ligula sit amet efficitur pellentesque. Aliquam
              ornare quam tellus ultricies molestie tortor.
            </p> */}

            <div className="mt-6">
              <div className="flex items-center mt-2">
                <Phone size={20} className="mr-2" />
                <span className="font-black text-lg">{settings?.contactNumber}</span>
              </div>

              <p className="mt-5 font-regular">58 A, East Madison Street,Baltimore, MD, USA 4508 admin@gmail.com</p>

              <p className="text-md mt-5 font-semibold">Payment method</p>
<div className="flex items-center mt-4 space-x-3">
  {/* VISA */}
  <svg width="40" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="24" rx="4" fill="#1A1F71"/>
    <path fill="#fff" d="M14.34 7.64L12.84 16H10.83L9.33 7.64H11.34L11.83 11.3L12.18 8.97H13.5L13.86 11.3L14.34 7.64ZM18.6 10.35C18.59 9.53 18.24 8.79 17.59 8.3C16.96 7.83 16.06 7.6 14.98 7.6H12.44V16H14.42V13.19H14.96C15.91 13.19 16.67 12.93 17.21 12.42C17.74 11.91 18.01 11.2 18.01 10.35H18.6ZM16.25 10.35C16.25 11.03 15.8 11.53 14.93 11.53H14.42V9.17H14.92C15.8 9.17 16.25 9.67 16.25 10.35ZM19.55 13.48L19.92 15.17H21.87L21.49 13.43C21.27 12.38 20.48 11.6 19.28 11.19L20.38 7.64H18.37L17.44 11.04C17.41 11.13 17.39 11.22 17.37 11.3C17.24 11.84 17.31 12.41 17.57 12.91C17.83 13.42 18.26 13.8 18.76 14.02C19.26 14.23 19.85 14.26 20.39 14.1L20.26 13.52C19.98 13.63 19.68 13.67 19.4 13.62C19.32 13.6 19.25 13.58 19.19 13.56C19.3 13.5 19.42 13.47 19.55 13.48Z"/>
  </svg>

  {/* MasterCard */}
  <svg width="40" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="24" rx="4" fill="#EB001B"/>
    <circle cx="15" cy="12" r="6" fill="#FF5F00"/>
    <circle cx="23" cy="12" r="6" fill="#F79E1B"/>
    <path d="M19 6A6 6 0 1 0 19 18A6 6 0 1 0 19 6Z" fill="#FF5F00"/>
  </svg>

  {/* Visa Electron (simulated) */}
  <svg width="40" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="24" rx="4" fill="#005BAC"/>
    <text x="8" y="16" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">Electron</text>
  </svg>

  {/* Maestro (simulated) */}
  <svg width="40" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="24" rx="4" fill="#000"/>
    <circle cx="16" cy="12" r="6" fill="#EB001B"/>
    <circle cx="22" cy="12" r="6" fill="#0079BE"/>
    <text x="11" y="21" fill="white" fontSize="6" fontFamily="Arial">Maestro</text>
  </svg>
</div>

              {/* <div className="flex items-center mt-4">
                <Mail size={20} className="mr-2" />
                <span>{settings?.contactEmail}</span>
              </div>

              <div className="flex items-center mt-4">
                <Calendar size={20} className="mr-2" />
                <span>Monday till Friday 10 to 6 EST</span>
              </div> */}

              <p className="text-md mt-5 font-semibold">Connect with us</p>
              <div className="flex items-center mt-6 space-x-4">
                {settings?.facebookLink && (
                  <Link
                    href={settings.facebookLink}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </Link>
                )}

                {settings?.instagramLink && (
                  <Link
                    href={settings.instagramLink}
                    target="_blank"
                    className="text-pink-600 hover:text-pink-800 transition-colors"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </Link>
                )}

                {settings?.linkedinLink && (
                  <Link
                    href={settings.linkedinLink}
                    target="_blank"
                    className="text-blue-700 hover:text-blue-900 transition-colors"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* <div className="ml-0 md:ml-4 lg:ml-20">
            <h3 className="text-lg font-bold mb-6 mt-6 md:mt-0">HELP</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="hover:text-gray-300">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-gray-300">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-gray-300">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/how-to-order" className="hover:text-gray-300">
                  How To Order
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-gray-300">
                  How To Track
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-gray-300">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Company Column */}
          <div className="ml-0 md:ml-4 lg:ml-20">
            <h3 className="text-lg font-black mb-6 mt-6 md:mt-0">COMPANY</h3>
            <ul className="space-y-3 font-bold">
              <li>
                <Link href="/about" className="hover:text-gray-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="hover:text-gray-300">
                  Book an appointment
                </Link>
              </li>
              {/* <li>
                <Link href="/careers" className="hover:text-gray-300">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-gray-300">
                  Store Locations
                </Link>
              </li>
              <li>
                <Link href="/testimonial" className="hover:text-gray-300">
                  Testimonial
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-gray-300">
                  Sitemap
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Our Shop Column */}
          <div className="ml-0 md:ml-4 lg:ml-20">
            <h3 className="text-lg font-black mb-6 mt-6 md:mt-0">OUR SHOP</h3>
            <ul className="space-y-3 font-bold">
              <li>
                <Link
                  href="/category/accessories"
                  className="hover:text-gray-300"
                >
                  Accessories
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/category/living-room"
                  className="hover:text-gray-300"
                >
                  Living Room
                </Link>
              </li>
              <li>
                <Link href="/category/bedroom" className="hover:text-gray-300">
                  Bedroom
                </Link>
              </li>
              <li>
                <Link
                  href="/category/dining-room"
                  className="hover:text-gray-300"
                >
                  Dining Room
                </Link>
              </li>
              <li>
                <Link
                  href="/category/home-office"
                  className="hover:text-gray-300"
                >
                  Home Office
                </Link>
              </li>
              <li>
                <Link href="/category/kitchen" className="hover:text-gray-300">
                  Kitchen
                </Link>
              </li> */}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 text-center">
          <p className="text-lg">
            Copyright © 2025 Velondore. All rights reserved.
          </p>
          <div className="flex gap-2 justify-center mt-2">
          <p className="font-extrabold">Privacy Policy</p>
          <div className="w-5 h-0.5 mt-2 bg-black rotate-90"></div>
          <p className="font-extrabold">Terms and Conditions</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-green-500 text-white rounded-full p-2 md:p-3 shadow-lg hover:bg-green-600 transition-colors"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
