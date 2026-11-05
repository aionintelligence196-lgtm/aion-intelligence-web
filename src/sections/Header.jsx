// src/sections/Header.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { IoCloseSharp } from 'react-icons/io5';
import { 
  FaBars, FaSearch, FaMoon, FaSun, 
  FaRegUser, FaShoppingCart, FaChevronDown, 
  FaSignOutAlt, FaUserCircle, FaShieldAlt, FaCog, FaFileInvoice,
  FaServer, FaVideo, FaWifi, FaFingerprint, FaNetworkWired, FaBolt,
  FaMicrochip, FaArrowRight, FaLandmark, FaHospital, FaGraduationCap, FaHome, 
  FaStore, FaIndustry, FaBoxOpen, FaUserTie
} from 'react-icons/fa';
import { supabase } from '../supabaseClient';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const megaMenuRef = useRef(null);

  const { cart } = useCart();
  const cartItemCount = (cart || []).reduce((total, item) => total + (item.quantity || 1), 0);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        const { data } = await supabase
          .from('user_profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .single();
        setIsAdmin(data?.is_admin || false);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      getSession();
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setActiveMegaMenu(null);
    setMenuOpen(false);
    navigate('/auth');
  };

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    setMenuOpen(false);
    setActiveMegaMenu(null);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target)) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const sanitized = searchQuery.replace(/[<>'"/;`%]/g, '').trim();
    if (sanitized !== '') {
      setMenuOpen(false);
      setActiveMegaMenu(null);
      navigate(`/products?search=${encodeURIComponent(sanitized)}`);
    }
  };

  const productCategories = [
    {
      group: 'Physical Security',
      items: [
        { name: 'Security & Surveillance', icon: FaVideo, path: '/products?category=Security+%26+Surveillance' },
        { name: 'Access Control & Biometrics', icon: FaFingerprint, path: '/products?category=Access+Control+%26+Biometrics' },
        { name: 'Speed Gates & Turnstiles', icon: FaShieldAlt, path: '/products?category=Access+Control+%26+Biometrics' }
      ]
    },
    {
      group: 'Enterprise Network',
      items: [
        { name: 'Networking & Wi-Fi', icon: FaWifi, path: '/products?category=Networking+%26+Wi-Fi' },
        { name: 'Telephony & Intercom', icon: FaNetworkWired, path: '/products?category=Telephony+%26+Intercom' },
        { name: 'Accessories & Cabling', icon: FaMicrochip, path: '/products?category=Accessories+%26+Cables' }
      ]
    },
    {
      group: 'Compute Infrastructure',
      items: [
        { name: 'Servers & Cloud Infrastructure', icon: FaServer, path: '/products?category=Servers+%26+Cloud+Infrastructure' },
        { name: 'Computing & Workstations', icon: FaServer, path: '/products?category=Computing+%26+Workstations' },
        { name: 'Power & Backup Systems', icon: FaBolt, path: '/products?category=Power+%26+Backup+Systems' }
      ]
    },
    {
      group: 'Commercial Systems',
      items: [
        { name: 'Point of Sale (POS)', icon: FaFileInvoice, path: '/products?category=Point+of+Sale+(POS)' },
        { name: 'Audio Visual & Displays', icon: FaVideo, path: '/products?category=Audio+Visual+%26+Displays' },
        { name: 'Software & Web Development', icon: FaMicrochip, path: '/products?category=Software+%26+Web+Development' }
      ]
    }
  ];

  const solutionCategories = [
    {
      group: 'Network Architectures',
      items: [
        { name: 'Enterprise Routing', icon: FaNetworkWired, path: '/solutions' },
        { name: 'Wireless Infrastructure', icon: FaWifi, path: '/solutions' },
        { name: 'Fiber Optics & Cabling', icon: FaServer, path: '/solutions' }
      ]
    },
    {
      group: 'Security & Monitoring',
      items: [
        { name: 'Centralized Surveillance', icon: FaVideo, path: '/solutions' },
        { name: 'Biometric Access Control', icon: FaFingerprint, path: '/solutions' },
        { name: 'Perimeter Intrusion Detection', icon: FaShieldAlt, path: '/solutions' }
      ]
    },
    {
      group: 'Automation & IoT',
      items: [
        { name: 'Smart Building Management', icon: FaHome, path: '/solutions' },
        { name: 'Energy Management', icon: FaBolt, path: '/solutions' },
        { name: 'Industrial IoT', icon: FaMicrochip, path: '/solutions' }
      ]
    }
  ];

  const technologyCategories = [
    {
      group: 'Commercial & Financial',
      items: [
        { name: 'Banks & Financial Institutions', icon: FaLandmark, path: '/technologies' },
        { name: 'Retail & Supermarkets', icon: FaStore, path: '/technologies' },
        { name: 'Corporate Offices', icon: FaUserTie, path: '/technologies' }
      ]
    },
    {
      group: 'Public Sector',
      items: [
        { name: 'Healthcare & Hospitals', icon: FaHospital, path: '/technologies' },
        { name: 'Education & Campuses', icon: FaGraduationCap, path: '/technologies' },
        { name: 'Residential Estates', icon: FaHome, path: '/technologies' }
      ]
    },
    {
      group: 'Industrial Sites',
      items: [
        { name: 'Manufacturing & Factories', icon: FaIndustry, path: '/technologies' },
        { name: 'Warehousing & Logistics', icon: FaBoxOpen, path: '/technologies' },
        { name: 'Critical Infrastructure', icon: FaShieldAlt, path: '/technologies' }
      ]
    }
  ];

  const primaryNavLinks = [
    { name: 'Home', to: '/' },
    { name: 'Products', to: '/products', hasMegaMenu: true, menuId: 'products' },
    { name: 'Solutions', to: '/solutions', hasMegaMenu: true, menuId: 'solutions' },
    { name: 'Technologies', to: '/technologies', hasMegaMenu: true, menuId: 'technologies' },
    { name: 'About', to: '/about' },
    { name: 'Contact', to: '/contact' }
  ];

  return (
    <header ref={megaMenuRef} className="relative w-full z-50 font-poppins">
      
      {/* 1. PRIMARY HEADER BAR (Deep Slate) */}
      <div className="fixed top-0 left-0 w-full h-[68px] bg-white/95 dark:bg-[#21293a]/95 backdrop-blur-xl px-4 lg:px-12 z-50 flex justify-between items-center transition-colors duration-500 shadow-sm dark:shadow-[0_4px_25px_rgba(34,211,238,0.15)] border-b border-gray-200 dark:border-cyan-500/20">
        
        <div className="max-w-[1800px] mx-auto w-full flex items-center justify-between gap-4 relative">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25%] h-full bg-cyan-600/5 dark:bg-cyan-400/10 blur-2xl pointer-events-none rounded-full"></div>

          {/* Brand & Mobile Menu */}
          <div className="flex items-center gap-3 w-auto relative z-10">
            <button
              aria-label="Toggle navigation menu"
              className="text-slate-800 dark:text-white text-xl transition-colors outline-none cursor-pointer p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <IoCloseSharp className="text-cyan-600 dark:text-cyan-400" /> : <FaBars />}
            </button>
            <RouterLink to="/" className="font-black text-xl lg:text-2xl uppercase tracking-widest flex items-center whitespace-nowrap text-cyan-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-cyan-200 drop-shadow-sm dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
              AIØN<span className="text-slate-900 dark:text-cyan-400">.</span>
            </RouterLink>
          </div>

          {/* Search Bar (Charcoal / Steel Blue) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-6 relative z-10">
            <form onSubmit={handleSearchSubmit} className="flex items-center w-full bg-gray-50 dark:bg-[#111111] border border-gray-300 dark:border-[#3e4c6b]/50 hover:dark:border-cyan-500/50 rounded-lg overflow-hidden focus-within:border-cyan-500 dark:focus-within:border-cyan-400 dark:focus-within:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all shadow-inner h-10 group">
              <div className="pl-3.5 text-gray-400 dark:text-cyan-500/60 group-focus-within:text-cyan-600 dark:group-focus-within:text-cyan-400 transition-colors text-sm">
                <FaSearch />
              </div>
              <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog and architectures..." 
                className="flex-grow px-3 py-1.5 outline-none bg-transparent text-slate-900 dark:text-white text-xs w-full font-medium placeholder-slate-400 dark:placeholder-slate-500" 
              />
              <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 dark:bg-gradient-to-r dark:from-cyan-600 dark:to-[#191124] dark:hover:from-cyan-500 dark:hover:to-cyan-900 transition-colors text-white px-5 h-full text-xs font-black uppercase tracking-wider cursor-pointer shadow-md dark:shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                Search
              </button>
            </form>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-3 md:hidden text-slate-800 dark:text-white relative z-10">
            <button aria-label="Toggle dark mode" onClick={toggleTheme} className="text-lg p-1 outline-none cursor-pointer">
              {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-cyan-700" />}
            </button>
            <RouterLink aria-label="Account profile" to={user ? "/profile" : "/auth"} className="p-1">
              <FaRegUser className="text-lg hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors" />
            </RouterLink>
            <RouterLink aria-label="Shopping Cart" to="/cart" className="relative p-1">
              <FaShoppingCart className="text-lg hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-600 dark:bg-cyan-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm dark:shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                  {cartItemCount}
                </span>
              )}
            </RouterLink>
          </div>

          {/* Desktop Quick Actions & Profile */}
          <div className="hidden md:flex items-center gap-5 text-slate-800 dark:text-white text-xs font-semibold whitespace-nowrap relative z-10">
            <button aria-label="Toggle theme mode" onClick={toggleTheme} className="text-base transition-transform outline-none hover:scale-110 cursor-pointer p-1">
              {isDarkMode ? <FaSun className="text-yellow-400 dark:drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" /> : <FaMoon className="text-cyan-700" />}
            </button>
            
            {/* Account Dropdown */}
            <div className="relative group cursor-pointer flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors py-2">
              <FaRegUser className="text-base group-hover:scale-110 transition-transform" />
              <span className="font-bold uppercase tracking-wider font-inter">Account</span>
              <FaChevronDown className="text-[9px] group-hover:rotate-180 transition-transform duration-300" />
              
              <div className="absolute top-full right-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white dark:bg-[#191124] rounded-xl shadow-2xl dark:shadow-[0_15px_40px_rgba(34,211,238,0.15)] border border-gray-200 dark:border-white/10 overflow-hidden flex flex-col">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-white/10 text-[10px] text-slate-500 dark:text-slate-400 font-medium bg-gray-50 dark:bg-[#111111]">
                        Authenticated client<br/>
                        <span className="font-bold text-xs text-slate-900 dark:text-white truncate block mt-0.5">{user.email || user.phone || 'Enterprise User'}</span>
                      </div>
                      <RouterLink to="/profile" className="px-4 py-3 font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2 text-slate-900 dark:text-white">
                        <FaUserCircle className="text-cyan-600 dark:text-cyan-400 text-sm" /> Profile
                      </RouterLink>
                      <RouterLink to="/orders" className="px-4 py-3 font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2 text-slate-900 dark:text-white border-t border-gray-100 dark:border-white/5">
                        <FaBoxOpen className="text-cyan-600 dark:text-cyan-400 text-sm" /> Orders
                      </RouterLink>
                      <RouterLink to="/settings" className="px-4 py-3 font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2 text-slate-900 dark:text-white border-t border-gray-100 dark:border-white/5">
                        <FaCog className="text-cyan-600 dark:text-cyan-400 text-sm" /> Settings
                      </RouterLink>
                      {isAdmin && (
                        <RouterLink to="/admin" className="px-4 py-3 font-bold hover:bg-cyan-50 dark:hover:bg-cyan-900/40 text-cyan-700 dark:text-cyan-400 transition-colors flex items-center gap-2 bg-cyan-50 dark:bg-cyan-900/10 border-t border-cyan-100 dark:border-cyan-500/30">
                          <FaShieldAlt className="text-sm" /> Admin
                        </RouterLink>
                      )}
                      <button onClick={handleSignOut} className="px-4 py-3 font-bold text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center gap-2 border-t border-gray-100 dark:border-white/5 cursor-pointer">
                        <FaSignOutAlt /> Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <RouterLink to="/auth" className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400 dark:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                        Sign In
                      </RouterLink>
                      <RouterLink to="/auth" className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-t border-gray-100 dark:border-white/10 font-bold text-slate-700 dark:text-slate-300">
                        Create Account
                      </RouterLink>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Cart Button */}
            <RouterLink to="/cart" className="flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group bg-gray-100 dark:bg-[#111625] hover:bg-gray-200 dark:hover:bg-white/5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/5 shadow-inner cursor-pointer">
              <div className="relative">
                <FaShoppingCart className="text-base group-hover:scale-110 transition-transform text-cyan-600 dark:text-cyan-400 dark:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-cyan-600 dark:bg-cyan-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm dark:shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="font-black uppercase tracking-wider font-inter">Cart</span>
            </RouterLink>
          </div>
        </div>
      </div>

      {/* 2. SECONDARY NAVIGATION BAR (Flowing Gradient Match) */}
      <div className="hidden md:flex fixed top-[68px] left-0 w-full h-[40px] bg-white/95 dark:bg-gradient-to-r dark:from-[#191124]/95 dark:via-[#21293a]/95 dark:to-[#191124]/95 backdrop-blur-xl z-40 border-b border-gray-200 dark:border-white/5 shadow-sm dark:shadow-[0_4px_15px_rgba(0,0,0,0.3)] items-center px-4 lg:px-12 transition-colors duration-500">
        <div className="max-w-[1800px] mx-auto w-full flex items-center justify-between">
          
          <div className="w-[120px] hidden lg:block"></div>
          
          <nav className="flex flex-1 items-center justify-center gap-6 lg:gap-8">
            {primaryNavLinks.map((item) => (
              item.hasMegaMenu ? (
                <div 
                  key={item.name} 
                  className="relative h-full flex items-center py-1.5"
                  onMouseEnter={() => setActiveMegaMenu(item.menuId)}
                >
                  <button 
                    onClick={() => navigate(item.to)}
                    className={`flex items-center gap-1.5 cursor-pointer text-[11px] font-black uppercase tracking-widest transition-colors ${
                      location.pathname.startsWith(item.to) 
                        ? 'text-cyan-600 dark:text-cyan-400 dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' 
                        : 'text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400'
                    }`}
                  >
                    {item.name}
                    <FaChevronDown className={`text-[8px] transition-transform duration-200 ${activeMegaMenu === item.menuId ? 'rotate-180 text-cyan-600 dark:text-cyan-400' : ''}`} />
                  </button>
                </div>
              ) : (
                <RouterLink
                  key={item.name}
                  to={item.to}
                  onMouseEnter={() => setActiveMegaMenu(null)}
                  className={`cursor-pointer text-[11px] font-black uppercase tracking-widest py-1.5 transition-colors ${
                    location.pathname === item.to 
                      ? 'text-cyan-600 dark:text-cyan-400 dark:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' 
                      : 'text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400'
                  }`}
                >
                  {item.name}
                </RouterLink>
              )
            ))}
          </nav>

          <div className="flex justify-end w-auto lg:w-[120px]">
            <RouterLink
              to="/contact?action=quote"
              className="bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded shadow-sm dark:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all flex items-center gap-1.5 whitespace-nowrap border border-transparent dark:border-white/10 hover:scale-105"
            >
              <FaFileInvoice /> Get a Quote
            </RouterLink>
          </div>
        </div>
      </div>

      {/* DESKTOP MEGA MENUS (Deep Glassmorphism) */}
      {activeMegaMenu && (
        <div 
          onMouseLeave={() => setActiveMegaMenu(null)}
          className="hidden md:block fixed top-[108px] left-0 w-full bg-white dark:bg-[#191124]/95 dark:backdrop-blur-2xl border-b border-gray-200 dark:border-white/10 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-40 transition-all duration-300 animate-fade-in-up"
        >
          <div className="max-w-[1800px] mx-auto p-6">
            
            {/* Products Menu */}
            {activeMegaMenu === 'products' && (
              <div className="grid grid-cols-5 gap-6">
                {productCategories.map((column, colIdx) => (
                  <div key={colIdx} className="space-y-2.5">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400 border-b border-gray-200 dark:border-white/10 pb-1.5 dark:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                      {column.group}
                    </h4>
                    <ul className="space-y-1.5">
                      {column.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <RouterLink
                            to={item.path}
                            className="flex items-center gap-2 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group"
                          >
                            <item.icon className="text-slate-400 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 text-[10px] shrink-0 transition-colors" />
                            <span>{item.name}</span>
                          </RouterLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="bg-gray-50 dark:bg-[#111625] p-4 rounded-xl border border-gray-200 dark:border-white/5 flex flex-col justify-between group cursor-pointer hover:border-cyan-500/50 dark:hover:border-cyan-400 dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all">
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600 dark:text-cyan-400 bg-emerald-100 dark:bg-cyan-900/20 px-2 py-0.5 rounded-sm dark:border dark:border-cyan-500/30">Active Ecosystem</span>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white mt-2 leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Integrated Access & Defense</h4>
                  </div>
                  <RouterLink to="/products" className="mt-2 text-[9px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1.5 dark:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                    Explore Catalog <FaArrowRight />
                  </RouterLink>
                </div>
              </div>
            )}

            {/* Solutions Menu */}
            {activeMegaMenu === 'solutions' && (
              <div className="grid grid-cols-4 gap-6">
                {solutionCategories.map((column, colIdx) => (
                  <div key={colIdx} className="space-y-2.5">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400 border-b border-gray-200 dark:border-white/10 pb-1.5 dark:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                      {column.group}
                    </h4>
                    <ul className="space-y-1.5">
                      {column.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <RouterLink
                            to={item.path}
                            className="flex items-center gap-2 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group"
                          >
                            <item.icon className="text-slate-400 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 text-[10px] shrink-0 transition-colors" />
                            <span>{item.name}</span>
                          </RouterLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="bg-gray-50 dark:bg-[#111625] p-4 rounded-xl border border-gray-200 dark:border-white/5 flex flex-col justify-between group cursor-pointer hover:border-cyan-500/50 dark:hover:border-cyan-400 dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all">
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-blue-600 dark:text-cyan-400 bg-blue-100 dark:bg-cyan-900/20 px-2 py-0.5 rounded-sm dark:border dark:border-cyan-500/30">Turnkey Solutions</span>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white mt-2 leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">End-to-End Architectures</h4>
                  </div>
                  <RouterLink to="/solutions" className="mt-2 text-[9px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1.5 dark:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                    View Solutions <FaArrowRight />
                  </RouterLink>
                </div>
              </div>
            )}

            {/* Technologies Menu */}
            {activeMegaMenu === 'technologies' && (
              <div className="grid grid-cols-4 gap-6">
                {technologyCategories.map((column, colIdx) => (
                  <div key={colIdx} className="space-y-2.5">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400 border-b border-gray-200 dark:border-white/10 pb-1.5 dark:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                      {column.group}
                    </h4>
                    <ul className="space-y-1.5">
                      {column.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <RouterLink
                            to={item.path}
                            className="flex items-center gap-2 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group"
                          >
                            <item.icon className="text-slate-400 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 text-[10px] shrink-0 transition-colors" />
                            <span>{item.name}</span>
                          </RouterLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="bg-gray-50 dark:bg-[#111625] p-4 rounded-xl border border-gray-200 dark:border-white/5 flex flex-col justify-between group cursor-pointer hover:border-cyan-500/50 dark:hover:border-cyan-400 dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all">
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-purple-600 dark:text-cyan-400 bg-purple-100 dark:bg-cyan-900/20 px-2 py-0.5 rounded-sm dark:border dark:border-cyan-500/30">Case Studies</span>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white mt-2 leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Elite Deployments</h4>
                  </div>
                  <RouterLink to="/technologies" className="mt-2 text-[9px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1.5 dark:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                    Read Case Studies <FaArrowRight />
                  </RouterLink>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOBILE OFFCANVAS DRAWER */}
      <div className={`fixed top-0 left-0 h-full w-full sm:w-[360px] bg-white dark:bg-[#191124] text-slate-900 dark:text-white transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-[60] flex flex-col pt-6 pb-10 shadow-2xl dark:shadow-none dark:border-r dark:border-cyan-500/20 overflow-y-auto`}>
        <div className="px-6 flex justify-between items-center mb-6 border-b border-gray-200 dark:border-white/10 pb-4 relative">
          <div className="absolute inset-0 bg-cyan-500/10 blur-xl pointer-events-none hidden dark:block"></div>
          <span className="font-black text-lg text-cyan-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-cyan-400 dark:to-cyan-200 uppercase tracking-widest dark:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)] relative z-10">AIØN Architecture</span>
          <button aria-label="Close menu" className="text-2xl text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 relative z-10 transition-colors" onClick={() => setMenuOpen(false)}>
            <IoCloseSharp />
          </button>
        </div>
        
        <ul className="flex flex-col text-sm font-bold w-full px-4 space-y-1">
          {primaryNavLinks.map((link) => (
            <li key={link.name}>
              <RouterLink 
                to={link.to} 
                onClick={() => setMenuOpen(false)} 
                className={`block py-3 px-4 rounded-xl transition-colors ${location.pathname === link.to ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 font-black border border-transparent dark:border-cyan-500/30' : 'hover:bg-gray-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 border border-transparent'}`}
              >
                {link.name}
              </RouterLink>
            </li>
          ))}
        </ul>

        <div className="px-6 my-4">
          <RouterLink to="/contact?action=quote" onClick={() => setMenuOpen(false)} className="w-full text-center bg-cyan-600 dark:bg-cyan-600 hover:bg-cyan-500 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-md dark:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            <FaFileInvoice /> Get an Instant Quote
          </RouterLink>
        </div>

        <div className="mt-auto px-6 pt-4 border-t border-gray-200 dark:border-white/5 flex flex-col gap-2.5">
          {user ? (
            <>
              <RouterLink to="/profile" onClick={() => setMenuOpen(false)} className="w-full text-center bg-gray-100 dark:bg-[#21293a] hover:bg-gray-200 dark:hover:bg-[#3e4c6b] text-slate-900 dark:text-white py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-transparent dark:border-white/5">
                <FaUserCircle className="text-cyan-500" /> Profile
              </RouterLink>
              <RouterLink to="/orders" onClick={() => setMenuOpen(false)} className="w-full text-center bg-gray-100 dark:bg-[#21293a] hover:bg-gray-200 dark:hover:bg-[#3e4c6b] text-slate-900 dark:text-white py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-transparent dark:border-white/5">
                <FaBoxOpen className="text-cyan-500" /> Orders
              </RouterLink>
              <RouterLink to="/settings" onClick={() => setMenuOpen(false)} className="w-full text-center bg-gray-100 dark:bg-[#21293a] hover:bg-gray-200 dark:hover:bg-[#3e4c6b] text-slate-900 dark:text-white py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-transparent dark:border-white/5">
                <FaCog className="text-cyan-500" /> Settings
              </RouterLink>
              {isAdmin && (
                <RouterLink to="/admin" onClick={() => setMenuOpen(false)} className="w-full text-center bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 dark:hover:shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                  <FaShieldAlt className="text-cyan-400" /> Admin
                </RouterLink>
              )}
              <button onClick={handleSignOut} className="w-full text-center border border-red-500/30 text-red-500 dark:text-red-400 py-3 rounded-xl text-xs font-bold hover:bg-red-50 dark:hover:bg-[#111111] transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <FaSignOutAlt /> Sign Out
              </button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <RouterLink to="/auth" onClick={() => setMenuOpen(false)} className="text-center border border-gray-300 dark:border-white/20 bg-transparent dark:bg-[#111111] text-slate-800 dark:text-white py-2.5 rounded-xl text-xs font-bold hover:bg-gray-50 dark:hover:bg-[#21293a] transition-colors">Sign In</RouterLink>
              <RouterLink to="/auth" onClick={() => setMenuOpen(false)} className="text-center bg-cyan-600 hover:bg-cyan-700 text-white py-2.5 rounded-xl text-xs font-bold transition-colors">Sign Up</RouterLink>
            </div>
          )}
        </div>
      </div>

      {menuOpen && <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-50 transition-opacity" onClick={() => setMenuOpen(false)} />}
    </header>
  );
};

export default Header;