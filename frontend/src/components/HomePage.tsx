import React from 'react';
import { ArrowRight, Leaf, Camera, TrendingUp, Droplets, Cloud, Users, Award, Zap } from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: 'AI Disease Detection',
      description: 'Instant plant disease identification using advanced computer vision',
      color: 'from-green-400 to-green-600',
      delay: '0s'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Price Forecasting',
      description: 'Real-time crop prices and AI-powered market predictions',
      color: 'from-blue-400 to-blue-600',
      delay: '0.2s'
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: 'Soil Analysis',
      description: 'Comprehensive soil health monitoring and fertilizer recommendations',
      color: 'from-amber-400 to-amber-600',
      delay: '0.4s'
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: 'Climate Tools',
      description: 'Weather insights and climate data for optimal farming decisions',
      color: 'from-purple-400 to-purple-600',
      delay: '0.6s'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Farmers', icon: <Users className="w-6 h-6" /> },
    { number: '95%', label: 'Accuracy', icon: <Award className="w-6 h-6" /> },
    { number: '50+', label: 'Crops', icon: <Leaf className="w-6 h-6" /> },
    { number: '24/7', label: 'Support', icon: <Zap className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-amber-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating 3D Elements */}
        <div className="absolute top-20 left-10 animate-float-3d">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-2xl transform rotate-12 hover:rotate-45 transition-transform duration-700 flex items-center justify-center">
            <Leaf className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <div className="absolute top-32 right-16 animate-float-3d-delayed">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-2xl transform -rotate-12 hover:rotate-12 transition-transform duration-700 flex items-center justify-center">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
        </div>

        <div className="absolute bottom-32 left-20 animate-bounce-3d">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-xl transform hover:scale-125 transition-transform duration-500 flex items-center justify-center">
            <Droplets className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="absolute top-1/2 right-8 animate-pulse-3d">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl shadow-xl transform rotate-45 hover:rotate-90 transition-transform duration-700 flex items-center justify-center">
            <Cloud className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Geometric Shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-green-200 to-green-300 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full blur-3xl opacity-30 animate-pulse-slow-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full blur-2xl opacity-40 animate-float-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Animated Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg mb-8 animate-slide-down hover:shadow-xl transition-shadow duration-300">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <Leaf className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-gray-700">AI-Powered Plant Disease Detection</span>
          </div>

          {/* Main Heading with 3D Effect */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight animate-slide-up">
            Protect Your Crops with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-green-600 to-green-700 animate-gradient-shift">
              AI Intelligence
            </span>
          </h1>

          {/* Enhanced Description */}
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in-delayed">
            GreenLens combines computer vision, LLMs, and weather data to deliver instant
            plant disease detection, precise analysis, and actionable remedies for sustainable
            agriculture.
          </p>

          {/* 3D Interactive CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <button
              onClick={() => onPageChange('detect')}
              className="group relative inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-slide-up-delayed shadow-lg"
            >
              <span>Start Detection</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
            </button>
            
            <button
              onClick={() => onPageChange('about')}
              className="group relative inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm hover:bg-white text-green-600 px-8 py-4 rounded-2xl font-semibold border-2 border-green-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-slide-up-more-delayed"
            >
              <span>Learn More</span>
              <div className="absolute inset-0 bg-green-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </button>
          </div>

          {/* Interactive Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-slide-up cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform duration-300">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1 group-hover:text-green-600 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Interactive Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 cursor-pointer animate-slide-up overflow-hidden"
                style={{ animationDelay: feature.delay }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}>
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-200 rounded-3xl transition-colors duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for 3D Animations */}
      <style>{`
        @keyframes float-3d {
          0%, 100% { 
            transform: translateY(0px) rotateX(0deg) rotateY(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotateX(10deg) rotateY(5deg); 
          }
        }
        
        @keyframes float-3d-delayed {
          0%, 100% { 
            transform: translateY(0px) rotateX(0deg) rotateY(0deg); 
          }
          50% { 
            transform: translateY(-25px) rotateX(-10deg) rotateY(-5deg); 
          }
        }
        
        @keyframes bounce-3d {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
          }
          50% { 
            transform: translateY(-15px) scale(1.1); 
          }
        }
        
        @keyframes pulse-3d {
          0%, 100% { 
            transform: scale(1) rotateZ(0deg); 
            box-shadow: 0 0 20px rgba(139, 69, 19, 0.3);
          }
          50% { 
            transform: scale(1.1) rotateZ(180deg); 
            box-shadow: 0 0 30px rgba(139, 69, 19, 0.5);
          }
        }
        
        @keyframes slide-down {
          from { 
            opacity: 0; 
            transform: translateY(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fade-in-delayed {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        
        @keyframes pulse-slow-delayed {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float-3d {
          animation: float-3d 4s ease-in-out infinite;
        }
        
        .animate-float-3d-delayed {
          animation: float-3d-delayed 5s ease-in-out infinite;
        }
        
        .animate-bounce-3d {
          animation: bounce-3d 3s ease-in-out infinite;
        }
        
        .animate-pulse-3d {
          animation: pulse-3d 4s ease-in-out infinite;
        }
        
        .animate-slide-down {
          animation: slide-down 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-slide-up-delayed {
          animation: slide-up 0.8s ease-out 0.2s both;
        }
        
        .animate-slide-up-more-delayed {
          animation: slide-up 0.8s ease-out 0.4s both;
        }
        
        .animate-fade-in-delayed {
          animation: fade-in-delayed 1s ease-out 0.6s both;
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slow-delayed {
          animation: pulse-slow-delayed 5s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;