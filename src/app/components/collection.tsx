// import Image from "next/image";

const Collection = () => {
  return (
    <>
      <div className="overflow-hidden w-full">
        <div className=" overflow-hidden">
          <img
            src="/assets/butterfly.jpg"
            alt="Lamp Decor"
            className="w-full rounded-2xl h-52 object-cover"
          />
        </div>
        <div className="py-4 text-center">
          <h2 className="text-black text-lg mb-2 font-extrabold">Lamp Decor</h2>
          <p className="text-gray-600 text-sm px-4">
            Bedside lamps, ceiling lamps, and decorative wall lamps
          </p>
        </div>
      </div>
    </>
  );
};

export default Collection;