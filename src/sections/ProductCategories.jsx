// src/sections/ProductCategories.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

// --- IMAGES ---
import N1 from '../assets/N1.jpg';
import N2 from '../assets/N2.jpg';
import N3 from '../assets/N3.jpg';
import N4 from '../assets/N4.jpg';
import N5 from '../assets/N5.jpg';
import N6 from '../assets/N6.jpg';
import N7 from '../assets/N7.jpg';
import N8 from '../assets/N8.jpg';
import N9 from '../assets/N9.jpg';

const ProductCategories = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mapped categories to exact URL filters in the Products Page
  const categories = [
    { name: 'Networks', image: N1, link: '/products?category=Networking+%26+Wi-Fi' },
    { name: 'Security', image: N2, link: '/products?category=Security+%26+Surveillance' },
    { name: 'Software', image: N3, link: '/products?category=Software+%26+Web+Development' },
    { name: 'Home Automation', image: N4, link: '/products?category=Smart+Home+%26+Office' },
    { name: 'Cloud Services', image: N5, link: '/products?category=Servers+%26+Cloud+Infrastructure' },
    { name: 'Access Controls', image: N6, link: '/products?category=Access+Control+%26+Biometrics' },
    { name: 'Accessories', image: N7, link: '/products?category=Accessories+%26+Cables' },
    { name: 'Cables', image: N8, link: '/products?category=Accessories+%26+Cables' },
    { name: 'Electronics', image: N9, link: '/products?category=Point+of+Sale+(POS)' },
  ];

  // Duplicate the array to create a seamless infinite loop illusion
  const extendedCategories = [...categories, ...categories];

  // --- INTELLIGENT AUTO-SCROLL ---
  useEffect(() => {
    AOS.init({ duration: 800, once: false, easing: 'ease-out-cubic' });

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Pause scroll if user is hovering to click a link
    let interval;
    if (!isHovered) {
      interval = setInterval(() => {
        if (scrollContainer) {
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
            scrollContainer.style.scrollBehavior = 'auto'; // Disable smooth snap for instant reset
            scrollContainer.scrollLeft = 0;
            // Re-enable smooth scrolling after reset
            setTimeout(() => { scrollContainer.style.scrollBehavior = 'smooth'; }, 50);
          } else {
            scrollContainer.scrollBy({ left: 320, behavior: 'smooth' });
          }
        }
      }, 3500); // 3.5 seconds for a premium, unhurried pace
    }

    return () => clearInterval(interval);
  }, [isHovered]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-white dark:bg-[#020617] py-20 lg:py-32 px-4 lg:px-12 border-t border-gray-100 dark:border-slate-800/80 transition-colors duration-500 overflow-hidden relative font-poppins">
      
      {/* Background Ambient Accents */}
      <div className="absolute top-0 right-[-10%] w-[30%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none hidden dark:block transition-all duration-700"></div>

      <div className="max-w-[1600px] mx-auto">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div data-aos="fade-right">
            <h2 className="text-cyan-600 dark:text-cyan-400 uppercase text-xs md:text-sm font-black tracking-[0.3em] mb-2 dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
              Hardware Architecture
            </h2>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white capitalize leading-tight tracking-tight">
              Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Inventory</span>
            </h1>
          </div>
          
          <Link 
            to="/products" 
            data-aos="fade-left"
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group"
          >
            Explore Full Catalog 
            <span className="bg-gray-100 dark:bg-slate-800 p-2 rounded-full group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/30 transition-colors">
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* CAROUSEL CONTAINER */}
        <div 
          className="relative w-full group" 
          data-aos="fade-up" 
          data-aos-delay="100"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Left Arrow (Glassmorphic) */}
          <button 
            onClick={() => scroll('left')}
            aria-label="Scroll Left"
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 lg:-ml-6 z-20 bg-white/90 dark:bg-[#0f172a]/90 hover:bg-cyan-600 dark:hover:bg-cyan-500 text-cyan-600 dark:text-cyan-400 hover:text-white dark:hover:text-[#020617] w-14 h-14 flex items-center justify-center rounded-full border border-gray-200 dark:border-cyan-500/50 shadow-xl backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex cursor-pointer"
          >
            <FaChevronLeft className="text-xl mr-1" />
          </button>

          {/* Scrollable Track */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 snap-x snap-mandatory scroll-smooth hide-scrollbar pb-8 pt-4 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>
              {`.hide-scrollbar::-webkit-scrollbar { display: none; }`}
            </style>

            {extendedCategories.map((cat, index) => (
              <Link 
                key={index}
                to={cat.link}
                className="snap-start shrink-0 w-[280px] sm:w-[320px] lg:w-[350px] bg-white dark:bg-[#0f172a]/90 dark:backdrop-blur-xl rounded-[24px] overflow-hidden border border-gray-200 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-500/50 shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all duration-300 flex flex-col group/card cursor-pointer"
              >
                {/* Image Box */}
                <div className="w-full h-[220px] md:h-[260px] overflow-hidden bg-gray-50 dark:bg-[#050B14] flex items-center justify-center p-8 relative transition-colors duration-500 border-b border-gray-100 dark:border-slate-800/80">
                  <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-0 hidden dark:block"></div>
                  
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="max-w-full max-h-full object-contain relative z-10 group-hover/card:scale-110 transition-transform duration-700 mix-blend-multiply dark:mix-blend-normal"
                  />
                </div>
                
                {/* Category Label */}
                <div className="w-full bg-white dark:bg-[#0f172a] py-5 px-6 flex items-center justify-between group-hover/card:bg-cyan-50 dark:group-hover/card:bg-cyan-900/10 transition-colors duration-300">
                  <h3 className="text-slate-900 dark:text-white text-lg font-black tracking-wide group-hover/card:text-cyan-600 dark:group-hover/card:text-cyan-400 transition-colors">
                    {cat.name}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover/card:bg-cyan-600 group-hover/card:text-white transition-all duration-300 transform group-hover/card:translate-x-1">
                    <FaArrowRight className="text-xs" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Arrow (Glassmorphic) */}
          <button 
            onClick={() => scroll('right')}
            aria-label="Scroll Right"
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 lg:-mr-6 z-20 bg-white/90 dark:bg-[#0f172a]/90 hover:bg-cyan-600 dark:hover:bg-cyan-500 text-cyan-600 dark:text-cyan-400 hover:text-white dark:hover:text-[#020617] w-14 h-14 flex items-center justify-center rounded-full border border-gray-200 dark:border-cyan-500/50 shadow-xl backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex cursor-pointer"
          >
            <FaChevronRight className="text-xl ml-1" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ProductCategories;