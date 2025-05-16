"use client";

import React, { useState, useEffect, useRef } from 'react';
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchFormRef = useRef<HTMLDivElement>(null);
  

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

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchFormRef.current &&
        !searchFormRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  // const toggleSearch = () => {
  //   setIsSearchOpen(!isSearchOpen);
  // };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchTerm = searchInputRef.current?.value || '';
    console.log('Searching for:', searchTerm);
  
    // window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    setIsSearchOpen(false);
  };
  

  return (
    <nav>
      <div className={`sticky text-black font-bold flex flex-wrap bg-[#FEFFFE] top-0 z-50 ${scrolled ? 'shadow-lg' : ''} transition-all duration-300`}>
        <div className="w-full flex items-center justify-between h-16 md:h-20 px-4 md:px-10">
          {/* Desktop Navigation Links - Moved to the left */}
          <div className="hidden md:flex text-center justify-start items-center">
            <ul className="list-none flex space-x-4 lg:space-x-7">
              {['/', '/accessories', '/contact', '/about', '/bedroom', '/kitchen'].map((path, index) => {
                const label = ['Home', 'Accessories', 'Contact', 'About'][index];
                return (
                  <li key={path} className="relative group">
                    <Link href={path} className=" transition-colors duration-300">
                      {label}
                    </Link>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center items-center">
            <Link href="/">
              <img src="/assets/LOGO-PNG.png" alt="Logo" className="w-10 md:w-14 transition-transform duration-300 hover:scale-110 cursor-pointer" />
            </Link>
          </div>

          <div className="flex space-x-4 md:space-x-6 lg:space-x-9 text-lg items-center justify-end">
            <button
              onClick={toggleMenu}
              className="md:hidden text-black p-2 focus:outline-none transition-all duration-300 hover:text-blue-300"
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={faBars} className="text-xl" />
            </button>

            <div className="hidden md:flex space-x-4 md:space-x-6 items-center">
              <div className="relative group" ref={searchFormRef}>
              

    <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
  <input
    ref={searchInputRef}
    type="text"
    placeholder="Search products..."
    className="w-64 py-2 pl-4 pr-10 border border-black rounded-full text-sm font-normal"
  />
  <button
    type="submit"
    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black hover:text-blue-500"
  >
    <FontAwesomeIcon icon={faMagnifyingGlass} />
  </button>
</form>

              </div>

              
              <div className="relative group">
                <Link href="/cart" className="transition-transform duration-300 hover:text-blue-300">
                  <img src="/assets/window.svg" alt="" className='w-6' />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full group-hover:scale-110 transition-transform duration-300">
                    3
                  </span>
                </Link>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
              </div>
              <div className="relative group">
                <Link href="/wishlist" className="transition-transform duration-300 hover:text-blue-300">
                    <img src="/assets/heart.svg" alt="" className='w-6' />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full group-hover:scale-110 transition-transform duration-300">
                    5
                  </span>
                </Link>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
              </div>
            </div>
          </div>
        </div>

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

            <div className="px-6 py-4 border-b border-gray-200">
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-2 px-3 border border-gray-300 rounded-l-lg text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button 
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-lg transition-colors duration-300"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </form>
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