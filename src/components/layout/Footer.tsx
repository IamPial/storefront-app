'use client'


import Link from 'next/link';
import { Button, Input } from '@heroui/react';
import footerImg from "@/assets/footerLogo.png"
import {  
  Mail, 
  Phone, 
  MapPin, 
  Send 
} from 'lucide-react';
import { 
  FaFacebookF, 
  FaXTwitter, 
  FaInstagram, 
  FaLinkedinIn 
} from 'react-icons/fa6';
import Image from 'next/image';

const Footer = () => {

    const socialLinks = [
                { icon: <FaFacebookF className="w-4 h-4" />, href: "#", label: "Facebook" },
                { icon: <FaXTwitter className="w-4 h-4" />, href: "#", label: "Twitter / X" },
                { icon: <FaInstagram className="w-4 h-4" />, href: "#", label: "Instagram" },
                { icon: <FaLinkedinIn className="w-4 h-4" />, href: "#", label: "LinkedIn" },
              ]

  return (
    <footer className="bg-[#0f172a] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-6 md:px-4  ">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src={footerImg} alt="StoreFront" width={70}height={70}/>
              <span className="text-2xl font-bold text-[#4f46e5]">
                Store<span className="text-white">Front</span>
              </span>
            </Link>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Your trusted destination for next-gen smartwatches, mechanical keyboards, spatial audio gear, and precision drones.
            </p>

            {/* Real Social Brand Icons */}
            <div className="flex items-center gap-3 mt-2">
              {
                socialLinks.map((item,index)=>{
                    return(
                        <Link href={item.href} key={index}  className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-[#4f46e5] text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700/50 hover:border-[#4f46e5]">{item.icon}</Link>
                    )
                })
              }
            </div>
          </div>


          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-base mb-1">Quick Links</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/products" className="hover:text-[#4f46e5] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#4f46e5] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#4f46e5] transition-colors">
                  Contact Us
                </Link>
              </li>
              
            </ul>
          </div>


          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-base mb-1">Categories</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/products?category=smartwatches" className="hover:text-[#4f46e5] transition-colors">
                  Smartwatches
                </Link>
              </li>
              <li>
                <Link href="/products?category=audio" className="hover:text-[#4f46e5] transition-colors">
                  Studio Audio
                </Link>
              </li>
              <li>
                <Link href="/products?category=drones" className="hover:text-[#4f46e5] transition-colors">
                  Precision Drones
                </Link>
              </li>
              <li>
                <Link href="/products?category=keyboards" className="hover:text-[#4f46e5] transition-colors">
                  Keyboards
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Newsletter */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-base mb-1">Get in Touch</h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#4f46e5] shrink-0 mt-1" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#4f46e5] shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#4f46e5] shrink-0" />
                <span>support@storefront.com</span>
              </li>
            </ul>

            {/* Mini Newsletter Input */}
            <div className="mt-2 flex items-center gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className={"bg-slate-800/80 border-slate-700 hover:border-[#4f46e5] text-white rounded-xl text-xs placeholder:text-slate-500  w-full "
                }
              />
              <Button isIconOnly size="sm" className="bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-xl shrink-0 ">
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} StoreFront. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;