"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const NewsletterSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Stay Updated with Latest Tech Deals
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Subscribe to our newsletter and get exclusive promo codes directly in your inbox.
            </p>
            
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="grow px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                required
              />
              <button
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-950 px-6 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                Subscribe <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


export default NewsletterSection