// src/pages/Technologies.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  FaLandmark, FaHospital, FaGraduationCap, FaStore, 
  FaHome, FaIndustry, FaGlobe, FaArrowRight, FaTimes, 
  FaCheckCircle, FaProjectDiagram, FaServer, FaChartLine
} from 'react-icons/fa';

// --- PLACEHOLDER CASE STUDY DATA ---
// [NEED FROM CLIENT: Replace the text, stats, and image URLs below with real, approved project facts and figures.]
const caseStudiesData = [
  {
    id: 1,
    industry: 'Banks',
    icon: FaLandmark,
    clientType: 'Tier-1 Financial Institution',
    title: 'Zero-Latency Surveillance & Vault Access Control',
    challenge: 'The client required a unified security architecture across 15 branches to mitigate insider threats and ensure 100% uptime for vault surveillance, replacing a fragmented analog system.',
    solution: 'AIØN deployed a centralized IP-based infrastructure, integrating 4K ColorVu cameras with biometric access terminals, all managed via a single cloud NVR interface.',
    productsUsed: ['Hikvision 8MP ColorVu Cameras', 'ZKTeco ProFace X Terminals', 'Cisco Catalyst 24-Port Switches', 'Dell PowerEdge R750xs Server'],
    results: [
      'Reduced unauthorized access incidents by 99.8%',
      'Achieved 24/7 centralized monitoring across all 15 branches',
      'Cut video retrieval time from hours to seconds'
    ],
    image: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 2,
    industry: 'Hospitals',
    icon: FaHospital,
    clientType: 'Regional Medical Center',
    title: 'Integrated Biometrics & Sterile Zone Security',
    challenge: 'The hospital faced severe unauthorized access issues in sterile zones (ICU, Pharmacy) and needed a frictionless, hygienic way for doctors to move through secured doors.',
    solution: 'We engineered a touchless biometric ecosystem using facial recognition speed gates and integrated them with their existing HR database for real-time clearance revocation.',
    productsUsed: ['Hikvision Face Recognition Terminals', 'Ubiquiti UniFi Pro APs', 'APC Smart-UPS 3000VA', 'Contactless Exit Buttons'],
    results: [
      'Eliminated keycard sharing and loss',
      'Ensured 100% sterile compliance with touchless entry',
      'Deployed seamless Wi-Fi roaming for medical staff iPads'
    ],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 3,
    industry: 'Retail',
    icon: FaStore,
    clientType: 'National Supermarket Chain',
    title: 'Multi-Site POS & Loss Prevention Deployment',
    challenge: 'The retailer was losing revenue to internal shrinkage and slow checkout times caused by outdated POS terminals and blind spots in store aisles.',
    solution: 'AIØN executed a massive overnight hardware refresh, installing capacitive touch POS systems alongside panoramic fisheye cameras covering every aisle without dead zones.',
    productsUsed: ['ZKTeco All-in-One Touch POS', 'Epson Thermal Receipt Printers', 'Hikvision 12MP Fisheye Cameras'],
    results: [
      'Increased checkout speed by 40%',
      'Reduced inventory shrinkage by 65% within 3 months',
      'Provided HQ with real-time sales and security dashboards'
    ],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 4,
    industry: 'Factories',
    icon: FaIndustry,
    clientType: 'Heavy Manufacturing Plant',
    title: 'Perimeter Defense & Heavy-Duty Network Backbone',
    challenge: 'A massive industrial footprint meant standard Wi-Fi failed to reach production floors, while the external perimeter was vulnerable to night-time intrusions.',
    solution: 'We ran armored fiber-optic cabling across the facility for zero-latency networking and deployed solar-powered, AI-driven PTZ cameras along the perimeter fence.',
    productsUsed: ['Solar 4G PTZ Cameras', 'Armored Cat6 & Fiber Cabling', 'MikroTik Cloud Router Switches'],
    results: [
      'Achieved 100% network coverage on the factory floor',
      'Automated strobe/siren deterrence stopped 4 intrusion attempts',
      'Surpassed all industrial safety compliance audits'
    ],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000'
  }
];

