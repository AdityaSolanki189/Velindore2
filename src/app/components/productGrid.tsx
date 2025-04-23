import Image from "next/image";

const ShopNowGrid = () => {
  return (
    <section className="p-1 pt-2 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Large Image */}
        <div className="col-span-1 md:row-span-2 relative">
          <Image
            src="/assets/bed room.jpg"
            alt="Sideboard"
            layout="responsive"
            width={500}
            height={500}
            className="rounded"
          />
          <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 text-black font-semibold rounded-full shadow">SHOP NOW</button>
        </div>

        {/* Top Middle Grid */}
        <div className="grid grid-cols-2 gap-4 col-span-1">
          <div className="relative">
            <Image
              src="/assets/bed room.jpg"
              alt="Sofa"
              layout="responsive"
              width={300}
              height={300}
              className="rounded"
            />
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 text-black font-semibold text-xs rounded-full shadow">SHOP NOW</button>
          </div>
          <div className="relative">
            <Image
              src="/assets/bed room.jpg"
              alt="Bed"
              layout="responsive"
              width={300}
              height={300}
              className="rounded"
            />
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 text-black font-semibold text-xs rounded-full shadow">SHOP NOW</button>
          </div>
        </div>

        {/* Right Tall Image */}
        <div className="relative col-span-1 md:row-span-2">
          <Image
            src="/assets/bed room.jpg"
            alt="Bathroom"
            layout="responsive"
            width={500}
            height={500}
            className="rounded"
          />
          <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 text-black font-semibold text-xs rounded-full shadow">SHOP NOW</button>
        </div>

        {/* Bottom Middle Grid */}
        <div className="grid grid-cols-2 gap-4 col-span-1">
          <div className="relative">
            <Image
              src="/assets/bed room.jpg"
              alt="Baskets"
              layout="responsive"
              width={300}
              height={300}
              className="rounded"
            />
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 text-black font-semibold text-xs rounded-full shadow">SHOP NOW</button>
          </div>
          <div className="relative">
            <Image
              src="/assets/bed room.jpg"
              alt="Bulb"
              layout="responsive"
              width={300}
              height={300}
              className="rounded"
            />
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 text-black font-semibold rounded-full text-xs shadow">SHOP NOW</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopNowGrid;
