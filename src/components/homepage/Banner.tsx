'use client'

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@heroui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import firstBannerImg from "@/assets/first-img.jpg";
import secondBannerImg from "@/assets/second-img.jpg";
import thirdBannerImg from "@/assets/third-img.jpg";
import fourthBannerImg from "@/assets/fourth-img.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Next-Gen Smartwatches for Everyday Life",
      description:
        "Track your health, manage notifications, and stay connected with our high-performance wearable technology.",
      image: firstBannerImg,
    },
    {
      id: 2,
      title: "Immersive Studio Sound & Spatial Audio",
      description:
        "Experience active noise cancellation and crystal-clear acoustic precision designed for audiophiles.",
      image: secondBannerImg,
    },
    {
      id: 3,
      title: "Capture Every Angle with Precision Drones",
      description:
        "Elevate your aerial photography with ultra-stable flight control, 4K camera quality, and extended battery life.",
      image: thirdBannerImg,
    },
    {
      id: 4,
      title: "Elevate Your Gaming & Productivity Setup",
      description:
        "Unleash tactile feedback and custom RGB lighting with our ultra-responsive mechanical keyboards.",
      image: fourthBannerImg,
    },
  ];

  return (
    <div className="relative w-full h-137.5 sm:h-150 md:h-175 bg-[#f8fafc] overflow-hidden group">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".my-swiper-next",
          prevEl: ".my-swiper-prev",
        }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            <>
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={slide.id === 1}
                  sizes="100vw"
                  className="object-cover object-right lg:object-center"
                />
              </div>


              <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/80 to-transparent lg:hidden z-10 pointer-events-none" />

              <div className="absolute inset-0 flex items-center z-20">
                <div className="container mx-auto px-5 md:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2">
                  <div className="flex flex-col gap-3 md:gap-5 max-w-[85%] sm:max-w-md lg:max-w-xl">
                    <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-[#4f46e5] tracking-widest uppercase bg-[#4f46e5]/10 border border-[#4f46e5]/20 px-3 py-1 md:px-3.5 md:py-1.5 rounded-full w-fit">
                      Latest Products
                    </span>

                    <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#0f172a] tracking-tight leading-snug lg:leading-[1.15]">
                      {slide.title.split("&").map((text, i) => (
                        <span key={i}>
                          {i > 0 && <span className="text-[#4f46e5]"> & </span>}
                          {text}
                        </span>
                      ))}
                    </h1>

                    <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-medium line-clamp-3 sm:line-clamp-none">
                      {slide.description}
                    </p>

                    <div className="mt-2 md:mt-4">
                      <Link href="/products">
                        <Button className="bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-xs sm:text-sm md:text-base px-6 py-5 sm:px-8 sm:py-6 rounded-xl transition-all shadow-lg hover:shadow-[#0f172a]/20 shadow-[#0f172a]/10">
                          Explore Products
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Controls */}
      <Button
        isIconOnly
        className="my-swiper-prev absolute left-4 top-1/2 -translate-y-1/2 z-30 min-w-0 w-11 h-11 rounded-xl border border-white/10 bg-[#131129]/40 backdrop-blur-md text-white hover:bg-[#4f46e5] hover:border-[#4f46e5] transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
        aria-label="Previous slide"
      >
        <ChevronLeft className="text-2xl" />
      </Button>

      <Button
        isIconOnly
        className="my-swiper-next absolute right-4 top-1/2 -translate-y-1/2 z-30 min-w-0 w-11 h-11 rounded-xl border border-white/10 bg-[#131129]/40 backdrop-blur-md text-white hover:bg-[#4f46e5] hover:border-[#4f46e5] transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
        aria-label="Next slide"
      >
        <ChevronRight className="text-2xl" />
      </Button>
    </div>
  );
};

export default Banner;