import React from "react";
import Footer from "../Components/Footer";
import Navbar from '../Components/NavBar';

const About = () => {
  return (
    <div className="bg-black text-white min-h-screen">


      {/* <Navbar /> */}


      <div className="bg-gradient-to-r from-red-900 to-black py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold mb-4">About <span className="text-red-600">News.ai</span></h1>
          <div className="w-32 h-2 bg-white mx-auto mb-6"></div>
          <p className="text-xl max-w-3xl mx-auto">
            India's premier AI-powered news platform delivering personalized, timely, and relevant content nationwide.
          </p>
        </div>
      </div>


        <div className="container mx-auto px-6 py-16">

        <div className="mb-20 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-10 shadow-xl border-l-4 border-red-700">
          <h2 className="text-4xl font-bold mb-6 text-center text-red-500">Our Story</h2>
          <div className="w-24 h-2 bg-red-700 mx-auto mb-8"></div>

          <div className="space-y-6 max-w-4xl mx-auto">
            <p className="text-xl">
            News.ai is India's premier news intelligence platform, utilizing cutting-edge artificial intelligence to summarize lengthy news articles and deliver concise, personalized content to users nationwide.
            </p>

            <p className="text-xl">
              Our sophisticated AI algorithms not only summarize content but also detect potentially misleading or fake news through cross-referencing, fact-checking, and content verification systems—ensuring users receive only reliable, trustworthy information.
            </p>

            <p className="text-xl">
              Built on Python, Natural Language Processing, Flask, React, Node and MongoDB, News.ai enables users to filter news by topics, regions, and sentiment, creating a truly personalized news consumption experience that saves time while keeping them well-informed.
            </p>
        </div>


        </div>




        <div className="mb-20 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-10 shadow-xl border-t-4 border-red-700">
  <h2 className="text-4xl font-bold mb-6 text-center text-red-500">Our Features</h2>
  <div className="w-32 h-2 bg-red-700 mx-auto mb-10"></div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-black p-6 rounded-xl border-l-2 border-red-700 hover:border-l-4 transition-all duration-300 transform hover:-translate-y-1">
      <h3 className="text-xl font-bold mb-3 text-red-600">Smart Summaries</h3>
      <p className="text-base">We make long news short and easy to read in seconds using AI technology.</p>
    </div>

    <div className="bg-black p-6 rounded-xl border-l-2 border-red-700 hover:border-l-4 transition-all duration-300 transform hover:-translate-y-1">
      <h3 className="text-xl font-bold mb-3 text-red-600">Fake News Alert</h3>
      <p className="text-base">Our AI checks many sources to spot and mark fake news so you get only true facts.</p>
    </div>

    <div className="bg-black p-6 rounded-xl border-l-2 border-red-700 hover:border-l-4 transition-all duration-300 transform hover:-translate-y-1">
      <h3 className="text-xl font-bold mb-3 text-red-600">Web Scraping</h3>
      <p className="text-base">We collect news from hundreds of websites to give you complete coverage.</p>
    </div>

    <div className="bg-black p-6 rounded-xl border-l-2 border-red-700 hover:border-l-4 transition-all duration-300 transform hover:-translate-y-1">
      <h3 className="text-xl font-bold mb-3 text-red-600">Sentiment Check</h3>
      <p className="text-base">Know if news is positive or negative with our feeling analysis system.</p>
    </div>

    <div className="bg-black p-6 rounded-xl border-l-2 border-red-700 hover:border-l-4 transition-all duration-300 transform hover:-translate-y-1">
      <h3 className="text-xl font-bold mb-3 text-red-600">Region Filters</h3>
      <p className="text-base">Find news from your area - North, South, East, West or Central India.</p>
    </div>

    <div className="bg-black p-6 rounded-xl border-l-2 border-red-700 hover:border-l-4 transition-all duration-300 transform hover:-translate-y-1">
      <h3 className="text-xl font-bold mb-3 text-red-600">Topic Categories</h3>
      <p className="text-base">Browse news by topic: Tech, Business, Sports, Politics, Health and more.</p>
    </div>


    <div className="bg-black p-6 rounded-xl border-l-2 border-red-700 hover:border-l-4 transition-all duration-300 transform hover:-translate-y-1">
      <h3 className="text-xl font-bold mb-3 text-red-600"> Chat Bot - NewsBot </h3>
      <p className="text-base"> Our Web App Provide a Real Time Chat Bot to Answer all your Queries</p>
    </div>

  </div>
</div>






        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-red-500">Our Team</h2>
            <div className="w-28 h-2 bg-red-700 mx-auto mb-8"></div>
            <p className="max-w-3xl mx-auto text-xl mb-10">Meet the talented individuals behind News.ai who are passionate about transforming how India consumes news.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
                name: "Shivamsingh A Yadav",
                role: "Frontend & Backend  Engineer",
                bio: "Specializes in creating seamless user experiences and integrating complex systems."
            },
            {
                name: "Ashish Bhambure",
                role: "AI-ML Engineer",
                bio: " machine learning models for content analysis and recommendation."
            },
            {
                name: "Subodh Kangale",
                role: "Conversational AI Architect",
                bio: "Builds natural language processing systems that power our interactive features."
            },
            {
                name: "Deepak Vishwakarma",
                role: "Backend Engineer & Data Mining Specialist",
                bio: "Creates robust data pipelines and analytics systems to process news content."
            }
            ].map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl text-center transform hover:-translate-y-2 transition duration-300 shadow-lg border-t-4 border-red-700 group">
                <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-4 overflow-hidden group-hover:border-2 group-hover:border-red-600 transition duration-300">
                  {/* Placeholder for team member photo */}
                  <div className="w-full h-full flex items-center justify-center bg-red-800 text-white text-2xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <p className="text-red-600 text-lg mb-3">{member.role}</p>
                <p className="text-gray-300">{member.bio}</p>
                <div className="mt-4 flex justify-center space-x-3">
                  {['linkedin', 'twitter', 'github'].map((social) => (
                    <a
                      key={social}
                      href={`#${social}`}
                      className="bg-gray-800 hover:bg-red-700 w-8 h-8 rounded-full flex items-center justify-center transition duration-300"
                    >
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-1.102.525-2.442.573-3.457.573-1.499 0-2.957-.15-4.213-.406-.155-.032-.306-.068-.455-.107-.44-.118-.56-.221-.688-.296-.275-.159-.49-.345-.708-.568-.218-.223-.41-.455-.564-.696h.62c.146.123.304.237.472.346.157.104.326.197.504.283.531.216 1.118.385 1.752.497.634.111 1.302.166 1.998.166.819 0 1.63-.076 2.403-.208l.36-.066c.323-.068.637-.153.94-.253.304-.1.597-.214.872-.345-.035.021-.076.038-.107.06z" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default About;