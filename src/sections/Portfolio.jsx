// src/sections/Portfolio.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/hero_bg.jpg';
import { projects } from '../export';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { FaArrowRight } from 'react-icons/fa';

const Portfolio = () => {
  const navigate = useNavigate();

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
      id='projects'
      className='relative w-full py-20 lg:py-32 flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 font-poppins'
      style={{ 
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed' // Adds a premium parallax effect
      }}
    >
      {/* 
        The background image remains completely untouched to preserve the parallax effect.
        We use ultra-modern glassmorphic panels for the content so it adapts perfectly to 
        both Light and Dark mode without needing to obscure the background image.
      */}

      <div className="max-w-[1600px] w-full mx-auto px-4 lg:px-12 flex flex-col items-center relative z-10">
        
        {/* --- SECTION HEADER (Glassmorphic Panel) --- */}
        <div className="text-center mb-12 md:mb-16 max-w-4xl bg-white/90 dark:bg-gradient-to-r dark:from-[#191124]/90 dark:via-[#21293a]/90 dark:to-[#191124]/90 backdrop-blur-xl p-8 md:p-12 rounded-[32px] border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-500">
          <h2
            data-aos="fade-down"
            className='text-cyan-600 dark:text-cyan-500 uppercase text-[10px] md:text-xs font-black tracking-[0.3em] mb-4 drop-shadow-sm'
          >
            Our Portfolio
          </h2>
          
          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className='text-slate-900 dark:text-white text-3xl md:text-5xl lg:text-[54px] font-black capitalize leading-tight mb-5 tracking-tight'
          >
            Explore The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-cyan-200">AIØN</span> Standard
          </h1>
          
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className='text-slate-600 dark:text-gray-300 text-sm md:text-base font-medium leading-relaxed max-w-3xl mx-auto'
          >
            A showcase of our elite enterprise architectures. From zero-latency corporate networking and military-grade security deployments to bespoke software environments built to scale.
          </p>
        </div>

        {/* --- PORTFOLIO GRID --- */}
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 w-full'>
          {projects.map((project, index) => (
            <div 
              key={index} 
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className='group flex flex-col rounded-[24px] overflow-hidden bg-white/95 dark:bg-gradient-to-br dark:from-[#191124]/95 dark:to-[#21293a]/95 backdrop-blur-xl shadow-lg dark:shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-500 border border-gray-200 dark:border-white/10 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 hover:-translate-y-2 cursor-default'
            >
              {/* Image Container with Zoom effect */}
              <div className="w-full h-[220px] md:h-[280px] overflow-hidden relative border-b border-gray-200 dark:border-white/5">
                <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 mix-blend-overlay transition-colors duration-500 z-10 pointer-events-none"></div>
                <img
                  src={project.img}
                  alt={project.title}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out'
                />
              </div>

              {/* Content Container */}
              <div className='p-6 md:p-8 flex flex-col flex-grow justify-between gap-6 relative'>
                {/* Cyber-glow accent line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div>
                  <h3 className='text-slate-900 dark:text-white text-xl md:text-2xl font-black leading-tight mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300 tracking-tight'>
                    {project.title}
                  </h3>
                  <p className='text-slate-600 dark:text-gray-400 text-xs md:text-sm font-medium leading-relaxed line-clamp-3'>
                    {project.para}
                  </p>
                </div>
                
                {/* Interactive Button */}
                <button 
                  onClick={() => navigate('/technologies')}
                  className='w-max flex items-center gap-2 text-cyan-700 dark:text-cyan-400 hover:text-white dark:hover:text-[#111111] text-[10px] md:text-xs font-black uppercase tracking-widest transition-colors duration-300 cursor-pointer bg-cyan-50 dark:bg-[#111111] hover:bg-cyan-600 dark:hover:bg-cyan-500 px-4 py-2.5 rounded-lg border border-cyan-200 dark:border-cyan-500/30'
                >
                  View Deployment <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Portfolio;