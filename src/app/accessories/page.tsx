import React from 'react'
import Navbar from '../components/navbar';
import MainAccessory from '../components/mainAccessory';
import MainAccessorty2 from '../components/mainAccessorty2';
import AccessoryBento from '../components/accessorybento';

const page = () => {
  return (
    <>
        <Navbar />

        <div className='text-black text-center mt-10'>
            <h2 className='text-2xl'>ACCESSORIES</h2>
            <p className='text-sm mt-2 text-gray-500'>Home - Accessories</p>
        </div>

        <MainAccessory />


        <div className='flex container mx-auto gap-20 mt-20'>
            <MainAccessorty2 />
            <MainAccessorty2 />
        </div>

        <div className='mt-20'>
          <AccessoryBento />
        </div>

    </>
  )
}

export default page