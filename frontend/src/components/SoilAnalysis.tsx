import React, { useState } from 'react';
import { Droplets, Zap, Sprout } from 'lucide-react';

const SoilAnalysis: React.FC = () => {
  const [nitrogen, setNitrogen] = useState(45);
  const [phosphorus, setPhosphorus] = useState(23);
  const [potassium, setPotassium] = useState(67);

  const getParameterStatus = (value: number, min: number, optimal: number, max: number) => {
    if (value < min) return { status: 'Low', color: 'text-red-600', bgColor: 'bg-red-100' };
    if (value > max) return { status: 'High', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    if (value >= optimal - 5 && value <= optimal + 5) return { status: 'Optimal', color: 'text-green-600', bgColor: 'bg-green-100' };
    return { status: 'Moderate', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
  };

  const nitrogenStatus = getParameterStatus(nitrogen, 40, 60, 80);
  const phosphorusStatus = getParameterStatus(phosphorus, 20, 35, 50);
  const potassiumStatus = getParameterStatus(potassium, 50, 75, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-700 mb-4">Soil Analysis & Fertilizer Recommendation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Analyze your soil composition and get AI-powered fertilizer recommendations for optimal crop growth
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Soil Parameters */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Soil Parameters</h2>
            </div>

            <div className="space-y-8">
              {/* Nitrogen */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Droplets className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-800">Nitrogen (N)</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${nitrogenStatus.bgColor} ${nitrogenStatus.color}`}>
                      {nitrogen}kg/ha
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${nitrogenStatus.bgColor} ${nitrogenStatus.color}`}>
                      {nitrogenStatus.status}
                    </span>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500"
                      style={{ width: `${(nitrogen / 80) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>40kg/ha</span>
                    <span className="font-medium">Optimal</span>
                    <span>80kg/ha</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="90"
                    value={nitrogen}
                    onChange={(e) => setNitrogen(Number(e.target.value))}
                    className="absolute top-0 w-full h-3 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Phosphorus */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-gray-800">Phosphorus (P)</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${phosphorusStatus.bgColor} ${phosphorusStatus.color}`}>
                      {phosphorus}kg/ha
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${phosphorusStatus.bgColor} ${phosphorusStatus.color}`}>
                      {phosphorusStatus.status}
                    </span>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500"
                      style={{ width: `${(phosphorus / 50) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>20kg/ha</span>
                    <span className="font-medium">Optimal</span>
                    <span>50kg/ha</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="60"
                    value={phosphorus}
                    onChange={(e) => setPhosphorus(Number(e.target.value))}
                    className="absolute top-0 w-full h-3 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Potassium */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Sprout className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-gray-800">Potassium (K)</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${potassiumStatus.bgColor} ${potassiumStatus.color}`}>
                      {potassium}kg/ha
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${potassiumStatus.bgColor} ${potassiumStatus.color}`}>
                      {potassiumStatus.status}
                    </span>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500"
                      style={{ width: `${(potassium / 100) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>50kg/ha</span>
                    <span className="font-medium">Optimal</span>
                    <span>100kg/ha</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="120"
                    value={potassium}
                    onChange={(e) => setPotassium(Number(e.target.value))}
                    className="absolute top-0 w-full h-3 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Fertilizer Recommendations</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Urea (N)</span>
                  <span className="font-semibold">
                    {nitrogen < 55 ? '50kg/acre' : nitrogen > 70 ? '20kg/acre' : '35kg/acre'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>DAP (P)</span>
                  <span className="font-semibold">
                    {phosphorus < 30 ? '40kg/acre' : phosphorus > 45 ? '15kg/acre' : '25kg/acre'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>MOP (K)</span>
                  <span className="font-semibold">
                    {potassium < 70 ? '35kg/acre' : potassium > 85 ? '10kg/acre' : '20kg/acre'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Soil Health Score</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {Math.round(((nitrogen + phosphorus + potassium) / 3) * 1.2)}%
                </div>
                <div className="text-blue-700 font-medium">Good Soil Health</div>
                <div className="text-sm text-blue-600 mt-2">
                  Based on current N-P-K levels
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilAnalysis;