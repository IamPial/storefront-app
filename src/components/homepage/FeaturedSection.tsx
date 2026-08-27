import Link from "next/link";
import { ProductGridMotion } from "../ui/ProductGridMotion";
import { ProductCard } from "../ui/ProductCard";
import { getAllProducts } from "@/lib/api/products";


const FeaturedSection =  ()=>{
      
  const products = getAllProducts()

    return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Featured Products
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Explore our handpicked latest gear
            </p>
          </div>
          <Link
            href="/products"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm transition-all"
          >
            View All →
          </Link>
        </div>

        <ProductGridMotion>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGridMotion>
      </div>
    </section>
  );

}
export default FeaturedSection