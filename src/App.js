import logo from './logo.svg';
import './App.css';
import Login1 from './Pages/Login1';
import { Toaster } from 'react-hot-toast';
import Navbar from './Components/NavBar';
import NewsFeed  from './Components/NewsFeed';
import Footer from './Components/Footer';
import FeedPage from './Components/FeedPage';
import SingleNews from './Components/SingleNews';
import Link from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import summaryApi from './Common/ApiBackend';
import { useAppContext } from './context/AppContext';
import AdminPage from './Pages/AdminPage';
import About from './Pages/About';
import Contact from './Pages/Contact';

function App() {
  const {allNews,setAllNews} = useAppContext();
  const {filter,setFiltere,region,setRegion,senti,setSenti} = useAppContext();
  const [filteredData,setFilteredData]= useState([]);
  
  useEffect(()=>{
    const handleFilterUpdate = ()=>{
     if(filter === 'all'){
      setFilteredData(allNews);
       return;
     }
     const data = allNews.filter(news => news.topics === filter);
     setFilteredData(data);
    }
    handleFilterUpdate();
  },[filter]);

  useEffect(()=>{
    const f = ()=>{
        if(region === 'all'){
          setFilteredData(allNews);
          return;
        }
        const data = allNews.filter(news => news?.regions?.includes(region));
        setFilteredData(data);
    }
    f()
  },[region]);

  useEffect(()=>{
    const initialLoad = async () => {
      try {
        const response = await axios.get(summaryApi.getAllNews.url);
        setAllNews(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };
    initialLoad();
  }, []);

  useEffect(()=>{
    if(senti === 'no'){
      setFilteredData(allNews);
      return;
    }
    const data = allNews.filter(news => news?.sentiment?.sentiment === senti);
    setFilteredData(data);
  },[senti]);
  
  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <Navbar/>
        <Routes>
          <Route path='/' element={<FeedPage news={filteredData}/>}></Route>
          <Route path='/news/:id' element={<SingleNews/>}></Route>
          <Route path='/admin' element={<AdminPage/>}></Route>
          <Route path='/login' element={<Login1/>}></Route>
          <Route path='/about' element = {<About />} />
          <Route path='/contact' element = {< Contact />} />
          <Route
            path="*"
            element={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                  backgroundColor: "#1a1a2e",
                  color: "#fff",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  animation: "pulse 1.5s infinite alternate",
                }}
              >
                🚧 Work Under Progress! 🚧
                <style>
                  {`
                    @keyframes pulse {
                      0% { opacity: 0.6; transform: scale(1); }
                      100% { opacity: 1; transform: scale(1.001); }
                    }
                  `}
                </style>
              </div>
            }
          />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
