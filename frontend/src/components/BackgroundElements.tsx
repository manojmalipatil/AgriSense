import React from 'react';
import { Flower, Leaf, Flower2, TreePine, Cherry } from 'lucide-react';

const BackgroundElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Top left area */}
      <TreePine className="absolute top-20 left-8 w-8 h-8 text-green-400 opacity-40" />
      <Flower className="absolute top-32 left-24 w-6 h-6 text-pink-400 opacity-50" />
      <Leaf className="absolute top-16 left-40 w-5 h-5 text-green-300 opacity-40" />
      
      {/* Top right area */}
      <Leaf className="absolute top-24 right-12 w-6 h-6 text-green-400 opacity-40" />
      <Cherry className="absolute top-40 right-32 w-7 h-7 text-red-400 opacity-50" />
      <Flower2 className="absolute top-12 right-48 w-5 h-5 text-purple-400 opacity-50" />
      
      {/* Middle area */}
      <Flower className="absolute top-1/2 left-16 w-7 h-7 text-pink-500 opacity-40" />
      <Leaf className="absolute top-1/2 right-20 w-6 h-6 text-green-500 opacity-40" />
      <TreePine className="absolute top-1/3 right-16 w-6 h-6 text-green-400 opacity-30" />
      
      {/* Bottom area */}
      <Flower2 className="absolute bottom-32 left-20 w-8 h-8 text-purple-500 opacity-50" />
      <Leaf className="absolute bottom-24 left-48 w-5 h-5 text-green-400 opacity-40" />
      <Cherry className="absolute bottom-40 right-24 w-6 h-6 text-red-400 opacity-40" />
      <Flower className="absolute bottom-20 right-40 w-7 h-7 text-pink-400 opacity-50" />
      <Leaf className="absolute bottom-16 right-64 w-4 h-4 text-green-300 opacity-40" />
      
      {/* Additional scattered elements */}
      <Leaf className="absolute top-72 left-1/3 w-4 h-4 text-green-400 opacity-30" />
      <Flower className="absolute top-96 right-1/3 w-5 h-5 text-pink-400 opacity-40" />
      <TreePine className="absolute bottom-48 left-1/2 w-6 h-6 text-green-500 opacity-30" />
    </div>
  );
};

export default BackgroundElements;