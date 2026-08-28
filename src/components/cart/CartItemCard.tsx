"use client";

import React from "react";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";
import { CartItem, useCart } from "@/context/CartContext";
import { DeleteCartItem } from "./DeleteCartItem";

const CartItemCard=({ item }: { item: CartItem })=> {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 gap-4 transition-all">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800 shrink-0 border border-gray-100 dark:border-gray-800">
          <Image src={item.image} alt={item.title} fill className="object-cover" />
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
            {item.category}
          </span>
          <h3 className="text-sm font-extrabold text-gray-900 dark:text-white line-clamp-1">
            {item.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              ৳{item.price.toLocaleString()}
            </span>
            {item.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ৳{item.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-800">
        {/* Quantity Controller */}
        <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-800/50">
          <button
            onClick={() => updateQuantity(item.id, -1)}
            className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="px-3 text-xs font-bold text-gray-900 dark:text-white">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, 1)}
            className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live Item Subtotal */}
        <div className="text-right">
          <span className="block text-[10px] text-gray-400 font-bold uppercase">Total</span>
          <span className="text-sm font-extrabold text-gray-900 dark:text-white">
            ৳{(item.price * item.quantity).toLocaleString()}
          </span>
        </div>

        {/* Remove Button */}      
          <DeleteCartItem item={item}/>
      </div>
    </div>
  );
}

export default CartItemCard