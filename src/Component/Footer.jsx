import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaRegCopyright,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-20 pt-12 pb-8 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & About */}
        <div>
          <h3 className="text-xl font-bold text-blue-700 mb-2">TaskBazaar</h3>
          <p className="text-sm text-gray-600">
            A micro-tasking platform that connects people with quick jobs and rewards them with coins.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-md font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li><a href="/dashboard" className="hover:text-blue-600">Dashboard</a></li>
            <li><a href="/tasks" className="hover:text-blue-600">Browse Tasks</a></li>
            <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-md font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/terms" className="hover:text-blue-600">Terms of Service</a></li>
            <li><a href="/privacy" className="hover:text-blue-600">Privacy Policy</a></li>
            <li><a href="/faq" className="hover:text-blue-600">FAQ</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-md font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4 text-blue-600 text-xl">
            <a href="#" className="hover:text-blue-800"><FaFacebookF /></a>
            <a href="#" className="hover:text-sky-500"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-900"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t mt-10 pt-6 text-center text-sm text-gray-500">
        <div className="flex justify-center items-center gap-2">
          <FaRegCopyright className="text-xs" />
          <span>{new Date().getFullYear()} TaskBazaar. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
