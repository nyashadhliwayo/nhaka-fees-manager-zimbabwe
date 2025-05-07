
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart2, 
  DollarSign, 
  Calendar, 
  Users,
  BookOpen, 
  Settings, 
  Home
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <Home className="h-5 w-5" />
    },
    {
      title: 'Fee Structure',
      path: '/fees',
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      title: 'All Students',
      path: '/all-students',
      icon: <Users className="h-5 w-5" />
    },
    {
      title: 'Student Payments',
      path: '/students',
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      title: 'Term Management',
      path: '/terms',
      icon: <Calendar className="h-5 w-5" />
    },
    {
      title: 'Reports',
      path: '/reports',
      icon: <BarChart2 className="h-5 w-5" />
    },
    {
      title: 'User Management',
      path: '/users',
      icon: <Settings className="h-5 w-5" />
    }
  ];

  return (
    <aside className={`bg-akkhor-blue text-white h-[calc(100vh-64px)] sticky top-16 transition-all ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4">
        <button 
          className="mb-6 flex items-center justify-center w-full text-center p-1 rounded hover:bg-akkhor-blue/80"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
        
        <nav>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`flex items-center ${collapsed ? 'justify-center px-2' : 'px-4'} py-3 rounded-md text-sm transition-colors
                    ${isActive(item.path) 
                      ? 'bg-akkhor-yellow text-akkhor-blue font-medium' 
                      : 'text-white hover:bg-white/10'}`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span className="ml-3">{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
