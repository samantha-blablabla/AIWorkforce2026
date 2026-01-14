import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { siteData } from '../siteContent';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate n8n webhook call
    try {
      // In production: const response = await fetch('YOUR_N8N_WEBHOOK_URL', { ... });
      await new Promise(resolve => setTimeout(resolve, 2000)); // Fake 2s delay
      
      setStatus('success');
    } catch (error) {
      console.error("Submission failed", error);
      setStatus('idle');
    }
  };

  // Reload page to go back to intro
  const handleBackToIntro = () => {
    window.location.reload();
  };

  // Use Portal to render success screen outside the DOM tree
  // This ensures it appears above ALL elements including nav/footer
  if (status === 'success') {
    return createPortal(
      <div className="fixed inset-0 z-[9999] bg-[#060606] animate-fadeIn overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 pointer-events-none">
          <img src="/Template/BG.png" alt="" className="w-full h-full object-cover" />
        </div>

        {/* Purple Glow - Top Right like template */}
        <div className="absolute top-[-15%] right-[-15%] w-[90vw] h-[90vw] md:w-[80vw] md:h-[80vw] bg-[radial-gradient(circle,_rgba(107,0,255,0.5)_0%,_rgba(130,55,255,0.3)_40%,_transparent_70%)] pointer-events-none blur-[80px]"></div>

        {/* Content - Left aligned, vertically centered */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl md:text-6xl lg:text-8xl font-light text-white leading-[1.15] tracking-tight">
            Bạn đã đăng ký thành công
          </h2>
          <p className="text-2xl md:text-4xl lg:text-6xl font-light text-gray-400 mt-2 md:mt-4">
            Hẹn gặp bạn tại Workshop !
          </p>
        </div>

        {/* Arrow Button - Flush bottom right, bigger with hover scale */}
        <button
          onClick={handleBackToIntro}
          className="absolute bottom-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-[#6b00ff] hover:scale-110 flex items-center justify-center transition-transform duration-300 cursor-pointer z-20 origin-bottom-right"
        >
          <svg className="w-10 h-10 md:w-16 md:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </button>
      </div>,
      document.body
    );
  }

  return (
    <div className="flex flex-col w-full max-w-md mx-auto font-sans">
      {/* Header Row matching template */}
      <div className="flex justify-between items-baseline mb-8">
        <h2 className="text-xl md:text-2xl font-normal text-white">{siteData.registration.title}</h2>
        <span className="text-xs text-gray-500 italic tracking-wide">{siteData.registration.subtitle}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        {/* Inputs styled as dark blocks */}
        <div className="relative group">
          <input 
            type="text" 
            name="name"
            required
            placeholder="Họ và Tên*" 
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-[#111111] border border-transparent focus:border-dark-blue-600 rounded-sm p-4 text-base text-white placeholder-gray-500 focus:outline-none transition-all font-sans"
          />
        </div>
        <div className="relative group">
          <input 
            type="email" 
            name="email"
            required
            placeholder="Email Đăng Ký*" 
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#111111] border border-transparent focus:border-dark-blue-600 rounded-sm p-4 text-base text-white placeholder-gray-500 focus:outline-none transition-all font-sans"
          />
        </div>
        <div className="relative group">
          <input 
            type="tel" 
            name="phone"
            required
            placeholder="Số điện thoại*" 
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-[#111111] border border-transparent focus:border-dark-blue-600 rounded-sm p-4 text-base text-white placeholder-gray-500 focus:outline-none transition-all font-sans"
          />
        </div>

        {/* Button */}
        <button 
          type="submit"
          disabled={status === 'submitting'}
          className="w-full mt-6 bg-[#6b00ff] hover:bg-[#5900da] disabled:bg-[#4000a0] disabled:cursor-not-allowed text-white font-medium py-4 text-base transition-all transform active:scale-99 flex justify-center items-center gap-3 font-sans rounded-sm shadow-lg shadow-purple-900/20"
        >
          {status === 'submitting' ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {siteData.registration.ctaProcessing}
            </>
          ) : (
            siteData.registration.ctaButton
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;