const industries = [
  { name: 'All', icon: FaGlobe },
  { name: 'Banks', icon: FaLandmark },
  { name: 'Hospitals', icon: FaHospital },
  { name: 'Schools', icon: FaGraduationCap },
  { name: 'Retail', icon: FaStore },
  { name: 'Estates', icon: FaHome },
  { name: 'Factories', icon: FaIndustry }
];

const Technologies = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: false, easing: 'ease-out-cubic' });
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCaseStudy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedCaseStudy]);

  const filteredStudies = activeFilter === 'All' 
    ? caseStudiesData 
    : caseStudiesData.filter(study => study.industry === activeFilter);

  const handleRequestSolution = (study) => {
    // Route to contact page with pre-filled intent
    setSelectedCaseStudy(null);
    navigate(`/contact?action=quote&reference=CaseStudy_${study.id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-slate-50 dark:bg-[#020617] dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] dark:from-cyan-900/10 dark:via-[#020617] dark:to-[#020617] min-h-screen font-poppins text-slate-900 dark:text-white transition-colors duration-500 relative pb-24">
      <Header />

      {/* --- MODAL: CASE STUDY DEEP DIVE --- */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 backdrop-blur-xl bg-black/60 dark:bg-black/90 transition-opacity animate-fade-in-up">
          <div className="bg-white dark:bg-[#0f172a] w-full h-full md:h-[95vh] md:max-w-6xl md:rounded-[32px] shadow-2xl dark:shadow-[0_0_80px_rgba(34,211,238,0.2)] border border-gray-200 dark:border-slate-700/50 flex flex-col relative overflow-hidden">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedCaseStudy(null)} 
              className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-red-500 text-white p-3 rounded-full transition-all cursor-pointer backdrop-blur-md"
            >
              <FaTimes className="text-lg" />
            </button>

            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col md:flex-row">
              
              {/* Left Side: Hero Image & Key Metrics */}
              <div className="w-full md:w-5/12 bg-[#050b14] relative min-h-[300px] md:min-h-full flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-transparent to-black/50 z-10 pointer-events-none"></div>
                <img 
                  src={selectedCaseStudy.image} 
                  alt={selectedCaseStudy.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                
                <div className="relative z-20 mt-auto p-8 lg:p-12">
                  <span className="bg-cyan-600/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded uppercase tracking-widest flex items-center gap-2 w-max mb-4 shadow-[0_0_15px_rgba(34,211,238,0.4)] border border-cyan-400/50">
                    <selectedCaseStudy.icon /> {selectedCaseStudy.industry} Deployment
                  </span>
                  <h2 className="text-white text-3xl lg:text-4xl font-black leading-tight drop-shadow-lg mb-2">
                    {selectedCaseStudy.clientType}
                  </h2>
                </div>
              </div>

              {/* Right Side: Data & Architecture Details */}
              <div className="w-full md:w-7/12 bg-white dark:bg-[#0f172a] p-8 lg:p-14 flex flex-col relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none hidden dark:block"></div>
                
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-10 tracking-tight leading-snug">
                  {selectedCaseStudy.title}
                </h1>

                <div className="space-y-10 flex-grow relative z-10">
                  
                  {/* The Challenge */}
                  <div>
                    <h3 className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <FaChartLine className="text-red-500" /> The Challenge
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed bg-red-50 dark:bg-red-500/5 p-5 rounded-2xl border border-red-100 dark:border-red-500/10">
                      {selectedCaseStudy.challenge}
                    </p>
                  </div>

                  {/* The AIØN Solution */}
                  <div>
                    <h3 className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <FaProjectDiagram className="text-cyan-500" /> The AIØN Solution
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed bg-cyan-50 dark:bg-cyan-500/5 p-5 rounded-2xl border border-cyan-100 dark:border-cyan-500/10">
                      {selectedCaseStudy.solution}
                    </p>
                  </div>

                  {/* Architecture & Hardware */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <FaServer className="text-slate-700 dark:text-slate-300" /> Hardware Deployed
                      </h3>
                      <ul className="space-y-2">
                        {selectedCaseStudy.productsUsed.map((prod, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                            <span className="text-cyan-500 mt-1">•</span> {prod}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <FaCheckCircle className="text-emerald-500" /> Quantifiable Results
                      </h3>
                      <ul className="space-y-3">
                        {selectedCaseStudy.results.map((res, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-gray-50 dark:bg-[#050b14] p-3 rounded-lg border border-gray-100 dark:border-slate-800">
                            <FaCheckCircle className="text-emerald-500 mt-0.5 shrink-0" /> {res}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Conversion CTA */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-800 relative z-10">
                  <button 
                    onClick={() => handleRequestSolution(selectedCaseStudy)}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest text-sm shadow-[0_4px_20px_rgba(8,145,178,0.3)] hover:shadow-[0_4px_30px_rgba(8,145,178,0.5)] transition-all hover:-translate-y-1 cursor-pointer"
                  >
                    Request a Similar Architecture <FaArrowRight />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- ADDED PADDING WRAPPER TO CLEAR GLOBAL HEADER --- */}
      <div className="pt-[100px] md:pt-[140px]">
        
        {/* --- PAGE HEADER (Original style, no longer sticky) --- */}
        <div className="bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 py-10 px-4 sm:px-8 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] relative z-20 transition-colors">
          <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row justify-between lg:items-end gap-6">
            <div data-aos="fade-right">
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-md">
                Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Deployments</span>
              </h1>
              <p className="text-sm font-bold text-slate-500 dark:text-cyan-500/80 uppercase tracking-widest mt-2 max-w-xl">
                Case studies of resilient architectures engineered across East Africa.
              </p>
            </div>
          </div>
        </div>

        <main className="max-w-[1600px] mx-auto px-4 sm:px-8 pt-12 relative z-10">
          
          {/* --- DYNAMIC FILTER BAR --- */}
          <div className="flex overflow-x-auto gap-3 pb-4 mb-10 custom-scrollbar" data-aos="fade-up">
            {industries.map((ind) => (
              <button
                key={ind.name}
                onClick={() => setActiveFilter(ind.name)}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-full font-black uppercase tracking-widest text-xs shrink-0 transition-all cursor-pointer border ${
                  activeFilter === ind.name 
                    ? 'bg-cyan-600 border-cyan-600 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)]' 
                    : 'bg-white dark:bg-[#050b14] border-gray-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400'
                }`}
              >
                <ind.icon className="text-sm" /> {ind.name}
              </button>
            ))}
          </div>

          {/* --- CASE STUDIES GRID --- */}
          {filteredStudies.length === 0 ? (
            <div className="text-center py-32 bg-white dark:bg-[#0f172a]/50 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
              <p className="text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest text-lg">No public case studies available for this sector yet.</p>
              <p className="text-sm font-medium text-slate-500 mt-2">Contact our engineering team for private sector deployment histories.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredStudies.map((study, index) => (
                <div 
                  key={study.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  onClick={() => setSelectedCaseStudy(study)}
                  className="group flex flex-col bg-white dark:bg-[#0f172a]/80 dark:backdrop-blur-xl rounded-[32px] overflow-hidden border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-[0_10px_40px_rgba(34,211,238,0.15)] transition-all duration-500 hover:-translate-y-2 cursor-pointer hover:border-cyan-500/50"
                >
                  {/* Image Section */}
                  <div className="w-full h-[240px] relative overflow-hidden bg-[#050b14]">
                    <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/20 mix-blend-overlay transition-colors duration-500 z-10 pointer-events-none"></div>
                    <img 
                      src={study.image} 
                      alt={study.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                    />
                    {/* Floating Industry Badge */}
                    <div className="absolute top-4 left-4 z-20 bg-white/90 dark:bg-[#020617]/80 backdrop-blur-md text-slate-900 dark:text-white text-[10px] font-black px-3 py-1.5 rounded uppercase tracking-widest flex items-center gap-1.5 border border-gray-200 dark:border-slate-700 shadow-lg">
                      <study.icon className="text-cyan-600 dark:text-cyan-400" /> {study.industry}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 flex flex-col flex-grow relative">
                    <h3 className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">
                      {study.clientType}
                    </h3>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                      {study.title}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed line-clamp-3 mb-6">
                      {study.challenge}
                    </p>

                    {/* Read More Link */}
                    <div className="mt-auto border-t border-gray-100 dark:border-slate-800/80 pt-5">
                      <span className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-black uppercase tracking-widest group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                        Read Full Case Study <FaArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Technologies;