"use client"

import { useState } from "react";
import { Link, Button, Badge } from "@heroui/react";
import logoImg from "@/assets/headerLogo.png"
import Image from "next/image";
import NavLink from "./NavLink";
import {Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishListContext";

const Navbar = ()=> {
  const {cart} = useCart()
  const {wishlist} = useWishlist()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-[#0f172a] backdrop-blur-lg">
      <header className="mx-auto flex h-16 container items-center justify-between px-6 md:px-4">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="#fff"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <Link href="/" className="flex items-center gap-3 no-underline">
            <Image src={logoImg} alt={"StoreFront"} width={40} height={40}/>
            <p className="font-bold text-xl text-white">Store<span className="text-[#4f46e5] ">Front</span></p>
          </Link>
        </div>
        <ul className="hidden items-center gap-4 md:flex">
          <li>
            <NavLink href="/" className="text-white">Home</NavLink>
          </li>
          <li>
            <NavLink href="/products" className="text-white" >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink href="/my-orders" className="text-white" >
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink href="/about"  className="text-white" >About</NavLink>
          </li>
          <li>
            <NavLink href="/contact"  className="text-white" >Contact</NavLink>
          </li>
        </ul>
        <div className="flex items-center gap-4 ">
          <Link href="/carts">
           <Button  className="bg-slate-700/40"><ShoppingBag className="text-white" />
           <Badge  className={`border-0 ${cart.length == 0 ? "bg-transparent": "bg-red-500"} text-white`} size="sm">
              {cart.length == 0 ? "": cart.length}
          </Badge>
        </Button>
          </Link>
          <Link href="/wishlists">
          <Button className="bg-slate-700/40"><Heart className="text-white"/>
           <Badge className={`border-0 ${wishlist.length == 0 ? "bg-transparent": "bg-red-500"} text-white`} size="sm">
            {wishlist.length == 0 ? "": wishlist.length}
          </Badge>
          </Button>
          </Link>
        </div>
      </header>
      {isMenuOpen && (
        <div className="w-50 absolute top-[calc(100%+8px)] left-4 right-4 z-50 lg:hidden rounded-xl border border-white/10  bg-[#0f172a] backdrop-blur-md p-2 shadow-2xl transition-all duration-300 ease-out">
          <ul className="flex flex-col gap-2 p-4">
            <li>
              <NavLink href="/" onClick={()=> setIsMenuOpen(false)} className="text-neutral-900">Home</NavLink>
            </li>
            <li>
              <NavLink href="/products" onClick={()=>setIsMenuOpen(false)} className="text-neutral-900">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink href="/my-orders" onClick={()=>setIsMenuOpen(false)} className="text-neutral-900">
                My Orders
              </NavLink>
            </li>
            <li>
              <NavLink href="/about" onClick={()=>setIsMenuOpen(false)} className="text-neutral-900">About</NavLink>
            </li>
            <li>
              <NavLink href="/contact" onClick={()=>setIsMenuOpen(false)} className="text-neutral-900">Contact</NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
export default Navbar;