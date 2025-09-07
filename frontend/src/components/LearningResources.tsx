import React, { useState } from 'react';
import { Play, BookOpen, FileText, Mail, Search, Filter, ExternalLink, Clock, User, Star, Download } from 'lucide-react';

const LearningResources: React.FC = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [searchQuery, setSearchQuery] = useState('');

  const videos = [
    {
      id: 1,
      title: 'Modern Wheat Farming Techniques',
      channel: 'AgriTech India',
      duration: '12:45',
      views: '2.3M',
      thumbnail: 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Learn advanced wheat cultivation methods for maximum yield',
      category: 'Crop Management'
    },
    {
      id: 2,
      title: 'Organic Pest Control Solutions',
      channel: 'Green Farming',
      duration: '18:32',
      views: '1.8M',
      thumbnail: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Natural methods to protect your crops from pests',
      category: 'Pest Control'
    },
    {
      id: 3,
      title: 'Smart Irrigation Systems',
      channel: 'FarmTech Solutions',
      duration: '15:20',
      views: '3.1M',
      thumbnail: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Automated irrigation for water-efficient farming',
      category: 'Technology'
    },
    {
      id: 4,
      title: 'Soil Health Management',
      channel: 'Sustainable Agriculture',
      duration: '22:15',
      views: '1.5M',
      thumbnail: 'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Complete guide to maintaining healthy soil',
      category: 'Soil Management'
    },
    {
      id: 5,
      title: 'Climate-Smart Farming',
      channel: 'Future Farming',
      duration: '25:40',
      views: '2.7M',
      thumbnail: 'https://images.pexels.com/photos/1595105/pexels-photo-1595105.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Adapting farming practices to climate change',
      category: 'Climate'
    },
    {
      id: 6,
      title: 'Hydroponics for Beginners',
      channel: 'Modern Agriculture',
      duration: '19:55',
      views: '1.2M',
      thumbnail: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Start your hydroponic farming journey',
      category: 'Technology'
    }
  ];

  const books = [
    {
      id: 1,
      title: 'The Intelligent Farmer',
      author: 'Dr. Rajesh Kumar',
      rating: 4.8,
      pages: 320,
      cover: 'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'A comprehensive guide to modern farming techniques and sustainable agriculture practices.',
      category: 'General Farming',
      downloadable: true
    },
    {
      id: 2,
      title: 'Organic Farming Revolution',
      author: 'Priya Sharma',
      rating: 4.6,
      pages: 280,
      cover: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Transform your farm with organic methods and natural solutions.',
      category: 'Organic Farming',
      downloadable: false
    },
    {
      id: 3,
      title: 'Smart Agriculture Technology',
      author: 'Prof. Amit Patel',
      rating: 4.9,
      pages: 450,
      cover: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Explore IoT, AI, and automation in modern farming.',
      category: 'Technology',
      downloadable: true
    },
    {
      id: 4,
      title: 'Crop Disease Management',
      author: 'Dr. Sunita Verma',
      rating: 4.7,
      pages: 380,
      cover: 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Identify, prevent, and treat common crop diseases effectively.',
      category: 'Plant Health',
      downloadable: true
    }
  ];

  const blogs = [
    {
      id: 1,
      title: '10 Tips for Maximizing Crop Yield in 2025',
      author: 'Agricultural Expert Team',
      date: '2 days ago',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=400',
      excerpt: 'Discover proven strategies to increase your harvest and improve farm profitability this season.',
      category: 'Productivity',
      featured: true
    },
    {
      id: 2,
      title: 'Understanding Soil pH and Its Impact on Crops',
      author: 'Dr. Meera Singh',
      date: '1 week ago',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg?auto=compress&cs=tinysrgb&w=400',
      excerpt: 'Learn how soil pH affects nutrient availability and crop growth.',
      category: 'Soil Health',
      featured: false
    },
    {
      id: 3,
      title: 'Water Conservation Techniques for Farmers',
      author: 'Sustainable Farming Initiative',
      date: '3 days ago',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
      excerpt: 'Practical methods to reduce water usage while maintaining crop quality.',
      category: 'Water Management',
      featured: true
    },
    {
      id: 4,
      title: 'Market Trends: What Crops to Plant This Season',
      author: 'Market Analysis Team',
      date: '5 days ago',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=400',
      excerpt: 'Market insights and crop recommendations for optimal returns.',
      category: 'Market Insights',
      featured: false
    }
  ];

  const newsletters = [
    {
      id: 1,
      title: 'Weekly Farm Digest',
      description: 'Get the latest farming news, weather updates, and market prices delivered to your inbox every week.',
      frequency: 'Weekly',
      subscribers: '50K+',
      image: 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=300',
      topics: ['Market Prices', 'Weather Updates', 'Farming Tips']
    },
    {
      id: 2,
      title: 'Organic Farming Monthly',
      description: 'Comprehensive guide to organic farming practices, certification updates, and success stories.',
      frequency: 'Monthly',
      subscribers: '25K+',
      image: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=300',
      topics: ['Organic Methods', 'Certification', 'Case Studies']
    },
    {
      id: 3,
      title: 'AgriTech Innovation',
      description: 'Stay updated with the latest agricultural technology, innovations, and digital farming solutions.',
      frequency: 'Bi-weekly',
      subscribers: '35K+',
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300',
      topics: ['Technology', 'Innovation', 'Digital Tools']
    }
  ];

  const categories = ['All', 'Crop Management', 'Technology', 'Pest Control', 'Soil Management', 'Climate'];

  const renderVideos = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div key={video.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden group">
          <div className="relative">
            <img 
              src={video.thumbnail} 
              alt={video.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
              {video.duration}
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                {video.category}
              </span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors duration-200">
              {video.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{video.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{video.channel}</span>
              <span>{video.views} views</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderBooks = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <div key={book.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden group">
          <div className="relative">
            <img 
              src={book.cover} 
              alt={book.title}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {book.downloadable && (
              <div className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full">
                <Download className="w-4 h-4" />
              </div>
            )}
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {book.category}
              </span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-200">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">by {book.author}</p>
            <p className="text-sm text-gray-500 mb-4">{book.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{book.rating}</span>
              </div>
              <span className="text-sm text-gray-500">{book.pages} pages</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderBlogs = () => (
    <div className="space-y-6">
      {blogs.filter(blog => blog.featured).map((blog) => (
        <div key={blog.id} className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-xl p-8 text-white mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="px-3 py-1 bg-white bg-opacity-20 text-white text-sm font-medium rounded-full">
              Featured
            </span>
            <span className="px-3 py-1 bg-white bg-opacity-20 text-white text-sm font-medium rounded-full">
              {blog.category}
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">{blog.title}</h3>
              <p className="text-green-100 mb-4 text-lg">{blog.excerpt}</p>
              <div className="flex items-center space-x-4 text-green-100">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{blog.readTime}</span>
                </div>
                <span>{blog.date}</span>
              </div>
            </div>
            <div className="relative">
              <img 
                src={blog.image} 
                alt={blog.title}
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      ))}
      
      <div className="grid md:grid-cols-2 gap-6">
        {blogs.filter(blog => !blog.featured).map((blog) => (
          <div key={blog.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden group">
            <img 
              src={blog.image} 
              alt={blog.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                  {blog.category}
                </span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-200">
                {blog.title}
              </h3>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readTime}</span>
                  </div>
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNewsletters = () => (
    <div className="grid md:grid-cols-3 gap-6">
      {newsletters.map((newsletter) => (
        <div key={newsletter.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
          <img 
            src={newsletter.image} 
            alt={newsletter.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                {newsletter.frequency}
              </span>
              <span className="text-sm text-gray-500">{newsletter.subscribers} subscribers</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-3">{newsletter.title}</h3>
            <p className="text-gray-600 mb-4">{newsletter.description}</p>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Topics covered:</p>
              <div className="flex flex-wrap gap-2">
                {newsletter.topics.map((topic, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105">
              Subscribe Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const tabs = [
    { id: 'videos', label: 'Videos', icon: <Play className="w-5 h-5" />, count: videos.length },
    { id: 'books', label: 'Books', icon: <BookOpen className="w-5 h-5" />, count: books.length },
    { id: 'blogs', label: 'Blogs', icon: <FileText className="w-5 h-5" />, count: blogs.length },
    { id: 'newsletters', label: 'Newsletters', icon: <Mail className="w-5 h-5" />, count: newsletters.length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-amber-50 py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="absolute top-32 right-16 animate-float-delayed">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center">
            <Play className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="absolute bottom-32 left-20 animate-bounce-slow">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg mb-6">
            <BookOpen className="w-5 h-5 text-green-500" />
            <span className="font-semibold text-gray-800">Learning Resources</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Grow Your Knowledge, Grow Your Farm
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access comprehensive learning materials including expert videos, detailed guides, 
            insightful blogs, and regular newsletters to enhance your farming expertise
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for farming topics, techniques, or crops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200">
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl mb-8 border border-white/20">
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-green-600 border-b-2 border-green-500 bg-green-50'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'videos' && renderVideos()}
            {activeTab === 'books' && renderBooks()}
            {activeTab === 'blogs' && renderBlogs()}
            {activeTab === 'newsletters' && renderNewsletters()}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Latest Farming Knowledge</h2>
          <p className="text-xl mb-6 text-green-100">
            Join thousands of farmers who are transforming their practices with our educational resources
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105">
              Subscribe to Newsletter
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-all duration-200 transform hover:scale-105">
              Download Free Guide
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default LearningResources;