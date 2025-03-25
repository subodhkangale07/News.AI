import React, { useEffect, useState } from 'react';
import { FaSignInAlt, FaNewspaper, FaGlobeAmericas, FaChartLine, FaRegNewspaper } from 'react-icons/fa';

const NewsAnimation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const newsItems = [
    {
      icon: <FaNewspaper className="text-4xl" />,
      title: "Breaking News",
      description: "Stay informed with the latest headlines and updates from around the world."
    },
    {
      icon: <FaGlobeAmericas className="text-4xl" />,
      title: "Global Coverage",
      description: "Access news and analysis from every corner of the globe, all in one place."
    },
    {
      icon: <FaChartLine className="text-4xl" />,
      title: "Data Insights",
      description: "Understand the story behind the news with our advanced analytics."
    },
    {
      icon: <FaRegNewspaper className="text-4xl" />,
      title: "Personalized Feed",
      description: "Get news that matters to you, tailored to your interests and preferences."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [newsItems.length]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-red-900 to-red-700">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white/5 rounded-full"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 2}s`,
              animation: 'float 15s infinite linear'
            }}
          />
        ))}
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full bg-black/20" />
      
      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-md">
        <div className="mb-10 transform hover:scale-105 transition-transform duration-300">
          <div className="relative mx-auto w-20 h-20 flex items-center justify-center mb-4">
            <div className="absolute inset-0 bg-red-600 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <FaSignInAlt className="text-3xl text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2 text-white tracking-tight">News Portal</h1>
          <div className="h-1 w-16 bg-white mx-auto rounded-full mb-2" />
          <p className="text-white/80 text-lg">Your gateway to the world's stories</p>
        </div>
        
        {/* News feature carousel */}
        <div className="relative mb-10 h-64">
          {newsItems.map((item, index) => (
            <div 
              key={index}
              className={`absolute inset-0 flex flex-col items-center transition-all duration-700 ease-in-out ${
                index === activeIndex 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-8 pointer-events-none'
              }`}
            >
              <div className="bg-black/30 p-4 rounded-full mb-4 text-white">
                {item.icon}
              </div>
              <h2 className="text-2xl font-bold mb-3 text-white">{item.title}</h2>
              <p className="text-white/80 text-lg max-w-xs">{item.description}</p>
            </div>
          ))}
        </div>
        
        {/* Dots navigation */}
        <div className="flex space-x-2 justify-center">
          {newsItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-white w-6' : 'bg-white/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Floating news cards */}
      <div className="absolute -bottom-20 -right-20 w-64 h-48 bg-black/30 backdrop-blur-sm rounded-lg transform rotate-12 shadow-xl" />
      <div className="absolute -top-16 -left-16 w-48 h-32 bg-black/30 backdrop-blur-sm rounded-lg transform -rotate-6 shadow-xl" />
      
      {/* CSS for animation */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.5; }
          50% { transform: translateY(-100px) rotate(180deg); opacity: 0.2; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-200px) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default NewsAnimation;