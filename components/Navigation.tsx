import React from 'react';

interface NavProps {
  currentSection: number;
  totalSections: number;
  onNavigate?: (index: number) => void;
}

export const Navigation: React.FC<NavProps> = ({ currentSection, totalSections, onNavigate }) => {
  const sections = ["Giới Thiệu", "Tổng Quan", "RoadMap", "Đăng Ký"];

  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-black/50 backdrop-blur-md border-b border-white/5 font-sans">
        <div className="flex w-full">
          {sections.map((sec, idx) => {
            const isLast = idx === sections.length - 1;
            const isActive = idx === currentSection;

            // Define styles based on active state and if it's the CTA (last item)
            let baseClasses = "flex-1 text-center py-6 text-2xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center cursor-pointer appearance-none border-none outline-none";
            let colorClasses = "";

            if (isLast) {
               // CTA Button Style (Always Solid Purple)
               colorClasses = "bg-dark-blue-700 text-white hover:bg-dark-blue-600 font-bold";
            } else if (isActive) {
               // Active Tab Style (Light Lavender bg, Dark Purple text)
               colorClasses = "bg-dark-blue-50 text-dark-blue-900 font-bold";
            } else {
               // Inactive Style (Dark bg, Gray text)
               colorClasses = "text-gray-500 hover:text-gray-300 hover:bg-white/5";
            }

            return (
              <button 
                key={idx}
                onClick={() => onNavigate?.(idx)}
                className={`${baseClasses} ${colorClasses}`}
                aria-label={`Scroll to ${sec}`}
              >
                {sec}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-white/5 z-40">
        <div 
            className="h-full bg-dark-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
        />
      </div>
    </>
  );
};
