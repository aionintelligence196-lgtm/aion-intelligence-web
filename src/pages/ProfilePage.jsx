// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Header from '../sections/Header';
import { 
  FaBoxOpen, FaUserCog, FaChevronRight, FaSignOutAlt, 
  FaMapMarkerAlt, FaHeadset, FaTicketAlt, FaShareAlt, 
  FaGlobe, FaStar, FaInfoCircle
} from 'react-icons/fa';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      setUser(session.user);

      const { data } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (data) setProfile(data);
      setLoading(false);
    };
    fetchUser();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const triggerToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-50 dark:bg-[#111111] flex items-center justify-center font-poppins text-cyan-600 dark:text-cyan-500 font-black text-[10px] md:text-xs tracking-widest uppercase transition-colors duration-500">Loading Profile...</div>;
  }

  const displayName = profile?.full_name || user?.email?.split('@')[0] || "Client";
  const userInitials = displayName.charAt(0).toUpperCase();

  const MenuRow = ({ icon: Icon, title, subtitle, onClick, isDestructive, badge }) => (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between py-4 px-5 md:px-6 transition-all duration-300 group cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2d2d2d]/50 border-b border-gray-200 dark:border-[#2d2d2d] last:border-0"
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${isDestructive ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-500 group-hover:bg-red-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-gray-50 dark:bg-[#111111] border-gray-200 dark:border-[#2d2d2d] text-slate-500 dark:text-gray-400 group-hover:border-cyan-500/50 group-hover:text-cyan-600 dark:group-hover:text-cyan-500 group-hover:shadow-sm dark:group-hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]'}`}>
          <Icon className="text-base group-hover:scale-110 transition-transform" />
        </div>
        <div className="text-left flex flex-col items-start">
          <div className="flex items-center gap-2">
            <span className={`block text-xs md:text-sm font-bold transition-colors ${isDestructive ? 'text-red-600 dark:text-red-500 group-hover:text-red-700 dark:group-hover:text-red-400' : 'text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400'}`}>
              {title}
            </span>
            {badge && (
              <span className="bg-gradient-to-r from-cyan-600 to-cyan-700 dark:from-cyan-500 dark:to-cyan-600 text-white text-[8px] md:text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest shadow-sm">
                {badge}
              </span>
            )}
          </div>
          {subtitle && <span className="text-[9px] md:text-[10px] text-slate-500 dark:text-gray-400 font-medium mt-0.5">{subtitle}</span>}
        </div>
      </div>
      <FaChevronRight className={`text-[10px] transition-all duration-300 group-hover:translate-x-1 ${isDestructive ? 'text-red-300 dark:text-red-500/50 group-hover:text-red-500' : 'text-slate-300 dark:text-gray-600 group-hover:text-cyan-600 dark:group-hover:text-cyan-500'}`} />
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111111] font-poppins text-slate-900 dark:text-white pb-20 transition-colors duration-500 relative">
      <Header />
      
      {/* --- TOAST NOTIFICATION --- */}
      <div className={`fixed top-28 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        <div className="bg-white dark:bg-[#1c1c1c] border border-cyan-200 dark:border-[#2d2d2d] text-slate-900 dark:text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full shadow-lg dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold whitespace-nowrap">
          <FaInfoCircle className="text-cyan-600 dark:text-cyan-500 text-sm" /> {toastMessage}
        </div>
      </div>

      {/* --- MAIN PROFILE CONTENT --- */}
      <main className="max-w-xl mx-auto px-4 pt-[100px] md:pt-[120px]">
        
        {/* AVATAR & IDENTITY */}
        <div className="flex flex-col items-center justify-center text-center mb-8 md:mb-10 animate-fade-in-up">
          <div className="relative group cursor-pointer" onClick={() => triggerToast('Avatar customization coming soon.')}>
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-800 dark:from-cyan-500 dark:to-cyan-700 flex items-center justify-center text-white text-3xl md:text-4xl font-black shadow-md dark:shadow-[0_4px_20px_rgba(34,211,238,0.2)] mb-4 border-4 border-slate-50 dark:border-[#111111] group-hover:scale-105 transition-transform duration-300">
              {userInitials}
            </div>
            <div className="absolute bottom-4 right-0 bg-white dark:bg-[#1c1c1c] text-slate-900 dark:text-white border border-gray-200 dark:border-[#2d2d2d] p-1.5 md:p-2 rounded-full shadow-sm hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              <FaUserCog className="text-[10px] md:text-xs" />
            </div>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white capitalize tracking-wide">{displayName}</h1>
          <p className="text-[10px] md:text-xs text-slate-500 dark:text-gray-400 font-bold uppercase tracking-widest mt-1">{profile?.phone || user?.email}</p>
        </div>

        {/* QUICK ACTION BUTTONS */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <button 
            onClick={() => navigate('/orders')} 
            className="bg-white dark:bg-[#1c1c1c] py-5 md:py-6 rounded-[20px] md:rounded-[24px] border border-gray-200 dark:border-[#2d2d2d] flex flex-col items-center justify-center gap-2 md:gap-3 shadow-sm hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(34,211,238,0.1)] hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group"
          >
            <FaBoxOpen className="text-2xl md:text-3xl text-slate-400 dark:text-gray-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-500 group-hover:-translate-y-1 transition-all duration-300" />
            <span className="font-bold text-[10px] md:text-xs text-slate-800 dark:text-gray-200 tracking-widest uppercase group-hover:text-cyan-600 dark:group-hover:text-cyan-500 transition-colors">Orders</span>
          </button>
          
          <button 
            onClick={() => navigate('/settings')}
            className="bg-white dark:bg-[#1c1c1c] py-5 md:py-6 rounded-[20px] md:rounded-[24px] border border-gray-200 dark:border-[#2d2d2d] flex flex-col items-center justify-center gap-2 md:gap-3 shadow-sm hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(34,211,238,0.1)] hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group"
          >
            <FaUserCog className="text-2xl md:text-3xl text-slate-400 dark:text-gray-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-500 group-hover:-translate-y-1 transition-all duration-300" />
            <span className="font-bold text-[10px] md:text-xs text-slate-800 dark:text-gray-200 tracking-widest uppercase group-hover:text-cyan-600 dark:group-hover:text-cyan-500 transition-colors">Account</span>
          </button>
        </div>

        {/* PROFILE MENU LIST */}
        <div className="bg-white dark:bg-[#1c1c1c] rounded-[20px] md:rounded-[24px] border border-gray-200 dark:border-[#2d2d2d] shadow-sm overflow-hidden flex flex-col animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          
          <MenuRow 
            icon={FaStar} 
            title="AIØN Prime" 
            subtitle="Enterprise VIP subscriptions"
            badge="New"
            onClick={() => triggerToast('AIØN Prime subscriptions launching Q1 2027.')} 
          />
          <MenuRow 
            icon={FaShareAlt} 
            title="Refer & Earn" 
            subtitle="Enterprise referral"
            onClick={() => triggerToast('Affiliate program is currently in closed beta.')} 
          />
          <MenuRow 
            icon={FaTicketAlt} 
            title="Promo Codes" 
            subtitle="Redeem hardware & software vouchers"
            onClick={() => triggerToast('No active promo codes for your account.')} 
          />
          
          <div className="h-px bg-gray-200 dark:bg-[#2d2d2d] w-full"></div>

          <MenuRow 
            icon={FaMapMarkerAlt} 
            title="Delivery Coordinates" 
            subtitle="Manage shipping locations"
            onClick={() => navigate('/settings')} 
          />
          <MenuRow 
            icon={FaGlobe} 
            title="Region Settings" 
            subtitle="English / KES / Kenya"
            onClick={() => triggerToast('Localization settings locked to Kenya Region.')} 
          />
          <MenuRow 
            icon={FaHeadset} 
            title="Priority Support" 
            subtitle="Get help with your deployment"
            onClick={() => navigate('/contact')} 
          />
          
          <div className="h-px bg-gray-200 dark:bg-[#2d2d2d] w-full"></div>

          <MenuRow 
            icon={FaSignOutAlt} 
            title="Terminate Session" 
            subtitle="Securely log out of this device"
            onClick={handleSignOut} 
            isDestructive={true}
          />
        </div>

      </main>
    </div>
  );
};

export default ProfilePage;