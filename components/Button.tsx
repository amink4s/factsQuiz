import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'option' | 'correct' | 'incorrect';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative font-bold py-3 px-6 rounded-2xl transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-indigo-500 text-white shadow-[0_6px_0_rgb(67,56,202)] hover:shadow-[0_4px_0_rgb(67,56,202)] hover:translate-y-[2px] active:shadow-none active:translate-y-[6px] focus:ring-indigo-300",
    secondary: "bg-white text-indigo-500 border-2 border-indigo-100 shadow-sm hover:bg-indigo-50 focus:ring-indigo-200",
    option: "bg-white text-gray-700 border-2 border-gray-100 shadow-[0_4px_0_rgb(229,231,235)] hover:border-indigo-200 hover:text-indigo-600 hover:shadow-[0_4px_0_rgb(199,210,254)] active:shadow-none active:translate-y-[4px]",
    correct: "bg-green-100 text-green-700 border-2 border-green-400 shadow-[0_4px_0_rgb(74,222,128)] pointer-events-none",
    incorrect: "bg-red-100 text-red-700 border-2 border-red-400 shadow-[0_4px_0_rgb(248,113,113)] pointer-events-none"
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};
