import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 w-full max-w-lg mx-auto ${className}`}>
      {title && (
        <h2 className="text-2xl font-bold text-center text-indigo-900 mb-6">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};
