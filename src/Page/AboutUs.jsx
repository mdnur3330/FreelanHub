import React from "react";
import { FaBullseye, FaEye, FaStar } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-20 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#1f1f1f]">
          About Us
        </h2>
        <p className="text-center text-lg md:text-xl mb-14 text-gray-600 max-w-3xl mx-auto">
          <strong>TaskBazaar</strong> is an innovative online platform dedicated to solving everyday problems through the power of technology. We believe that the right tools, guidance, and support can simplify lives and make a lasting impact.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission Box */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-300">
            <div className="flex items-center gap-3 mb-4 text-blue-700">
              <FaBullseye className="text-3xl" />
              <h3 className="text-xl font-semibold">Our Mission</h3>
            </div>
            <p className="text-gray-700">
              To make life easier for people by leveraging technology and bringing meaningful change to society.
            </p>
          </div>

          {/* Vision Box */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-300">
            <div className="flex items-center gap-3 mb-4 text-green-700">
              <FaEye className="text-3xl" />
              <h3 className="text-xl font-semibold">Our Vision</h3>
            </div>
            <p className="text-gray-700">
              To build a self-sustaining, innovative, and inclusive digital platform that creates a positive impact in people's lives.
            </p>
          </div>

          {/* Goals Box */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-300">
            <div className="flex items-center gap-3 mb-4 text-yellow-700">
              <FaStar className="text-3xl" />
              <h3 className="text-xl font-semibold">Our Goals</h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
              <li>Deliver convenient and secure services</li>
              <li>Contribute to building a Digital Bangladesh</li>
              <li>Create tech-driven opportunities for youth</li>
              <li>Ensure equal access to technology for all</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
