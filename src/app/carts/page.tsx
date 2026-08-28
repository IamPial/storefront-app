"use client";

import Link from "next/link";
import { ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartItemCard from "@/components/cart/CartItemCard";
import OrderSummary from "@/components/cart/OrderSummary";
import { DeleteAllCart } from "@/components/cart/DeleteAllCart";

const CartPage=()=> {
  const { cart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2.5">
              <ShoppingCart className="w-7 h-7 text-blue-600" /> Shopping Cart
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {/*Delete Cart Modal*/}    
          <DeleteAllCart/>
        </div>

        {/* Empty State */}
        {cart.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-800 space-y-4">
            <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto" />
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Your cart is empty</h2>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Looks like you haven&apos;t added anything to your cart yet. Explore our products and find something awesome!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-bold bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-3">
              {cart.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}

              <div className="pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" /> Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <OrderSummary />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default CartPage