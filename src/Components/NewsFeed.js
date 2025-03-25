import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const NewsFeed = ({ news }) => {

    // function formatDate()

    const navigate = useNavigate();
    return (
        <div className="p-8 bg-black text-white min-h-screen">
            <div className="grid md:grid-cols-3 gap-8">
                {news.map((newsItem, index) => (
                    <div
                      onClick={()=>{
                     navigate(`/news/${index}`, { state: newsItem });
                      }} 
                        key={index}
                        className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >

                        <div className="relative">
                            <img
                                src={newsItem.mainImage}
                                alt={newsItem.headline}
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                        </div>

                        <div className="p-5">

                            <h3 className="text-xl font-bold mb-2 text-gray-100">{newsItem.headline}</h3>
                            <p className="text-gray-300 mb-4 text-sm leading-relaxed">{newsItem.description}</p>

                            <div className="flex justify-between items-center">

                               <Link to={`/news/${index}`} >

                                   
                                    <span className="text-xs text-gray-400 ">
                                        {newsItem.datePublished?.substr(0,10)}
                                    </span>

                                    <span className=' text-gray-400 italic  font-bold'>
                                        {
                                            `  -${newsItem.source}`
                                        }
                                    </span>

                                </Link>

                                
                            <div className=' italic'>
                                {
                                    newsItem.authors.map((author)=>(<h2>"{author.name}"</h2>))
                                }
                            </div>

                            </div>




                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsFeed;
