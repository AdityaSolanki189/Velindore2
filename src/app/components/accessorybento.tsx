import React from "react";

const AccessoryBento = () => {
  return (
    <div className="max-w-6xl mx-auto bg-white p-4">
      <div className="flex flex-col gap-6">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Antique Couch */}
          <div className="bg-gray-100 rounded p-4 flex-grow flex items-center">
            <div className="w-full">
              <div className="text-lg font-medium mb-2 pl-4">Antique Couch</div>
              <div className="flex justify-center">
                <img 
                  src="/assets/living room.jpg" 
                  alt="Antique Couch" 
                  className="object-contain h-40"
                />
              </div>
            </div>
          </div>
          
          {/* Antique Light */}
          <div className="bg-gray-100 rounded p-4 md:w-1/3">
            <div className="flex flex-col items-center">
              <div className="flex justify-center h-48">
                <img 
                  src="/assets/living room.jpg" 
                  alt="Antique Light" 
                  className="object-contain"
                />
              </div>
              <div className="text-lg font-medium text-center mt-2">Antique light</div>
            </div>
          </div>
        </div>
        
        {/* Middle Row */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Antique Chair */}
          <div className="bg-gray-100 rounded p-4 md:w-1/2">
            <div className="pl-4 text-lg font-medium mb-2">Antique Chair</div>
            <div className="flex justify-center">
              <img 
                src="/assets/living room.jpg" 
                alt="Antique Chair" 
                className="object-contain h-64"
              />
            </div>
          </div>
          
          {/* Right Column with Pillow and Bench */}
          <div className="flex flex-col gap-6 md:w-1/2">
            {/* Antique Pillow */}
            <div className="bg-gray-100 rounded p-4">
              <div className="flex justify-center mb-2">
                <img 
                  src="/assets/living room.jpg" 
                  alt="Antique Pillow" 
                  className="object-contain h-24"
                />
              </div>
              <div className="text-lg font-medium text-center">Antique Pillow</div>
            </div>
            
            {/* Antique bench */}
            <div className="bg-gray-100 rounded p-4">
              <div className="text-lg font-medium text-center mb-2">Antique bench</div>
              <div className="flex justify-center">
                <img 
                  src="/assets/living room.jpg" 
                  alt="Antique Bench" 
                  className="object-contain h-24"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Row */}
        <div className="bg-gray-100 rounded p-4 md:ml-auto md:w-2/3">
          <div className="flex justify-center">
            <img 
              src="/assets/living room.jpg" 
              alt="Wooden Bench" 
              className="object-contain h-32"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessoryBento;