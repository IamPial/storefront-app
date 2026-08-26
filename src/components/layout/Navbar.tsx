"use client"

import { useState } from "react";
import { Link, Button } from "@heroui/react";
import logoImg from "@/assets/headerLogo.png"
import Image from "next/image";
import NavLink from "./NavLink";

const Navbar = ()=> {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-[#0f172a] backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
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
          <div className="flex items-center gap-3">
            <Image src={logoImg} alt={"StoreFront"} width={40} height={40}/>
            <p className="font-bold text-xl text-white">Store<span className="text-[#4f46e5] ">Front</span></p>
          </div>
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
            <NavLink href="/about"  className="text-white" >About</NavLink>
          </li>
          <li>
            <NavLink href="/contact"  className="text-white" >Contact</NavLink>
          </li>
        </ul>
        <div className="hidden items-center gap-4 md:flex">
          <Link href="#">Login</Link>
          <Button>Sign Up</Button>
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