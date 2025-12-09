import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  return (
    <div className="flex gap-2 mb-8 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <div 
          key={i}
          className={`h-3 rounded-full transition-all duration-500 ease-out ${
            i < current 
              ? 'w-6 bg-gradient-to-r from-pink-400 to-indigo-400 shadow-sm' 
              : i === current 
                ? 'w-8 bg-indigo-200 animate-pulse' 
                : 'w-3 bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
};
