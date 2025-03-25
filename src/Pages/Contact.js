import React, { useState } from "react";
import Footer from "../Components/Footer";
import Navbar from '../Components/NavBar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message. We'll get back to you soon!");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* <Navbar /> */}


      <div className="bg-gradient-to-r from-red-900 to-black py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold mb-4">Get In Touch</h1>
          <div className="w-32 h-2 bg-white mx-auto mb-6"></div>
          <p className="text-xl max-w-2xl mx-auto">We're here to answer your questions and help you make the most of News.ai news platform.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="order-2 lg:order-1">
            <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-2xl shadow-2xl border-l-4 border-red-700 h-full">
              <h2 className="text-3xl font-bold mb-8 text-red-500">Contact Information</h2>

              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="bg-red-700 p-3 rounded-lg mr-5 mt-1 group-hover:bg-red-600 transition duration-300 transform group-hover:scale-110">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-2 text-white">Our Location</h3>
                    <p className="text-gray-300 text-lg">Walchand College Of Engineering</p>
                    <p className="text-gray-300 text-lg">Sangli 416415, Maharashtra</p>
                    <p className="text-gray-300 text-lg">India</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-red-700 p-3 rounded-lg mr-5 mt-1 group-hover:bg-red-600 transition duration-300 transform group-hover:scale-110">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-2 text-white">Email Us</h3>
                    <a href="mailto:aibharat@gmail.com" className="text-gray-300 text-lg hover:text-red-500 transition duration-300">news.ai@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-red-700 p-3 rounded-lg mr-5 mt-1 group-hover:bg-red-600 transition duration-300 transform group-hover:scale-110">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-2 text-white">Call Us</h3>
                    <p className="text-gray-300 text-lg">+91 124 456 7890</p>
                    <p className="text-gray-300 text-lg">+91 124 456 7891</p>
                  </div>
                </div>


              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-4 text-red-500">Connect With Us</h3>
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                    <a
                      key={social}
                      href={`#${social}`}
                      className="bg-gray-800 hover:bg-red-700 w-12 h-12 rounded-full flex items-center justify-center transition duration-300 transform hover:scale-110"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-1.102.525-2.442.573-3.457.573-1.499 0-2.957-.15-4.213-.406-.155-.032-.306-.068-.455-.107-.44-.118-.56-.221-.688-.296-.275-.159-.49-.345-.708-.568-.218-.223-.41-.455-.564-.696h.62c.146.123.304.237.472.346.157.104.326.197.504.283.531.216 1.118.385 1.752.497.634.111 1.302.166 1.998.166.819 0 1.63-.076 2.403-.208l.36-.066c.323-.068.637-.153.94-.253.304-.1.597-.214.872-.345-.035.021-.076.038-.107.06z" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>



          <div className="order-1 lg:order-2">
            <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-2xl shadow-2xl border-r-4 border-red-700">
              <h2 className="text-3xl font-bold mb-8 text-red-500">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg py-3 pl-10 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition duration-300"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg py-3 pl-10 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition duration-300"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-lg font-medium mb-2">Subject</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg py-3 pl-10 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition duration-300"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-lg font-medium mb-2">Your Message</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg py-3 pl-10 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition duration-300"
                      placeholder="Tell us about your question or issue..."
                      required
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white text-lg font-bold py-4 px-6 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
                >
                  <span>Send Message</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>



        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-red-500">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: "How does News.ai summarize news?",
                a: "We use advanced natural language processing algorithms to analyze articles and extract the most important information, creating concise summaries while maintaining the core message."
              },
              {
                q: "Can I filter news by specific regions?",
                a: "Yes, News.ai allows you to filter news content by topics, regions, and even sentiment analysis to personalize your news feed."
              },
              {
                q: "How does News.ai detect fake news?",
                a: "Our platform uses a combination of cross-referencing, fact-checking systems, and AI algorithms to verify information and identify potentially misleading content."
              },
              {
                q: "Is News.ai available as a web application ?",
                a: "Yes, News.ai is available on web application , providing the same powerful features with a web-application experience."
              }

            ].map((faq, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl shadow-lg border-l-2 border-red-700 hover:border-l-4 transition-all duration-300">
                <h3 className="text-xl font-bold mb-3 text-white">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Contact;