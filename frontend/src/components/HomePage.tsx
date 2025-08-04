import React from 'react';
import { ArrowRight, Leaf } from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm mb-8">
            <Leaf className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-gray-700">AI-Powered Plant Disease Detection</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Protect Your Crops with{' '}
            <span className="text-green-600">AI Intelligence</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
            GreenLens combines computer vision, LLMs, and weather data to deliver instant
            plant disease detection, precise analysis, and actionable remedies for sustainable
            agriculture.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => onPageChange('detect')}
              className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Start Detection</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onPageChange('about')}
              className="inline-flex items-center space-x-2 bg-white hover:bg-gray-50 text-green-600 px-8 py-4 rounded-lg font-semibold border-2 border-green-600 transition-all duration-200 transform hover:scale-105"
            >
              <span>Learn More</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;