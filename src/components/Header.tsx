
import React from 'react';
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-border sticky top-0 z-10">
      <div className="flex items-center">
        {/* Logo section */}
        <div className="flex-shrink-0 bg-akkhor-yellow h-16 px-6 flex items-center">
          <div className="flex items-center space-x-2">
            <div className="font-bold text-lg text-akkhor-blue">Nhaka™</div>
          </div>
        </div>
        
        {/* Title section */}
        <div className="px-6 py-4 flex-grow">
          <div className="flex items-center">
            <h1 className="text-lg font-medium mr-2">Welcome To Nhaka</h1>
            <span className="text-muted-foreground">School Management System</span>
          </div>
        </div>
        
        {/* Search section */}
        <div className="px-6 py-2 flex-shrink-0">
          <div className="relative">
            <input 
              type="text" 
              className="nhaka-input pl-10 pr-4 py-2 w-64" 
              placeholder="Search here..." 
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        
        {/* User profile */}
        <div className="px-6 py-2 flex items-center space-x-6 border-l border-border">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-akkhor-blue flex items-center justify-center text-white mr-3">
              <span>JD</span>
            </div>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">School Head</p>
            </div>
          </div>
          <button className="nhaka-btn-outline text-sm">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
