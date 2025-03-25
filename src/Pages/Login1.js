import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from "react-hot-toast";
import summaryApi from '../Common/ApiBackend';
import { FaUserShield, FaUserAlt, FaUserCog, FaLock, FaSignInAlt, FaFileContract, FaShieldAlt } from 'react-icons/fa';
import NewsAnimation from './NewsAnimation'; // Import the component

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

  // Function to get role icon based on selected role
  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin':
        return <FaUserShield className="text-red-600" />;
      case 'user':
        return <FaUserAlt className="text-red-600" />;
      default:
        return <FaUserCog className="text-red-600" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      <div className="hidden md:block md:w-1/2">
        <NewsAnimation />
      </div>
      
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to continue to your account</p>
          </div>
          
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg border border-red-800">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-full relative">
                <label htmlFor="role-select" className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <FaLock className="mr-2 text-red-600" />
                  Select Your Role
                </label>
                <div className="relative">
                  <select
                    id="role-select"
                    className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-red-600 focus:border-red-600 text-white transition-all"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    aria-label="Select user role"
                  >
                    <option value="general">General User</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    {getRoleIcon(selectedRole)}
                  </div>
                </div>
              </div>

              <div className="w-full pt-2">
                <div className="relative flex items-center justify-center py-3 rounded-full bg-red-700 hover:bg-red-800 transition-all mb-4">
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      toast.error("Google Login Failed");
                      console.error('Google Login Failed');
                    }}
                    size="large"
                    theme="filled_black"
                    shape="pill"
                    text="continue_with"
                    useOneTap
                    width="100%"
                  />
                </div>
              </div>

              <div className="text-sm text-gray-400 text-center mt-4 flex items-center justify-center flex-wrap">
                <FaFileContract className="mr-1 text-red-600" />
                <span>By signing in, you agree to our</span>
                <a href="/terms" className="text-red-500 hover:text-red-400 ml-1 mr-1">
                  Terms of Service
                </a> 
                <span>and</span>
                <a href="/privacy" className="text-red-500 hover:text-red-400 ml-1 flex items-center">
                  <FaShieldAlt className="mr-1 text-red-600" />
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