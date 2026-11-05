// src/sections/Client.jsx
import React, { useEffect } from 'react';
import backgroundImage from '../assets/G8.jpg';
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo2.png';
import logo3 from '../assets/logo3.png';
import logo4 from '../assets/logo4.png';
import logo5 from '../assets/logo5.png';
import logo6 from '../assets/logo6.png';
import logo7 from '../assets/logo7.png';
import logo8 from '../assets/logo8.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Client = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, 
      delay: 100, 
      once: false,
      easing: 'ease-out-cubic',
    });
  }, []);

  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8];

  return (
    <section
      id='clients'
      className='relative w-full py-20 lg:py-32 flex flex-col items-center justify-center overflow-hidden font-poppins'
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-[1600px] w-full mx-auto px-4 lg:px-12 flex flex-col items-center gap-12 lg:gap-16 relative z-10">
        
        {/* --- TRUST BANNER --- */}
        <div
          data-aos="zoom-in"
          className='relative bg-white/95 dark:bg-gradient-to-r dark:from-[#111111]/95 dark:via-[#1c1c1c]/95 dark:to-[#111111]/95 backdrop-blur-xl border border-gray-200 dark:border-[#2d2d2d] rounded-full px-8 py-3 md:py-4 flex flex-col lg:flex-row justify-center items-center w-max max-w-full shadow-lg dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] gap-2 md:gap-3 text-center cursor-default transition-all duration-500 hover:scale-[1.02] hover:border-cyan-500/50 dark:hover:border-cyan-500/50 group'
        >
          <span className="text-slate-700 dark:text-gray-300 text-xs md:text-sm lg:text-base font-bold tracking-widest uppercase transition-colors duration-300">
            Trusted by <span className='text-cyan-600 dark:text-cyan-500 font-black drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors duration-300'>East Africa's Leading Enterprises</span>
          </span>
        </div>

        {/* --- INTERACTIVE LOGO GRID --- */}
        <div className='w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8'>
          {logos.map((logo, index) => (
            <div 
              key={index} 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
              className='group relative bg-white/80 dark:bg-gradient-to-br dark:from-[#111111]/90 dark:to-[#1c1c1c]/90 backdrop-blur-md border border-gray-200 dark:border-[#2d2d2d] p-8 lg:p-12 flex justify-center items-center rounded-[24px] shadow-sm dark:shadow-xl hover:shadow-lg dark:hover:shadow-[0_4px_25px_rgba(34,211,238,0.15)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 cursor-pointer overflow-hidden'
            >
              {/* Cyber-glow accent line on hover */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <img 
                src={logo} 
                alt={`AIØN Enterprise Partner ${index + 1}`} 
                className='w-[90px] lg:w-[130px] h-auto object-contain filter grayscale opacity-60 dark:opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 drop-shadow-sm dark:group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:scale-110' 
              />
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Client;