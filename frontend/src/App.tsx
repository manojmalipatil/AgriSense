import React, { useState } from 'react';
import { useEffect } from 'react';
import { supabase } from './lib/supabase';
import AuthPage from './components/AuthPage';
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
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSuccess = () => {
    // This will be handled by the auth state change listener
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-green-700 font-medium">Loading GreenLens...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

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
      <Header currentPage={currentPage} onPageChange={setCurrentPage} user={user} />
      <main className="relative z-10">
        {renderCurrentPage()}
      </main>
      <KrishiMitra />
    </div>
  );
}

export default App;