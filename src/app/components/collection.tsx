import Image from "next/image";

const ShopNowGrid = () => {
  return (
    <>
      <div className="rounded-lg overflow-hidden w-full">
        <div className="h-48 overflow-hidden">
          <img
            src="/assets/flower.jpg"
            alt="Lamp Decor"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="py-4 text-center">
          <h2 className="text-black font-medium text-lg mb-2">Lamp Decor</h2>
          <p className="text-gray-600 text-sm px-4">
            Bedside lamps, ceiling lamps, and decorative wall lamps
          </p>
        </div>
      </div>
    </>
  );
};

export default ShopNowGrid;