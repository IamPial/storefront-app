import React from "react";
import { CategoryGridMotion, CategoryData } from "../ui/CategoryGridMotion";
import productsData from "@/../database/products.json"; 


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


function getCategoriesFromProducts(): CategoryData[] {
  const products: Product[] = productsData;
  const categoryMap: { [key: string]: CategoryData } = {};

  products.forEach((product) => {
    const categoryName = product.category;
    const slug = categoryName.toLowerCase().replace(/\s+/g, "-");

    if (!categoryMap[categoryName]) {
      categoryMap[categoryName] = {
        name: categoryName,
        slug: slug,
        itemCount: 1,
        image: product.image,
      };
    } else {
      categoryMap[categoryName].itemCount += 1;
    }
  });

  return Object.values(categoryMap);
}


const  CategorySection=()=> {
  const categories = getCategoriesFromProducts();

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-10  max-w-xl ">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Available Category
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Explore our curated collections across top tech product categories
          </p>
        </div>

        {/* Category Motion Grid */}
        <CategoryGridMotion categories={categories} />
      </div>
    </section>
  );
}

export default CategorySection