// src/pages/SolutionsPage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import solutionHero from '../assets/solution.jpg'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  FaNetworkWired, FaShieldAlt, FaLaptopCode, 
  FaServer, FaMicrochip, FaCogs, FaCheckCircle 
} from 'react-icons/fa';

const SolutionsPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 100,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const solutions = [
    {
      icon: <FaNetworkWired className="text-4xl text-cyan-600 dark:text-cyan-500 mb-4 drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />,
      title: "Enterprise Network Infrastructure",
      desc: "Architecting high-availability, zero-latency networks. We deploy scalable structured cabling, advanced routing, and secure wireless ecosystems designed for uninterrupted operations."
    },
    {
      icon: <FaShieldAlt className="text-4xl text-cyan-600 dark:text-cyan-500 mb-4 drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />,
      title: "Advanced Security Systems",
      desc: "Military-grade digital and physical security. From AI-driven CCTV surveillance to biometric access control and integrated threat monitoring, your perimeter is completely secured."
    },
    {
      icon: <FaLaptopCode className="text-4xl text-cyan-600 dark:text-cyan-500 mb-4 drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />,
      title: "Custom Software & Web Ecosystems",
      desc: "We build immersive 3D web environments and high-performance bespoke software. Our React and modern stack development ensures aggressive scaling and autonomous workflows."
    },
    {
      icon: <FaMicrochip className="text-4xl text-cyan-600 dark:text-cyan-500 mb-4 drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />,
      title: "High-Tier Enterprise Hardware",
      desc: "Equipping your workforce with elite technical firepower. We procure, configure, and maintain specialized enterprise workstations and intelligent hardware infrastructure."
    },
    {
      icon: <FaServer className="text-4xl text-cyan-600 dark:text-cyan-500 mb-4 drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />,
      title: "Cloud & Data Center Solutions",
      desc: "Seamless cloud migrations and hybrid data center management. We ensure your critical data is securely hosted, instantly accessible, and heavily backed up against failure."
    },
    {
      icon: <FaCogs className="text-4xl text-cyan-600 dark:text-cyan-500 mb-4 drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />,
      title: "Smart Automation & IoT",
      desc: "Transforming static environments into intelligent spaces. We integrate climate, lighting, and security into unified, automated platforms for corporate headquarters."
    }
  ];

  return (
    <>
      <Header />
      
      {/* --- HERO SECTION --- */}
      <div className='w-full min-h-[60vh] flex flex-col justify-center items-center lg:px-[80px] px-[20px] pt-[150px] pb-[80px] bg-slate-50 dark:bg-[#0f1423] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500'>
        
        {/* Background Glow Effects (Dark Mode Only) */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-cyan-600/5 dark:bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none hidden dark:block transition-opacity duration-500"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-blue-600/5 dark:bg-cyan-800/10 rounded-full blur-[120px] pointer-events-none hidden dark:block transition-opacity duration-500"></div>

        <div className="flex flex-col items-center justify-center text-center z-10 w-full max-w-5xl" data-aos="fade-down">
          <span className="text-cyan-700 dark:text-cyan-500 uppercase tracking-[0.3em] font-bold text-xs md:text-sm mb-4 drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
            Services & Solutions
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-800 dark:from-cyan-400 dark:via-cyan-300 dark:to-cyan-500 mb-6 leading-[1.1] drop-shadow-sm">
            Driving Digital <br /> Transformation
          </h1>
          <p className="text-slate-600 dark:text-gray-300 text-sm md:text-lg font-poppins max-w-3xl leading-relaxed font-medium">
            At <strong className="text-slate-900 dark:text-white">AIØN Intelligence Solutions</strong>, we engineer flawless technological ecosystems. We seamlessly bridge the gap between premium physical hardware and autonomous digital workflows to establish absolute operational dominance for your enterprise.
          </p>
        </div>
      </div>

      {/* --- CORE SOLUTIONS GRID --- */}
      <div className="w-full bg-white dark:bg-[#111111] py-24 lg:px-[80px] px-[20px] border-y border-gray-200 dark:border-[#2d2d2d] relative z-10 transition-colors duration-500">
        
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Our Complete ICT Portfolio</h2>
          <div className="w-20 h-1 bg-cyan-600 dark:bg-cyan-500 mx-auto rounded-full shadow-sm dark:shadow-[0_0_10px_rgba(34,211,238,0.6)]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1600px] mx-auto">
          {solutions.map((item, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-[#1c1c1c] p-8 md:p-10 rounded-2xl border border-gray-200 dark:border-[#2d2d2d] hover:border-cyan-500/50 dark:hover:border-cyan-500/50 shadow-sm hover:shadow-lg dark:shadow-none dark:hover:shadow-[0_4px_30px_rgba(34,211,238,0.1)] transition-all duration-300 group transform hover:-translate-y-2 cursor-default"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="w-16 h-16 rounded-xl bg-white dark:bg-[#111111] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-gray-200 dark:border-[#2d2d2d] group-hover:border-cyan-500/30 shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-lg md:text-xl text-slate-900 dark:text-white font-black mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300 tracking-tight">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-gray-400 text-xs md:text-sm leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --- WHY CHOOSE AION SECTION (SPLIT LAYOUT) --- */}
      <div className="w-full bg-slate-50 dark:bg-[#0f1423] py-24 lg:px-[80px] px-[20px] transition-colors duration-500">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <div className="lg:w-1/2 w-full" data-aos="fade-right">
            <h2 className="text-xs text-cyan-700 dark:text-cyan-500 font-black tracking-widest uppercase mb-2 drop-shadow-sm">The AIØN Standard</h2>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
              Architecting Systems With <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-cyan-800 dark:from-cyan-400 dark:to-cyan-200">Zero Weaknesses.</span>
            </h3>
            <p className="text-slate-600 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-8 font-medium">
              We reject operational bottlenecks and piecemeal fixes. Whether you are outfitting a new corporate headquarters in Nairobi or deploying an aggressively scalable software architecture, we deliver solutions designed for ultimate control and reliability.
            </p>
            
            <ul className="space-y-4">
              {[
                "End-to-End System Integration (Hardware & Software)",
                "Proactive 24/7 Security & Threat Monitoring",
                "Scalable Architectures for Future Growth",
                "Elite Technical Consultation & Deployment"
              ].map((point, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-700 dark:text-gray-300 text-xs md:text-sm">
                  <FaCheckCircle className="text-cyan-600 dark:text-cyan-500 text-lg shrink-0 drop-shadow-sm dark:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]" />
                  <span className="font-poppins font-bold">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:w-1/2 w-full relative group" data-aos="fade-left">
            <div className="absolute inset-0 bg-cyan-600/5 dark:bg-cyan-500/10 rounded-[24px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <img 
              src={solutionHero} 
              alt="AIØN Tech Transformation" 
              className="w-full h-auto rounded-[24px] shadow-lg dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] relative z-10 border border-gray-200 dark:border-[#2d2d2d] group-hover:border-cyan-500/30 transition-colors duration-500" 
            />
          </div>

        </div>
      </div>

      {/* --- CALL TO ACTION --- */}
      <div className="w-full bg-white dark:bg-[#111111] py-20 text-center border-t border-gray-200 dark:border-[#2d2d2d] transition-colors duration-500">
        <div className="max-w-3xl mx-auto px-6" data-aos="zoom-in">
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Ready to Upgrade Your Enterprise?</h2>
          <p className="text-slate-600 dark:text-gray-400 mb-8 font-medium text-xs md:text-sm">
            Partner with <strong className="text-slate-900 dark:text-white">AIØN Intelligence Solutions</strong> to design, secure, and scale your technological infrastructure.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white font-black py-4 px-8 md:px-10 rounded-xl transition-colors duration-300 shadow-sm dark:shadow-[0_4px_15px_rgba(34,211,238,0.3)] uppercase tracking-widest text-xs"
          >
            Consult With Our Experts
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SolutionsPage;