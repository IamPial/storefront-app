"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Package, ChevronRight, X, Clock, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import Link from "next/link";


type OrderStatus = "Pending" | "Delivered" | "Cancelled" | "Returned";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
}

const  MyOrdersPage=()=> {

  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== "undefined") {
      const savedOrders = localStorage.getItem("my_orders");
      if (savedOrders) {
        try {
          return JSON.parse(savedOrders);
        } catch (e) {
          console.error("Failed to parse orders", e);
        }
      }
    }
    return [];
  });

  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filters = ["All", "Pending", "Delivered", "Cancelled", "Returned"];

  const filteredOrders = selectedFilter === "All"
    ? orders
    : orders.filter((order) => order.status === selectedFilter);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "Pending":
        return <span className="inline-flex items-center gap-1 text-amber-600 bg-amber-50 text-xs font-semibold px-2.5 py-1 rounded-full"><Clock className="w-3.5 h-3.5" /> Pending</span>;
      case "Delivered":
        return <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 text-xs font-semibold px-2.5 py-1 rounded-full"><CheckCircle2 className="w-3.5 h-3.5" /> Delivered</span>;
      case "Cancelled":
        return <span className="inline-flex items-center gap-1 text-rose-600 bg-rose-50 text-xs font-semibold px-2.5 py-1 rounded-full"><XCircle className="w-3.5 h-3.5" /> Cancelled</span>;
      case "Returned":
        return <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 text-xs font-semibold px-2.5 py-1 rounded-full"><RotateCcw className="w-3.5 h-3.5" /> Returned</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Orders</h1>
          <p className="text-xs text-gray-500">Track and view your recent order history</p>
          </div>
          <Link href="/order-tracking" className="bg-[#0f172a] border">Track Order</Link>
        </div>
        

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                selectedFilter === filter
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white dark:bg-gray-900 text-gray-600 border border-gray-100 dark:border-gray-800"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">No orders found</h3>
            <p className="text-xs text-gray-400">Place an order from checkout to view it here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:border-blue-500/40 cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-gray-900 dark:text-white">{order.id}</span>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="text-xs text-gray-400">Date: {order.date} • {order.items.length} item(s)</p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-extrabold text-gray-900 dark:text-white">৳{order.totalAmount.toLocaleString()}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedOrder && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 max-w-lg w-full rounded-3xl p-6 border border-gray-100 dark:border-gray-800 space-y-5 shadow-2xl relative">
              <button onClick={() => setSelectedOrder(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Order Details</h3>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <p className="text-xs text-gray-400">Order ID: {selectedOrder.id} • Date: {selectedOrder.date}</p>
              </div>

              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold truncate">{item.title}</h4>
                      <p className="text-[11px] text-gray-400">Qty: {item.quantity} × ৳{item.price}</p>
                    </div>
                    <span className="text-xs font-bold">৳{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t pt-3 border-gray-100 dark:border-gray-800 text-xs">
                <div className="flex justify-between text-gray-500">
                  <span>Shipping Address</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200 text-right max-w-50">{selectedOrder.shippingAddress}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Payment Method</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{selectedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span>Total Paid</span>
                  <span className="text-blue-600">৳{selectedOrder.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrdersPage;