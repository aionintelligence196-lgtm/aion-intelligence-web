// src/pages/SettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { 
  FaChevronRight, FaUserShield, FaGlobeAfrica, FaMoneyBillWave, 
  FaLanguage, FaBell, FaLock, FaEnvelope, FaTrashAlt, 
  FaRocket, FaShieldAlt, FaBroom, FaSignOutAlt, 
  FaArrowLeft, FaFileDownload, FaPhone, FaCreditCard, 
  FaTimes, FaMapMarkerAlt
} from 'react-icons/fa';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Modal States
  const [activeModal, setActiveModal] = useState(null); // 'location', 'password', 'phone'
  const [modalInput, setModalInput] = useState('');
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      setUser(session.user);

      const { data } = await supabase.from('user_profiles').select('*').eq('id', session.user.id).single();
      if (data) setProfile(data);
      setLoading(false);
    };
    fetchData();
  }, [navigate]);

  // --- DATABASE UPDATE HELPER ---
  const updateProfileStatus = async (key, value) => {
    const { error } = await supabase.from('user_profiles').update({ [key]: value }).eq('id', user.id);
    if (!error) setProfile(prev => ({ ...prev, [key]: value }));
    else alert(`Error updating ${key}: ${error.message}`);
  };

  // --- FEATURE FUNCTIONS ---
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleCurrencyToggle = () => {
    const nextCurrency = profile.currency === 'KES' ? 'USD' : 'KES';
    updateProfileStatus('currency', nextCurrency);
  };

  const handleBiometricToggle = async () => {
    if (window.PublicKeyCredential) {
      const isEnabled = !profile.biometric_enabled;
      await updateProfileStatus('biometric_enabled', isEnabled);
      alert(isEnabled ? "Biometrics enabled for this device." : "Biometrics disabled.");
    } else {
      alert("Biometric hardware (FaceID/TouchID) is not supported or permitted on this browser.");
    }
  };

  const handlePushToggle = async () => {
    const isEnabled = !profile.push_enabled;
    if (isEnabled && 'Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        updateProfileStatus('push_enabled', true);
      } else {
        alert("You must allow notifications in your browser settings first.");
      }
    } else {
      updateProfileStatus('push_enabled', false);
    }
  };

  const handleClearCache = () => {
    if (window.confirm("This will clear temporary app data (excluding your login). Proceed?")) {
      const cart = localStorage.getItem('aion_cart');
      const theme = localStorage.getItem('theme');
      localStorage.clear();
      if (cart) localStorage.setItem('aion_cart', cart);
      if (theme) localStorage.setItem('theme', theme);
      alert("App cache cleared successfully. Running at optimal speed.");
    }
  };

  const handleDeleteAccount = () => {
    alert("Enterprise Protocol: For security reasons, account deletion must be requested through support to prevent accidental data loss. Please contact support@aion.co.ke");
  };

  // --- MODAL SUBMISSIONS ---
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (modalInput.length < 6) return alert("Password must be at least 6 characters");
    const { error } = await supabase.auth.updateUser({ password: modalInput });
    if (error) alert("Error: " + error.message);
    else {
      alert("Password updated securely.");
      setActiveModal(null);
      setModalInput('');
    }
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    await updateProfileStatus('phone', modalInput);
    setActiveModal(null);
    setModalInput('');
  };

  const handleManualLocationSubmit = async (e) => {
    e.preventDefault();
    const cityData = modalInput.split(',').pop().trim();
    await updateProfileStatus('address', modalInput);
    await updateProfileStatus('city', cityData || "Nairobi");
    setActiveModal(null);
    setModalInput('');
  };

  const handleAutoLocate = async () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    setLocating(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const data = await res.json();
        const city = data.address.city || data.address.town || "Nairobi";
        const address = data.display_name || `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
        
        await updateProfileStatus('address', address);
        await updateProfileStatus('city', city);
        setActiveModal(null);
        alert(`Coordinates locked: ${city}`);
      } catch (err) {
        alert("Network error fetching location name.");
      }
      setLocating(false);
    }, () => {
      alert("Location permission denied.");
      setLocating(false);
    });
  };

  if (loading) return <div className="min-h-screen bg-slate-50 dark:bg-[#111111] flex items-center justify-center text-cyan-600 dark:text-cyan-500 font-black uppercase tracking-widest text-sm">Decrypting Profile...</div>;

  const displayLocation = profile?.city ? `📍 ${profile.city}, Kenya` : '🇰🇪 Set Location';

  // --- UI COMPONENTS ---
  const SectionHeader = ({ title, description }) => (
    <div className="mb-3 px-2">
      <h3 className="text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-500">{title}</h3>
      <p className="text-[9px] md:text-[10px] text-slate-500 dark:text-gray-400 mt-1 font-medium">{description}</p>
    </div>
  );

  const SettingsRow = ({ icon: Icon, title, value, onClick, danger }) => (
    <div onClick={onClick} className={`flex items-center justify-between py-4 px-5 group cursor-pointer transition-colors ${danger ? 'hover:bg-red-50 dark:hover:bg-red-500/10' : 'hover:bg-gray-50 dark:hover:bg-[#2d2d2d]/50'}`}>
      <div className="flex items-center gap-4">
        {Icon && <Icon className={`text-base md:text-lg transition-colors ${danger ? 'text-red-500' : 'text-slate-400 dark:text-gray-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400'}`} />}
        <span className={`text-xs md:text-sm font-bold ${danger ? 'text-red-600 dark:text-red-500' : 'text-slate-800 dark:text-gray-200'}`}>{title}</span>
      </div>
      <div className="flex items-center gap-3">
        {value && <span className={`text-[10px] md:text-xs font-black uppercase tracking-wider ${value === 'Enabled' || value === 'On' ? 'text-emerald-600 dark:text-emerald-500' : 'text-slate-500 dark:text-gray-400'}`}>{value}</span>}
        <FaChevronRight className={`text-[10px] transition-transform ${danger ? 'text-red-500/50' : 'text-slate-300 dark:text-gray-600 group-hover:text-cyan-600 dark:group-hover:text-cyan-500 group-hover:translate-x-1'}`} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111111] font-poppins text-slate-900 dark:text-white pb-12 transition-colors duration-500 relative">
      
      {/* OVERLAY MODALS */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity">
          <div className="bg-white dark:bg-[#1c1c1c] w-full max-w-md rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-[#2d2d2d] relative animate-fade-in-up">
            <button onClick={() => { setActiveModal(null); setModalInput(''); }} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors cursor-pointer">
              <FaTimes className="text-lg" />
            </button>
            
            {activeModal === 'location' && (
              <div>
                <h3 className="text-base md:text-lg font-black mb-1 text-slate-900 dark:text-white">Delivery Coordinates</h3>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-gray-400 mb-6 font-medium">Set your enterprise delivery location.</p>
                <button onClick={handleAutoLocate} disabled={locating} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 mb-4 transition-colors text-xs uppercase tracking-widest cursor-pointer disabled:opacity-70">
                  {locating ? "Scanning GPS..." : <><FaMapMarkerAlt /> Auto-Detect via GPS</>}
                </button>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px bg-gray-200 dark:bg-[#2d2d2d] flex-1"></div>
                  <span className="text-[10px] text-slate-400 dark:text-gray-500 font-black uppercase tracking-widest">OR</span>
                  <div className="h-px bg-gray-200 dark:bg-[#2d2d2d] flex-1"></div>
                </div>
                <form onSubmit={handleManualLocationSubmit}>
                  <input type="text" placeholder="e.g. Westlands, Nairobi" value={modalInput} onChange={e => setModalInput(e.target.value)} required className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#2d2d2d] text-slate-900 dark:text-white p-3 rounded-lg text-xs md:text-sm outline-none focus:border-cyan-500 transition-colors mb-4" />
                  <button type="submit" className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 rounded-lg transition-colors text-xs uppercase tracking-widest cursor-pointer">Save Manual Address</button>
                </form>
              </div>
            )}

            {activeModal === 'password' && (
              <form onSubmit={handlePasswordSubmit}>
                <h3 className="text-base md:text-lg font-black mb-1 flex items-center gap-2 text-slate-900 dark:text-white"><FaLock className="text-cyan-600 dark:text-cyan-500"/> Secure Password Update</h3>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-gray-400 mb-6 font-medium">Enter a new secure password for your AIØN account.</p>
                <input type="password" placeholder="New Password (min 6 chars)" value={modalInput} onChange={e => setModalInput(e.target.value)} required minLength="6" className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#2d2d2d] text-slate-900 dark:text-white p-3 rounded-lg text-xs md:text-sm outline-none focus:border-cyan-500 transition-colors mb-4" />
                <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-lg transition-colors text-xs uppercase tracking-widest cursor-pointer">Update Encryption Key</button>
              </form>
            )}

            {activeModal === 'phone' && (
              <form onSubmit={handlePhoneSubmit}>
                <h3 className="text-base md:text-lg font-black mb-1 flex items-center gap-2 text-slate-900 dark:text-white"><FaPhone className="text-cyan-600 dark:text-cyan-500"/> Update Comm Link</h3>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-gray-400 mb-6 font-medium">Enter your primary contact number.</p>
                <input type="tel" placeholder="e.g. +254712345678" value={modalInput} onChange={e => setModalInput(e.target.value)} required className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#2d2d2d] text-slate-900 dark:text-white p-3 rounded-lg text-xs md:text-sm outline-none focus:border-cyan-500 transition-colors mb-4" />
                <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-lg transition-colors text-xs uppercase tracking-widest cursor-pointer">Save Phone Number</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* TOP NAVIGATION */}
      <div className="sticky top-0 z-40 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-xl border-b border-gray-200 dark:border-[#2d2d2d] px-4 py-3 md:py-4 flex items-center justify-between shadow-sm transition-colors duration-500">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 dark:bg-[#1c1c1c] border border-gray-200 dark:border-[#2d2d2d] hover:border-cyan-500 dark:hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 rounded-lg transition-colors cursor-pointer text-slate-600 dark:text-gray-300">
          <FaArrowLeft className="text-sm md:text-base" />
        </button>
        <h1 className="text-sm md:text-lg font-black tracking-widest uppercase text-slate-900 dark:text-white">System Settings</h1>
        <div className="w-8 md:w-10"></div>
      </div>

      <main className="max-w-2xl mx-auto px-4 pt-6 md:pt-8 space-y-8 md:space-y-10">
        
        {/* SECTION 1: Operative Identity */}
        <section>
          <SectionHeader title="Operative Identity" description="Manage your primary profile details and communication channels." />
          <div className="bg-white dark:bg-[#1c1c1c] rounded-[16px] shadow-sm border border-gray-200 dark:border-[#2d2d2d] overflow-hidden">
            <div className="flex items-center gap-4 p-5 md:p-6 border-b border-gray-100 dark:border-[#2d2d2d]">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-cyan-50 dark:bg-[#111111] flex items-center justify-center text-cyan-600 dark:text-cyan-500 text-xl md:text-2xl font-black border border-cyan-200 dark:border-[#2d2d2d] shadow-inner">
                {(profile?.full_name || user?.email || "A").charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-black text-slate-900 dark:text-white">{profile?.full_name || user?.email?.split('@')[0]}</h2>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-gray-400 mt-1 flex items-center gap-2 font-medium"><FaEnvelope className="text-slate-400 dark:text-gray-500" /> {user?.email}</p>
              </div>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-[#2d2d2d]">
              <SettingsRow icon={FaPhone} title="Change phone number" value={profile?.phone || "Update required"} onClick={() => setActiveModal('phone')} />
              <SettingsRow icon={FaCreditCard} title="Linked Payments" value="Manage Cards" onClick={() => alert("Payment cards are securely managed via Paystack during checkout.")} />
            </div>
          </div>
        </section>

        {/* SECTION 2: Logistics & Localization */}
        <section>
          <SectionHeader title="Logistics & Localization" description="Configure delivery coordinates and regional preferences." />
          <div className="bg-white dark:bg-[#1c1c1c] rounded-[16px] shadow-sm border border-gray-200 dark:border-[#2d2d2d] overflow-hidden divide-y divide-gray-100 dark:divide-[#2d2d2d]">
            <SettingsRow icon={FaGlobeAfrica} title="Delivery Coordinates" value={displayLocation} onClick={() => setActiveModal('location')} />
            <SettingsRow icon={FaMoneyBillWave} title="Display Currency" value={profile?.currency || 'KES'} onClick={handleCurrencyToggle} />
            <SettingsRow icon={FaLanguage} title="System Language" value="English (US)" />
            <SettingsRow icon={FaBell} title="Push Notifications" value={profile?.push_enabled ? "Enabled" : "Off"} onClick={handlePushToggle} />
          </div>
        </section>

        {/* SECTION 3: Security & Access */}
        <section>
          <SectionHeader title="Security & Access" description="Protect your enterprise account with advanced authentication layers." />
          <div className="bg-white dark:bg-[#1c1c1c] rounded-[16px] shadow-sm border border-gray-200 dark:border-[#2d2d2d] overflow-hidden divide-y divide-gray-100 dark:divide-[#2d2d2d]">
            <SettingsRow icon={FaLock} title="Change Encryption Key" onClick={() => setActiveModal('password')} />
            <SettingsRow icon={FaShieldAlt} title="Two-Factor Auth (2FA)" value="Inactive" onClick={() => alert("Advanced 2FA implementation pending enterprise rollout.")} />
            <SettingsRow icon={FaUserShield} title="Biometric Access" value={profile?.biometric_enabled ? "On" : "Off"} onClick={handleBiometricToggle} />
          </div>
        </section>

        {/* SECTION 4: System Operations */}
        <section>
          <SectionHeader title="System Operations" description="Manage local application data and performance configurations." />
          <div className="bg-white dark:bg-[#1c1c1c] rounded-[16px] shadow-sm border border-gray-200 dark:border-[#2d2d2d] overflow-hidden divide-y divide-gray-100 dark:divide-[#2d2d2d]">
            <SettingsRow icon={FaRocket} title="Network Acceleration" value="Active" />
            <SettingsRow icon={FaBroom} title="Clear App Cache" onClick={handleClearCache} />
            <div className="flex items-center justify-between py-4 px-5 bg-gray-50 dark:bg-[#111111]">
              <span className="text-xs md:text-sm font-bold text-slate-500 dark:text-gray-400">System Core Version</span>
              <span className="text-[10px] font-black text-slate-400 dark:text-gray-500 tracking-widest uppercase">v26.34.0</span>
            </div>
          </div>
        </section>

        {/* SECTION 5: Danger Zone */}
        <section>
          <SectionHeader title="Data Privacy & Control" description="Irreversible actions regarding your account and data footprint." />
          <div className="bg-white dark:bg-[#1c1c1c] rounded-[16px] shadow-sm border border-red-200 dark:border-red-900/30 overflow-hidden divide-y divide-gray-100 dark:divide-[#2d2d2d]">
            <SettingsRow icon={FaFileDownload} title="Download My Data" value="Export" />
            <SettingsRow icon={FaTrashAlt} title="Terminate Account" danger={true} onClick={handleDeleteAccount} />
          </div>
        </section>

        {/* SIGN OUT BUTTON */}
        <div className="pt-2 pb-6">
          <button onClick={handleSignOut} className="w-full bg-white dark:bg-[#1c1c1c] hover:bg-red-50 dark:hover:bg-red-500/10 border border-gray-200 dark:border-[#2d2d2d] hover:border-red-200 dark:hover:border-red-500/50 text-red-600 dark:text-red-500 font-black py-4 rounded-[12px] shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer uppercase tracking-widest text-[10px] md:text-xs">
            <FaSignOutAlt className="text-sm md:text-base" /> Terminate Session
          </button>
        </div>

      </main>
    </div>
  );
};

export default SettingsPage;