"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Star} from "lucide-react";
import Image from "next/image";

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  originalPrice: number | null;
  image: string;
  category: string
  rating: number;
  inStock: boolean;
  tag?: string;
}

const cardVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  hover: {
    y: -8,
    transition: { type: "spring", stiffness: 150, damping: 12 },
  },
};

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const hasDiscount = Boolean(
    product.originalPrice && product.originalPrice > product.price
  );
  const discountPercentage =
    hasDiscount && product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col group"
    >
      {/* Image & Badges */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800 ">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        {hasDiscount ? (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md z-10 shadow-sm">
            {discountPercentage}% OFF
          </span>
        ) : product.tag && product.tag !== "Regular" ? (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-md z-10 shadow-sm">
            {product.tag}
          </span>
        ) : null}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col grow">
        <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
          {product.category}
        </span>

        <Link href={`/product/${product.slug}`}>
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center mt-2 mb-4 space-x-1">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
            {product.rating.toFixed(1)}
          </span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-gray-50 dark:border-gray-800/60">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ৳{product.price.toLocaleString()}
            </span>
            {hasDiscount && product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-950 p-1 rounded-xl px-3 py-2 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-semibold"
          >
            <Link href={`/products/${product.slug}`} >
            Details
            </Link>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};