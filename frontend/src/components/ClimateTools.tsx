import React, { useEffect, useState } from 'react';
import { Cloud, Droplets, Wind, Sun, Gauge, CloudRain } from 'lucide-react';
import { motion } from 'framer-motion';

const ClimateTools: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);

  const API_KEY = '9c2ff263d092440a838181646251008'; 
  const REFRESH_INTERVAL = 30 * 60 * 1000; // 30 min

  const fetchWeather = async (query: string) => {
    try {
      setLoading(true);
      const forecastRes = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=7&aqi=no&alerts=no`
      );
      const data = await forecastRes.json();
      setCurrentWeather(data.current);
      setForecast(data.forecast.forecastday);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getLocationAndFetch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          fetchWeather(`${lat},${lon}`);
        },
        () => {
          setLocationError('Using default location (New Delhi)');
          fetchWeather('New Delhi');
        }
      );
    } else {
      setLocationError('Geolocation not supported. Using default location (New Delhi)');
      fetchWeather('New Delhi');
    }
  };

  useEffect(() => {
    getLocationAndFetch();
    const interval = setInterval(getLocationAndFetch, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const getIcon = (condition: string) => {
    if (condition.toLowerCase().includes('rain'))
      return <CloudRain className="w-8 h-8 text-blue-500" />;
    if (condition.toLowerCase().includes('cloud'))
      return <Cloud className="w-8 h-8 text-gray-400" />;
    return <Sun className="w-8 h-8 text-yellow-500" />;
  };

  const generateCropInsights = () => {
    if (!currentWeather) return [];
    const temp = currentWeather.temp_c;
    const humidity = currentWeather.humidity;
    const rain = forecast[0]?.day?.totalprecip_mm || 0;

    const insights: string[] = [];
    if (temp > 30) insights.push('Irrigate crops early morning to avoid heat stress.');
    if (humidity > 80) insights.push('Watch out for fungal diseases in crops.');
    if (rain > 10) insights.push('Avoid overwatering; rainfall is already high.');

    return insights.length
      ? insights
      : ['Conditions are stable for most crops today.'];
  };

  const seasonalCalendar = [
    { month: 'August', activity: 'Sowing of paddy, maize, pulses' },
    { month: 'September', activity: 'Weeding and pest control for kharif crops' },
    { month: 'October', activity: 'Harvesting of early paddy, maize' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading weather data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {locationError && (
          <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg text-sm">
            {locationError}
          </div>
        )}

        {/* Current Weather */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
        >
          <h2 className="text-xl font-semibold mb-4">Current Weather</h2>
          <div className="flex items-center gap-6">
            {getIcon(currentWeather.condition.text)}
            <div>
              <div className="text-4xl font-bold">{currentWeather.temp_c}°C</div>
              <div className="text-gray-500">{currentWeather.condition.text}</div>
              <div className="text-sm text-gray-400">
                {forecast[0].date}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Droplets className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <div className="font-bold">{currentWeather.humidity}%</div>
              <div className="text-xs text-gray-500">Humidity</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <Wind className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <div className="font-bold">{currentWeather.wind_kph} km/h</div>
              <div className="text-xs text-gray-500">Wind</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <Gauge className="w-6 h-6 text-purple-600 mx-auto mb-1" />
              <div className="font-bold">{currentWeather.pressure_mb} mb</div>
              <div className="text-xs text-gray-500">Pressure</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <Sun className="w-6 h-6 text-orange-600 mx-auto mb-1" />
              <div className="font-bold">{currentWeather.uv}</div>
              <div className="text-xs text-gray-500">UV Index</div>
            </div>
          </div>
        </motion.div>

        {/* Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4">7-Day Forecast</h2>
          <div className="space-y-3">
            {forecast.map((day, idx) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                key={idx}
                className="flex justify-between items-center bg-green-50 p-3 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {getIcon(day.day.condition.text)}
                  <div>
                    <div className="font-medium">
                      {new Date(day.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="text-xs text-gray-500">
                      {day.day.condition.text}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  <div>
                    {day.day.maxtemp_c}° / {day.day.mintemp_c}°
                  </div>
                  <div>{day.day.avghumidity}%</div>
                  <div>{day.day.totalprecip_mm}mm</div>
                  <div>{day.day.maxwind_kph} km/h</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Crop Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Weather-Based Crop Insights</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {generateCropInsights().map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </motion.div>

        {/* Seasonal Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Seasonal Agricultural Calendar</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {seasonalCalendar.map((item, idx) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                key={idx}
                className="bg-green-50 rounded-lg p-4 text-center"
              >
                <div className="text-lg font-bold">{item.month}</div>
                <div className="text-sm text-gray-600">{item.activity}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClimateTools;
