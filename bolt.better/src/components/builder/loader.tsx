import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg bg-gray-900 border border-gray-700 shadow-lg">
        <div className="flex items-center mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="font-mono text-sm text-gray-300">
          <p className="mb-2">$ initiating Bolt.better</p>
          <p className="mb-2">$ loading components...</p>
          <p className="mb-2">$ optimizing performance...</p>
          <p className="flex items-center">
            $ launching
            <span className="ml-1 inline-block w-2 h-4 bg-gray-300 animate-pulse"></span>
          </p>
        </div>
        <div className="mt-4 flex justify-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;