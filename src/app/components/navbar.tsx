"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
  faHeart,
  faBars,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  return (
    <nav>
      <div className={`sticky text-white flex flex-wrap bg-[#0b1925] top-0 z-50 ${scrolled ? 'shadow-lg' : ''} transition-all duration-300`}>
        <div className="w-full flex items-center justify-between h-16 md:h-20 px-4 md:px-10">
          {/* Logo */}
          <div className="flex justify-center items-center">
            <Link href="/">
              <img src="/assets/LOGO-PNG.png" alt="Logo" className="w-10 md:w-14 transition-transform duration-300 hover:scale-110 cursor-pointer" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex text-center justify-center items-center mx-auto">
            <ul className="list-none flex space-x-4 lg:space-x-7">
              {['/', '/accessories', '/contact', '/about', '/bedroom', '/kitchen'].map((path, index) => {
                const label = ['Home', 'Accessories', 'Contact', 'About', 'Bedroom', 'Kitchen'][index];
                return (
                  <li key={path} className="relative group">
                    <Link href={path} className="hover:text-blue-300 transition-colors duration-300">
                      {label}
                    </Link>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Icons */}
          <div className="flex space-x-4 md:space-x-6 lg:space-x-9 text-lg items-center justify-center">
            <button
              onClick={toggleMenu}
              className="md:hidden text-white p-2 focus:outline-none transition-all duration-300 hover:text-blue-300"
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={faBars} className="text-xl" />
            </button>

            <div className="hidden md:flex space-x-4 md:space-x-6 items-center">
              <Link href="/search" className="relative group transition-transform duration-300 hover:text-blue-300">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-base md:text-lg" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/account" className="relative group transition-transform duration-300 hover:text-blue-300">
                <FontAwesomeIcon icon={faUser} className="text-base md:text-lg" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <div className="relative group">
                <Link href="/cart" className="transition-transform duration-300 hover:text-blue-300">
                  <FontAwesomeIcon icon={faCartShopping} className="text-base md:text-lg" />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full group-hover:scale-110 transition-transform duration-300">
                    3
                  </span>
                </Link>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
              </div>
              <div className="relative group">
                <Link href="/wishlist" className="transition-transform duration-300 hover:text-blue-300">
                  <FontAwesomeIcon icon={faHeart} className="text-base md:text-lg" />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full group-hover:scale-110 transition-transform duration-300">
                    5
                  </span>
                </Link>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden flex justify-end transition-opacity duration-500 ease-in-out ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) toggleMenu();
          }}
        >
          <div 
            className={`w-4/5 max-w-xs h-full bg-white text-black shadow-lg transform transition-transform duration-500 ease-in-out ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-blue-600">Menu</h2>
              <button
                onClick={toggleMenu}
                className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
                aria-label="Close menu"
              >
                <FontAwesomeIcon icon={faXmark} className="text-2xl" />
              </button>
            </div>

            <div className="px-6 py-4">
              <ul className="space-y-4">
                {['/', '/accessories', '/contact', '/about', '/bedroom', '/kitchen'].map((path, index) => {
                  const label = ['Home', 'Accessories', 'Contact us', 'About us', 'Bedroom', 'Kitchen'][index];
                  return (
                    <li key={path}>
                      <Link
                        href={path}
                        className="block w-full py-2 text-gray-800 hover:text-blue-600 hover:translate-x-2 transition-all duration-300"
                        onClick={toggleMenu}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="px-6 py-4 mt-4 bg-gray-50 rounded-lg mx-4">
              <div className="flex flex-col space-y-4">
                {[
                  { href: '/search', icon: faMagnifyingGlass, label: 'Search' },
                  { href: '/account', icon: faUser, label: 'My Account' },
                  { href: '/cart', icon: faCartShopping, label: 'Cart', badge: '3' },
                  { href: '/wishlist', icon: faHeart, label: 'Wishlist', badge: '5' }
                ].map(({ href, icon, label, badge }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center space-x-3 text-gray-800 hover:text-blue-600 transition-colors duration-300"
                    onClick={toggleMenu}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 relative">
                      <FontAwesomeIcon icon={icon} />
                      {badge && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                          {badge}
                        </span>
                      )}
                    </div>
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="absolute bottom-8 w-full px-6">
              <div className="text-center py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 cursor-pointer">
                Log In / Sign Up
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
