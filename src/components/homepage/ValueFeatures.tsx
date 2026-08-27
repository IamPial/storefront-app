"use client";

import React from "react";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, RotateCcw, Headset } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast & Free Shipping",
    desc: "Free express shipping on all orders over ৳5,000",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure Payment",
    desc: "Guaranteed safe & encrypted checkout process",
  },
  {
    icon: RotateCcw,
    title: "7 Days Easy Return",
    desc: "Hassle-free replacement if products have defects",
  },
  {
    icon: Headset,
    title: "24/7 Tech Support",
    desc: "Dedicated customer service whenever you need",
  },
];

const ValueFeatures: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
              >
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueFeatures