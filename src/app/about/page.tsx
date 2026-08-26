'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { ShieldCheck, Truck, Headphones, Award, ArrowRight } from 'lucide-react';
import meetImg from '@/assets/meet.jpg'

const features = [
  {
    icon: <ShieldCheck className="w-7 h-7 text-[#4f46e5]" />,
    title: '100% Genuine Products',
    description: 'We source directly from authorized manufacturers to ensure premium quality.',
  },
  {
    icon: <Truck className="w-7 h-7 text-[#4f46e5]" />,
    title: 'Express Delivery',
    description: 'Fast, reliable, and secure shipping to your doorstep with real-time tracking.',
  },
  {
    icon: <Headphones className="w-7 h-7 text-[#4f46e5]" />,
    title: '24/7 Dedicated Support',
    description: 'Our customer support team is always available to help with your tech queries.',
  },
  {
    icon: <Award className="w-7 h-7 text-[#4f46e5]" />,
    title: 'Warranty Guaranteed',
    description: 'Hassle-free replacement and official warranty policies on all gadgets.',
  },
];


const AboutPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen text-[#0f172a]">
      <section className="relative bg-white text-[#0f172a] py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-[#4f46e5]_1px,transparent_1px]  bg-size-[16px_16px]" />
        <div className="container mx-auto px-5 md:px-8 lg:px-16 relative z-10 text-center max-w-3xl">
          <span className="text-xs md:text-sm font-semibold text-[#4f46e5] tracking-widest uppercase bg-[#4f46e5]/20 border border-[#4f46e5]/30 px-4 py-1.5 rounded-full inline-block mb-4">
            About Our Brand
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Redefining the Tech Shopping Experience
          </h1>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
            We are dedicated to bringing you cutting-edge gadgets and next-gen electronics with uncompromised quality, sleek design, and seamless customer service.
          </p>
        </div>
      </section>


      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-5 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 sm:h-105 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <Image
                src={meetImg}
                alt="Our Team at Work"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0f172a]/60 via-transparent to-transparent" />
            </div>

            <div className="flex flex-col gap-5">
              <span className="text-xs md:text-sm font-semibold text-[#4f46e5] tracking-widest uppercase">
                Our Mission
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#0f172a] tracking-tight leading-snug">
                Empowering Everyday Life Through Premium Innovation
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Founded with a passion for tech excellence, our storefront brings together world-class mechanical keyboards, immersive audio gear, smart wearables, and aerial photography tools under one seamless platform.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We believe that premium tech shouldn’t be complex. Every product in our store is carefully curated, tested, and backed by dedicated after-sales service.
              </p>
              <div className="pt-2">
                <Link href="/products">
                  <Button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-sm px-6 py-5 rounded-xl transition-all shadow-md shadow-[#4f46e5]/20 flex items-center gap-2">
                    Explore Our Products <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-slate-200">
        <div className="container mx-auto px-5 md:px-8 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#0f172a] mb-4">
              Why Customers Trust Us
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              We focus on speed, reliability, and authentic tech products so you can shop with absolute confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#4f46e5]/30 hover:shadow-lg transition-all flex flex-col items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-[#4f46e5]/10 border border-[#4f46e5]/20">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0f172a]">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;