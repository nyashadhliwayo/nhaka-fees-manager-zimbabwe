
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-akkhor-lightgray">
      <div className="bg-white shadow-md rounded-md w-full max-w-md overflow-hidden">
        <div className="bg-akkhor-yellow p-6 text-center">
          <h1 className="text-2xl font-bold text-akkhor-blue">Nhaka™</h1>
          <p className="text-sm text-akkhor-blue/80 mt-1">School Management System</p>
        </div>
        
        <div className="p-8">
          <h2 className="text-xl font-semibold text-center mb-6">Login to Your Account</h2>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="nhaka-label" htmlFor="username">Username</label>
              <input 
                id="username" 
                type="text" 
                className="nhaka-input" 
                placeholder="Enter your username" 
              />
            </div>
            
            <div className="mb-6">
              <label className="nhaka-label" htmlFor="password">Password</label>
              <input 
                id="password" 
                type="password" 
                className="nhaka-input" 
                placeholder="Enter your password" 
              />
            </div>
            
            <div className="mb-6">
              <label className="nhaka-label" htmlFor="role">Login as</label>
              <select id="role" className="nhaka-select">
                <option value="">Select role</option>
                <option value="admin">Super Admin</option>
                <option value="head">School Head</option>
                <option value="clerk">Clerk</option>
              </select>
            </div>
            
            <button type="submit" className="nhaka-btn bg-akkhor-yellow text-akkhor-blue hover:bg-akkhor-yellow/90 w-full mb-4 font-semibold">
              Login
            </button>
            
            <div className="flex items-center justify-between mt-4 text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <a href="#" className="text-akkhor-blue hover:underline">Forgot Password?</a>
            </div>
          </form>
          
          <p className="text-center text-sm text-muted-foreground mt-8">
            Trouble logging in? Contact your system administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
