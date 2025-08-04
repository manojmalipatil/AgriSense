import React, { useState } from 'react';
import { TrendingUp, TrendingDown, MapPin, Calendar, BarChart3, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const CropPrices: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState('pearl-millet');

  const crops = [
    { id: 'pearl-millet', name: 'Pearl Millet', icon: '🌾', price: '₹1472.85', trend: 'down', change: '-77.45', changePercent: '-5.0%' },
    { id: 'sorghum', name: 'Sorghum', icon: '🌾', price: '₹2,650/qt', trend: 'down', change: '-45.20', changePercent: '-1.8%' },
    { id: 'sugarcane', name: 'Sugarcane', icon: '🎋', price: '₹340/qt', trend: 'up', change: '+12.50', changePercent: '+3.8%' },
    { id: 'pigeon-pea', name: 'Pigeon Pea', icon: '🫘', price: '₹6,200/qt', trend: 'up', change: '+150.00', changePercent: '+2.5%' },
    { id: 'green-gram', name: 'Green Gram', icon: '🫛', price: '₹7,800/qt', trend: 'down', change: '-120.00', changePercent: '-1.5%' },
    { id: 'rice', name: 'Rice', icon: '🌾', price: '₹2,100/qt', trend: 'up', change: '+85.00', changePercent: '+4.2%' },
    { id: 'finger-millet', name: 'Finger Millet', icon: '🌾', price: '₹3,200/qt', trend: 'up', change: '+95.00', changePercent: '+3.1%' },
    { id: 'black-gram', name: 'Black Gram', icon: '🫘', price: '₹6,800/qt', trend: 'down', change: '-200.00', changePercent: '-2.9%' },
    { id: 'lentil', name: 'Lentil', icon: '🫘', price: '₹5,400/qt', trend: 'up', change: '+180.00', changePercent: '+3.4%' },
    { id: 'corn', name: 'Corn', icon: '🌽', price: '₹2,050/qt', trend: 'down', change: '-35.00', changePercent: '-1.7%' },
    { id: 'jute', name: 'Jute', icon: '🌿', price: '₹4,100/qt', trend: 'up', change: '+125.00', changePercent: '+3.1%' },
    { id: 'cotton', name: 'Cotton', icon: '🌸', price: '₹6,300/qt', trend: 'up', change: '+200.00', changePercent: '+3.3%' },
    { id: 'coconut', name: 'Coconut', icon: '🥥', price: '₹28/piece', trend: 'down', change: '-2.50', changePercent: '-8.2%' },
  ];

  // Sample chart data for Pearl Millet
  const chartData = [
    { date: '7/30/25', historical: 1630, forecast: null },
    { date: '7/31/25', historical: 1620, forecast: null },
    { date: '8/1/25', historical: 1595, forecast: null },
    { date: '8/2/25', historical: 1550, forecast: null },
    { date: '8/3/25', historical: 1580, forecast: null },
    { date: '8/4/25', historical: 1610, forecast: null },
    { date: '8/5/25', historical: 1590, forecast: null },
    { date: '8/6/25', historical: 1565, forecast: null },
    { date: '8/7/25', historical: 1540, forecast: null },
    { date: '8/8/25', historical: 1520, forecast: null },
    { date: '8/9/25', historical: 1495, forecast: null },
    { date: '8/10/25', historical: 1480, forecast: null },
    { date: '8/11/25', historical: 1472, forecast: null },
    { date: '8/12/25', historical: null, forecast: 1485 },
    { date: '8/13/25', historical: null, forecast: 1495 },
    { date: '8/14/25', historical: null, forecast: 1510 },
    { date: '8/15/25', historical: null, forecast: 1525 },
    { date: '8/16/25', historical: null, forecast: 1540 },
    { date: '8/17/25', historical: null, forecast: 1555 },
    { date: '8/18/25', historical: null, forecast: 1570 },
    { date: '8/19/25', historical: null, forecast: 1585 },
    { date: '8/20/25', historical: null, forecast: 1600 },
  ];

  const forecastData = [
    { date: '8/3/2025', price: '₹1600.19', confidence: 98, trend: 'up' },
    { date: '8/4/2025', price: '₹1599.57', confidence: 92, trend: 'down' },
    { date: '8/5/2025', price: '₹1524.62', confidence: 89, trend: 'down' },
    { date: '8/6/2025', price: '₹1551.93', confidence: 84, trend: 'up' },
    { date: '8/7/2025', price: '₹1687.08', confidence: 79, trend: 'up' },
    { date: '8/8/2025', price: '₹1685.48', confidence: 86, trend: 'down' },
    { date: '8/9/2025', price: '₹1664.88', confidence: 74, trend: 'down' },
    { date: '8/10/2025', price: '₹1658.66', confidence: 82, trend: 'down' },
  ];

  const selectedCropData = crops.find(c => c.id === selectedCrop);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-700 mb-4">Crop Price Prediction</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real-time market prices and AI-powered forecasts for major crops across India
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {/* Crop Selection */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">🌾</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Select Crop</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {crops.map((crop) => (
                <button
                  key={crop.id}
                  onClick={() => setSelectedCrop(crop.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    selectedCrop === crop.id
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{crop.icon}</div>
                  <div className="text-sm font-medium text-gray-800">{crop.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Price Chart and Current Price */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Price Trend & Forecast Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Price Trend & Forecast</h3>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-700 text-center mb-4">
                {selectedCropData?.name} Price Trend & Forecast
              </h4>
              
              <div className="flex items-center justify-center space-x-6 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-600">Historical Prices</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-dashed border-orange-400 rounded"></div>
                  <span className="text-sm text-gray-600">Price Forecast</span>
                </div>
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    domain={['dataMin - 50', 'dataMax + 50']}
                    tick={{ fontSize: 12 }}
                    label={{ value: 'Price (₹/quintal)', angle: -90, position: 'insideLeft' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="historical" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    dot={{ fill: '#22c55e', strokeWidth: 2, r: 3 }}
                    connectNulls={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="forecast" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
                    connectNulls={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Current Price */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Current Price</h3>
              
              <div className="text-center mb-6">
                <div className="text-sm text-gray-500 mb-1">$</div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {selectedCropData?.price.includes('/') ? selectedCropData.price : selectedCropData?.price + ' /quintal'}
                </div>
                <div className={`flex items-center justify-center space-x-1 ${
                  selectedCropData?.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedCropData?.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="font-medium">{selectedCropData?.change} ({selectedCropData?.changePercent})</span>
                </div>
              </div>
            </div>

            {/* Market Information */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Market Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">APMC Market, Delhi</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">Last Updated: 8/2/2025</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">Volume: 455 quintals</span>
                </div>
              </div>
            </div>

            {/* Price Alerts */}
            <div className="bg-yellow-50 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-4">Price Alerts</h3>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-sm text-gray-700">Monsoon may affect prices in 2 weeks</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 30-Day Price Forecast */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">30-Day Price Forecast</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Predicted Price</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Confidence</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Trend</th>
                </tr>
              </thead>
              <tbody>
                {forecastData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-800">{item.date}</td>
                    <td className="py-3 px-4 font-semibold text-gray-800">{item.price}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${item.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{item.confidence}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {item.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropPrices;