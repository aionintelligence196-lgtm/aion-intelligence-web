// src/pages/AboutPage.jsx
import React, { useEffect } from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import aboutimg from '../assets/about.jpg';
import rightImg from '../assets/operational_systems.jpg';

// --- IMAGE IMPORTS ---
import im1 from '../assets/im1.jpg';
import im2 from '../assets/im2.jpg';
import im3 from '../assets/im3.jpg';
import im4 from '../assets/im4.jpg';
import im5 from '../assets/im5.jpg';
import im6 from '../assets/im6.jpg';
import im7 from '../assets/im7.jpg';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  FaCamera, FaNetworkWired, FaTruck, FaIdCard, FaDesktop, FaHeadset,
  FaGlobe, FaLock, FaUserTie 
} from 'react-icons/fa';

// Combine arrays to ensure the marquee never runs empty on ultra-wide screens
const marqueeImages = [im1, im2, im3, im4, im5, im6, im7, im1, im2, im3, im4, im5, im6, im7, im1, im2, im3, im4, im5, im6, im7];

const AboutPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, 
      once: true, 
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-[#0f1423] min-h-screen font-poppins text-slate-900 dark:text-white transition-colors duration-500 flex flex-col overflow-x-hidden">
      <Header />
      
      {/* 
        --- MAIN CONTAINER --- 
        Clearance for fixed header.
      */}
      <main className='w-full flex-grow flex flex-col items-center pt-[100px] md:pt-[110px]'>
        
        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col items-center justify-center w-full relative z-10 py-8 lg:py-10" data-aos="fade-down">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] max-w-[800px] h-[150%] bg-cyan-600/5 dark:bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none hidden dark:block"></div>
          
          <span className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-800 dark:from-cyan-400 dark:via-cyan-300 dark:to-cyan-500 drop-shadow-sm leading-none opacity-80">
            About
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-widest text-slate-900 dark:text-white -mt-3 md:-mt-6 text-center drop-shadow-lg z-10">
            AIØN INTELLIGENCE
          </h1>
        </div>

        {/* --- WHO WE ARE SECTION --- */}
        <div id='top-box' className='w-full px-4 sm:px-8 lg:px-12 2xl:px-24 flex lg:flex-row flex-col items-center justify-between gap-8 lg:gap-12 mb-12 lg:mb-16'>
          
          {/* Left Text Block */}
          <div className='lg:w-1/2 w-full flex flex-col justify-center items-start gap-4' data-aos="fade-right">
            <h2 className='text-cyan-600 dark:text-cyan-400 uppercase text-[10px] md:text-xs font-black tracking-[0.3em] drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]'>
              Who We Are
            </h2>
            <h3 className='text-slate-900 dark:text-white text-2xl md:text-4xl capitalize leading-tight font-black'>
              Delivering Excellence In IT Solutions
            </h3>
            
            <div className="space-y-3 mt-1">
              <p className='text-slate-600 dark:text-slate-300 text-xs md:text-sm font-medium leading-relaxed'>
                Headquartered in Nairobi, <strong className="text-slate-900 dark:text-white font-bold">AIØN Intelligence Solutions</strong> engineers flawless digital and physical ecosystems for forward-thinking enterprises. We do not just build IT infrastructure; we architect systems with zero weaknesses, designed to scale aggressively and operate autonomously.
              </p>
              <p className='text-slate-600 dark:text-slate-300 text-xs md:text-sm font-medium leading-relaxed'>
                Our expertise spans the entire technological spectrum. From crafting high-performance web environments and bespoke enterprise software, to deploying intelligent workflows and procuring high-tier hardware. We seamlessly connect physical workstations to the dynamic code that runs your business.
              </p>
              <p className='text-slate-600 dark:text-slate-300 text-xs md:text-sm font-medium leading-relaxed'>
                We refuse to accept operational bottlenecks. Traditional vendors offer piecemeal fixes, but we design unified, resilient architectures that eliminate single points of failure, granting complete control over your technological capabilities.
              </p>
            </div>

            {/* Feature Grid */}
            <div className='grid grid-cols-2 gap-y-4 gap-x-6 w-full mt-4' data-aos="fade-up" data-aos-delay="200">
              {[
                { icon: FaCamera, text: "Security Cameras" },
                { icon: FaIdCard, text: "Access Control" },
                { icon: FaNetworkWired, text: "Enterprise Networks" },
                { icon: FaDesktop, text: "Commercial Displays" },
                { icon: FaTruck, text: "Nationwide Delivery" },
                { icon: FaHeadset, text: "24/7 Priority Support" }
              ].map((item, idx) => (
                <div key={idx} className='flex items-center gap-2 group cursor-default'>
                  <item.icon className='text-cyan-600 dark:text-cyan-400 text-lg md:text-xl group-hover:scale-110 transition-transform duration-300 dark:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]' />
                  <span className='text-slate-700 dark:text-slate-300 text-xs md:text-sm font-bold group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors'>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Static Image */}
          <div className='lg:w-1/2 w-full flex justify-center lg:justify-end items-center relative' data-aos="fade-left" data-aos-delay="300">
            <div className="relative animate-float group w-full max-w-[700px]">
              <div className="absolute inset-0 bg-cyan-500 rounded-3xl blur-3xl opacity-0 dark:opacity-15 group-hover:opacity-25 transition-opacity duration-700"></div>
              <img 
                src={rightImg} 
                alt="IT Solutions" 
                className='w-full h-auto object-cover rounded-[24px] shadow-lg dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative z-10 border border-gray-200 dark:border-white/5 transition-all duration-700' 
              />
            </div>
          </div>
          
        </div>

        {/* --- CSS ANIMATIONS BLOCK --- */}
        <style>
          {`
            @keyframes scrollHorizontalLTR {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .moving-track-horizontal {
              display: flex;
              align-items: center;
              gap: 1rem;
              width: max-content;
              animation: scrollHorizontalLTR 35s linear infinite;
            }
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0px); }
            }
            .animate-float {
              animation: float 6s ease-in-out infinite;
            }
          `}
        </style>

        {/* --- FULL EDGE-TO-EDGE MARQUEE (Blackberry & Deep Slate Flow) --- */}
        <div className='w-full overflow-hidden relative flex items-center bg-white dark:bg-gradient-to-r dark:from-[#191124] dark:via-[#21293a] dark:to-[#191124] border-y border-gray-200 dark:border-white/5 shadow-sm dark:shadow-[0_5px_20px_rgba(0,0,0,0.4)] h-[120px] md:h-[140px] mb-12 lg:mb-16'>
          <div className='moving-track-horizontal'>
            {marqueeImages.map((imgSrc, index) => (
              <img 
                key={index} 
                src={imgSrc} 
                alt={`Showcase ${index}`} 
                className="h-[80px] w-[130px] md:h-[100px] md:w-[160px] rounded-lg object-cover shadow-sm hover:opacity-80 transition-opacity duration-300 border border-transparent dark:border-white/10" 
              />
            ))}
          </div>
          {/* Edge fade effects */}
          <div className="absolute top-0 left-0 w-12 md:w-24 h-full bg-gradient-to-r from-slate-50 dark:from-[#0f1423] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-12 md:w-24 h-full bg-gradient-to-l from-slate-50 dark:from-[#0f1423] to-transparent z-10 pointer-events-none"></div>
        </div>
        
        {/* --- BOTTOM BOX SECTION --- */}
        <div id='bottom-box' className='w-full px-4 sm:px-8 lg:px-12 2xl:px-24 flex lg:flex-row flex-col justify-between items-center gap-8 lg:gap-12 mb-16 lg:mb-20 relative z-10'>
          
          {/* Left Image Asset */}
          <div className='lg:w-1/2 w-full relative group flex justify-center lg:justify-start' data-aos="zoom-in" data-aos-delay="100">
            <div className="absolute inset-0 bg-cyan-700 rounded-3xl blur-3xl opacity-0 dark:opacity-15 group-hover:opacity-25 transition-opacity duration-700"></div>
            <img 
              src={aboutimg} 
              alt="About Aion" 
              className='w-full max-w-[700px] object-cover rounded-[24px] shadow-lg dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative z-10 border border-gray-200 dark:border-white/5 transition-all duration-700' 
            />
          </div>
          
          {/* Right Content Panels */}
          <div className='lg:w-1/2 w-full flex flex-col items-start gap-4'>
            {[
              {
                title: "Enterprise Networking",
                desc: "We design and deploy high-speed, scalable network infrastructures. From structured cabling to advanced routing, we ensure organizations remain seamlessly connected with zero downtime."
              },
              {
                title: "Security Systems",
                desc: "We implement advanced physical security protocols. Our expertise covers high-definition surveillance, biometric access control, and integrated threat monitoring to safeguard your assets."
              },
              {
                title: "Smart Infrastructure",
                desc: "We create connected environments. By integrating automated lighting, climate control, and enterprise IoT into unified platforms, we bring absolute efficiency to the forefront."
              }
            ].map((section, idx) => (
              <div 
                key={idx} 
                className='flex flex-col items-start justify-center gap-1.5 p-5 lg:p-6 rounded-[20px] bg-white dark:bg-[#21293a]/80 backdrop-blur-md border border-gray-200 dark:border-white/5 shadow-sm w-full hover:-translate-y-1 transition-all duration-300 hover:border-cyan-500 dark:hover:border-cyan-500/50 hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(34,211,238,0.15)] group'
                data-aos="fade-up" 
                data-aos-delay={200 + (idx * 100)}
              >
                <h3 className='text-slate-900 dark:text-white text-xl lg:text-2xl font-black capitalize leading-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300'>
                  {section.title}
                </h3>
                <p className='text-slate-600 dark:text-slate-300 text-xs md:text-sm font-medium leading-relaxed font-inter'>
                  {section.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- AION DETAILS SECTION --- */}
        <div className="w-full flex flex-col items-center justify-center py-16 px-4 sm:px-8 bg-gray-100 dark:bg-gradient-to-b dark:from-[#0f1423] dark:to-[#191124] border-t border-gray-200 dark:border-white/5 relative overflow-hidden">
          
          <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[60%] h-[100%] bg-cyan-600/5 dark:bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none hidden dark:block z-0"></div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-800 dark:from-cyan-400 dark:via-cyan-300 dark:to-blue-400 mb-3 drop-shadow-sm text-center relative z-10" data-aos="zoom-in">
            AIØN INTELLIGENCE SOLUTIONS
          </h2>
          
          <p className="uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400 text-[10px] md:text-xs font-black mb-6 text-center relative z-10" data-aos="fade-up" data-aos-delay="100">
            Future-Ready IT & Network Solutions For Growing Enterprises
          </p>
          
          <div className="w-16 h-1 bg-cyan-600 dark:bg-cyan-500 mb-10 rounded-full shadow-md dark:shadow-[0_0_10px_rgba(34,211,238,0.6)] relative z-10" data-aos="fade-up" data-aos-delay="200"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4 lg:px-12 2xl:px-24 relative z-10">
            
            <div className="flex flex-col items-center text-center group cursor-default bg-white dark:bg-[#21293a]/90 backdrop-blur-md p-6 rounded-[24px] border border-gray-200 dark:border-white/5 hover:border-cyan-500 dark:hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(34,211,238,0.15)] transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
              <div className="w-12 h-12 rounded-xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#191124] flex items-center justify-center mb-4 group-hover:bg-cyan-600 dark:group-hover:bg-cyan-500 transition-colors duration-300 shadow-inner">
                <FaGlobe className="text-xl text-cyan-600 dark:text-cyan-400 group-hover:text-white dark:group-hover:text-[#191124] transition-colors duration-300" />
              </div>
              <h3 className="text-lg text-slate-900 dark:text-white font-black mb-2">Regional Hub, Global Standards</h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs font-medium leading-relaxed font-inter">
                Operating from our headquarters in Nairobi, we bridge the gap between premium hardware and intelligent automation, bringing world-class solutions to forward-thinking enterprises.
              </p>
            </div>

            <div className="flex flex-col items-center text-center group cursor-default bg-white dark:bg-[#21293a]/90 backdrop-blur-md p-6 rounded-[24px] border border-gray-200 dark:border-white/5 hover:border-cyan-500 dark:hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(34,211,238,0.15)] transition-all duration-300" data-aos="fade-up" data-aos-delay="300">
              <div className="w-12 h-12 rounded-xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#191124] flex items-center justify-center mb-4 group-hover:bg-cyan-600 dark:group-hover:bg-cyan-500 transition-colors duration-300 shadow-inner">
                <FaLock className="text-xl text-cyan-600 dark:text-cyan-400 group-hover:text-white dark:group-hover:text-[#191124] transition-colors duration-300" />
              </div>
              <h3 className="text-lg text-slate-900 dark:text-white font-black mb-2">Security-First Approach</h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs font-medium leading-relaxed font-inter">
                Built with security at the core. From physical infrastructure to digital endpoints, our unified architectures protect your business from evolving threats with zero weaknesses.
              </p>
            </div>

            <div className="flex flex-col items-center text-center group cursor-default bg-white dark:bg-[#21293a]/90 backdrop-blur-md p-6 rounded-[24px] border border-gray-200 dark:border-white/5 hover:border-cyan-500 dark:hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(34,211,238,0.15)] transition-all duration-300" data-aos="fade-up" data-aos-delay="400">
              <div className="w-12 h-12 rounded-xl border border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#191124] flex items-center justify-center mb-4 group-hover:bg-cyan-600 dark:group-hover:bg-cyan-500 transition-colors duration-300 shadow-inner">
                <FaUserTie className="text-xl text-cyan-600 dark:text-cyan-400 group-hover:text-white dark:group-hover:text-[#191124] transition-colors duration-300" />
              </div>
              <h3 className="text-lg text-slate-900 dark:text-white font-black mb-2">Elite Architecture</h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs font-medium leading-relaxed font-inter">
                Our engineers are dedicated to eliminating operational bottlenecks, crafting custom systems designed to scale aggressively and perform flawlessly.
              </p>
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;