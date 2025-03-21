import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from "react-hot-toast";
import summaryApi from '../Common/ApiBackend';

const Login1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState('general'); 
  
  const getRedirectUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get('redirect') || '/';
  };
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleFromUrl = params.get('role');
    if (roleFromUrl && ['general', 'admin', 'user'].includes(roleFromUrl)) {
      setSelectedRole(roleFromUrl);
    }
  }, [location]);

  const handleGoogleLogin = async (response) => {
    try {
      const loadingToast = toast.loading('Signing you in...');
      
      const credential = response.credential;
      const redirectUrl = getRedirectUrl();

      const backendResponse = await fetch(summaryApi.logIn.url, {
        method: summaryApi.logIn.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credential, role: selectedRole }),
      });

      toast.dismiss(loadingToast);
      
      const data = await backendResponse.json();
      console.log("User Data:", data);
      if(data.success === false){
        toast.error(data.message);
    }
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', selectedRole);
        
        toast.success(`Welcome back, ${data.user.name || 'User'}!`);
        
        navigate(redirectUrl, { replace: true });
      }
    } catch (error) {
      console.log('Google login failed:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden md:flex md:w-1/2 bg-green-600 items-center justify-center">
        <img 
          src="/assets/login-illustration.gif"
          alt="Login illustration" 
          className="max-w-full max-h-full object-contain rounded-lg shadow-xl"
        />
      </div>
      
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to continue to your account</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-full">
                <label htmlFor="role-select" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Your Role
                </label>
                <select
                  id="role-select"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  aria-label="Select user role"
                >
                  <option value="general">General User</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <div className="w-full pt-2">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    toast.error("Google Login Failed");
                    console.error('Google Login Failed');
                  }}
                  size="large"
                  theme="filled_blue"
                  shape="pill"
                  text="continue_with"
                  useOneTap
                  width="100%"
                />
              </div>

              <div className="text-sm text-gray-500 text-center mt-4">
                By signing in, you agree to our 
                <a href="/terms" className="text-indigo-600 hover:text-indigo-800 ml-1">
                  Terms of Service
                </a> and 
                <a href="/privacy" className="text-indigo-600 hover:text-indigo-800 ml-1">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login1;