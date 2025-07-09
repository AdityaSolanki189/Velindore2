'use client';

import React from 'react';
import Image from 'next/image';

const MainAccessorty2 = () => {
  return (
    <div>
      <div className='rounded-2xl bg-[#F9F9F9] p-20 px-44 mx-auto py-40 flex justify-center'>
        <div className="relative w-[400px] h-[400px]">
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
        <div className='w-96 mt-5 mx-auto'>
          <p className='text-sm'>
            Hästens accessories include, headboards and covers, bed legs, bed skirts, bed linen, down pillows and quilts, mattress protectors, pajamas and down boots and a stunning children’s collection. All made from natural materials.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainAccessorty2;
