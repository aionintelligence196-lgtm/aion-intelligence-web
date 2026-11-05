// src/sections/Offer.jsx
import React, { useEffect } from 'react';
import { services } from '../export';
import { Link, useNavigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { FaArrowRight } from 'react-icons/fa';

const Offer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({
      duration: 800, 
      delay: 100, 
      once: false, 
      easing: 'ease-out-cubic',
    });
  }, []);

  // Quick helper to safely navigate and pass a state parameter
  const handleServiceNavigation = (serviceTitle) => {
    navigate('/solutions', { state: { targetService: serviceTitle } });
    window.scrollTo(0, 0);
  };

  return (
    <section
      id='services'
      className='w-full py-20 lg:py-32 px-4 lg:px-12 flex flex-col items-center justify-center gap-6 bg-white dark:bg-[#020617] transition-colors duration-500 relative overflow-hidden font-poppins'
    >
      {/* --- Ambient Background Glows --- */}
      <div className="absolute top-[30%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none hidden dark:block transition-all duration-700"></div>

      {/* --- SECTION HEADER --- */}
      <div className="w-full max-w-[1600px] text-center relative z-10 flex flex-col items-center">
        <h2
          data-aos="fade-down"
          className='text-cyan-600 dark:text-cyan-400 uppercase text-xs md:text-sm font-black tracking-[0.3em] drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] mb-4'
        >
          Our Solutions
        </h2>
        
        <h1
          data-aos="fade-up"
          data-aos-delay="100"
          className='text-slate-900 dark:text-white text-3xl md:text-5xl lg:text-[54px] font-black capitalize leading-tight lg:w-[60%] w-full mb-6 tracking-tight'
        >
          Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Digital Trust</span>
        </h1>
        
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className='text-slate-600 dark:text-slate-400 text-base md:text-lg font-medium leading-relaxed max-w-3xl mb-12'
        >
          We engineer resilient systems with zero weaknesses. Explore our core service verticals designed to secure, scale, and autonomously optimize your enterprise infrastructure.
        </p>
      </div>

      {/* --- SERVICES GRID --- */}
      <div className='w-full max-w-[1600px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10'>
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className='group flex flex-col justify-between items-start gap-6 p-8 md:p-10 rounded-[32px] bg-gray-50 dark:bg-[#0f172a]/80 dark:backdrop-blur-xl border border-gray-200 dark:border-slate-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-[0_10px_30px_rgba(34,211,238,0.15)] transition-all duration-500 hover:-translate-y-2'
            >
              <div className="w-full">
                {/* Icon Box */}
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#050B14] border border-gray-100 dark:border-slate-700 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                  {IconComponent && <IconComponent className='text-cyan-600 dark:text-cyan-400 text-3xl group-hover:text-cyan-500 transition-colors duration-300' />}
                </div>
                
                {/* Content */}
                <h3 className='text-slate-900 dark:text-white text-xl md:text-2xl font-black capitalize leading-tight mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300'>
                  {service.title}
                </h3>
                
                <p className='text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed line-clamp-4'>
                  {service.para}
                </p>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => handleServiceNavigation(service.title)}
                className='inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-slate-900 dark:hover:text-white text-xs font-black uppercase tracking-widest mt-4 transition-colors duration-300 group/link cursor-pointer'
              >
                View Architecture <FaArrowRight className="group-hover/link:translate-x-1.5 transition-transform duration-300" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Offer;