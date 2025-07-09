'use client';

import React from "react";
import Image from "next/image";

const MainAccessory = () => {
  return (
    <>
      <div className='flex items-center mx-auto mt-10 rounded-2xl bg-[#F9F9F9] p-20 w-[900px] h-[500px] relative'>
        <div className="w-[500px] h-full ml-auto relative">
          <Image
            src="/assets/image 35.png"
            alt="Royal King Bed embroidery art"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className='text-center mt-10 text-black'>
        <h2 className='text-xl'>Royal King Bed embroidery art</h2>
        <div className='w-1/2 mt-5 mx-auto'>
          <p className='text-sm'>
            Hästens accessories include, headboards and covers, bed legs, bed skirts, bed linen, down pillows and quilts,
            mattress protectors, pajamas and down boots and a stunning children’s collection. All made from natural materials.
          </p>
        </div>
      </div>
    </>
  );
};

export default MainAccessory;
