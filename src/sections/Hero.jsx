// src/sections/Hero.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import backgroundimage from '../assets/hero_bg.jpg';
import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CyberCore from './CyberCore';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // --- DYNAMIC ENTERPRISE SLIDE DATA ---
  const slideData = [
    {
      id: 0,
      subheading: "AIØN Intelligence Solutions",
      heading: "Intelligent Security and Surveillance for the Modern Enterprise.",
      description: "We design, deploy, and manage advanced CCTV systems and smart automation engineered for total operational control.",
      ctaText: "Explore Hardware",
      ctaLink: "/products?category=Security+%26+Surveillance",
      mediaType: "video",
      mediaSource: video1
    },
    {
      id: 1,
      subheading: "Enterprise Architecture",
      heading: "High-Performance IT & Cloud Infrastructure.",
      description: "From Gigabit PoE+ networking to redundant server racks, we supply the backbone for East Africa's fastest-growing corporations.",
      ctaText: "View Solutions",
      ctaLink: "/solutions",
      mediaType: "video",
      mediaSource: video2
    },
    {
      id: 2,
      subheading: "Next-Generation Security",
      heading: "Frictionless Access Control & Biometrics.",
      description: "Deploy state-of-the-art facial recognition, RFID turnstiles, and automated speed gates to secure your physical perimeters.",
      ctaText: "See Case Studies",
      ctaLink: "/technologies",
      mediaType: "component"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slideData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slideData.length - 1 : prev - 1));
  };

  // Auto-advance slider every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      delay: 100,
      once: false,
    });
  }, []);

  return (
    <div
      id='hero'
      className='relative w-full min-h-[100vh] lg:h-[90vh] overflow-hidden bg-cover bg-center group font-poppins'
      style={{ backgroundImage: `url(${backgroundimage})` }}
    >
      {/* Cinematic Gradient Overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#020617]/80 to-transparent z-0"></div>
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* --- SLIDER TRACK --- */}
      <div 
        className='flex transition-transform duration-1000 ease-in-out w-full h-full relative z-10'
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slideData.map((slide, index) => (
          <div 
            key={slide.id} 
            className='w-full h-full flex-shrink-0 flex lg:flex-row flex-col justify-between items-center lg:px-20 px-6 pt-32 pb-24 lg:pt-0 lg:pb-0 gap-10 lg:gap-16'
          >
            {/* Left Side: Text Content */}
            <div className='lg:w-1/2 w-full flex flex-col gap-6 items-start justify-center pt-10 lg:pt-0'>
              <h2
                className={`text-cyan-400 uppercase text-xs md:text-sm font-black tracking-[0.3em] drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-700 transform ${currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              >
                {slide.subheading}
              </h2>
              
              <h1
                className={`text-white text-4xl md:text-5xl lg:text-[60px] capitalize font-black leading-[1.1em] drop-shadow-lg transition-all duration-700 delay-100 transform ${currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              >
                {slide.heading}
              </h1>
              
              <p
                className={`text-slate-300 text-base md:text-lg font-medium leading-relaxed drop-shadow-md max-w-xl transition-all duration-700 delay-200 transform ${currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              >
                {slide.description}
              </p>
              
              <button
                onClick={() => navigate(slide.ctaLink)}
                className={`bg-cyan-600 hover:bg-cyan-500 text-white py-4 px-8 text-sm font-black mt-4 rounded-xl transition-all duration-500 shadow-[0_4px_25px_rgba(8,145,178,0.5)] uppercase tracking-widest hover:-translate-y-1 cursor-pointer transform ${currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              >
                {slide.ctaText}
              </button>
            </div>

            {/* Right Side: Media Content */}
            <div className={`lg:w-1/2 w-full flex justify-center items-center transition-all duration-1000 delay-300 transform ${currentSlide === index ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <div className='w-full max-w-[600px] flex items-center justify-center p-3 bg-cyan-500/10 rounded-[32px] overflow-hidden border border-cyan-500/30 shadow-[0_0_40px_rgba(34,211,238,0.15)] backdrop-blur-md hover:border-cyan-400/60 transition-colors duration-500'>
                <div className='w-full aspect-[4/3] flex items-center justify-center rounded-[20px] overflow-hidden bg-[#050B14] shadow-inner relative'>
                  
                  {slide.mediaType === 'video' && (
                    <>
                      <div className="absolute inset-0 bg-cyan-500/5 mix-blend-overlay z-10 pointer-events-none"></div>
                      <video 
                        src={slide.mediaSource} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="w-full h-full object-cover scale-105"
                      />
                    </>
                  )}

                  {slide.mediaType === 'component' && (
                    <div className="w-full h-full flex items-center justify-center bg-[#020617]">
                      <CyberCore />
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- NAVIGATION ARROWS --- */}
      <button 
        onClick={prevSlide} 
        aria-label="Previous Slide"
        className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-700 text-white/70 hover:text-white hover:bg-cyan-600 hover:border-cyan-400 transition-all duration-300 flex items-center justify-center text-xl z-20 opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer"
      >
        <IoIosArrowBack />
      </button>

      <button 
        onClick={nextSlide} 
        aria-label="Next Slide"
        className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/60 backdrop-blur-md border border-slate-700 text-white/70 hover:text-white hover:bg-cyan-600 hover:border-cyan-400 transition-all duration-300 flex items-center justify-center text-xl z-20 opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer"
      >
        <IoIosArrowForward />
      </button>

      {/* --- PAGINATION DOTS --- */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20 bg-black/40 backdrop-blur-md px-5 py-3 rounded-full border border-white/10">
        {slideData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-500 cursor-pointer outline-none ${
              currentSlide === index 
                ? 'w-10 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]' 
                : 'w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;