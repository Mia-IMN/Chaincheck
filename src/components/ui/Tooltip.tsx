import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  isDark?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, isDark = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div 
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>
      {isVisible && (
        <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm rounded-lg border shadow-lg z-50 whitespace-nowrap ${
          isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200 text-gray-900'
        }`}>
          {content}
        </div>
      )}
    </div>
  );
};