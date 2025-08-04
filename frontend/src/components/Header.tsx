import React from 'react';
import { Leaf, Globe, User } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'detect', label: 'Detect Disease' },
    { id: 'prices', label: 'Crop Prices' },
    { id: 'soil', label: 'Soil Analysis' },
    { id: 'tasks', label: 'Task Manager' },
    { id: 'climate', label: 'Climate Tools' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">AgriSense</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  currentPage === item.id
                    ? 'text-green-600 bg-green-50 rounded-md'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Globe className="w-4 h-4" />
              <span>EN English</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>Farmer123</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;