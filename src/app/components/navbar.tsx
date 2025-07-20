"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faXmark,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (searchQuery.trim()) {
    console.log('Searching for:', searchQuery);
  }
};


  return (
    <nav>
      <div className={`sticky text-black font-bold flex flex-wrap bg-[#FEFFFE] top-0 z-50 ${scrolled ? 'shadow-lg' : ''} transition-all duration-300`}>
        <div className="w-full flex items-center justify-between h-16 md:h-20 px-4 md:px-10">

          {/* Desktop Links */}
          <div className="hidden md:flex text-center justify-start items-center">
            <ul className="list-none flex space-x-4 lg:space-x-7">
              {['/', '/accessories', '/contact', '/about', '/bedroom', '/kitchen'].map((path, index) => {
                const label = ['Home', 'Accessories', 'Contact', 'About'][index];
                return (
                  <li key={path} className="relative group">
                    <Link href={path} className="transition-colors duration-300">
                      {label}
                    </Link>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center items-center">
            <Link href="/">
              <div className="relative w-16 md:w-24 mt-[-40px] h-10 md:h-14 cursor-pointer transition-transform duration-300 hover:scale-110">
                <Image
                  src="/assets/LOGO-PNG.png"
                  alt="Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          <div className="flex space-x-2 md:space-x-4 lg:space-x-6 text-lg items-center justify-end">

            <div className="hidden md:flex">
              <form onSubmit={handleSearch} className="relative flex items-center">
                <div className={`flex items-center border-2 rounded-full overflow-hidden transition-all duration-300 ${
                  isSearchFocused ? ' shadow-md' : 'border-black'
                }`}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search..."
                    className="px-4 py-2 w-48 lg:w-64 text-sm outline-none bg-transparent"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 transition-colors duration-300 cursor-pointer border-gray-300"
                  >
                    <FontAwesomeIcon icon={faSearch} className="text-gray-600" />
                  </button>
                </div>
              </form>
            </div>

            {/* Mobile Hamburger Icon Only */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-black p-2 focus:outline-none transition-all duration-300 hover:text-blue-300"
                aria-label="Toggle menu"
              >
                <FontAwesomeIcon icon={faBars} className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
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
              <h2 className="text-xl font-semibold">Menu</h2>
              <button
                onClick={toggleMenu}
                className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
                aria-label="Close menu"
              >
                <FontAwesomeIcon icon={faXmark} className="text-2xl" />
              </button>
            </div>

            {/* Search Bar inside Hamburger */}
            <div className="px-6 py-4 border-b border-gray-200">
              <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="px-3 py-1.5 w-full text-sm outline-none bg-transparent"
                />
                <button
                  type="submit"
                  className="px-3 bg-gray-100 hover:bg-gray-200 border-l border-gray-300"
                >
                  <FontAwesomeIcon icon={faSearch} className="text-gray-600 text-sm" />
                </button>
              </form>
            </div>

            {/* Mobile Links */}
            <div className="px-6 py-4">
              <ul className="space-y-4">
                {['/', '/accessories', '/contact', '/about', '/bedroom', '/kitchen'].map((path, index) => {
                  const label = ['Home', 'Accessories', 'Contact', 'About'][index];
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
          </div>
        </div>
      </div>
    </nav>
  );
}
