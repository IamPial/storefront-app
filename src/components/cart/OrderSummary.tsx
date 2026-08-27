"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

const OrderSummary=()=> {
  const { subtotal, shipping, total, cart } = useCart();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 space-y-6 shadow-sm sticky top-6">
      <h2 className="text-base font-extrabold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">
        Order Summary
      </h2>

      <div className="space-y-3 text-xs font-semibold">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal</span>
          <span className="text-gray-900 dark:text-white font-bold">
            ৳{subtotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Estimated Shipping</span>
          <span className="text-gray-900 dark:text-white font-bold">
            {shipping > 0 ? `৳${shipping}` : "Free"}
          </span>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex justify-between text-sm">
          <span className="font-extrabold text-gray-900 dark:text-white">Live Total</span>
          <span className="font-extrabold text-blue-600 dark:text-blue-400 text-base">
            ৳{total.toLocaleString()}
          </span>
        </div>
      </div>

      <Link
        href={cart.length > 0 ? "/checkout" : "#"}
        className={`w-full py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-white transition-all ${
          cart.length > 0
            ? "bg-[#0f172a]/90 hover:bg-[#0f172a] shadow-md shadow-[#0f172a]/20 active:scale-98"
            : "bg-gray-300 dark:bg-gray-800 cursor-not-allowed"
        }`}
      >
        <ShoppingBag className="w-4 h-4" /> Proceed to Checkout <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default OrderSummary