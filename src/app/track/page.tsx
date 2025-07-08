"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import Navbar from "../components/navbar";

export default function OrderTracking() {
  const [rating, setRating] = useState<number | null>(null);
  const [remarks, setRemarks] = useState("");
  const [deliveryExperience, setDeliveryExperience] = useState<string | null>(null);

  // Tracking information
  const trackingID = "19041655222270";
  const orderID = "PA147176";
  const orderPlacedDate = "25 Oct 2024";
  
  const activities = [
    {
      date: "05 NOV",
      time: "02:30 PM",
      activity: "Delivered - Delivered to consignee",
      location: "Patharkandi_Cntrl/Schl_D (Assam)",
      completed: true,
    },
    {
      date: "05 NOV",
      time: "11:10 AM",
      activity: "Dispatched - Out for delivery",
      location: "Patharkandi_Cntrl/Schl_D (Assam)",
      completed: true,
    },
  ];

  const handleSubmit = () => {
    // console.log("Feedback submitted:", { rating, remarks, deliveryExperience });
    alert("Feedback submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
        <Navbar />
      <div className="bg-gray-900 text-white p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <button className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            <button className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </button>
          </div>
        </div>
        
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto bg-white shadow-md">
        <div className="flex flex-col md:flex-row">
          {/* Left section - Tracking info */}
          <div className="w-full md:w-1/2 p-6 border-r border-gray-200">
            {/* Delivery provider */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mr-3">
              </div>
              <h2 className="text-xl font-medium">Delivery</h2>
            </div>

            {/* Tracking ID */}
            <div className="mb-6">
              <div className="flex justify-between text-gray-600 text-sm mb-1">
                <span>Tracking ID</span>
              </div>
              <div className="text-blue-600 font-medium">{trackingID}</div>
            </div>

            {/* Timeline */}
            <div className="relative">
              {activities.map((activity, index) => (
                <div key={index} className="pl-8 mb-10 relative">
                  {/* Timeline line */}
                  {index < activities.length - 1 && (
                    <div className="absolute left-[9px] top-6 w-0.5 h-16 bg-gray-200"></div>
                  )}
                  
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-1 w-[18px] h-[18px] rounded-full ${
                    activity.completed ? "bg-green-500" : "bg-gray-300"
                  }`}></div>
                  
                  {/* Content */}
                  <div>
                    <div className="font-bold">{activity.date}</div>
                    <div className="text-sm text-gray-500">{activity.time}</div>
                    <div className="mt-2">
                      <p className="mb-1">
                        <span className="font-medium">Activity : </span>
                        {activity.activity}
                      </p>
                      <p>
                        <span className="font-medium">Location : </span>
                        {activity.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivered info for second screen */}
            <div className="mt-10 pt-10 border-t border-gray-200">
              <div>
                <div className="text-gray-500 text-sm">Delivered On</div>
                <h2 className="text-xl font-bold">Tuesday</h2>
                <div className="text-gray-600">November</div>
                <div className="text-7xl font-bold text-blue-600">05</div>
                <span className="text-sm text-gray-500">2024</span>
              </div>

              <div className="mt-6">
                <div className="font-medium">Status:</div>
                <div className="flex items-center text-green-500 text-2xl font-medium">
                  <CheckCircle className="mr-2" size={24} />
                  <span>Delivered</span>
                </div>
              </div>              
            </div>
          </div>

          {/* Right section - Feedback form */}
          <div className="w-full md:w-1/2 p-6">
            {/* Order details */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </div>
                <h3 className="text-lg font-medium">Order Details</h3>
              </div>

              <div className="mb-3">
                <div className="text-gray-500 text-sm">Order ID</div>
                <div>{orderID}</div>
              </div>

              <div>
                <div className="text-gray-500 text-sm">Order Placed On</div>
                <div>{orderPlacedDate}</div>
              </div>
            </div>

            {/* Delivery experience rating */}
            <div className="mb-8">
              <h3 className="text-lg mb-4">How was your Delivery Experience?</h3>
              <div className="flex justify-between">
                {[
                  { label: "TERRIBLE", emoji: "🙁" },
                  { label: "BAD", emoji: "😐" },
                  { label: "OKAY", emoji: "😐" },
                  { label: "GOOD", emoji: "🙂" },
                  { label: "EXCELLENT", emoji: "😃" }
                ].map((option) => (
                  <button
                    key={option.label}
                    onClick={() => setDeliveryExperience(option.label)}
                    className="flex flex-col items-center"
                  >
                    <div className={`text-3xl mb-2 p-2 rounded-full ${
                      deliveryExperience === option.label ? "bg-gray-200" : ""
                    }`}>
                      {option.emoji}
                    </div>
                    <div className="text-xs font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded font-medium mb-8"
            >
              Submit
            </button>

            {/* NPS rating */}
            <div className="mb-8">
              <h3 className="text-base mb-4">
                Based on your recent interaction with SMART MART, how likely are you to
                recommend SMART MART to friends & family?
              </h3>

              <div className="flex justify-between mb-3">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => setRating(num)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                      rating === num
                        ? num <= 3
                          ? "border-red-500 text-red-500"
                          : num <= 7
                          ? "border-orange-500 text-orange-500"
                          : "border-green-500 text-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <div>Not at all likely</div>
                <div>Extremely likely</div>
              </div>
            </div>

            {/* Remarks */}
            <div className="mb-8">
              <h3 className="mb-2">Remarks</h3>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Please enter your remarks (Max. 250 characters)"
                className="w-full h-24 p-3 border border-gray-300 rounded resize-none"
                maxLength={250}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 text-right border-t border-gray-200">
          <span className="text-gray-500 text-sm">
            Powered By <span className="font-semibold"></span>
          </span>
        </div>
      </div>
    </div>
  );
}