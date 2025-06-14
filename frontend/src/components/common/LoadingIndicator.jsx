import React from 'react';

const LoadingIndicator = ({ isLoading, message = 'Loading...' }) => {
  if (!isLoading) return null;
  
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <p className="mt-4 text-blue-300">{message}</p>
    </div>
  );
};

export default LoadingIndicator;