import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe } from "react-icons/fa";

const ContactSupport = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center  mb-12">Contact Us</h2>

        {/* Contact Form + Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-md overflow-hidden mb-16">
          {/* Form */}
          <div className="p-8 bg-gray-100">
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 border border-gray-300 rounded-md "
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 border border-gray-300 rounded-md "
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <textarea
                rows="4"
                placeholder="Message"
                className="w-full p-3 border border-gray-300 rounded-md"
              ></textarea>
              <button
                type="submit"
                className="text-white bg-[#04B2B2] px-6 py-3 rounded-md transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="w-full h-full">
            <iframe
              title="Map"
              src="https://maps.google.com/maps?q=Dhaka&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[350px] border-0"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center text-gray-700">
          <div className="flex flex-col items-center gap-2">
            <FaMapMarkerAlt className="text-2xl text-[#04B2B2]" />
            <p className="text-sm">Babuganj,Barisal,Banglades</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaPhoneAlt className="text-2xl text-[#04B2B2]" />
            <p className="text-sm">+8801890536220</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaEnvelope className="text-2xl text-[#04B2B2]" />
            <p className="text-sm">nuralom.web@gmail.com</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaGlobe className="text-2xl text-[#04B2B2]" />
            <p className="text-sm">https://zingy-alpaca-0e447b.netlify.app/</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSupport;
