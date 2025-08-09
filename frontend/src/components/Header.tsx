import React from 'react';
import { Leaf, User, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  user: any;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange, user }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'detect', label: 'Detect Disease' },
    { id: 'prices', label: 'Crop Prices' },
    { id: 'soil', label: 'Soil Analysis' },
    { id: 'tasks', label: 'Task Manager' },
    { id: 'climate', label: 'Climate Tools' },
    { id: 'about', label: 'About' },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-gradient-to-r from-green-500 to-green-600 shadow-lg border-b border-green-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-extrabold tracking-wide text-white drop-shadow-sm">
              AgriSense
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 
                  ${
                    currentPage === item.id
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-white hover:bg-green-700 hover:shadow-md'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-white font-medium">
              <User className="w-4 h-4" />
              <span>{user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Farmer'}</span>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-sm text-white hover:text-red-200 transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
