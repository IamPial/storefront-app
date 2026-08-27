"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import { useWishlist, WishlistItem } from "@/context/WishListContext";
import { useCart } from "@/context/CartContext";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

//handleMoveCart
  const handleMoveToCart = (product: WishlistItem) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

 //handleMoveAllToCart
  const handleMoveAllToCart = () => {
    wishlist.forEach((product) => addToCart(product));
    clearWishlist();
  };

  //Empty state Message
  if (wishlist.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 bg-red-50 dark:bg-red-950/30 rounded-full flex items-center justify-center mb-6 text-red-500">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Your Wishlist is Empty
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mb-8">
          Save items you love to view or move them to your cart later.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all"
        >
          Explore Products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section with Requirement Banner */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 bg-purple-100 dark:bg-purple-900/50 text-[#4f46e5] dark:text-purple-300 font-bold text-xs rounded-lg flex items-center justify-center">
                {wishlist.length}
              </span>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                Wishlist
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-xl">
              Save and remove products, move items to cart, and persist it across sessions like the cart.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearWishlist}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={handleMoveAllToCart}
              className="px-4 py-2.5 rounded-xl bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-md shadow-indigo-500/10"
            >
              <ShoppingBag className="w-4 h-4" /> Move All to Cart
            </button>
          </div>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative">
                {/* Product Image */}
                <div className="relative aspect-square w-full bg-gray-50 dark:bg-gray-800 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Remove Button Badge */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  aria-label="Remove item"
                  className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-gray-500 hover:text-red-500 rounded-full transition-colors shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Tag Badge */}
                {item.tag && (
                  <span className="absolute top-3 left-3 bg-[#4f46e5] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {item.tag}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <Link href={`/products/${item.slug || item.id}`}>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1 hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-lg font-extrabold text-gray-900 dark:text-white">
                      ৳{item.price.toLocaleString()}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ৳{item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Move to Cart Action Button */}
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-all active:scale-[0.98]"
                >
                  <ShoppingBag className="w-4 h-4" /> Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="pt-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#4f46e5] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
};

export default WishlistPage;