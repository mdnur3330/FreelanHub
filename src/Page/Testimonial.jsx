import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Mohammad Nur Alom",
    role: "Frontend Developer",
    image: "https://i.ibb.co/G3JgYmzF/Whats-App-Image-2025-06-25-at-16-43-48-49200f82.jpg",
    review:
      "TaskBazaar helped me improve my skills and earn from real-world projects. The platform is clean, intuitive, and highly effective!",
  },
  {
    id: 2,
    name: "Mohamma Fahim",
    role: "UI Designer",
    image: "https://i.ibb.co/6c6V63Qx/download-2.jpg",
    review:
      "The quick support and coin-based reward system make this my favorite freelancing platform!",
  },
  {
    id: 3,
    name: "Rasel Ahmed",
    role: "Fullstack Engineer",
    image: "https://i.ibb.co/Y442rPSx/pexels-olly-927022.jpg",
    review:
      "Everything is streamlined and fast. TaskBazaar is truly revolutionary.",
  },
];

const TestimonialSection = () => {
  return (
    <section className="bg-gradient-to-br from-[#ecfeff] to-white py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-3">
           What Our Users Say
        </h2>
        <p className="text-[#5a6e73] mb-10 max-w-2xl mx-auto text-lg">
          Hear from the talented workers and satisfied buyers who use FreelanHub.
        </p>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
        >
          {testimonials.map(({ id, name, role, image, review }) => (
            <SwiperSlide key={id}>
              <div className="relative bg-[#0E3A3A]/80  text-white rounded-2xl p-8 max-w-3xl mx-auto">
                <p className="text-lg italic mb-8 leading-relaxed z-10 relative">
                  “{review}”
                </p>
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={image}
                    alt={name}
                    className="w-14 h-14 rounded-full border-2 border-[#29BEBE] object-cover"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-[#A0F8F8] text-md">
                      {name}
                    </h4>
                    <p className="text-sm text-gray-300">{role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
