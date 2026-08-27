"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingBag, ArrowLeft, ShieldCheck, Truck, RotateCcw, CheckCircle2 } from "lucide-react";
import { getAllProducts } from "@/lib/api/products"; 
import { Product } from "@/components/ui/ProductCard";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishListContext";
import { toast } from "sonner";

const ProductDetailsPage=({ params }: { params: Promise<{ slug: string }> })=> {
  const { slug } = use(params);
  const { cart, addToCart } = useCart()
  const {addToWishlist, isInWishlist} = useWishlist()
  
  
  const [quantity, setQuantity] = useState(1);
  const products = getAllProducts();
  const product: Product | undefined = products.find((p) => p.slug === slug);


   //   empty message
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Product not found!</h2>
        <Link href="/products" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  // calculate products discount 
  const hasDiscount = Boolean(product.originalPrice && product.originalPrice > product.price);
  const discountPercentage = hasDiscount
  ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
  : 0;

  
  
//for checking this item is already into cart have or not yet 
 const isExistingInCart = cart.some((item) => item.id === product.id);

//handle AddToCart 
const handleAddToCart = () => {
  if (isExistingInCart){
    toast.error("Already in Cart") 
    return;
  }

  addToCart(product, quantity);
  toast.success("Added item to the Cart", {
    style: { color: "#00c950" },
  });
};
    
    
//for preventing added single item multiple in wishlist
const isFavorite = isInWishlist(product.id)

//handleWishList
 const handleWishList = ()=>{
    if (isFavorite) {
    toast.error("Already in Wishlist!");
    return;
  }
    addToWishlist(product)
    toast.success("Added item to the Wishlist", {
        style: {
          color: "#00c950",
      },
    }
)}

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">    
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        {/* Main Product Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 dark:border-gray-800 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Image Section */}
          <div className="relative aspect-square w-full border border-gray-200/70 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800 dark:border-gray-800">
            <Image
              src={product.image}
              alt={product.title}
              fill
              priority
              className="object-cover object-center"
            />
            
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {hasDiscount && (
                <span className="bg-red-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {discountPercentage}% OFF
                </span>
              )}
              {product.tag && (
                <span className="bg-[#4f46e5] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {product.tag}
                </span>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  {product.category}
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    product.inStock
                      ? "bg-green-50 dark:bg-[#4f46e5]/40 text-[#4f46e5]"
                      : "bg-red-50 dark:bg-red-950/40 text-red-600"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                {product.title}
              </h1>

              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  {product.rating}
                </span>
                <span className="text-xs text-gray-400 ml-1">(User Rating)</span>
              </div>

              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  ৳{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-gray-400 line-through">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Dynamic Description */}
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed pt-1">
                Experience premium performance with the <strong className="text-gray-800 dark:text-gray-200">{product.title}</strong>. 
                Engineered for excellence in the <span className="lowercase">{product.category}</span> category, offering durable build quality and modern aesthetics tailored for everyday use.
              </p>

              {/* Key Highlights */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">Key Highlights:</span>
                <ul className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Premium Materials
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Ergonomic Design
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> 1 Year Warranty
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> High Performance
                  </li>
                </ul>
              </div>

              <hr className="border-gray-100 dark:border-gray-800 my-4" />

              <div className="space-y-2 flex items-center gap-3">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Quantity
                </label>
                <div className="flex items-center  border border-gray-200 dark:border-gray-800 rounded-xl w-max">
                  <button
                    disabled={!product.inStock}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-l-xl text-sm disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-bold text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    disabled={!product.inStock}
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r-xl text-sm disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex gap-3">
                <button
                onClick={handleAddToCart}
                disabled={isExistingInCart || !product.inStock}
                className={`flex-1 font-semibold py-3 px-6 rounded-2xl flex items-center justify-center gap-2 text-xs sm:text-sm transition-all ${
                    isExistingInCart
                    ? "bg-green-600 text-white cursor-not-allowed opacity-90"
                    : "bg-[#0f172a] hover:bg-slate-800 text-white active:scale-98"
                }`}
                >
                <ShoppingBag className="w-4 h-4" />
                {isExistingInCart ? "Already in Cart" : product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
                
                <button
                  onClick={handleWishList}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-center border-red-200 bg-red-50 text-red-500      
                  `}
                >
                  <Heart className={`w-5 h-5 `} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] text-gray-500 dark:text-gray-400">
                <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Fast Delivery</span>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Original Product</span>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-blue-600" />
                  <span>Easy Return</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;