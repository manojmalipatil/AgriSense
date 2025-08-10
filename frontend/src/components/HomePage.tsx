import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';
import farmerImage from './farmer.jpg'; // adjust the path if needed

interface HomePageProps {
  onPageChange: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-gray-100 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 right-16 w-96 h-96 bg-green-500 opacity-10 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-md rounded-full px-6 py-2 shadow-md mb-8 border border-white/30">
              <Leaf className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium tracking-wide text-gray-700">
                AI for Sustainable Farming
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Empowering Agriculture with{' '}
              <span className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-500 bg-clip-text text-transparent">
                AI Innovation
              </span>
            </h1>

            <p className="text-lg text-gray-600 max-w-xl mb-8">
              Our platform combines AI, IoT, and climate intelligence to deliver actionable insights, 
              ensuring healthier crops, higher yields, and a sustainable future.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => onPageChange('detect')}
                className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg hover:shadow-green-500/30 hover:scale-105 transform transition-all duration-300 flex items-center gap-2"
              >
                Start Detection
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => onPageChange('about')}
                className="px-8 py-4 rounded-xl font-semibold bg-white text-green-700 border border-green-500 hover:bg-green-50 hover:scale-105 transform transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </motion.div>

          {/* Right: Farmer Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent rounded-3xl"></div>
            <img
              src={farmerImage}
              alt="Indian Farmer"
              className="rounded-3xl shadow-2xl object-cover w-full h-[500px]"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
