// src/pages/Terms.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaGavel, FaCheckCircle, FaExclamationCircle, FaArrowLeft, FaFileContract } from 'react-icons/fa';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
  }, []);

  const lastUpdated = "October 15, 2026";

  return (
    <div className="bg-slate-50 dark:bg-[#020617] dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] dark:from-cyan-900/10 dark:via-[#020617] dark:to-[#020617] min-h-screen font-poppins text-slate-900 dark:text-white transition-colors duration-500 relative pb-24">
      <Header />

      {/* --- PAGE HEADER --- */}
      <div className="bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 pt-28 pb-8 px-4 sm:px-8 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] sticky top-[60px] md:top-[76px] z-30 transition-colors">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row justify-between md:items-end gap-6">
          <div data-aos="fade-right">
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors mb-4 cursor-pointer">
              <FaArrowLeft /> Return to Headquarters
            </Link>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-md">
              Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Service</span>
            </h1>
            <p className="text-xs md:text-sm font-bold text-slate-500 dark:text-cyan-500/80 uppercase tracking-widest mt-2 flex items-center gap-2">
              <FaGavel /> Enterprise Procurement & Partner Agreement
            </p>
          </div>
          <div className="text-left md:text-right" data-aos="fade-left">
            <span className="bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/50 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">
              Effective Date: {lastUpdated}
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-[1000px] mx-auto px-4 sm:px-8 pt-12 relative z-10">
        
        {/* Ambient Glow */}
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none hidden dark:block"></div>

        {/* --- DOCUMENT CONTAINER --- */}
        <div 
          data-aos="fade-up"
          className="bg-white dark:bg-[#0f172a]/80 dark:backdrop-blur-xl p-8 md:p-16 rounded-[32px] border border-gray-200 dark:border-slate-800 shadow-sm dark:shadow-2xl relative overflow-hidden"
        >
          {/* Legal Watermark */}
          <FaFileContract className="absolute top-10 right-10 text-[150px] text-gray-50 dark:text-slate-800/30 opacity-50 pointer-events-none z-0" />

          <div className="relative z-10 space-y-12">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-sm border border-cyan-200 dark:border-cyan-800">1</span>
                Agreement Acceptance
              </h2>
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-sm">
                By accessing the AIØN Intelligence Solutions platform, procuring enterprise hardware, or enrolling in our Partner Ecosystem, you agree to be bound by these Terms of Service. If you are accepting these terms on behalf of a corporate entity, you represent and warrant that you have the legal authority to bind that entity to these conditions.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-sm border border-cyan-200 dark:border-cyan-800">2</span>
                Hardware Procurement & Deployment
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 bg-gray-50 dark:bg-[#050B14] p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                  <FaCheckCircle className="text-cyan-500 mt-0.5 shrink-0" />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white font-bold">Pricing & Quotations:</strong> All prices listed are in Kenyan Shillings (KES) and are exclusive of Value Added Tax (VAT) unless explicitly stated otherwise. Custom deployment quotes remain valid for 14 calendar days from the date of issue.
                  </p>
                </li>
                <li className="flex items-start gap-3 bg-gray-50 dark:bg-[#050B14] p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                  <FaCheckCircle className="text-cyan-500 mt-0.5 shrink-0" />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white font-bold">Warranties:</strong> AIØN provides a standard 1-year enterprise replacement warranty on all physical hardware (cameras, servers, networking gear) covering manufacturing defects. Physical damage, electrical surges, or unauthorized modifications void this warranty.
                  </p>
                </li>
              </ul>
            </section>

            {/* Section 3 - CRITICAL LEGAL AFFILIATE TERMS */}
            <section>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-sm border border-cyan-200 dark:border-cyan-800">3</span>
                AIØN Partner Ecosystem Agreement
              </h2>
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-sm mb-4">
                Participation in the AIØN Reseller and Affiliate programs is subject to strict regulatory and operational compliance:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                  <FaCheckCircle className="text-emerald-500 mt-0.5 shrink-0" />
                  <p className="text-sm font-medium text-emerald-800 dark:text-emerald-400/90">
                    <strong className="text-emerald-900 dark:text-emerald-300 font-bold">Zero-Fee Structure:</strong> There are absolutely no joining fees, subscription costs, or mandatory hardware purchases required to become an AIØN Partner.
                  </p>
                </li>
                <li className="flex items-start gap-3 bg-gray-50 dark:bg-[#050B14] p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                  <FaExclamationCircle className="text-cyan-500 mt-0.5 shrink-0" />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white font-bold">Verified Sales Only:</strong> Commissions are generated strictly through verified, successfully delivered, and fully paid hardware deployments originating from your unique referral gateway.
                  </p>
                </li>
                <li className="flex items-start gap-3 bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-800/30">
                  <FaExclamationCircle className="text-red-500 mt-0.5 shrink-0" />
                  <p className="text-sm font-medium text-red-800 dark:text-red-400/90">
                    <strong className="text-red-900 dark:text-red-300 font-bold">Anti-Pyramid Compliance:</strong> AIØN does NOT compensate partners for recruiting other partners. Multi-level compensation for recruitment is strictly prohibited and grounds for immediate termination of your clearance.
                  </p>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-sm border border-cyan-200 dark:border-cyan-800">4</span>
                Payment Processing & Disbursements
              </h2>
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-sm mb-4">
                Authorized payments for hardware must be routed through our secure PCI-DSS compliant gateways (e.g., Paystack) via Visa, Mastercard, or M-Pesa STK Push. 
              </p>
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-sm">
                For our Partners, commission payouts are disbursed directly to registered M-Pesa numbers via the Partner Dashboard. AIØN reserves the right to delay payouts by up to 14 days to clear fraud verification protocols on large enterprise transactions.
              </p>
            </section>

            {/* Section 5 */}
            <section className="border-t border-gray-200 dark:border-slate-800 pt-8 mt-12">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4">Legal Jurisdiction</h2>
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-sm mb-6">
                These Terms of Service, and any disputes arising from your relationship with AIØN Intelligence Solutions, shall be governed by and construed in accordance with the laws of the Republic of Kenya.
              </p>
              <div className="bg-gray-50 dark:bg-[#050B14] p-6 rounded-2xl border border-gray-200 dark:border-slate-700 w-max shadow-inner">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"><strong className="text-cyan-600 dark:text-cyan-400">Legal Entity:</strong> AIØN Intelligence Solutions</p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300"><strong className="text-cyan-600 dark:text-cyan-400">Headquarters:</strong> Nairobi, Kenya</p>
              </div>
            </section>

          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default Terms;