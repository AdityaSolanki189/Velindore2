import React from 'react';
// import '.../utils/fontawesome'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
  faHeart
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  return (
    <nav>
      <div className="sticky text-white flex bg-[#0D2235] top-0 z-50 h-20">
        {/* Logo */}
        <div className="flex pl-10 justify-center items-center">
          <img src="" alt="Logo" />
        </div>

        {/* Navigation Links */}
        <div className="flex text-center justify-center items-center mx-auto">
          <ul className="list-none flex space-x-7">
            <li><a href="">Home</a></li>
            <li><a href="">Accessories</a></li>
            <li><a href="">Furniture</a></li>
            <li><a href="">Living Room</a></li>
            <li><a href="">Bedroom</a></li>
            <li><a href="">Kitchen</a></li>
          </ul>
        </div>

        {/* Icons */}
        <div className="flex space-x-5 text-lg mr-8 items-center justify-center">
          <a href=""><FontAwesomeIcon icon={faMagnifyingGlass} /></a>
          <a href=""><FontAwesomeIcon icon={faUser} /></a>
          <a href=""><FontAwesomeIcon icon={faCartShopping} /></a>
          <a href=""><FontAwesomeIcon icon={faHeart} /></a>
        </div>
      </div>
    </nav>
  );
}
