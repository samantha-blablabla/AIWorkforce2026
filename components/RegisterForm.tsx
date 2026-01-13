import React, { useState } from 'react';
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

  if (status === 'success') {
    return (
      <div className="flex flex-col justify-center h-full animate-fadeIn p-8 md:p-12 relative overflow-hidden font-sans">
        {/* Glow Background for Success State */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-blue-900/40 via-transparent to-transparent pointer-events-none"></div>

        <h3 className="text-3xl md:text-5xl font-medium mb-6 text-white leading-tight relative z-10">
          {siteData.registration.successTitle}, <br/>
          <span className="text-gray-400 text-3xl font-normal">
             {siteData.registration.successMessage}
          </span>
        </h3>
        <p className="mt-8 text-dark-blue-300 text-xl relative z-10">Check your inbox for ticket #{Math.floor(Math.random() * 9000) + 1000}</p>
        
        {/* Visual Decoration for Success */}
        <div className="mt-12 w-20 h-20 bg-dark-blue-700 rounded-full flex items-center justify-center relative z-10 shadow-lg shadow-dark-blue-900/50">
             <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
      </div>
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