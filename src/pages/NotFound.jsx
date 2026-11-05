// src/pages/NotFound.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-[#020617] dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] dark:from-cyan-900/10 dark:via-[#020617] dark:to-[#020617] min-h-screen font-poppins text-slate-900 dark:text-white transition-colors duration-500 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center relative z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div data-aos="zoom-in" className="relative z-10 bg-white dark:bg-[#0f172a]/80 dark:backdrop-blur-xl p-10 md:p-16 rounded-[32px] border border-gray-200 dark:border-slate-800 shadow-xl max-w-lg w-full flex flex-col items-center">
          <FaExclamationTriangle className="text-6xl text-cyan-600 dark:text-cyan-400 mb-6 drop-shadow-md" />
          <h1 className="text-6xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">404</h1>
          <h2 className="text-xl font-black uppercase tracking-widest text-cyan-700 dark:text-cyan-500 mb-6">Directory Not Found</h2>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-8">
            The requested architecture or page vector could not be located in our database. It may have been moved or permanently deleted.
          </p>
          <Link to="/" className="flex items-center justify-center gap-3 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black py-4 rounded-xl transition-all shadow-md uppercase tracking-widest text-xs">
            <FaHome /> Return to Headquarters
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;