import React, { useState } from 'react';
import summaryApi from '../Common/ApiBackend';
import {
    FaNewspaper, FaFileAlt, FaServer, FaDatabase, FaCalendarAlt,
    FaChartLine, FaExclamationCircle, FaCheckCircle, FaSpinner,
    FaMagic, FaChartBar
} from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';

const AdminPage = () => {
    const token = localStorage.getItem('token');
    const User = JSON.parse(localStorage.getItem('user'));
    const [count, setCount] = useState(0);
    console.log(User);
    console.log(token);
    if (!token) {
        window.location.href = '/login';
    }
    if (User?.role !== 'admin') {
        window.location.href = '/';
    }

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [activeType, setActiveType] = useState(null);

    const handleScraping = async (type) => {
        setLoading(true);
        setActiveType(type);
        setMessage('Scraping is starting, please wait a minute...');

        const apiEndpoint = type === 'all' ? summaryApi.scrapeNews : summaryApi.setAllData;
        try {
            const res = await fetch(apiEndpoint.url, {
                method: apiEndpoint.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await res.json();
            setCount(data?.count)

            setMessage(`Scraping completed: ${data.message || 'Success'}`);
        } catch (error) {
            setMessage('Scraping failed. Please try again.');
        }
        setLoading(false);
        setActiveType(null);
    };

    const handleNewsDetection = async () => {
        setLoading(true);
        setActiveType('detection');
        setMessage('News detection is starting, please wait a minute...');

        try {
            const res = await fetch(summaryApi.newsDetection.url, {
                method: summaryApi.newsDetection.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await res.json();
            setMessage(`News detection completed: ${data.message || 'Success'}`);
        } catch (error) {
            setMessage('News detection failed. Please try again.');
        }
        setLoading(false);
        setActiveType(null);
    };
    
    const handleSentimentAnalysis = async () => {
        setLoading(true);
        setActiveType('sentiment');
        setMessage('Sentiment analysis is starting, please wait a minute...');

        try {
            const res = await fetch(summaryApi.sentiment.url, {
                method: summaryApi.sentiment.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await res.json();
            setMessage(`Sentiment analysis completed: ${data.message || 'Success'}`);
        } catch (error) {
            setMessage('Sentiment analysis failed. Please try again.');
        }
        setLoading(false);
        setActiveType(null);
    };
    
    console.log("count of data", count);

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8 flex items-center justify-between border-b border-red-700 pb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-red-600">Admin Dashboard</h1>
                        <p className="text-gray-400 mt-2">Welcome back, {User?.name || 'Administrator'}</p>
                    </div>
                    <div className="hidden md:block">
                        <img
                            src={User.profile_picture}
                            alt="Admin Logo"
                            className="h-16 rounded-md border border-red-800"
                        />
                    </div>
                </header>

                <section className="bg-gray-900 rounded-lg p-6 shadow-lg mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-red-500">Content Management</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="flex flex-col h-full">
                            <button
                                onClick={() => handleScraping('all')}
                                disabled={loading}
                                className={`p-4 rounded-md font-medium transition-colors flex-grow ${loading && activeType === 'all'
                                    ? 'bg-red-900 text-gray-300'
                                    : 'bg-red-700 hover:bg-red-600 text-white'
                                    }`}
                            >
                                {loading && activeType === 'all' ? (
                                    <div className="flex items-center justify-center">
                                        <FaSpinner className="animate-spin h-5 w-5 mr-3 text-white" />
                                        Processing Full Scrape...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <FaNewspaper className="h-6 w-6 mr-3" />
                                        <span>Scrape All Articles</span>
                                    </div>
                                )}
                            </button>
                            <div className="mt-2 text-xs text-gray-400">Scrapes all articles from configured sources</div>
                        </div>

                        <div className="flex flex-col h-full">
                            <button
                                onClick={() => handleScraping('single')}
                                disabled={loading}
                                className={`p-4 rounded-md font-medium transition-colors flex-grow ${loading && activeType === 'single'
                                    ? 'bg-red-900 text-gray-300'
                                    : 'bg-red-700 hover:bg-red-600 text-white'
                                    }`}
                            >
                                {loading && activeType === 'single' ? (
                                    <div className="flex items-center justify-center">
                                        <FaSpinner className="animate-spin h-5 w-5 mr-3 text-white" />
                                        Processing Single Scrape...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <FaFileAlt className="h-6 w-6 mr-3" />
                                        <span>Scrape Single Article</span>
                                    </div>
                                )}
                            </button>
                            <div className="mt-2 text-xs text-gray-400">Scrapes a single article from the source</div>
                        </div>
                        
                        <div className="flex flex-col h-full">
                            <button
                                onClick={handleNewsDetection}
                                disabled={loading}
                                className={`p-4 rounded-md font-medium transition-colors flex-grow ${loading && activeType === 'detection'
                                    ? 'bg-red-900 text-gray-300'
                                    : 'bg-red-700 hover:bg-red-600 text-white'
                                    }`}
                            >
                                {loading && activeType === 'detection' ? (
                                    <div className="flex items-center justify-center">
                                        <FaSpinner className="animate-spin h-5 w-5 mr-3 text-white" />
                                        Processing News Detection...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <FaMagic className="h-6 w-6 mr-3" />
                                        <span>Run News Prediction</span>
                                    </div>
                                )}
                            </button>
                            <div className="mt-2 text-xs text-gray-400">Get predictions for news articles</div>
                        </div>
                        
                        {/* New Sentiment Analysis Button */}
                        <div className="flex flex-col h-full">
                            <button
                                onClick={handleSentimentAnalysis}
                                disabled={loading}
                                className={`p-4 rounded-md font-medium transition-colors flex-grow ${loading && activeType === 'sentiment'
                                    ? 'bg-red-900 text-gray-300'
                                    : 'bg-red-700 hover:bg-red-600 text-white'
                                    }`}
                            >
                                {loading && activeType === 'sentiment' ? (
                                    <div className="flex items-center justify-center">
                                        <FaSpinner className="animate-spin h-5 w-5 mr-3 text-white" />
                                        Processing Sentiment Analysis...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <FaChartBar className="h-6 w-6 mr-3" />
                                        <span>Run Sentiment Analysis</span>
                                    </div>
                                )}
                            </button>
                            <div className="mt-2 text-xs text-gray-400">Analyze sentiment of news articles</div>
                        </div>
                    </div>

                    {message && (
                        <div className={`p-4 rounded-md mt-4 ${message.includes('failed')
                            ? 'bg-red-900/50 border border-red-700'
                            : message.includes('completed')
                                ? 'bg-green-900/30 border border-green-700'
                                : 'bg-gray-800 border border-gray-700'
                            }`}>
                            <div className="flex items-center">
                                {message.includes('failed') ? (
                                    <FaExclamationCircle className="h-6 w-6 mr-3 text-red-500" />
                                ) : message.includes('completed') ? (
                                    <FaCheckCircle className="h-6 w-6 mr-3 text-green-500" />
                                ) : (
                                    <FaSpinner className="animate-spin h-6 w-6 mr-3 text-gray-400" />
                                )}
                                <p className={`${message.includes('failed')
                                    ? 'text-red-400'
                                    : message.includes('completed')
                                        ? 'text-green-400'
                                        : 'text-gray-300'
                                    }`}>
                                    {message}
                                </p>
                            </div>
                        </div>
                    )}
                </section>

                <section className="bg-gray-900 rounded-lg p-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-red-500">Analytics Dashboard</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-800 p-4 rounded-md flex items-center">
                            <div className="h-12 w-12 mr-3 flex items-center justify-center bg-gray-700 rounded-md border border-red-800">
                                <FaServer className="text-red-500 text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-red-400 font-medium">Server Load</h3>
                                <p className="text-2xl font-bold">Normal</p>
                            </div>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-md flex items-center">
                            <div className="h-12 w-12 mr-3 flex items-center justify-center bg-gray-700 rounded-md border border-red-800">
                                <FaDatabase className="text-red-500 text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-red-400 font-medium">Articles Count</h3>
                                <p className="text-2xl font-bold">{count}</p>
                            </div>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-md flex items-center">
                            <div className="h-12 w-12 mr-3 flex items-center justify-center bg-gray-700 rounded-md border border-red-800">
                                <FaCalendarAlt className="text-red-500 text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-red-400 font-medium">Last Updated</h3>
                                <p className="text-2xl font-bold">--</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-gray-800 p-4 rounded-md">
                        <div className="flex items-center mb-3">
                            <FaChartLine className="text-red-500 mr-2 text-xl" />
                            <h3 className="text-red-400 font-medium">Recent Activity</h3>
                        </div>
                        <div className="flex flex-col items-center justify-center p-6 border border-gray-700 rounded-md bg-gray-900">
                            <FaChartLine className="text-red-500 text-6xl mb-4 opacity-30" />
                            <p className="text-gray-400">Activity data will be displayed here</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminPage;