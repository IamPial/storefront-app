"use client";

import React, { useState } from "react";
import { Search, Check, Clock, PackageCheck, Truck, Home, PackageX, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  status: "Pending" | "Delivered" | "Cancelled" | "Returned" | string;
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: string;
}

//define timeline step type
interface TimelineStep {
  title: string;
  desc: string;
  icon: React.ElementType;
  completed: boolean;
  isRed?: boolean; 
}

const OrderTrackingPage=() =>{
  const [searchId, setSearchId] = useState("");
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

   //visual steps on order status
  const getTimelineSteps = (status: string): TimelineStep[] => {
    const isCancelled = status === "Cancelled";
    const isReturned = status === "Returned";

    if (isCancelled || isReturned) {
      return [
        { title: "Order Placed", desc: "Order was received", completed: true, icon: Clock },
        { title: status, desc: `Order has been ${status.toLowerCase()}`, completed: true, icon: PackageX, isRed: true }
      ];
    }

    const stepsOrder = ["Pending", "Processing", "On The Way", "Delivered"];
    const currentStepIndex = stepsOrder.indexOf(status) !== -1 ? stepsOrder.indexOf(status) : 0;

    return [
      { title: "Order Placed", desc: "We have received your order", icon: Clock },
      { title: "Processing", desc: "Packaging & quality check", icon: PackageCheck },
      { title: "On The Way", desc: "Handed over to delivery partner", icon: Truck },
      { title: "Delivered", desc: "Order delivered successfully", icon: Home },
    ].map((step, idx) => ({
      ...step,
      completed: idx <= currentStepIndex,
    }));
  };


  //handleSearch
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    if (!searchId.trim()) return;

    const savedOrders: Order[] = JSON.parse(localStorage.getItem("my_orders") || "[]");
    const found = savedOrders.find(
      (o) => o.id.toLowerCase() === searchId.trim().toLowerCase()
    );

    setSearchedOrder(found || null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">

     <div className="group px-5" >
        <Link href={"/orders"} className="flex items-center "><ArrowLeft className="w-4 h-4 text-[#4f46e5] group-hover:pr-1 transition-all duration-100"/> <Button className=" bg-transparent text-[#4f46e5] rounded-lg">Return to Orders</Button></Link>
     </div>
      <div className="max-w-3xl mx-auto space-y-6 mt-8">

        {/* Search Box */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Track Order</h1>
            <p className="text-xs text-gray-500">Enter your Order ID (e.g. ORD-1234) to see live status</p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Order ID..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all"
            >
              Track
            </button>
          </form>
        </div>

        {/* Dynamic Timeline Result */}
        {searchedOrder ? (
          <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800">
              <div>
                <span className="text-xs text-gray-400">Order ID</span>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">{searchedOrder.id}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400">Order Date</span>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{searchedOrder.date}</p>
              </div>
            </div>

            {/* Timeline Graphic */}
            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-800">
              {getTimelineSteps(searchedOrder.status).map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative flex items-start gap-4">
                    <div
                      className={`absolute -left-6 sm:-left-8 top-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                        step.isRed
                          ? "bg-rose-600 border-rose-600 text-white"
                          : step.completed
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400"
                      }`}
                    >
                      {step.completed && !step.isRed ? (
                        <Check className="w-3.5 h-3.5 stroke-3" />
                      ) : (
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <h4 className={`text-xs sm:text-sm font-bold ${step.completed ? "text-gray-900 dark:text-white" : "text-gray-400"}`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          hasSearched && (
            <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 text-xs text-gray-400">
              No order found with ID: <span className="font-bold text-gray-700 dark:text-gray-200">{searchId}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default OrderTrackingPage;