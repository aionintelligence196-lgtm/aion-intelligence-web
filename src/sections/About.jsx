// src/sections/About.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import aboutimg from '../assets/about.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaNetworkWired, FaShieldAlt, FaMicrochip, FaArrowRight } from 'react-icons/fa';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      delay: 100,
      once: false,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div id='about' className='w-full h-auto flex flex-col items-center justify-between px-6 lg:px-16 py-20 lg:py-32 gap-16 lg:gap-24 bg-slate-50 dark:bg-[#111111] transition-colors duration-500 relative overflow-hidden font-poppins'>
      
      {/* --- Ambient Background Glows (Updated to Cyan/Graphite aesthetic) --- */}
      <div className="absolute top-0 left-[-10%] w-[40%] h-[50%] bg-cyan-600/5 dark:bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none hidden dark:block transition-all duration-700"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] bg-cyan-900/5 dark:bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none hidden dark:block transition-all duration-700"></div>
      
      {/* =========================================
          TOP SECTION: IDENTITY & MISSION
         ========================================= */}
      <div className='w-full max-w-[1600px] flex flex-col lg:flex-row items-end justify-between gap-10 relative z-10'>
        <div className='lg:w-[60%] w-full flex flex-col justify-center items-start gap-4' data-aos="fade-right">
          <h2 className='text-cyan-600 dark:text-cyan-500 uppercase text-xs md:text-sm font-black tracking-[0.3em] drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]'>
            Corporate Identity
          </h2>
          <h1 className='text-slate-900 dark:text-white text-4xl md:text-5xl lg:text-[54px] font-black capitalize leading-[1.1em] tracking-tight'>
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-cyan-800 dark:from-cyan-400 dark:to-cyan-200">Digital Trust</span>
          </h1>
          <p className='text-slate-600 dark:text-gray-400 text-base md:text-lg font-medium mt-4 max-w-2xl leading-relaxed'>
            At <strong className="text-slate-900 dark:text-white font-bold">AIØN Intelligence Solutions</strong>, we architect resilient digital and physical ecosystems. We eliminate operational bottlenecks by bridging the gap between premium enterprise hardware and autonomous, scalable software architectures across East Africa.
          </p>
        </div>
        
        <div className='lg:w-[40%] w-full flex lg:justify-end justify-start items-center' data-aos="fade-left" data-aos-delay="100">
          <Link 
            to="/about" 
            className='group flex items-center gap-3 bg-slate-900 dark:bg-cyan-600 hover:bg-slate-800 dark:hover:bg-cyan-500 text-white font-black py-4 px-8 text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg dark:shadow-[0_4px_20px_rgba(34,211,238,0.3)] hover:shadow-xl dark:hover:shadow-[0_6px_25px_rgba(34,211,238,0.5)] hover:-translate-y-1'
          >
            Discover Our Story <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      
      {/* =========================================
          BOTTOM SECTION: CORE PILLARS
         ========================================= */}
      <div className='w-full max-w-[1600px] flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-20 relative z-10'>
        
        {/* Left: Cinematic Image Box */}
        <div className='lg:w-[45%] w-full relative group' data-aos="zoom-in" data-aos-delay="100">
          {/* Cyber-frame effect */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500 to-cyan-700 rounded-[32px] blur-xl opacity-10 group-hover:opacity-30 dark:opacity-20 dark:group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
          <div className="relative rounded-[24px] overflow-hidden border border-gray-200 dark:border-[#2d2d2d] group-hover:border-cyan-500/50 transition-colors duration-500 bg-[#1c1c1c]">
            {/* [NEED FROM CLIENT: Ensure about.jpg is a high-res, professional image of a server room, smart office, or hardware deployment] */}
            <img 
              src={aboutimg} 
              alt="AIØN Enterprise Infrastructure" 
              className='w-full h-auto min-h-[400px] object-cover shadow-xl dark:shadow-[0_0_30px_rgba(0,0,0,0.8)] mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-700 ease-in-out' 
            />
            <div className="absolute inset-0 bg-cyan-600/5 mix-blend-overlay pointer-events-none"></div>
          </div>
        </div>
        
        {/* Right: Architectural Features */}
        <div className='lg:w-[55%] w-full flex flex-col items-start justify-center gap-6'>
          
          {/* Feature 1 */}
          <div 
            className='group flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 md:p-8 bg-white dark:bg-[#1c1c1c]/90 dark:backdrop-blur-xl rounded-[24px] border border-gray-200 dark:border-[#2d2d2d] hover:border-cyan-500/50 dark:hover:border-cyan-500/50 shadow-sm hover:shadow-lg dark:shadow-none dark:hover:shadow-[0_4px_30px_rgba(34,211,238,0.15)] transition-all duration-300 hover:-translate-y-1.5 w-full' 
            data-aos="fade-up" 
            data-aos-delay="100"
          >
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-gray-50 dark:bg-[#111111] flex items-center justify-center border border-gray-100 dark:border-[#2d2d2d] shadow-inner group-hover:scale-110 transition-transform duration-500">
              <FaNetworkWired className="text-3xl text-cyan-600 dark:text-cyan-500 group-hover:text-cyan-400 transition-colors" />
            </div>
            <div>
              <h3 className='text-slate-900 dark:text-white text-xl font-black capitalize tracking-tight mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-500 transition-colors'>
                Enterprise Networking
              </h3>
              <p className='text-slate-600 dark:text-gray-400 text-sm font-medium leading-relaxed'>
                We design and deploy high-speed, scalable network infrastructures. From fiber-optic structured cabling to advanced PoE switch configurations, we ensure zero operational downtime.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div 
            className='group flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 md:p-8 bg-white dark:bg-[#1c1c1c]/90 dark:backdrop-blur-xl rounded-[24px] border border-gray-200 dark:border-[#2d2d2d] hover:border-cyan-500/50 dark:hover:border-cyan-500/50 shadow-sm hover:shadow-lg dark:shadow-none dark:hover:shadow-[0_4px_30px_rgba(34,211,238,0.15)] transition-all duration-300 hover:-translate-y-1.5 w-full' 
            data-aos="fade-up" 
            data-aos-delay="200"
          >
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-gray-50 dark:bg-[#111111] flex items-center justify-center border border-gray-100 dark:border-[#2d2d2d] shadow-inner group-hover:scale-110 transition-transform duration-500">
              <FaShieldAlt className="text-3xl text-cyan-600 dark:text-cyan-500 group-hover:text-cyan-400 transition-colors" />
            </div>
            <div>
              <h3 className='text-slate-900 dark:text-white text-xl font-black capitalize tracking-tight mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-500 transition-colors'>
                Security & Surveillance
              </h3>
              <p className='text-slate-600 dark:text-gray-400 text-sm font-medium leading-relaxed'>
                Implement uncompromised physical security. Our expertise covers UHD ColorVu surveillance, biometric access control, and active threat monitoring to safeguard your perimeters.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div 
            className='group flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 md:p-8 bg-white dark:bg-[#1c1c1c]/90 dark:backdrop-blur-xl rounded-[24px] border border-gray-200 dark:border-[#2d2d2d] hover:border-cyan-500/50 dark:hover:border-cyan-500/50 shadow-sm hover:shadow-lg dark:shadow-none dark:hover:shadow-[0_4px_30px_rgba(34,211,238,0.15)] transition-all duration-300 hover:-translate-y-1.5 w-full' 
            data-aos="fade-up" 
            data-aos-delay="300"
          >
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-gray-50 dark:bg-[#111111] flex items-center justify-center border border-gray-100 dark:border-[#2d2d2d] shadow-inner group-hover:scale-110 transition-transform duration-500">
              <FaMicrochip className="text-3xl text-cyan-600 dark:text-cyan-500 group-hover:text-cyan-400 transition-colors" />
            </div>
            <div>
              <h3 className='text-slate-900 dark:text-white text-xl font-black capitalize tracking-tight mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-500 transition-colors'>
                Smart Infrastructure & IoT
              </h3>
              <p className='text-slate-600 dark:text-gray-400 text-sm font-medium leading-relaxed'>
                Create connected environments. By integrating automated lighting, climate control, and digital signage into unified platforms, we bring efficiency and modern luxury to the forefront.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;