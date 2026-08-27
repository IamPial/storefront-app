"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";

const PromoBanner: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 to-indigo-700 text-white p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Background Decor */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          {/* Left Text Content */}
          <div className="space-y-4 max-w-xl z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
              <Tag className="w-3.5 h-3.5" /> Special Limited Offer
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Upgrade Your Setup with Premium Audio Gear
            </h2>
            <p className="text-blue-100 text-sm md:text-base">
              Get up to <span className="font-bold text-white">20% OFF</span> on all Studio Audio items. Use code <span className="bg-white/20 px-2 py-0.5 rounded font-mono text-white">STUDIO20</span> at checkout.
            </p>
          </div>

          {/* Right Action Button */}
          <div className="z-10 shrink-0">
            {/* <Link href="/category/studio-audio"> */}
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 font-bold px-7 py-3.5 rounded-2xl shadow-lg hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm"
              >
                Claim Discount <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoBanner