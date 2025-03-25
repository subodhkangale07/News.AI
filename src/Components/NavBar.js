import React, { useState } from "react";
import DropDownButton from "./DropDownButton";
import {
  FaHome,
  FaNewspaper,
  FaRegFlag,
  FaFilm,
  FaRunning,
  FaBriefcase,
  FaUserCircle,
  FaSignOutAlt,
  FaSearch,
  FaSmile,
} from "react-icons/fa";

import logo from "../Assist/logo.png";
import { categories, STATES } from "../Assist/Data";
import { useAppContext } from "../context/AppContext";
import { Link, NavLink, useNavigate } from "react-router";

const Navbar = () => {
  const { filter, setFilter, region, setRegion , senti,setSenti } = useAppContext();
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showSentimentDropdown, setShowSentimentDropdown] = useState(false);
  const [selectedSentiment, setSelectedSentiment] = useState("Neutral");

  const sentiments = ["Positive", "Negative", "Neutral"];
  let regionTimeout, sentimentTimeout;
  const User = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg border-t-4 border-red-700 p-5 flex items-center justify-between text-lg">
      {/* Left - Logo */}
      <div className="flex items-center gap-4">
        <img src={logo} alt="Logo" className="h-12 w-auto" />
       
      </div>

      <ul className="flex gap-8 items-center font-semibold">
        {/* <button className="flex items-center gap-2 hover:text-red-700 transition duration-300">
          <FaHome className="text-xl" /> Home
        </button> */}

        <button
         onClick={()=>{navigate('/')}}
        className="flex items-center gap-2 hover:text-red-700 transition duration-300">
          <FaNewspaper className="text-xl" /> News
        </button>

        {/* Region Dropdown */}
        <div
          className="relative inline-block z-10"
          onMouseEnter={() => {
            clearTimeout(regionTimeout);
            setShowRegionDropdown(true);
          }}
          onMouseLeave={() => {
            regionTimeout = setTimeout(() => setShowRegionDropdown(false), 100);
          }}
        >
          <button className="flex items-center gap-2 hover:text-red-700 transition duration-300">
            <FaRegFlag className="text-xl" /> Region
          </button>

          {showRegionDropdown && (
            <div className="absolute bg-black shadow-lg rounded-md mt-2 w-64 border border-gray-700 z-50 max-h-64 overflow-y-auto">
              <ul className="py-2">
                {STATES.map((state, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        setRegion(state);
                        setShowRegionDropdown(false);
                      }}
                      className="block w-full text-left px-5 py-2 text-white font-medium hover:bg-gray-800 transition duration-200"
                    >
                      {state}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button onClick={() => {setFilter("entertainment");navigate('/')} }
         
        className="flex items-center gap-2 hover:text-red-700 transition duration-300">
          <FaFilm className="text-xl" /> Entertainment
        </button>

        <button onClick={() => {setFilter("sports");navigate('/')}} className="flex items-center gap-2 hover:text-red-700 transition duration-300">
          <FaRunning className="text-xl" /> Sports
        </button>

        <button onClick={() => {setFilter("bussiness");navigate('/')}} className="flex items-center gap-2 hover:text-red-700 transition duration-300">
          <FaBriefcase className="text-xl" /> Business
        </button>

        <DropDownButton categories={categories} buttonName="More" />

        {/* Sentiment Dropdown */}
        <div
          className="relative inline-block z-10"
          onMouseEnter={() => {
            clearTimeout(sentimentTimeout);
            setShowSentimentDropdown(true);
          }}
          onMouseLeave={() => {
            sentimentTimeout = setTimeout(() => setShowSentimentDropdown(false), 100);
          }}
        >
          <button className="flex items-center gap-2 hover:text-red-700 transition duration-300">
            <FaSmile className="text-xl" /> {senti}
          </button>

          {showSentimentDropdown && (
            <div className="absolute bg-black shadow-lg rounded-md mt-2 w-40 border border-gray-700 z-50">
              <ul className="py-2">
                {sentiments.map((sentiment, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        setSenti(sentiment);
                        setShowSentimentDropdown(false);
                      }}
                      className="block w-full text-left px-5 py-2 text-white font-medium hover:bg-gray-800 transition duration-200"
                    >
                      {sentiment}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </ul>

      {/* Right - Search, Profile & Logout */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative w-64">
          {/* <input
            type="text"
            placeholder="Search..."
            className="border-2 border-gray-300 rounded-full px-4 py-2 text-md w-full focus:outline-none focus:border-red-700"
          />
          <FaSearch className="absolute right-4 top-3 text-gray-500 text-xl" /> */}
        </div>

        <NavLink to={'/about'}> About </NavLink>
        <NavLink to={'/contact'}> Contact </NavLink>


        {/* Profile Icon */}
        
        {
          User && User.role === 'admin' ? (<NavLink  to='/admin' className=" bg-red-400 cursor-pointer px-2 py-1 rounded-md">  Admin </NavLink>) :(<div></div>)
        }
        {/* <FaUserCircle className="text-3xl text-red-700 cursor-pointer hover:text-red-600" /> */}

        {/* Logout Button */}
        {
          User  ? (<button 
            onClick={()=>{
              localStorage.clear();
              window.location.reload();
            }}
          className="bg-red-700 text-white font-bold px-2 py-1 rounded-md flex items-center gap-2 text-lg hover:bg-red-600 transition duration-300">
            <FaSignOutAlt className="text-xl" /> Log Out
          </button>) :(<button 
           onClick={()=>{
            navigate('/login')
           }}
          className="bg-red-700 text-white font-bold px-2 py-1 rounded-md flex items-center gap-2 text-lg hover:bg-red-600 transition duration-300">
             Log In
          </button>)
        }
       
      </div>
    </nav>
  );
};

export default Navbar;
