
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigate, useNavigate } from "react-router";

const slides = [
  {
    title: "Secure Coin Transactions",
    subtitle: "Fast, safe, and simple payments for all your needs.",
    image: "https://i.ibb.co/Mx666Yzd/pexels-tima-miroshnichenko-7567497.jpg",
  },
  {
    title: "Hire Trusted Workers",
    subtitle: "Connect with verified experts for any task, anytime.",
    image: "https://i.ibb.co/cKW1ztX5/pexels-linkedin-2182981.jpg",
  },
  {
    title: "Post Your Tasks Effortlessly",
    subtitle: "From design to development — get your work done fast.",
    image: "https://i.ibb.co/Y442rPSx/pexels-olly-927022.jpg",
  },
];

const HeroSection = () => {
  const navegate = useNavigate()
  const handelGetstart = ()=>{
    navegate("/sign-up")
  }
  return (
    <div className="relative w-full h-[85vh]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="w-full h-full bg-gradient-to-r from-black/70 via-black/50 to-black/70 flex items-center justify-center px-4 md:px-10">
                <div className="max-w-3xl text-center text-white space-y-6">
                  <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-green-400 drop-shadow-xl">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl font-medium text-green-200 drop-shadow-md">
                    {slide.subtitle}
                  </p>
                  <button  className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300" onClick={handelGetstart}>
                    Get Started 
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
