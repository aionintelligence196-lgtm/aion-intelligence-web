// src/pages/PrivacyPolicy.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaShieldAlt, FaLock, FaUserSecret, FaServer, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const PrivacyPolicy = () => {
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
              Data Privacy & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Security</span>
            </h1>
            <p className="text-xs md:text-sm font-bold text-slate-500 dark:text-cyan-500/80 uppercase tracking-widest mt-2 flex items-center gap-2">
              <FaShieldAlt /> Compliant with the Kenya Data Protection Act (KDPA)
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
        <div className="absolute top-[10%] right-[-10%] w-[50%] h-[30%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none hidden dark:block"></div>

        {/* --- DOCUMENT CONTAINER --- */}
        <div 
          data-aos="fade-up"
          className="bg-white dark:bg-[#0f172a]/80 dark:backdrop-blur-xl p-8 md:p-16 rounded-[32px] border border-gray-200 dark:border-slate-800 shadow-sm dark:shadow-2xl relative overflow-hidden"
        >
          {/* Security Watermark */}
          <FaUserSecret className="absolute top-10 right-10 text-[150px] text-gray-50 dark:text-slate-800/30 opacity-50 pointer-events-none z-0" />

          <div className="relative z-10 space-y-12">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-sm border border-cyan-200 dark:border-cyan-800">1</span>
                Introduction & Protocol
              </h2>
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-sm">
                AIØN Intelligence Solutions ("AIØN", "we", "us", or "our") respects your privacy and is fundamentally committed to protecting your corporate and personal data. This privacy policy details how we collect, secure, process, and distribute your information when you access our enterprise platform, purchase hardware, or enroll in our partner ecosystems. We strictly adhere to the guidelines set forth by the <strong>Data Protection Act, 2019 of Kenya (KDPA)</strong>.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-sm border border-cyan-200 dark:border-cyan-800">2</span>
                Data Collection Metrics
              </h2>
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-sm mb-4">
                To facilitate secure hardware deployment and system architecture, we collect the following encrypted data profiles:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 bg-gray-50 dark:bg-[#050B14] p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                  <FaCheckCircle className="text-cyan-500 mt-0.5 shrink-0" />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white font-bold">Identity & Contact Data:</strong> Full names, corporate email addresses, secure phone lines, and physical delivery coordinates required for hardware logistics.
                  </p>
                </li>
                <li className="flex items-start gap-3 bg-gray-50 dark:bg-[#050B14] p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                  <FaLock className="text-emerald-500 mt-0.5 shrink-0" />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white font-bold">Financial & Transaction Data:</strong> AIØN does not store raw credit card or mobile money credentials. All payments are processed through secure, PCI-DSS compliant third-party gateways (e.g., Paystack). We only retain transaction reference numbers for our internal ledger.
                  </p>
                </li>
                <li className="flex items-start gap-3 bg-gray-50 dark:bg-[#050B14] p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                  <FaServer className="text-blue-500 mt-0.5 shrink-0" />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white font-bold">Technical Data:</strong> IP addresses, browser types, and session tokens utilized strictly for authentication, security monitoring, and anti-fraud protocols.
                  </p>
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-sm border border-cyan-200 dark:border-cyan-800">3</span>
                Utilization of Data
              </h2>
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-sm mb-4">
                Your data is exclusively utilized for the following corporate functions:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300 font-medium ml-2">
                <li>Executing and managing hardware procurement and delivery.</li>
                <li>Administering the AIØN Partner Ecosystem (Reseller & Advertiser hubs).</li>
                <li>Disbursing commission payouts to registered M-Pesa lines.</li>
                <li>Preventing unauthorized access and mitigating brute-force security threats.</li>
                <li>Providing critical system updates and architectural support.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-sm border border-cyan-200 dark:border-cyan-800">4</span>
                Enterprise Security Protocols
              </h2>
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-sm">
                We have engineered appropriate, military-grade security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. Data transiting between your browser and our servers is encrypted using <strong>AES-256 bit SSL encryption</strong>. Furthermore, our databases operate behind strict Row Level Security (RLS) and active rate-limiting firewalls.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-sm border border-cyan-200 dark:border-cyan-800">5</span>
                Your Legal Rights (KDPA)
              </h2>
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-sm mb-4">
                Under the Kenya Data Protection Act, you possess explicit rights regarding your personal data:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-[#050B14]">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white mb-1">Right to Access</h4>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Request a cryptographic copy of the personal data we hold about you.</p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-[#050B14]">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white mb-1">Right to Rectification</h4>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Request the immediate correction of any incomplete or inaccurate data.</p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-[#050B14]">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white mb-1">Right to Erasure</h4>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Request the permanent deletion of your profile and data from our active servers.</p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-[#050B14]">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white mb-1">Right to Object</h4>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Object to our processing of your data for direct marketing purposes.</p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="border-t border-gray-200 dark:border-slate-800 pt-8 mt-12">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4">Contact The Data Controller</h2>
              <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-sm mb-6">
                If you have any questions regarding this Privacy Policy or wish to exercise your legal rights, please initiate contact via our secure channels:
              </p>
              <div className="bg-gray-50 dark:bg-[#050B14] p-6 rounded-2xl border border-gray-200 dark:border-slate-700 w-max shadow-inner">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"><strong className="text-cyan-600 dark:text-cyan-400">Entity:</strong> AIØN Intelligence Solutions</p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"><strong className="text-cyan-600 dark:text-cyan-400">Secure Line:</strong> +254 700 558 302</p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"><strong className="text-cyan-600 dark:text-cyan-400">Email:</strong> client@aion.co.ke</p>
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

export default PrivacyPolicy;