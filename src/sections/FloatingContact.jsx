// src/sections/FloatingContact.jsx
import React, { useState } from 'react';
import { FaPhoneAlt, FaWhatsapp, FaTimes, FaCommentDots } from 'react-icons/fa';

const FloatingContact = () => {
  // State to track if the widget is open or closed
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Corporate Contact Numbers
  const phoneNumber = "0700558302";
  const whatsappNumber = "254700558302"; 
  
  return (
    <div className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-[9999] flex flex-col items-center gap-3 font-poppins">
      
      {/* Floating Menu Items (Phone & WhatsApp) */}
      <div 
        className={`flex flex-col gap-3 transition-all duration-300 ease-out origin-bottom ${
          isOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-8 scale-75 pointer-events-none'
        }`}
      >
        {/* Phone Button */}
        <a 
          href={`tel:${phoneNumber}`}
          className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center text-white text-lg shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:bg-cyan-500 hover:scale-110 transition-all duration-300 relative group"
          aria-label="Call Us"
        >
          <FaPhoneAlt />
          {/* Tooltip */}
          <span className="absolute right-14 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md text-slate-800 dark:text-slate-200 font-bold text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-gray-200 dark:border-slate-700 shadow-lg pointer-events-none">
            Direct Line
          </span>
        </a>
        
        {/* WhatsApp Button */}
        <a 
          href={`https://wa.me/${whatsappNumber}?text=Hello%20AIØN%20Intelligence%20Solutions,%20I%20need%20assistance%20with%20an%20enterprise%20deployment.`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white text-2xl shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:bg-[#1ebe57] hover:scale-110 transition-all duration-300 relative group"
          aria-label="WhatsApp Us"
        >
          <FaWhatsapp />
          {/* Tooltip */}
          <span className="absolute right-14 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md text-slate-800 dark:text-slate-200 font-bold text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-gray-200 dark:border-slate-700 shadow-lg pointer-events-none">
            Chat on WhatsApp
          </span>
        </a>
      </div>

      {/* Main Toggle Button (The X / Chat Icon) */}
      <button 
        onClick={toggleMenu}
        aria-label="Toggle Contact Menu"
        className="w-14 h-14 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-full flex items-center justify-center text-white text-2xl shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.7)] hover:scale-110 transition-all duration-300 z-10 cursor-pointer border border-cyan-400/30"
      >
        {/* Switches between the 'X' icon when open, and a Chat icon when closed */}
        <span className={`transition-transform duration-300 absolute ${isOpen ? 'rotate-90 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'}`}>
          <FaTimes />
        </span>
        <span className={`transition-transform duration-300 absolute ${isOpen ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}>
          <FaCommentDots />
        </span>
      </button>

    </div>
  );
};

export default FloatingContact;