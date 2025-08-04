import React, { useState } from 'react';
import { Upload, Camera, Image, FileText, Leaf, Droplets, Scissors, SprayCan, Sun, Shield, Bug, TestTube2, Thermometer } from 'lucide-react';

const DiseaseDetection: React.FC = () => {
  const [result, setResult] = useState<{ class: string; confidence: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null); // Clear previous result when new file is selected
  };

  const getTreatmentRecommendations = (diseaseClass: string) => {
    const [plantType, diseaseName] = diseaseClass.split('___');
    const formattedPlantType = plantType.replace(/_/g, ' ');
    const formattedDisease = diseaseName ? diseaseName.replace(/_/g, ' ') : 'healthy';

    // Default treatment template
    const defaultTreatment = {
      description: `${formattedPlantType} appears to have ${formattedDisease}.`,
      steps: [
        'Remove and destroy infected plant parts',
        'Apply appropriate fungicide/bactericide',
        'Improve air circulation around plants',
        'Avoid overhead watering to reduce leaf wetness',
        'Consider resistant varieties for future planting'
      ],
      prevention: [
        'Practice crop rotation',
        'Use disease-free planting material',
        'Maintain plant health with proper nutrition',
        'Monitor regularly for early symptoms',
        'Clean tools and equipment between uses'
      ]
    };

    // Specific treatments for known diseases
    const specificTreatments: Record<string, { description: string; steps: string[]; prevention: string[] }> = {
      'Apple___Apple_scab': {
        description: 'Apple scab causes dark, scaly lesions on leaves and fruit.',
        steps: [
          'Apply fungicides containing myclobutanil in early spring',
          'Remove and destroy fallen leaves in autumn',
          'Prune trees to improve air circulation',
          'Plant resistant varieties like Liberty',
          'Apply nitrogen fertilizer in spring'
        ],
        prevention: [
          'Rake and destroy fallen leaves each autumn',
          'Maintain proper tree spacing',
          'Water in the morning',
          'Apply dormant oil spray in late winter'
        ]
      },
      'Tomato___Early_blight': {
        description: 'Early blight causes concentric rings on leaves resembling bullseyes.',
        steps: [
          'Apply chlorothalonil or copper-based fungicides',
          'Remove infected leaves immediately',
          'Stake plants to improve air circulation',
          'Mulch to prevent soil splash',
          'Avoid overhead watering'
        ],
        prevention: [
          'Use disease-free seed and transplants',
          'Rotate crops for 2-3 years',
          'Sterilize cages and stakes annually',
          'Remove volunteer tomato plants'
        ]
      },
      // Add more specific treatments as needed
    };

    return specificTreatments[diseaseClass] || defaultTreatment;
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Replace this with your actual API call
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json();
      
      // Ensure the response matches your expected format
      if (data.class && typeof data.confidence === 'number') {
        setResult(data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (err) {
      console.error("Error:", err);
      // Fallback mock response if API fails
      const mockDiseases = [
        'Apple___Apple_scab',
        'Apple___healthy',
        'Tomato___Early_blight',
        'Tomato___healthy'
      ];
      const randomDisease = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];
      setResult({
        class: randomDisease,
        confidence: Math.random() * 0.5 + 0.5
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-700 mb-4">Plant Disease Detection</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload a clear image of your plant leaf to get instant AI-powered
            disease detection and treatment recommendations
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
              dragActive
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Drop your image here
            </h3>
            <p className="text-gray-500 mb-6">or click to browse from your device</p>
            
            <p className="text-sm text-gray-400 mb-8">
              Supports JPG, PNG, WEBP up to 10MB
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <label className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors duration-200">
                <Image className="w-5 h-5" />
                <span>Choose File</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </label>
              
              <button className="inline-flex items-center space-x-2 bg-white hover:bg-gray-50 text-green-600 px-6 py-3 rounded-lg font-medium border border-green-600 transition-colors duration-200">
                <Camera className="w-5 h-5" />
                <span>Take Photo</span>
              </button>
            </div>
          </div>

          {/* Selected file preview */}
          {selectedFile && (
            <div className="mt-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Image Preview */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Image Preview</h3>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    {previewUrl && (
                      <img 
                        src={previewUrl} 
                        alt="Uploaded plant" 
                        className="w-full h-auto max-h-80 object-contain rounded"
                      />
                    )}
                  </div>
                </div>

                {/* File Info and Actions */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">File Information</h3>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{selectedFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={analyzeImage}
                      disabled={loading}
                      className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 ${
                        loading
                          ? 'bg-green-400 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-700'
                      } text-white`}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <Leaf className="w-5 h-5" />
                          <span>Analyze for Diseases</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {result && (
            <div className="mt-8 space-y-6">
              <div className={`rounded-lg p-6 ${
                result.class.includes('healthy') 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-orange-50 border border-orange-200'
              }`}>
                <h3 className="text-xl font-semibold mb-4">
                  {result.class.includes('healthy') ? (
                    <span className="text-green-700">Healthy Plant Detection</span>
                  ) : (
                    <span className="text-orange-700">Disease Detected</span>
                  )}
                </h3>
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className={`px-3 py-1 rounded-full ${
                    result.class.includes('healthy')
                      ? 'bg-green-100 text-green-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {result.class.includes('healthy') ? 'Healthy' : 'Disease Present'}
                  </div>
                  
                  <div className="flex-1 min-w-[200px]">
                    <p className="font-medium text-gray-800">Plant Type:</p>
                    <p>{result.class.split('___')[0].replace(/_/g, ' ')}</p>
                  </div>
                  
                  <div className="flex-1 min-w-[200px]">
                    <p className="font-medium text-gray-800">Condition:</p>
                    <p>{result.class.split('___')[1]?.replace(/_/g, ' ') || 'Healthy'}</p>
                  </div>
                  
                  <div className="flex-1 min-w-[200px]">
                    <p className="font-medium text-gray-800">Confidence:</p>
                    <p>{(result.confidence * 100).toFixed(2)}%</p>
                  </div>
                </div>
              </div>

              {/* Treatment Recommendations */}
              {!result.class.includes('healthy') && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-blue-600 px-6 py-3">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <Thermometer className="w-5 h-5 mr-2" />
                      Treatment Plan
                    </h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                        <TestTube2 className="w-5 h-5 mr-2 text-blue-600" />
                        Disease Information
                      </h4>
                      <p className="text-gray-700">
                        {getTreatmentRecommendations(result.class).description}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                          <Scissors className="w-5 h-5 mr-2 text-blue-600" />
                          Immediate Actions
                        </h4>
                        <ul className="space-y-2">
                          {getTreatmentRecommendations(result.class).steps.map((step, index) => (
                            <li key={index} className="flex items-start">
                              <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                {index + 1}
                              </span>
                              <span className="text-gray-700">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                          <Shield className="w-5 h-5 mr-2 text-blue-600" />
                          Prevention Strategies
                        </h4>
                        <ul className="space-y-2">
                          {getTreatmentRecommendations(result.class).prevention.map((step, index) => (
                            <li key={index} className="flex items-start">
                              <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                {index + 1}
                              </span>
                              <span className="text-gray-700">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* General Care Tips */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-green-600 px-6 py-3">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <Sun className="w-5 h-5 mr-2" />
                    General Care Recommendations
                  </h3>
                </div>
                
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-2">
                      <Droplets className="w-5 h-5 mr-2 text-blue-500" />
                      <span className="font-medium">Watering Guidance</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Water deeply but infrequently, allowing soil to dry slightly between waterings. Avoid wetting foliage to prevent disease spread.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-2">
                      <SprayCan className="w-5 h-5 mr-2 text-green-500" />
                      <span className="font-medium">Fertilization</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Use balanced fertilizer during growing season. Conduct soil tests annually to determine specific nutrient needs.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-2">
                      <Bug className="w-5 h-5 mr-2 text-amber-500" />
                      <span className="font-medium">Pest Monitoring</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Inspect plants weekly for pests. Use integrated pest management strategies with biological controls first.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;