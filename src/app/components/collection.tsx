import Image from "next/image";

const ShopNowGrid = () => {
  return (
    <>
      <div className="rounded-xl overflow-hidden w-80 m-5">
        <img
          src="/assets/flower.jpg"
          alt="Lamp Decor"
          className="w-[200px] object-cover"
        />
        <div className="p-4 text-center">
          <h2 className="text-black font-bold text-lg mb-1">Lamp Decor</h2>
          <p className="text-gray-600 text-sm">
            Shop our best selling collections from today itself
          </p>
        </div>
      </div>
    </>
  );
};

export default ShopNowGrid;
