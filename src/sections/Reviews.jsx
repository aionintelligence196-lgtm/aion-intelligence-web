// src/sections/Reviews.jsx
import React, { useEffect } from 'react';
import { reviews } from '../export';
import { FaStar, FaQuoteRight, FaUserShield } from 'react-icons/fa';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Reviews = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      delay: 100,
      once: false,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <section
      id='testimonials'
      className='w-full py-20 lg:py-32 px-4 lg:px-12 flex flex-col items-center justify-center bg-white dark:bg-[#020617] transition-colors duration-500 relative overflow-hidden font-poppins'
    >
      {/* --- Ambient Background Glows --- */}
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none hidden dark:block transition-all duration-700 z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none hidden dark:block transition-all duration-700 z-0"></div>

      <div className="max-w-[1600px] w-full mx-auto flex flex-col items-center relative z-10">
        
        {/* --- SECTION HEADERS --- */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl">
          <h2 
            data-aos='fade-down' 
            className='text-cyan-600 dark:text-cyan-400 text-xs md:text-sm font-black tracking-[0.3em] uppercase drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] mb-4'
          >
            Client Voices
          </h2>
          
          <h1 
            data-aos='fade-up' 
            data-aos-delay='100' 
            className='text-slate-900 dark:text-white text-3xl md:text-5xl lg:text-[54px] capitalize leading-tight font-black tracking-tight mb-6'
          >
            Stories of Success from <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500">AIØN</span> Clients
          </h1>
          
          <p 
            data-aos='fade-up' 
            data-aos-delay='200' 
            className='text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-medium'
          >
            Discover how we have transformed corporate infrastructures, scaled network operations, and secured critical assets for enterprises across the region.
          </p>
        </div>

        {/* --- REVIEWS GRID --- */}
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8'>
          {reviews.map((review, index) => (
            <div
              key={index}
              data-aos='fade-up' 
              data-aos-delay={index * 100} 
              className='group relative flex flex-col justify-between items-start gap-6 bg-gray-50 dark:bg-[#0f172a]/80 dark:backdrop-blur-xl p-8 rounded-3xl border border-gray-200 dark:border-slate-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-[0_10px_30px_rgba(34,211,238,0.15)] transition-all duration-500 hover:-translate-y-2 overflow-hidden'
            >
              {/* Watermark Quote Icon inside the card */}
              <FaQuoteRight className="absolute top-6 right-6 text-6xl text-gray-200 dark:text-slate-800/40 opacity-60 group-hover:text-cyan-100 dark:group-hover:text-cyan-900/20 transition-colors duration-500 z-0 pointer-events-none" />

              <div className="flex flex-col items-start gap-5 z-10 relative">
                
                {/* Rating Pill */}
                <div className='flex justify-center items-center gap-2 bg-white dark:bg-[#050b14] border border-gray-100 dark:border-slate-700 py-1.5 px-4 rounded-full shadow-sm group-hover:border-cyan-500/30 transition-colors duration-300'>
                  <span className="text-slate-900 dark:text-white font-black text-xs">{review.rating}</span>
                  <FaStar className='text-yellow-500 dark:text-yellow-400 text-xs drop-shadow-[0_0_5px_rgba(250,204,21,0.4)]' />
                </div>
                
                {/* Review Text */}
                <p className='text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300 italic'>
                  "{review.about}"
                </p>
              </div>
              
              {/* Reviewer Details with Avatar */}
              <div className='mt-auto pt-6 border-t border-gray-200 dark:border-slate-700/60 w-full z-10 relative flex items-center gap-4'>
                {/* Abstract Avatar Placeholder */}
                <div className="w-12 h-12 rounded-full bg-cyan-50 dark:bg-[#050b14] border border-cyan-100 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-inner group-hover:border-cyan-500/40 transition-colors duration-300">
                  <FaUserShield className="text-cyan-600 dark:text-cyan-500 text-lg" />
                </div>
                
                <div className="flex flex-col">
                  <h3 className='text-slate-900 dark:text-white text-base font-black group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300 leading-tight'>
                    {review.name}
                  </h3>
                  <span className='text-slate-500 dark:text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1'>
                    {review.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Reviews;