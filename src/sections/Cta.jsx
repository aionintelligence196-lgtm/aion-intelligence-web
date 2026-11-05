// src/sections/Cta.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import backgroundImage from '../assets/hero_bg.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Cta = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      delay: 200,
      once: false,
    });
  }, []);

  return (
    <div
      id='contact'
      className='w-full h-auto flex flex-col items-center justify-center lg:px-[80px] px-[20px] lg:py-[80px] py-[40px] gap-[20px] bg-cover bg-center relative overflow-hidden transition-colors duration-500'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark overlay to ensure white text is always readable over the background image */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>
      
      {/* Dynamic Glows (Dark Mode Only) */}
      <div className="absolute top-[-20%] left-[-10%] w-[30%] h-[50%] bg-cyan-600/30 rounded-full blur-[100px] hidden dark:block z-0 pointer-events-none"></div>

      <h1
        data-aos='zoom-in'
        data-aos-delay='50'
        className='text-cyan-400 uppercase text-sm font-poppins font-black tracking-[0.3em] relative z-10 drop-shadow-sm'
      >
        Ready to Get Started
      </h1>
      
      <h1
        data-aos='zoom-in'
        data-aos-delay='100'
        className='text-white lg:text-[45px] text-[30px] capitalize leading-[1.2em] font-poppins lg:w-[50%] w-full text-center font-black relative z-10 drop-shadow-md'
      >
        Let's Elevate Your Enterprise Together
      </h1>
      
      <p
        data-aos='zoom-in'
        data-aos-delay='150'
        className='text-gray-300 text-md font-poppins lg:w-[60%] w-full text-center leading-relaxed relative z-10 font-medium drop-shadow-md'
      >
        Partner with <strong className="text-white font-bold">AIØN Intelligence Solutions</strong> to secure, scale, and optimize your physical and digital infrastructure. Our experts are ready to design your next solution.
      </p>

      <div
        data-aos='slide-up'
        data-aos-delay='0'
        id='two-buttons'
        className='flex lg:flex-row flex-col justify-center items-center lg:gap-6 gap-4 mt-6 relative z-10 w-full lg:w-auto'
      >
        {/* 1. Routes to the Contact Page */}
        <Link 
          to="/contact" 
          className='w-full lg:w-auto bg-cyan-600 hover:bg-cyan-500 text-white py-4 px-10 text-md font-bold rounded-lg transition-all duration-300 shadow-[0_4px_15px_rgba(8,145,178,0.3)] hover:shadow-[0_6px_25px_rgba(8,145,178,0.5)] text-center hover:-translate-y-1 tracking-wider uppercase'
        >
          CONTACT US
        </Link>
        
        {/* 2. Opens the phone dialer */}
        <a 
          href="tel:+254116644202" 
          className='w-full lg:w-auto bg-white hover:bg-gray-200 text-[#020617] py-4 px-10 text-md font-bold rounded-lg transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 tracking-wider uppercase'
        >
          REACH US DIRECTLY
        </a>
      </div>
    </div>
  );
};

export default Cta;