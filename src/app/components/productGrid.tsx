import Image from "next/image";

const ShopNowGrid = () => {
  return (
    <section className="p-1 pt-2 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Large Image */}
        <div className="col-span-1 md:row-span-2 relative cursor-pointer">
          <div className="aspect-[4/4] relative overflow-hidden">
            <Image
              src="/assets/bed room.jpg"
              alt="Sideboard"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-2000 ease-out hover:scale-110"
            />
          </div>
          <button className="absolute bottom-4 cursor-pointer left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 text-black font-semibold rounded-full shadow">SHOP NOW</button>
        </div>
                
        {/* Top Middle Grid */}
        <div className="grid grid-cols-2 gap-4 col-span-1 cursor-pointer">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src="/assets/bed room.jpg"
              alt="Sofa"
              fill
              sizes="(max-width: 768px) 50vw, 16vw"
              className="object-cover transition-transform duration-2000 ease-out hover:scale-110"
            />
            <button className="absolute bottom-4 cursor-pointer left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 text-black font-semibold text-xs rounded-full shadow">SHOP NOW</button>
          </div>
          <div className="relative aspect-square overflow-hidden">
            <Image
              src="/assets/downloa.jpg"
              alt="Bed"
              fill
              sizes="(max-width: 768px) 50vw, 16vw"
              className="object-cover transition-transform duration-2000 ease-out hover:scale-110"
            />
            <button className="absolute bottom-4 cursor-pointer left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 text-black font-semibold text-xs rounded-full shadow">SHOP NOW</button>
          </div>
        </div>
                
        {/* Right Tall Image */}
        <div className="relative col-span-1 md:row-span-2 cursor-pointer">
          <div className="aspect-[4/4] relative overflow-hidden">
            <Image
              src="/assets/bed room.jpg"
              alt="Bathroom"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-2000 ease-out hover:scale-110"
            />
          </div>
          <button className="absolute bottom-4 cursor-pointer left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 text-black font-semibold text-xs rounded-full shadow">SHOP NOW</button>
        </div>
                
        {/* Bottom Middle Grid */}
        <div className="grid grid-cols-2 gap-4 col-span-1 mt-[-15px] cursor-pointer">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src="/assets/flower.jpg"
              alt="Baskets"
              fill
              sizes="(max-width: 768px) 50vw, 16vw"
              className="object-cover transition-transform duration-2000 ease-out hover:scale-110"
            />
            <button className="absolute bottom-4 cursor-pointer left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 text-black font-semibold text-xs rounded-full shadow">SHOP NOW</button>
          </div>
          <div className="relative aspect-square overflow-hidden">
            <Image
              src="/assets/living room.jpg"
              alt="Bulb"
              fill
              sizes="(max-width: 768px) 50vw, 16vw"
              className="object-cover transition-transform duration-2000 ease-out hover:scale-110"
            />
            <button className="absolute bottom-4 cursor-pointer left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 text-black font-semibold rounded-full text-xs shadow">SHOP NOW</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopNowGrid;