import React from "react";
import { FaShieldAlt, FaTasks, FaUserCheck } from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt className="w-12 h-12 text-[#A2FFFA]" />,
    title: "Secure Payment",
    description: "Your transactions are encrypted and routed through secure gateways for complete protection.",
  },
  {
    icon: <FaTasks className="w-12 h-12 text-[#A2FFFA]" />,
    title: "Easy Task Posting",
    description: "Effortlessly create and manage tasks with our intuitive interface.",
  },
  {
    icon: <FaUserCheck className="w-12 h-12 text-[#A2FFFA]" />,
    title: "Verified Workers",
    description: "Work only with trusted and verified professionals from our network.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-[#1D3E3E] py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Why Choose <span className="text-[#A2FFFA]">TaskBazaar?</span>
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-12">
          Explore the benefits of using our secure and efficient platform, built for smooth collaboration and productivity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 hover:border-[#A2FFFA] transition-all duration-300 rounded-2xl p-6 text-white shadow-md hover:shadow-lg"
            >
              <div className="flex justify-center items-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/70 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
