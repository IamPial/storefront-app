"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export interface CategoryData {
  name: string;
  slug: string;
  itemCount: number;
  image: string;
}

interface CategoryGridProps {
  categories: CategoryData[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export const CategoryGridMotion: React.FC<CategoryGridProps> = ({ categories }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {categories.map((cat) => (
        <motion.div key={cat.slug} variants={itemVariants}>
          <Link
            href={`/products`}
            className="group relative block aspect-4/3 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

            <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
              <div className="flex justify-end">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold tracking-wider uppercase text-gray-300">
                  {cat.itemCount} {cat.itemCount === 1 ? "Product" : "Products"}
                </span>
                <h3 className="text-xl font-bold mt-1 group-hover:text-blue-400 transition-colors">
                  {cat.name}
                </h3>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};