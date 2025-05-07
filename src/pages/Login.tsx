
import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8 border border-border">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white text-3xl font-bold">N</span>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-foreground mb-1">Nhaka School Management</h1>
        <p className="text-center text-muted-foreground mb-8">School Fees Payment Module</p>
        
        <form>
          <div className="mb-4">
            <label className="nhaka-label" htmlFor="username">Username</label>
            <input id="username" type="text" className="nhaka-input" placeholder="Enter your username" />
          </div>
          
          <div className="mb-6">
            <label className="nhaka-label" htmlFor="password">Password</label>
            <input id="password" type="password" className="nhaka-input" placeholder="Enter your password" />
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
          
          <button type="submit" className="nhaka-btn-primary w-full mb-4">
            Login
          </button>
          
          <p className="text-center text-sm text-muted-foreground">
            Trouble logging in? Contact your system administrator.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
