import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const ContactSupport = () => {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-20 px-6 md:px-24 text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Contact & Support</h2>
          <p className="text-gray-600 text-lg">
            Reach out to us anytime. We're here to help you succeed on TaskBazaar.
          </p>
        </div>

        {/* Form & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-start">
          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-2xl p-8 md:p-10 border-t-4 border-blue-600">
            <h3 className="text-2xl font-semibold mb-6 text-blue-600">Send us a message</h3>
            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition w-full font-medium"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center gap-6 text-gray-700 text-base">
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-xl text-blue-500 mt-1" />
              <div>
                <p className="font-semibold">Email</p>
                <p>support@taskbazaar.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-xl text-green-500 mt-1" />
              <div>
                <p className="font-semibold">Phone</p>
                <p>+880 1234 567890</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-xl font-semibold text-purple-600">Social</div>
              <div className="flex gap-4 text-xl">
                <a href="#" className="text-blue-600 hover:text-blue-800 transition">
                  <FaFacebook />
                </a>
                <a href="#" className="text-sky-400 hover:text-sky-600 transition">
                  <FaTwitter />
                </a>
                <a href="#" className="text-blue-700 hover:text-blue-900 transition">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                question: "How do I post a task?",
                answer:
                  "Just sign in as a Buyer, go to your dashboard, and click on “Post Task”. Fill in the task details and submit.",
              },
              {
                question: "How do I earn coins?",
                answer:
                  "You earn coins by completing tasks as a Worker. The more you complete, the more you earn!",
              },
              {
                question: "Can I withdraw my earnings?",
                answer:
                  "Yes. Go to your wallet and click “Withdraw”. Make sure you’ve met the minimum withdrawal limit.",
              },
              {
                question: "Is TaskBazaar free to use?",
                answer:
                  "Yes! Signing up and browsing tasks is completely free. You can buy coins for additional features.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white shadow hover:shadow-md p-6 rounded-xl border border-gray-200 transition"
              >
                <h4 className="text-lg font-semibold mb-2 text-blue-700">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSupport;
