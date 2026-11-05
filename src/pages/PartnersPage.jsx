// src/pages/PartnersPage.jsx
import React, { useEffect } from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

// --- IMPORT YOUR PARTNER/DISTRIBUTOR IMAGES (r1 to r25) ---
import r1 from '../assets/r1.jpg';
import r2 from '../assets/r2.jpg';
import r3 from '../assets/r3.jpg';
import r4 from '../assets/r4.jpg';
import r5 from '../assets/r5.jpg';
import r6 from '../assets/r6.jpg';
import r7 from '../assets/r7.jpg';
import r8 from '../assets/r8.jpg';
import r9 from '../assets/r9.jpg';
import r10 from '../assets/r10.jpg';
import r11 from '../assets/r11.jpg';
import r12 from '../assets/r12.jpg';
import r13 from '../assets/r13.jpg';
import r14 from '../assets/r14.jpg';
import r15 from '../assets/r15.jpg';
import r16 from '../assets/r16.jpg';
import r17 from '../assets/r17.jpg';
import r18 from '../assets/r18.jpg';
import r19 from '../assets/r19.jpg';
import r20 from '../assets/r20.jpg';
import r21 from '../assets/r21.jpg';
import r22 from '../assets/r22.jpg';
import r23 from '../assets/r23.jpg';
import r24 from '../assets/r24.jpg';
import r25 from '../assets/r25.jpg';

const PartnersPage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Data for the Top Distributors Row (Reference Image 1)
  const distributors = [
    { name: "Cambium Networks", image: r1 },
    { name: "RAD", image: r2 },
    { name: "Tejas Networks", image: r3 },
    { name: "MikroTik", image: r4 },
    { name: "LiveU", image: r5 },
    { name: "Array", image: r6 }
  ];

  // Data for the Global Partners Grid (Reference Image 2)
  const globalPartners = [
    { name: "Lenovo", image: r7 },
    { name: "Fortinet", image: r8 },
    { name: "Barracuda", image: r9 },
    { name: "TP-Link", image: r10 },
    { name: "Sophos", image: r11 },
    { name: "Ruijie", image: r12 },
    { name: "HP", image: r13 },
    { name: "Juniper Networks", image: r14 },
    { name: "Cisco", image: r15 },
    { name: "Hikvision", image: r16 },
    { name: "Dell", image: r17 },
    { name: "Matrix Telecom", image: r18 },
    { name: "Ruckus", image: r19 },
    { name: "Avaya", image: r20 },
    { name: "Ubiquiti", image: r21 },
    { name: "Huawei", image: r22 },
    { name: "Honeywell", image: r23 },
    { name: "Rapid", image: r24 },
    { name: "Logitech", image: r25 }
  ];

  return (
    <div className="bg-white dark:bg-[#020617] min-h-screen font-poppins text-slate-900 dark:text-white transition-colors duration-500">
      <Header />
      
      {/* PAGE HEADER */}
      <div className="w-full pt-[160px] pb-[60px] px-[20px] lg:px-[80px] bg-gray-50 dark:bg-[#050B14] border-b border-gray-200 dark:border-slate-800 text-center relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[60%] h-[100%] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none transition-colors duration-500"></div>
        
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider text-slate-900 dark:text-white mb-4 relative z-10 transition-colors duration-500" data-aos="fade-down">
          Product Distribution
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto relative z-10 font-medium transition-colors duration-500" data-aos="fade-up" data-aos-delay="100">
          Partnering with world-class technology leaders to deliver enterprise-grade hardware and software infrastructure across Kenya.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-[20px] lg:px-[80px] py-20 flex flex-col gap-24 relative z-10">
        
        {/* --- SECTION 1: DISTRIBUTORS --- */}
        <div className="w-full" data-aos="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 mb-3 transition-colors duration-500">
              Distributors
            </h2>
            <div className="w-16 h-1 bg-cyan-600 dark:bg-cyan-500 mx-auto rounded-full shadow-sm dark:shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-colors duration-500"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {distributors.map((item, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-[#0f172a] p-6 rounded-xl border border-gray-200 dark:border-slate-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 shadow-sm hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 flex items-center justify-center h-[120px] group cursor-pointer hover:-translate-y-1"
                data-aos="zoom-in"
                data-aos-delay={index * 50}
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="max-h-full max-w-full object-contain filter grayscale opacity-60 dark:opacity-80 group-hover:grayscale-0 transition-all duration-300 group-hover:opacity-100 mix-blend-multiply dark:mix-blend-normal group-hover:scale-105" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* --- SECTION 2: GLOBAL PARTNERS --- */}
        <div className="w-full" data-aos="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 dark:from-blue-400 dark:via-cyan-400 dark:to-purple-500 mb-3 transition-colors duration-500">
              Global Partners
            </h2>
            <div className="w-16 h-1 bg-cyan-600 dark:bg-cyan-500 mx-auto rounded-full shadow-sm dark:shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-colors duration-500"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {globalPartners.map((item, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-[#0f172a] p-6 rounded-xl border border-gray-200 dark:border-slate-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 shadow-sm hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 flex items-center justify-center h-[120px] group cursor-pointer hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={(index % 5) * 50}
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="max-h-full max-w-full object-contain filter grayscale opacity-60 dark:opacity-80 group-hover:grayscale-0 transition-all duration-300 group-hover:opacity-100 mix-blend-multiply dark:mix-blend-normal group-hover:scale-105" 
                />
              </div>
            ))}
          </div>
        </div>

      </div>
      
      <Footer />
    </div>
  );
};

export default PartnersPage;