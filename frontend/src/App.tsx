import React, { useState } from 'react';
import Header from './components/Header';
import BackgroundElements from './components/BackgroundElements';
import HomePage from './components/HomePage';
import DiseaseDetection from './components/DiseaseDetection';
import CropPrices from './components/CropPrices';
import SoilAnalysis from './components/SoilAnalysis';
import TaskManager from './components/TaskManager';
import ClimateTools from './components/ClimateTools';
import About from './components/About';
import KrishiMitra from './components/KrishiMitra';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'detect':
        return <DiseaseDetection />;
      case 'prices':
        return <CropPrices />;
      case 'soil':
        return <SoilAnalysis />;
      case 'tasks':
        return <TaskManager />;
      case 'climate':
        return <ClimateTools />;
      case 'about':
        return <About />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 relative">
      <BackgroundElements />
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="relative z-10">
        {renderCurrentPage()}
      </main>
      <KrishiMitra />
    </div>
  );
}

export default App;