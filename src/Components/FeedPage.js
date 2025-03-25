import React, { useState } from "react";
import NewsFeed from "./NewsFeed";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importing icons

const FeedPage = ({ news }) =>
{
  console.log("News recived ", news);
    const itemsPerPage = 30;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(news.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentNews = news.slice(startIndex, startIndex + itemsPerPage);

    const nextPage = () =>
    {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    if(news.length === 0){
      return(
        <div className="p-8 min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center"> 
           <span class="loader"></span>
        </div>
      )
    }

  return (
    
    <div className="p-8 min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center">
      <h2 className="text-4xl font-extrabold mb-6 text-center tracking-wide text-gray-200">
      Stay Updated: The Latest Stories at Your Fingertips!
      </h2>

      <NewsFeed news={currentNews} />

      {/* Pagination Controls */}
      <div className="flex items-center space-x-4 mt-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-6 py-2 flex items-center gap-2 bg-gray-800 text-white rounded-lg shadow-md transition-all duration-300 transform hover:bg-gray-700 hover:-translate-x-1 active:scale-95 disabled:opacity-50`}
        >
          <FaArrowLeft className="text-lg" />
          Previous
        </button>

        <span className="text-lg font-semibold text-gray-300">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`px-6 py-2 flex items-center gap-2 bg-gray-800 text-white rounded-lg shadow-md transition-all duration-300 transform hover:bg-gray-700 hover:translate-x-1 active:scale-95 disabled:opacity-50`}
        >
          Next
          <FaArrowRight className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default FeedPage;
