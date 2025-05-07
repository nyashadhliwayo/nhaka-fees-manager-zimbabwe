
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold">N</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-primary">Nhaka School Management</h1>
            <p className="text-xs text-muted-foreground">Fee Management Module</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-4 text-right">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">School Head</p>
          </div>
          <button className="nhaka-btn-outline">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
