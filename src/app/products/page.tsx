"use client";

import React, { useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { Search, RotateCcw, SlidersHorizontal } from "lucide-react";
import { getAllProducts } from "@/lib/api/products";
import { ProductCard } from "@/components/ui/ProductCard";

interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  originalPrice: number | null;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
  tag?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

export default function ProductsPage() {
  const products: Product[] = getAllProducts();

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");

  // Dynamic Categories list
  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ["All", ...unique];
  }, [products]);

  // Combined Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const min = minPrice !== "" ? Number(minPrice) : 0;
      const max = maxPrice !== "" ? Number(maxPrice) : Infinity;
      const matchesPrice = product.price >= min && product.price <= max;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sorting Logic
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, searchTerm, selectedCategory, minPrice, maxPrice, sortBy]);

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("default");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Explore All Products
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Find your perfect tech gear with custom filters and search.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Search & Filters */}
          <aside className="lg:col-span-1 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6 lg:sticky lg:top-24 z-10">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" /> Filters
              </h2>
              <button
                onClick={handleReset}
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Search by Name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Search by name
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g. Smartwatch"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                />
              </div>
            </div>

            {/* Categories Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Categories
              </label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center space-x-2.5 text-xs text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="w-4 h-4 text-blue-600 accent-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Price range (৳)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <span className="text-gray-400 text-xs">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </aside>

          {/* Sorting & Products Grid */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Top Bar for Sorting & Total Items */}
            <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Showing <strong className="text-gray-900 dark:text-white">{filteredProducts.length}</strong> Products
              </span>

              {/* Sorting Dropdown */}
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid / Empty State */}
            {filteredProducts.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1  sm:grid sm:z-0 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              /* Empty State */
              <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto text-gray-400">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                  No products found
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                  We couldn&apos;t find anything matching your search criteria. Try clearing filters or changing your keywords.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-2 px-4 py-2 bg-[#0f172a]/70 text-white rounded-xl text-xs font-semibold hover:bg-[#0f172a] transition-colors inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}