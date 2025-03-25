
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
const Footer = () => (
<footer className="bg-black text-white py-6 ">
  <div className=" border-t border-t-gray-400 py-2"> </div>
    <div className="container mx-auto px-4">


      <div className="flex flex-col md:flex-row justify-between text-center md:text-left border-b border-gray-700 pb-4">
        <ul className="space-y-2">
          <li className="font-semibold text-lg">About Us</li>
          <li className="hover:text-gray-400 cursor-pointer">Our Story</li>
          <li className="hover:text-gray-400 cursor-pointer">Contact Us</li>
          <li className="hover:text-gray-400 cursor-pointer">Careers</li>
        </ul>

        <ul className="space-y-2">
          <li className="font-semibold text-lg">Policies</li>
          <li className="hover:text-gray-400 cursor-pointer">Privacy Policy</li>
          <li className="hover:text-gray-400 cursor-pointer">Terms of Service</li>
          <li className="hover:text-gray-400 cursor-pointer">Disclaimer</li>
        </ul>

        <ul className="space-y-2">
          <li className="font-semibold text-lg">AI BHARAT</li>
          <li className="hover:text-gray-400 cursor-pointer">News Updates</li>
          <li className="hover:text-gray-400 cursor-pointer">Press Releases</li>
          <li className="hover:text-gray-400 cursor-pointer">Blog</li>
        </ul>
      </div>

      {/* Social Media Section */}
      <div className="flex justify-center space-x-6 mt-4">
        <a href="#" className="text-gray-400 hover:text-blue-500 text-2xl"><FaFacebook /></a>
        <a href="#" className="text-gray-400 hover:text-blue-400 text-2xl"><FaTwitter /></a>
        <a href="#" className="text-gray-400 hover:text-pink-500 text-2xl"><FaInstagram /></a>
        <a href="#" className="text-gray-400 hover:text-blue-700 text-2xl"><FaLinkedin /></a>
        <a href="#" className="text-gray-400 hover:text-red-600 text-2xl"><FaYoutube /></a>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-500 text-sm mt-4">
        <p>&copy; 2025 AI News Aggregator. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
