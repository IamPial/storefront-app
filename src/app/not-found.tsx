import Link from "next/link";
import { MoveLeft, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="space-y-4 max-w-md">
        {/* 404 Badge */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-slate-100 dark:bg-gray-800 text-slate-900 dark:text-white mb-2">
          <ShoppingBag className="w-8 h-8" />
        </div>

        <h1 className="text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight">404</h1>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Page Not Found</h2>
        
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Oops! The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex  sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-3 px-6 rounded-2xl transition-all shadow-sm"
          >
            <MoveLeft className="w-4 h-4" /> Back to Home
          </Link>
          
          
        </div>
      </div>
    </div>
  );
}