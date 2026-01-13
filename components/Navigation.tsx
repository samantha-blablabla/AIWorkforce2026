import React, { useState } from 'react';

interface NavProps {
  currentSection: number;
  totalSections: number;
  onNavigate?: (index: number) => void;
}

export const Navigation: React.FC<NavProps> = ({ currentSection, totalSections, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sections = ["Giới Thiệu", "Tổng Quan", "RoadMap", "Đăng Ký"];
  const navItems = sections.slice(0, 3); // Items inside the menu

  const handleMobileNavigate = (index: number) => {
    setIsMenuOpen(false);
    onNavigate?.(index);
  };

  return (
    <>
      {/* ================= DESKTOP NAVIGATION (>768px) ================= */}
      <nav className="hidden md:block fixed top-0 left-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-white/5 font-sans">
        <div className="flex w-full overflow-x-auto no-scrollbar">
          {sections.map((sec, idx) => {
            const isLast = idx === sections.length - 1;
            const isActive = idx === currentSection;

            let baseClasses = "flex-1 text-center py-6 text-2xl font-medium tracking-wide transition-all duration-300 flex items-center justify-center cursor-pointer appearance-none border-none outline-none whitespace-nowrap";
            let colorClasses = "";

            if (isLast) {
               colorClasses = "bg-dark-blue-700 text-white hover:bg-dark-blue-600 font-bold";
            } else if (isActive) {
               colorClasses = "bg-dark-blue-50 text-dark-blue-900 font-bold";
            } else {
               colorClasses = "text-gray-500 hover:text-gray-300 hover:bg-white/5";
            }

            return (
              <button 
                key={idx}
                onClick={() => onNavigate?.(idx)}
                className={`${baseClasses} ${colorClasses}`}
              >
                {sec}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ================= MOBILE NAVIGATION (<768px) ================= */}
      {/* Updated: No border, larger height, flush button */}
      <nav className="md:hidden fixed top-0 left-0 w-full z-50 bg-[#050505] h-20 flex items-center justify-between pl-4 shadow-xl">
        
        {/* Left: Hamburger Menu (Vertically Centered) */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="text-white p-2 focus:outline-none hover:bg-white/5 rounded-full transition-colors"
          aria-label="Open Menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Right: CTA Register Button (Full Height, Square, Flush Right) */}
        <button 
          onClick={() => onNavigate?.(3)} // Index 3 is Register
          className="absolute top-0 right-0 h-20 bg-[#6b00ff] hover:bg-[#5900da] text-white font-bold text-lg px-8 shadow-none uppercase tracking-wide active:bg-[#4b00b3] transition-colors flex items-center justify-center"
          style={{ borderRadius: 0 }} // Ensure no rounded corners
        >
          Đăng Ký
        </button>
      </nav>

      {/* ================= MOBILE FULLSCREEN MENU OVERLAY ================= */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#050505] flex flex-col items-center justify-center animate-fadeIn">
           
           {/* Close Button */}
           <button 
             onClick={() => setIsMenuOpen(false)}
             className="absolute top-4 right-4 text-gray-400 p-4 hover:text-white"
           >
             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
             </svg>
           </button>

           <div className="flex flex-col gap-10 text-center">
              {navItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleMobileNavigate(idx)}
                  className="text-4xl font-light text-white hover:text-dark-blue-400 transition-colors tracking-tight"
                >
                  {item}
                </button>
              ))}
              
              {/* Divider */}
              <div className="w-20 h-[1px] bg-white/10 mx-auto my-2"></div>

              <button
                 onClick={() => handleMobileNavigate(3)}
                 className="text-4xl font-bold text-dark-blue-500"
              >
                Đăng Ký Ngay
              </button>
           </div>
        </div>
      )}

      {/* Bottom Bar with Logo & Progress (Desktop & Mobile) */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-black/80 backdrop-blur-md border-t border-white/5 pb-10 md:pb-12">
        {/* Logo Container */}
        <div className="absolute left-6 md:left-10 bottom-3 md:bottom-4 z-10">
          <img
            src="/Template/LOGO-WHITE.png"
            alt="GEARVN"
            className="h-6 md:h-8 w-auto opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-white/5 w-full">
          <div
            className="h-full bg-gradient-to-r from-dark-blue-600 via-dark-blue-500 to-dark-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
          />
        </div>
      </div>
    </>
  );
};
