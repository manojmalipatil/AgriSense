import React from 'react';
import { Cloud, Thermometer, Droplets, Wind, Sun, CloudRain } from 'lucide-react';

const ClimateTools: React.FC = () => {
  const weatherData = {
    current: {
      temperature: 28,
      humidity: 65,
      rainfall: 0,
      windSpeed: 12,
      uvIndex: 6,
      condition: 'Partly Cloudy'
    },
    forecast: [
      { day: 'Today', high: 32, low: 24, rain: 10, icon: 'partly-cloudy' },
      { day: 'Tomorrow', high: 30, low: 22, rain: 40, icon: 'cloudy' },
      { day: 'Wed', high: 28, low: 20, rain: 80, icon: 'rainy' },
      { day: 'Thu', high: 31, low: 23, rain: 20, icon: 'sunny' },
      { day: 'Fri', high: 33, low: 25, rain: 0, icon: 'sunny' },
    ]
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'partly-cloudy': return <Cloud className="w-8 h-8 text-gray-400" />;
      default: return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-700 mb-4">Climate Tools</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Weather monitoring and climate insights for optimal farming decisions
          </p>
        </div>

        <div className="space-y-8">
          {/* Current Weather */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Current Weather</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <Thermometer className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-blue-600 mb-1">{weatherData.current.temperature}°C</div>
                <div className="text-sm text-blue-700">Temperature</div>
              </div>

              <div className="bg-green-50 rounded-lg p-6 text-center">
                <Droplets className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-green-600 mb-1">{weatherData.current.humidity}%</div>
                <div className="text-sm text-green-700">Humidity</div>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <Wind className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-purple-600 mb-1">{weatherData.current.windSpeed} km/h</div>
                <div className="text-sm text-purple-700">Wind Speed</div>
              </div>

              <div className="bg-orange-50 rounded-lg p-6 text-center">
                <Sun className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-orange-600 mb-1">{weatherData.current.uvIndex}</div>
                <div className="text-sm text-orange-700">UV Index</div>
              </div>
            </div>
          </div>

          {/* 5-Day Forecast */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">5-Day Forecast</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-200">
                  <div className="font-medium text-gray-800 mb-3">{day.day}</div>
                  <div className="mb-4">
                    {getWeatherIcon(day.icon)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">High</span>
                      <span className="font-semibold text-gray-800">{day.high}°C</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Low</span>
                      <span className="font-semibold text-gray-800">{day.low}°C</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rain</span>
                      <span className="font-semibold text-blue-600">{day.rain}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agricultural Insights */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Agricultural Insights</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 mb-3">Planting Recommendations</h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Optimal conditions for wheat planting this week</li>
                  <li>• Consider delayed planting for tomatoes due to expected rain</li>
                  <li>• Good weather window for corn planting in 3-4 days</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-3">Irrigation Advisory</h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• Reduce irrigation by 30% due to expected rainfall</li>
                  <li>• Maintain current schedule for greenhouse crops</li>
                  <li>• Check drainage systems before heavy rain on Wednesday</li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-800 mb-3">Pest & Disease Alert</h3>
                <ul className="space-y-2 text-sm text-yellow-700">
                  <li>• High humidity may increase fungal disease risk</li>
                  <li>• Monitor crops for early blight symptoms</li>
                  <li>• Apply preventive fungicide before rain period</li>
                </ul>
              </div>

              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="font-semibold text-orange-800 mb-3">Field Operations</h3>
                <ul className="space-y-2 text-sm text-orange-700">
                  <li>• Ideal conditions for harvesting today and tomorrow</li>
                  <li>• Delay spraying operations until Thursday</li>
                  <li>• Complete fertilizer application before rain</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateTools;