import { CheckCircle } from "lucide-react";
import Navbar from "../components/navbar";

export default function OrderTracking() {
  // const trackingID = "19041655222270";
  const orderID = "PA147176";
  const orderPlacedDate = "25 Oct 2024";

  return (
    <div className="min-h-screen bg-gray-100 mt-10 text-black">
      <Navbar />
      
      <div className="max-w-2xl mx-auto bg-white shadow-md">
        <div className="p-6 space-y-8">
          
          
          <div className="flex items-center justify-center">
            <div className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <h3 className="text-lg font-medium">Order Details</h3>
          </div>
          
          <div className="text-center">
            <div className="text-gray-500 text-sm">Order ID</div>
            <div className="font-medium">{orderID}</div>
          </div>
          
          <div className="text-center">
            <div className="text-gray-500 text-sm">Order Placed On</div>
            <div className="font-medium">{orderPlacedDate}</div>
          </div>
          
          <div className="text-center">
            <div className="text-gray-500 text-sm">Delivered On</div>
            <h2 className="text-xl font-bold">Tuesday</h2>
            <div className="text-gray-600">November</div>
            <div className="text-7xl font-bold text-blue-600">05</div>
            <span className="text-sm text-gray-500">2024</span>
          </div>
          
          <div className="text-center">
            <div className="font-medium mb-2">Status:</div>
            <div className="flex items-center justify-center text-green-500 text-2xl font-medium">
              <CheckCircle className="mr-2" size={24} />
              <span>Delivered</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}