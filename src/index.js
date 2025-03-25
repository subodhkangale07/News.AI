import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProvider } from "./context/AppContext";  // Import Provider
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId="763135655179-omr6nplh52i5c561d7ascsvm05bsvobu.apps.googleusercontent.com">
    <BrowserRouter>
    <AppProvider> 
      <App />
    </AppProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
