import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import summaryApi from '../Common/ApiBackend';


const SingleNews = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const [readingTime, setReadingTime] = useState("5 min");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [summarizedNews, setSummarizedNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fake_text, set_fake_text] = useState();
  const articleRef = useRef(null);


  useEffect(() => {
    // console.log(data.articleBody)
    const loadSummarisedNews = async () => {
      try {
        setLoading(true);
        const response = await axios.post(summaryApi.summarisedNews.url, { newsText: data.articleBody });
        console.log(" Summary Response :: ", response.data);
        setSummarizedNews(response.data.summary);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching summary:", error);
        setLoading(false);
      }
    };
    if (data?.articleBody) {
      loadSummarisedNews();
    }
  }, [data]);

  useEffect(() => {
    if (data?.articleBody) {
      const words = data.articleBody.split(/\s+/).length;
      const time = Math.ceil(words / 200);
      setReadingTime(`${time} min read`);
    }

    const handleScroll = () => {
      if (articleRef.current) {
        const totalHeight = articleRef.current.scrollHeight - window.innerHeight;
        const progress = Math.min(100, (window.scrollY / totalHeight) * 100);
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data]);



  if (!data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-lg w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>
          <div className="bg-zinc-900 p-8 rounded-lg">
            <div className="flex justify-between items-center mb-12">
              <div className="h-3 w-36 bg-zinc-800 rounded-full"></div>
              <div className="h-8 w-8 rounded-full bg-zinc-800"></div>
            </div>

            <div className="h-16 w-5/6 bg-zinc-800 rounded-lg mb-8"></div>
            <div className="h-4 w-full bg-zinc-800 rounded-full mb-3"></div>
            <div className="h-4 w-4/5 bg-zinc-800 rounded-full mb-3"></div>
            <div className="h-4 w-3/4 bg-zinc-800 rounded-full mb-10"></div>

            <div className="text-white text-xl font-semibold mb-2">Content Not Found</div>
            <p className="text-zinc-400 mb-8">We couldn't retrieve the article you're looking for.</p>

            <button
              onClick={() => navigate(-1)}
              className="w-full p-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Return to Previous Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      return "Today";
    } else if (diffDays <= 2) {
      return "Yesterday";
    } else if (diffDays <= 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    }
  };

  return (
    <div className="bg-black text-white" ref={articleRef}>
      <div className="fixed top-0 left-0 w-full h-1 bg-zinc-800 z-50">
        <div
          className="h-full bg-red-600 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <header className="sticky top-0 bg-black/80 backdrop-blur-lg z-40 p-4 flex items-center justify-between border-b border-zinc-800">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-zinc-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>

          <button className="p-2 rounded-full hover:bg-zinc-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Summarized News Section */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Quick Summary
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-zinc-400">Generating summary...</p>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              {summarizedNews ? (
                <p className="text-zinc-300">{summarizedNews}</p>
              ) : (
                <p className="text-zinc-400">Unable to generate summary for this article.</p>
              )}
            </div>
          )}
        </div>
        {/* Show Sentimental Data here */}
        <div className="p-6 bg-black rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-white">Sentiment Analysis</h2>
      
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sentiment Verdict Card */}
        <div className="flex-1 border border-red-600 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
          <div className="bg-red-600 p-3">
            <h3 className="text-white font-bold text-lg">Sentiment Verdict</h3>
          </div>
          <div className="p-4 flex items-center justify-center bg-white">
            <span className="text-black text-xl font-semibold">{data.sentiment.sentiment}</span>
          </div>
        </div>

        {/* Score Card */}
        <div className="flex-1 border border-red-600 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
          <div className="bg-red-600 p-3">
            <h3 className="text-white font-bold text-lg">Score</h3>
          </div>
          <div className="p-4 flex items-center justify-center bg-white">
            <span className="text-black text-xl font-semibold">{data.sentiment.score}</span>
          </div>
        </div>

        {/* Probability Prediction Card */}
        <div className="flex-1 border border-red-600 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
          <div className="bg-red-600 p-3">
            <h3 className="text-white font-bold text-lg">Probability Prediction</h3>
          </div>
          <div className="p-4 flex items-center justify-center bg-white">
            <span className="text-black text-xl font-semibold">{data?.prediction ? data.prediction : "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
      </div>



      <main className="max-w-6xl mx-auto lg:grid lg:grid-cols-12 gap-8 px-4 pt-2 pb-20">
        <article className="lg:col-span-7 mb-12 lg:mb-0">
          <div className="flex items-center mb-6 text-sm">
            <span className="px-3 py-1 bg-red-600 text-white font-medium rounded-sm mr-4">
              {data.topics || "News"}
            </span>
            <time className="text-zinc-400">{formatDate(data.datePublished)}</time>
            <span className="ml-auto text-zinc-400">{readingTime}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
            {data.headline}
          </h1>

          {data.description && (
            <div className="mb-8 pb-8 border-b border-zinc-800">
              <p className="text-xl text-zinc-300 leading-relaxed">
                {data.description}
              </p>
            </div>
          )}

          {data.authors && data.authors.length > 0 && (
            <div className="flex items-center mb-10">
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold">
                {data.authors[0].name.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="font-medium">{data.authors[0].name}</p>
                <p className="text-sm text-zinc-400">
                  {data.source && data.source.charAt(0).toUpperCase() + data.source.slice(1)}
                </p>
              </div>
            </div>
          )}

          <div className="prose prose-invert max-w-none prose-p:text-zinc-300 prose-headings:text-white">
            {data.articleBody && data.articleBody.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-6 text-zinc-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800">
            <h3 className="text-sm uppercase tracking-wider text-zinc-500 mb-4">Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              {data.regions && data.regions.map((region, index) => (
                <span key={index} className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm rounded-sm cursor-pointer transition-colors">
                  {region}
                </span>
              ))}
              {data.topics && (
                <span className="px-3 py-1 bg-red-900/30 text-red-400 hover:bg-red-900/50 text-sm rounded-sm cursor-pointer transition-colors">
                  {data.topics}
                </span>
              )}
            </div>
          </div>
        </article>

        <aside className="lg:col-span-5 lg:sticky lg:top-24 self-start">
          {data.mainImage && (
            <div className="mb-8">
              <img
                src={data.mainImage}
                alt={data.headline}
                className="w-full aspect-video object-cover rounded-lg"
              />
              <p className="mt-2 text-sm text-zinc-500">Featured image</p>
            </div>
          )}

          <div className="bg-zinc-900 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">About this article</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span className="text-zinc-400">Source:</span>
                <span>{data.source ? data.source.charAt(0).toUpperCase() + data.source.slice(1) : "Unknown"}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-400">Published:</span>
                <span>{formatDate(data.datePublished)}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-400">Reading Time:</span>
                <span>{readingTime}</span>
              </li>
              {data.regions && data.regions.length > 0 && (
                <li className="flex justify-between">
                  <span className="text-zinc-400">Region:</span>
                  <span>{data.regions[0]}</span>
                </li>
              )}
            </ul>
          </div>


          {data.images && data.images.length > 1 && (
            <div className="bg-zinc-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Related Images</h3>
              <div className="grid grid-cols-2 gap-3">
                {data.images.slice(0, 4).map((image, index) => (
                  <div key={index} className="aspect-square relative overflow-hidden group">
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover rounded-md transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-sm">View</span>
                    </div>
                  </div>
                ))}
              </div>
              {data.images.length > 4 && (
                <button className="w-full mt-3 py-2 text-center text-sm text-zinc-400 hover:text-white transition-colors">
                  View all {data.images.length} images
                </button>
              )}
            </div>
          )}
        </aside>
      </main>


      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        <button className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center shadow-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <button className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center shadow-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SingleNews;