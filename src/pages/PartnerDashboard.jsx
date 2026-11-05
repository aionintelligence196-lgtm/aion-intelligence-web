// src/pages/PartnerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import { supabase } from '../supabaseClient';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  FaMoneyBillWave, FaChartLine, FaLink, FaBullhorn, 
  FaWallet, FaCopy, FaWhatsapp, FaCheckCircle, 
  FaUserTie, FaNetworkWired, FaShieldAlt, FaMobileAlt
} from 'react-icons/fa';

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview | links | payouts
  const [partnerMode, setPartnerMode] = useState('reseller'); // reseller | advertiser
  const [copied, setCopied] = useState(false);

  // --- MOCK PARTNER DATA (To be replaced with real Supabase queries) ---
  const partnerMetrics = {
    totalEarned: 145500,
    pendingPayout: 32000,
    activeLinks: 14,
    totalClicks: 1205,
    conversions: 42,
    referralCode: 'AION-PARTNER-77XQ'
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    
    // Secure Route Check
    const verifyAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth'); // Protect the route
        return;
      }
      setUser(session.user);
      setLoading(false);
    };
    
    verifyAccess();
  }, [navigate]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://aion.co.ke/ref/${partnerMetrics.referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToWhatsApp = () => {
    const text = `Deploy enterprise-grade IT and Security infrastructure with AIØN Intelligence Solutions. Use my partner link for priority integration: https://aion.co.ke/ref/${partnerMetrics.referralCode}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex flex-col items-center justify-center text-cyan-600 dark:text-cyan-400 font-poppins transition-colors duration-500">
      <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
      <span className="text-xs font-black uppercase tracking-widest animate-pulse">Authenticating Partner Clearance...</span>
    </div>
  );

  return (
    <div className="bg-slate-50 dark:bg-[#020617] dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] dark:from-cyan-900/10 dark:via-[#020617] dark:to-[#020617] min-h-screen font-poppins text-slate-900 dark:text-white transition-colors duration-500 relative pb-24">
      <Header />

      {/* --- DASHBOARD HEADER --- */}
      <div className="bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 pt-28 pb-0 px-4 sm:px-8 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] sticky top-[60px] md:top-[76px] z-30 transition-colors">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between md:items-end gap-6">
          <div className="mb-4 md:mb-6 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 drop-shadow-sm">
              Partner Ecosystem
            </h1>
            <p className="text-xs md:text-sm text-slate-600 dark:text-cyan-500/80 mt-1 font-bold uppercase tracking-widest flex items-center gap-2">
              <FaNetworkWired /> Authorized ID: {user?.id.substring(0,8).toUpperCase()}
            </p>
          </div>
          
          {/* Dual Role Toggle */}
          <div className="flex bg-gray-100 dark:bg-[#050b14] p-1 rounded-xl border border-gray-200 dark:border-slate-800 mb-6 w-max shadow-inner">
            <button 
              onClick={() => setPartnerMode('reseller')}
              className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${partnerMode === 'reseller' ? 'bg-white dark:bg-cyan-600 text-cyan-700 dark:text-white shadow-md' : 'text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400'}`}
            >
              Reseller Hub
            </button>
            <button 
              onClick={() => setPartnerMode('advertiser')}
              className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${partnerMode === 'advertiser' ? 'bg-white dark:bg-cyan-600 text-cyan-700 dark:text-white shadow-md' : 'text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400'}`}
            >
              Advertiser Hub
            </button>
          </div>
        </div>

        {/* Reseller Tabs */}
        {partnerMode === 'reseller' && (
          <div className="max-w-[1600px] mx-auto flex overflow-x-auto gap-2 sm:gap-8 pb-4 md:pb-0 custom-scrollbar">
            {[
              { id: 'overview', icon: FaChartLine, label: 'Performance Metrics' },
              { id: 'links', icon: FaLink, label: 'Marketing Assets' },
              { id: 'payouts', icon: FaWallet, label: 'Revenue & Payouts' }
            ].map(tab => (
              <button 
                key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-4 px-2 text-xs md:text-sm font-black uppercase tracking-widest whitespace-nowrap border-b-2 transition-all cursor-pointer ${activeTab === tab.id ? 'border-cyan-600 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400 drop-shadow-sm dark:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]' : 'border-transparent text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400/50 hover:border-cyan-500/30'}`}
              >
                <tab.icon className="text-lg" /> {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-8 pt-10 relative z-10">
        
        {/* =========================================================================
            RESELLER HUB (Affiliate Marketing System)
           ========================================================================= */}
        {partnerMode === 'reseller' && (
          <>
            {/* --- OVERVIEW TAB --- */}
            {activeTab === 'overview' && (
              <div className="animate-fade-in-up space-y-8">
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white dark:bg-[#0f172a]/90 dark:backdrop-blur-xl p-8 rounded-[24px] border border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-lg flex flex-col relative overflow-hidden group">
                    <div className="absolute inset-0 bg-emerald-50 dark:bg-green-500/5 group-hover:bg-emerald-100 dark:group-hover:bg-green-500/10 transition-colors duration-500"></div>
                    <FaMoneyBillWave className="absolute -bottom-4 -right-4 text-8xl text-emerald-500/10 dark:text-green-500/10 group-hover:scale-110 transition-transform duration-500" />
                    <span className="text-xs font-black text-emerald-600 dark:text-green-400 uppercase tracking-widest relative z-10">Total Revenue Generated</span>
                    <span className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mt-2 relative z-10">KES {partnerMetrics.totalEarned.toLocaleString()}</span>
                  </div>

                  <div className="bg-white dark:bg-[#0f172a]/90 dark:backdrop-blur-xl p-8 rounded-[24px] border border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-lg flex flex-col relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-50 dark:bg-blue-500/5 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/10 transition-colors duration-500"></div>
                    <FaChartLine className="absolute -bottom-4 -right-4 text-8xl text-blue-500/10 group-hover:scale-110 transition-transform duration-500" />
                    <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest relative z-10">Link Click-Throughs</span>
                    <span className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mt-2 relative z-10">{partnerMetrics.totalClicks.toLocaleString()}</span>
                  </div>

                  <div className="bg-white dark:bg-[#0f172a]/90 dark:backdrop-blur-xl p-8 rounded-[24px] border border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-lg flex flex-col relative overflow-hidden group">
                    <div className="absolute inset-0 bg-purple-50 dark:bg-purple-500/5 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/10 transition-colors duration-500"></div>
                    <FaUserTie className="absolute -bottom-4 -right-4 text-8xl text-purple-500/10 group-hover:scale-110 transition-transform duration-500" />
                    <span className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest relative z-10">Successful Conversions</span>
                    <span className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mt-2 relative z-10">{partnerMetrics.conversions}</span>
                  </div>

                  <div className="bg-white dark:bg-[#0f172a]/90 dark:backdrop-blur-xl p-8 rounded-[24px] border border-cyan-200 dark:border-cyan-500/40 shadow-sm dark:shadow-[0_0_30px_rgba(34,211,238,0.15)] flex flex-col relative overflow-hidden group">
                    <div className="absolute inset-0 bg-cyan-50 dark:bg-cyan-500/5 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-500/10 transition-colors duration-500"></div>
                    <FaWallet className="absolute -bottom-4 -right-4 text-8xl text-cyan-500/10 group-hover:scale-110 transition-transform duration-500" />
                    <span className="text-xs font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-widest relative z-10">Available For Payout</span>
                    <span className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mt-2 relative z-10">KES {partnerMetrics.pendingPayout.toLocaleString()}</span>
                  </div>
                </div>

                {/* Legal / Compliance Notice */}
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 p-6 rounded-2xl flex items-start gap-4">
                  <FaShieldAlt className="text-emerald-600 dark:text-emerald-400 text-2xl shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-widest mb-1">Verified Partner Program</h3>
                    <p className="text-sm text-emerald-700 dark:text-emerald-500/90 font-medium leading-relaxed">
                      AIØN operates a strict, zero-fee reseller model. Commissions are disbursed instantly upon the successful deployment and payment of enterprise hardware. There are absolutely no recruitment or joining fees.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* --- MARKETING ASSETS TAB --- */}
            {activeTab === 'links' && (
              <div className="animate-fade-in-up grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Referral Link Generator */}
                <div className="bg-white dark:bg-[#0f172a]/90 dark:backdrop-blur-xl p-8 rounded-[32px] border border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-xl">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Master Referral Link</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6">Share this unique identifier across your networks. Any hardware purchased through this gateway registers a commission to your ledger.</p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 bg-gray-50 dark:bg-[#050B14] border border-gray-200 dark:border-slate-700 rounded-xl p-4 flex items-center shadow-inner">
                      <span className="text-sm font-mono text-cyan-700 dark:text-cyan-400 truncate w-full">https://aion.co.ke/ref/{partnerMetrics.referralCode}</span>
                    </div>
                    <button 
                      onClick={copyToClipboard}
                      className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 shadow-md dark:shadow-[0_0_15px_rgba(34,211,238,0.3)] cursor-pointer shrink-0"
                    >
                      {copied ? <><FaCheckCircle /> Copied</> : <><FaCopy /> Copy Link</>}
                    </button>
                  </div>

                  <div className="mt-8 border-t border-gray-100 dark:border-slate-800 pt-6">
                    <button 
                      onClick={shareToWhatsApp}
                      className="w-full bg-gradient-to-r from-[#25D366] to-[#1ebe57] text-white dark:text-[#020617] px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all hover:-translate-y-1 flex items-center justify-center gap-2 shadow-md dark:shadow-[0_0_15px_rgba(37,211,102,0.4)] cursor-pointer"
                    >
                      <FaWhatsapp className="text-lg" /> Broadcast via WhatsApp
                    </button>
                  </div>
                </div>

                {/* Promo Codes */}
                <div className="bg-white dark:bg-[#0f172a]/90 dark:backdrop-blur-xl p-8 rounded-[32px] border border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-xl">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Enterprise Promo Codes</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6">Offer your clients a deployment discount. The discount is absorbed by AIØN, protecting your commission margins.</p>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-[#050B14] border border-gray-200 dark:border-slate-700 rounded-xl p-5 flex items-center justify-between shadow-sm">
                      <div>
                        <span className="block text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-500 mb-1">5% Hardware Discount</span>
                        <span className="text-lg font-mono font-bold text-slate-900 dark:text-white">AION-PARTNER-5</span>
                      </div>
                      <span className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">Active</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* --- PAYOUTS TAB --- */}
            {activeTab === 'payouts' && (
              <div className="animate-fade-in-up grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* M-Pesa Request Form */}
                <div className="lg:col-span-1 bg-white dark:bg-[#0f172a]/90 dark:backdrop-blur-xl p-8 rounded-[32px] border border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-xl flex flex-col h-max">
                  <div className="w-16 h-16 bg-[#25D366]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#25D366]/30">
                    <FaMobileAlt className="text-3xl text-[#25D366]" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Request Disbursement</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-8">Funds are transferred to your registered M-Pesa line within 2 hours of request.</p>

                  <div className="bg-gray-50 dark:bg-[#050B14] rounded-xl p-6 border border-gray-200 dark:border-slate-700 mb-6 text-center shadow-inner">
                    <span className="text-[10px] font-black text-cyan-600 dark:text-cyan-500 uppercase tracking-widest block mb-2">Available Balance</span>
                    <span className="text-3xl font-black text-slate-900 dark:text-white">KES {partnerMetrics.pendingPayout.toLocaleString()}</span>
                  </div>

                  <button className="w-full bg-slate-900 dark:bg-cyan-600 hover:bg-slate-800 dark:hover:bg-cyan-500 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-md dark:shadow-[0_0_20px_rgba(34,211,238,0.3)] cursor-pointer mt-auto">
                    Initiate M-Pesa Transfer
                  </button>
                </div>

                {/* Transaction Ledger */}
                <div className="lg:col-span-2 bg-white dark:bg-[#0f172a]/90 dark:backdrop-blur-xl p-8 rounded-[32px] border border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-xl overflow-hidden flex flex-col">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Commission Ledger</h3>
                  
                  <div className="overflow-x-auto flex-grow custom-scrollbar">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-[#050b14]/50">
                          <th className="p-4 font-black text-cyan-700 dark:text-cyan-500 uppercase tracking-widest text-[10px]">Date</th>
                          <th className="p-4 font-black text-cyan-700 dark:text-cyan-500 uppercase tracking-widest text-[10px]">Reference</th>
                          <th className="p-4 font-black text-cyan-700 dark:text-cyan-500 uppercase tracking-widest text-[10px]">Amount</th>
                          <th className="p-4 font-black text-cyan-700 dark:text-cyan-500 uppercase tracking-widest text-[10px]">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-slate-800/80">
                        {/* Mock Ledger Rows */}
                        <tr className="hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 text-slate-600 dark:text-slate-400 font-medium">Oct 12, 2026</td>
                          <td className="p-4 text-slate-900 dark:text-white font-bold">Hardware Deployment (Corp)</td>
                          <td className="p-4 text-slate-900 dark:text-white font-black">+ KES 12,500</td>
                          <td className="p-4"><span className="text-[9px] font-black uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800/50">Cleared</span></td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 text-slate-600 dark:text-slate-400 font-medium">Oct 05, 2026</td>
                          <td className="p-4 text-slate-900 dark:text-white font-bold">M-Pesa Disbursement</td>
                          <td className="p-4 text-red-500 font-black">- KES 45,000</td>
                          <td className="p-4"><span className="text-[9px] font-black uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded border border-blue-200 dark:border-blue-800/50">Transferred</span></td>
                        </tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 text-slate-600 dark:text-slate-400 font-medium">Sep 28, 2026</td>
                          <td className="p-4 text-slate-900 dark:text-white font-bold">Web Architecture Package</td>
                          <td className="p-4 text-slate-900 dark:text-white font-black">+ KES 8,000</td>
                          <td className="p-4"><span className="text-[9px] font-black uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800/50">Cleared</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}
          </>
        )}

        {/* =========================================================================
            ADVERTISER HUB (B2B Promotion System)
           ========================================================================= */}
        {partnerMode === 'advertiser' && (
          <div className="animate-fade-in-up">
            <div className="bg-white dark:bg-[#0f172a]/90 dark:backdrop-blur-xl p-10 md:p-16 rounded-[32px] border border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-xl text-center relative overflow-hidden flex flex-col items-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none hidden dark:block"></div>
              
              <div className="w-24 h-24 bg-gray-50 dark:bg-[#050B14] rounded-full flex items-center justify-center mb-6 border border-gray-100 dark:border-slate-800 shadow-inner relative z-10">
                <FaBullhorn className="text-4xl text-slate-300 dark:text-slate-700" />
              </div>
              
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 relative z-10 tracking-tight">Advertiser Network Offline</h2>
              <p className="text-base text-slate-600 dark:text-slate-400 font-medium max-w-lg mx-auto mb-8 relative z-10 leading-relaxed">
                The AIØN B2B Advertiser network is currently in closed beta. Approved vendors will soon be able to inject their hardware and services directly into our master catalog via API.
              </p>
              
              <button 
                onClick={() => navigate('/contact')}
                className="bg-slate-900 dark:bg-cyan-600 hover:bg-slate-800 dark:hover:bg-cyan-500 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-md dark:shadow-[0_0_20px_rgba(34,211,238,0.3)] cursor-pointer relative z-10"
              >
                Request Beta Access
              </button>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
};

export default PartnerDashboard;