import React, { useState } from 'react';

interface NavProps {
  currentSection: number;
  totalSections: number;
  onNavigate?: (index: number) => void;
}

export const Navigation: React.FC<NavProps> = ({ currentSection, totalSections, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sections = ["Giới Thiệu", "Tổng Quan", "RoadMap", "Diễn Giả", "Đăng Ký"];
  const navItems = sections.slice(0, 4); // Items inside the menu (excluding Register)

  const handleMobileNavigate = (index: number) => {
    setIsMenuOpen(false);
    onNavigate?.(index);
  };

  return (
    <>
      {/* ================= DESKTOP NAVIGATION (>768px) ================= */}
      <nav id="desktop-nav" className="hidden md:block fixed top-0 left-0 w-full z-[120] bg-black/80 backdrop-blur-md border-b border-white/5 font-sans opacity-0">
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
      <nav id="mobile-nav" className="md:hidden fixed top-0 left-0 w-full z-[120] bg-[#050505] h-20 flex items-center justify-between pl-4 shadow-xl opacity-0">
        
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

        {/* Right: CTA Register Button / Back to Top (Full Height, Square, Flush Right) */}
        <button
          onClick={() => {
            if (currentSection === totalSections - 1) {
              // Back to top when on last section
              onNavigate?.(0);
            } else {
              // Navigate to Register section
              onNavigate?.(4);
            }
          }}
          className="absolute top-0 right-0 h-20 bg-[#6b00ff] hover:bg-[#5900da] text-white font-bold text-lg px-8 shadow-none uppercase tracking-wide active:bg-[#4b00b3] transition-all duration-300 flex items-center justify-center"
          style={{ borderRadius: 0 }}
        >
          {currentSection === totalSections - 1 ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          ) : (
            'Đăng Ký'
          )}
        </button>
      </nav>

      {/* ================= MOBILE FULLSCREEN MENU OVERLAY ================= */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[500] bg-[#050505] flex flex-col items-center justify-center animate-fadeIn">
           
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
           </div>
        </div>
      )}

      {/* Bottom Bar with Logo & Progress (Desktop & Mobile) */}
      <div id="bottom-bar" className="fixed bottom-0 left-0 w-full z-[120] opacity-0">
        {/* Mobile Background - taller gradient for better logo visibility */}
        <div className="absolute inset-x-0 bottom-0 h-24 md:h-auto bg-gradient-to-t from-black via-black/80 to-transparent md:from-transparent md:via-transparent md:to-transparent pointer-events-none" />

        {/* Logo - Positioned above progress bar */}
        <div className="absolute left-6 md:left-10 bottom-4 md:bottom-6 z-10">
          <img
            src="/Template/LOGO-WHITE.png"
            alt="GEARVN"
            className="h-8 md:h-10 w-auto drop-shadow-lg"
          />
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-white/10 w-full relative z-10">
          <div
            className="h-full bg-gradient-to-r from-dark-blue-600 via-dark-blue-500 to-dark-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
          />
        </div>
      </div>
    </>
  );
};
