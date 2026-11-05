// src/sections/AionMarquee.jsx
import React from 'react';
import { FaBolt, FaShieldAlt, FaPhoneAlt } from 'react-icons/fa';

const AionMarquee = () => {
  // Using an array of objects to add icons to the text for extra flair
  const marqueeItems = [
    { text: "24 hr Country-Wide Delivery", icon: <FaBolt className="text-yellow-400" /> },
    { text: "100% Genuine Enterprise Hardware", icon: <FaShieldAlt className="text-cyan-400" /> },
    { text: "Contact: +254 700 558 302 / +254 116 644 202", icon: <FaPhoneAlt className="text-green-400" /> }
  ];

  return (
    <div className="w-full bg-cyan-700 dark:bg-cyan-900 border-y border-cyan-600 dark:border-cyan-800 py-3 overflow-hidden flex items-center shadow-inner transition-colors duration-500">
      
      {/* The moving track container */}
      <div className="flex w-max animate-marquee whitespace-nowrap">
        
        {/* We map the items 4 times to guarantee the screen is filled and the loop is invisible */}
        {[...Array(4)].map((_, groupIndex) => (
          <div key={groupIndex} className="flex items-center px-4">
            {marqueeItems.map((item, index) => (
              <React.Fragment key={`${groupIndex}-${index}`}>
                <div className="flex items-center gap-3 px-8 group cursor-default">
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]">
                    {item.icon}
                  </span>
                  <span className="text-white font-poppins font-bold text-sm tracking-widest uppercase drop-shadow-md">
                    {item.text}
                  </span>
                </div>
                
                {/* Custom glowing separator */}
                <div className="w-2 h-2 rounded-full bg-cyan-300 dark:bg-cyan-500 shadow-[0_0_10px_rgba(103,232,249,0.8)] mx-4"></div>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        /* 
         * By shifting exactly -50% of the total track width, 
         * the animation ends exactly where it began visually, creating an infinite loop.
         */
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        /* Pause the animation if the user hovers over the banner */
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default AionMarquee;