import React from 'react';
import { Leaf, Users, Award, Target, Brain, Globe } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-green-600" />,
      title: 'AI-Powered Detection',
      description: 'Advanced computer vision and machine learning algorithms for accurate plant disease identification'
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-600" />,
      title: 'Weather Integration',
      description: 'Real-time weather data and climate insights to optimize farming decisions'
    },
    {
      icon: <Target className="w-8 h-8 text-purple-600" />,
      title: 'Precision Agriculture',
      description: 'Data-driven recommendations for fertilizers, irrigation, and crop management'
    },
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: 'Community Support',
      description: 'Connect with agricultural experts and fellow farmers for knowledge sharing'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Farmers Served' },
    { number: '95%', label: 'Detection Accuracy' },
    { number: '50+', label: 'Crop Varieties' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 bg-white rounded-full px-6 py-3 shadow-sm mb-8">
            <Leaf className="w-6 h-6 text-green-500" />
            <span className="font-semibold text-gray-800">About GreenLens</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Revolutionizing Agriculture with
            <span className="text-green-600"> AI Technology</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            GreenLens is a comprehensive agricultural platform that empowers farmers with 
            cutting-edge AI technology, real-time data insights, and expert knowledge to 
            maximize crop yields and promote sustainable farming practices.
          </p>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose GreenLens?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-xl p-8 text-white">
          <div className="text-center">
            <Award className="w-16 h-16 mx-auto mb-6 text-green-200" />
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed max-w-3xl mx-auto">
              To democratize access to advanced agricultural technology and empower farmers 
              worldwide with the tools they need to feed the growing global population while 
              protecting our planet's precious resources.
            </p>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Powered by Advanced Technology
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">Computer Vision</div>
              <div className="text-gray-600">Advanced image recognition for disease detection</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">Machine Learning</div>
              <div className="text-gray-600">Predictive models for crop yield optimization</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">IoT Integration</div>
              <div className="text-gray-600">Real-time sensor data and monitoring</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">Weather APIs</div>
              <div className="text-gray-600">Accurate weather forecasting and alerts</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">Data Analytics</div>
              <div className="text-gray-600">Comprehensive insights and recommendations</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-2xl font-bold text-indigo-600 mb-2">Cloud Computing</div>
              <div className="text-gray-600">Scalable and reliable infrastructure</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;