// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import { supabase } from '../supabaseClient';
import { 
  FaPlus, FaTrash, FaBoxOpen, FaCheckCircle, 
  FaTimesCircle, FaEdit, FaUsers, FaUserShield,
  FaChartLine, FaClipboardList, FaMoneyBillWave, FaClock, FaDatabase, FaServer, FaBriefcase
} from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview'); 
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [form, setForm] = useState({
    name: '', category: 'Networking & Wi-Fi', brand: 'AIØN', price: '', oldPrice: '', 
    description: '', featuresString: '', inStock: true, image: ''
  });

  // --- COMPREHENSIVE ENTERPRISE CATEGORIES ---
  const categoriesList = [
    'Networking & Wi-Fi', 
    'Security & Surveillance', 
    'Computing & Workstations', 
    'Servers & Cloud Infrastructure', 
    'Power & Backup Systems',
    'Telephony & Intercom',
    'Access Control & Biometrics', 
    'Point of Sale (POS)',
    'Audio Visual & Displays',
    'Smart Home & Office', 
    'Accessories & Cables', 
    'Software & Web Development'
  ];

  const brandsList = ['AIØN', 'Hikvision', 'Ubiquiti', 'Cisco', 'Grandstream', 'ZKTeco', 'Samsung', 'LG', 'VON', 'HP', 'Dell', 'APC', 'Generic'];

  useEffect(() => {
    const fetchAllData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }

      const [prodRes, userRes, orderRes] = await Promise.all([
        supabase.from('aion_products').select('*').order('created_at', { ascending: false }),
        supabase.from('user_profiles').select('*').order('updated_at', { ascending: false }),
        supabase.from('orders').select('*').order('created_at', { ascending: false })
      ]);

      if (prodRes.data) setProducts(prodRes.data);
      if (userRes.data) setUsers(userRes.data);
      if (orderRes.data) setOrders(orderRes.data);

      setLoading(false);
    };
    fetchAllData();
  }, [navigate]);

  const totalRevenue = orders.filter(o => o.status !== 'Cancelled').reduce((sum, order) => sum + parseFloat(order.total_amount), 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;

  const updateOrderStatus = async (orderId, newStatus) => {
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
    if (!error) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } else {
      alert("Database Error: Failed to update order status.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const featureArray = form.featuresString ? form.featuresString.split(',').map(f => f.trim()) : [];
    const productPayload = {
      name: form.name, category: form.category, brand: form.brand, price: form.price, old_price: form.oldPrice,
      description: form.description, features: featureArray, in_stock: form.inStock,
      image: form.image || 'https://via.placeholder.com/300?text=No+Image'
    };

    if (editingId) {
      const { error } = await supabase.from('aion_products').update(productPayload).eq('id', editingId);
      if (!error) { resetForm(); fetchProductsLocal(); }
      else alert(error.message);
    } else {
      const { error } = await supabase.from('aion_products').insert([productPayload]);
      if (!error) { resetForm(); fetchProductsLocal(); }
      else alert(error.message);
    }
  };

  const fetchProductsLocal = async () => {
    const { data } = await supabase.from('aion_products').select('*').order('created_at', { ascending: false });
    if (data) setProducts(data);
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name, category: product.category, brand: product.brand || 'AIØN', price: product.price, oldPrice: product.old_price || '',
      description: product.description || '', featuresString: product.features ? product.features.join(', ') : '',
      inStock: product.in_stock, image: product.image || ''
    });
    setActiveTab('inventory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("WARNING: Are you sure you want to permanently delete this hardware asset?")) {
      await supabase.from('aion_products').delete().eq('id', id);
      fetchProductsLocal();
    }
  };

  const toggleStock = async (id, currentStock) => {
    await supabase.from('aion_products').update({ in_stock: !currentStock }).eq('id', id);
    fetchProductsLocal();
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: '', category: 'Networking & Wi-Fi', brand: 'AIØN', price: '', oldPrice: '', description: '', featuresString: '', inStock: true, image: '' });
  };

  // --- THE MASSIVE ENTERPRISE CATALOG INJECTION ---
  const handleInjectCatalog = async () => {
    if(window.confirm("Initialize Massive Master Catalog? This will deploy comprehensive hardware, servers, networking, and POS systems into the database.")) {
      setLoading(true);
      const coreCatalog = [
        // SECURITY & SURVEILLANCE
        { name: "Hikvision 4MP ColorVu Bullet Camera", category: "Security & Surveillance", brand: "Hikvision", price: "9,500", old_price: "12,000", description: "24/7 full-color imaging with advanced AI human/vehicle classification.", features: ["4 MP High Resolution", "ColorVu Technology", "IP67 Weatherproof", "Active Strobe Alarm"], in_stock: true, image: "https://via.placeholder.com/300?text=Hikvision+Bullet" },
        { name: "Hikvision 8CH PoE NVR System", category: "Security & Surveillance", brand: "Hikvision", price: "22,000", old_price: "26,500", description: "Network Video Recorder with 8 built-in PoE ports for plug-and-play IP cameras.", features: ["8 PoE Ports", "Up to 8MP decoding", "H.265+ Compression", "Mobile App Ready"], in_stock: true, image: "https://via.placeholder.com/300?text=Hikvision+NVR" },
        
        // NETWORKING & WI-FI
        { name: "Ubiquiti UniFi U6 Pro Access Point", category: "Networking & Wi-Fi", brand: "Ubiquiti", price: "32,500", old_price: "38,000", description: "High-performance WiFi 6 access point tailored for dense corporate networks.", features: ["WiFi 6 (802.11ax)", "5.3 Gbps aggregate rate", "300+ concurrent clients", "PoE+ Powered"], in_stock: true, image: "https://via.placeholder.com/300?text=Ubiquiti+U6" },
        { name: "Cisco Catalyst 2960-X 24-Port Switch", category: "Networking & Wi-Fi", brand: "Cisco", price: "85,000", old_price: "105,000", description: "Enterprise-class Gigabit Ethernet access switch.", features: ["24 Gigabit Ethernet ports", "4 SFP uplinks", "VLAN routing", "Advanced Threat Defense"], in_stock: true, image: "https://via.placeholder.com/300?text=Cisco+Switch" },
        { name: "MikroTik Cloud Router Switch CRS328", category: "Networking & Wi-Fi", brand: "Generic", price: "55,000", old_price: "62,000", description: "24-port Gigabit PoE+ router/switch with 4 10G SFP+ ports.", features: ["24 PoE+ Out Ports", "500W Power Supply", "RouterOS/SwOS Dual Boot", "10Gbps Uplink"], in_stock: true, image: "https://via.placeholder.com/300?text=MikroTik" },

        // SERVERS & CLOUD INFRASTRUCTURE
        { name: "Dell PowerEdge R750xs Rack Server", category: "Servers & Cloud Infrastructure", brand: "Dell", price: "520,000", old_price: "600,000", description: "Purpose-built 2U server for virtualized enterprise environments.", features: ["Dual Intel Xeon Silver", "64GB DDR4 RDIMM", "2x 2.4TB SAS Drives", "iDRAC9 Enterprise"], in_stock: true, image: "https://via.placeholder.com/300?text=Dell+Server" },
        { name: "HP ProLiant DL380 Gen10 Server", category: "Servers & Cloud Infrastructure", brand: "HP", price: "480,000", old_price: "550,000", description: "The world's most secure and adaptable 2U industry-standard server.", features: ["Intel Xeon Scalable", "Smart Array P408i-a", "Redundant Power Supply"], in_stock: true, image: "https://via.placeholder.com/300?text=HP+Server" },

        // COMPUTING & WORKSTATIONS
        { name: "Dell Latitude 5420 Business Laptop", category: "Computing & Workstations", brand: "Dell", price: "145,000", old_price: "165,000", description: "Highly secure and manageable business laptop.", features: ["Core i7 11th Gen", "16GB RAM", "512GB NVMe SSD", "Windows 11 Pro"], in_stock: true, image: "https://via.placeholder.com/300?text=Dell+Laptop" },
        { name: "HP EliteDesk 800 G6 Mini PC", category: "Computing & Workstations", brand: "HP", price: "85,000", old_price: "95,000", description: "Ultra-compact enterprise desktop PC.", features: ["Core i5 10th Gen", "8GB RAM", "256GB SSD", "Space-saving design"], in_stock: true, image: "https://via.placeholder.com/300?text=HP+Mini+PC" },

        // POWER & BACKUP
        { name: "APC Smart-UPS 3000VA LCD 230V", category: "Power & Backup Systems", brand: "APC", price: "195,000", old_price: "220,000", description: "Intelligent network power protection for servers and network gear.", features: ["3000VA / 2700W", "LCD Status Display", "Pure Sine Wave", "Network Management Ready"], in_stock: true, image: "https://via.placeholder.com/300?text=APC+UPS" },
        { name: "Mecer 10kVA Online UPS", category: "Power & Backup Systems", brand: "Generic", price: "245,000", old_price: "280,000", description: "Heavy-duty online double conversion UPS for data centers.", features: ["10kVA Capacity", "Zero Transfer Time", "External Battery Bank"], in_stock: true, image: "https://via.placeholder.com/300?text=Mecer+UPS" },

        // TELEPHONY & INTERCOM
        { name: "Grandstream GRP2614 IP Phone", category: "Telephony & Intercom", brand: "Grandstream", price: "18,500", old_price: "22,000", description: "Carrier-grade IP phone with dual LCD screens.", features: ["4 SIP Accounts", "Integrated Bluetooth/WiFi", "Gigabit Ports", "HD Audio"], in_stock: true, image: "https://via.placeholder.com/300?text=IP+Phone" },
        { name: "Yeastar S50 VoIP PBX System", category: "Telephony & Intercom", brand: "Generic", price: "72,000", old_price: "85,000", description: "Compact VoIP PBX system handling up to 50 users.", features: ["50 Users / 25 Calls", "Automated Attendant (IVR)", "Call Recording", "No Licensing Fees"], in_stock: true, image: "https://via.placeholder.com/300?text=PBX+System" },

        // ACCESS CONTROL & BIOMETRICS
        { name: "ZKTeco F22 Biometric Time Attendance", category: "Access Control & Biometrics", brand: "ZKTeco", price: "22,500", old_price: "28,000", description: "Ultra-thin fingerprint time attendance and access control terminal.", features: ["BioID Sensor", "Wi-Fi Built-in", "Touch Keypad", "Webserver capability"], in_stock: true, image: "https://via.placeholder.com/300?text=ZKTeco+F22" },
        { name: "Hikvision Face Recognition Terminal", category: "Access Control & Biometrics", brand: "Hikvision", price: "45,000", old_price: "55,000", description: "Pro-series facial recognition with mask detection capability.", features: ["0.2s Recognition Speed", "Anti-Spoofing Algorithm", "Card & Face Support"], in_stock: true, image: "https://via.placeholder.com/300?text=Hikvision+Face" },

        // POINT OF SALE (POS)
        { name: "ZKTeco All-in-One Touch POS Terminal", category: "Point of Sale (POS)", brand: "ZKTeco", price: "65,000", old_price: "75,000", description: "Complete retail POS system with capacitive touch screen.", features: ["15-inch Touchscreen", "Intel Celeron J1900", "8GB RAM", "Windows 10 IoT"], in_stock: true, image: "https://via.placeholder.com/300?text=POS+Terminal" },
        { name: "Epson TM-T88VI Thermal Receipt Printer", category: "Point of Sale (POS)", brand: "Generic", price: "38,000", old_price: "42,000", description: "Ultra-fast and reliable enterprise receipt printer.", features: ["350mm/s Print Speed", "Ethernet + USB", "Auto-Cutter"], in_stock: true, image: "https://via.placeholder.com/300?text=Thermal+Printer" },

        // AUDIO VISUAL & DISPLAYS
        { name: "Logitech MeetUp Video Conference Cam", category: "Audio Visual & Displays", brand: "Generic", price: "125,000", old_price: "140,000", description: "Premier ConferenceCam designed for small conference rooms.", features: ["4K Ultra HD", "120-degree FOV", "Integrated Audio"], in_stock: true, image: "https://via.placeholder.com/300?text=Logitech+MeetUp" },
        { name: "Samsung 65-inch Commercial Display", category: "Audio Visual & Displays", brand: "Samsung", price: "155,000", old_price: "175,000", description: "Crystal UHD display for corporate boardrooms and digital signage.", features: ["4K Resolution", "16/7 Operation", "Built-in MagicINFO"], in_stock: true, image: "https://via.placeholder.com/300?text=Samsung+Display" },

        // SMART HOME & OFFICE
        { name: "Tuya Smart Wi-Fi Light Switch", category: "Smart Home & Office", brand: "Generic", price: "4,500", old_price: "5,500", description: "Glass touch panel smart switch with voice control.", features: ["App Control", "Alexa/Google Assistant", "Timer Function"], in_stock: true, image: "https://via.placeholder.com/300?text=Smart+Switch" },

        // ACCESSORIES & CABLES
        { name: "D-Link Cat6 UTP Ethernet Cable Roll (305m)", category: "Accessories & Cables", brand: "Generic", price: "14,500", old_price: "16,000", description: "Pure copper Category 6 network cable drum.", features: ["305 Meters", "Pure Copper", "Gigabit Ready"], in_stock: true, image: "https://via.placeholder.com/300?text=Cat6+Cable" },
        { name: "42U Free Standing Server Rack", category: "Accessories & Cables", brand: "Generic", price: "65,000", old_price: "75,000", description: "Heavy-duty 42U network rack with cooling fans.", features: ["42U Capacity", "Glass Front Door", "Cable Management"], in_stock: true, image: "https://via.placeholder.com/300?text=Server+Rack" },

        // SOFTWARE (KEEPING THE CORE AION PACKAGES)
        { name: "AIØN Starter Core Web Architecture", category: "Software & Web Development", brand: "AIØN", price: "29,999", old_price: "35,000", description: "Foundational digital deployment code for emerging businesses.", features: [".CO.KE Domain", "Secure Webhosting", "SSL Encryption", "WhatsApp Integration"], in_stock: true, image: "https://via.placeholder.com/300?text=Web+Package" },
        { name: "AIØN Enterprise Launch Package", category: "Software & Web Development", brand: "AIØN", price: "44,999", old_price: "52,000", description: "Premium web solution engineered for rapid enterprise scaling.", features: [".CO.KE Domain", "30GB NVMe Hosting", "Unlimited Business Emails", "Live Chat & WhatsApp"], in_stock: true, image: "https://via.placeholder.com/300?text=Web+Package" },
        { name: "AIØN Apex Global Solution", category: "Software & Web Development", brand: "AIØN", price: "119,999", old_price: "139,999", description: "Ultimate enterprise e-commerce platform and digital infrastructure.", features: [".COM Domain", "120GB Dedicated Hosting", "Advanced E-commerce Engine", "Priority Support SLA"], in_stock: true, image: "https://via.placeholder.com/300?text=Web+Package" }
      ];

      const { error } = await supabase.from('aion_products').insert(coreCatalog);
      if(!error) {
        alert("Massive Enterprise Catalog Successfully Injected!");
        fetchProductsLocal();
      } else {
        alert("Injection Error: " + error.message);
      }
      setLoading(false);
    }
  };

  const toggleAdminPrivilege = async (userId, currentStatus) => {
    if (window.confirm(`Modify operative clearance level for this user?`)) {
      const { error } = await supabase.from('user_profiles').update({ is_admin: !currentStatus }).eq('id', userId);
      if (!error) {
        const { data } = await supabase.from('user_profiles').select('*').order('updated_at', { ascending: false });
        if (data) setUsers(data);
      }
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center text-cyan-600 dark:text-cyan-500 font-black uppercase tracking-widest text-xl animate-pulse">Establishing Secure Uplink...</div>;

  return (
    <div className="bg-slate-50 dark:bg-[#020617] dark:bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] dark:from-cyan-900/10 dark:via-[#020617] dark:to-[#020617] min-h-screen font-poppins text-slate-900 dark:text-white transition-colors duration-500 relative pb-20">
      <Header />
      
      <div className="bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 pt-28 pb-0 px-4 sm:px-8 shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] sticky top-[60px] md:top-[76px] z-30 transition-colors">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div className="mb-4 md:mb-6">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 dark:drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">AIØN Central Command</h1>
            <p className="text-xs md:text-sm text-cyan-600 dark:text-cyan-500/80 mt-1 font-bold uppercase tracking-widest flex items-center gap-2">
              <FaServer /> Enterprise Logistics & Database
            </p>
          </div>
          
          <div className="flex overflow-x-auto gap-2 sm:gap-8 pb-4 md:pb-0 custom-scrollbar">
            {[
              { id: 'overview', icon: FaChartLine, label: 'Dashboard' },
              { id: 'orders', icon: FaClipboardList, label: 'Order Logistics' },
              { id: 'inventory', icon: FaBoxOpen, label: 'Asset Inventory' },
              { id: 'users', icon: FaUsers, label: 'Client CRM' } // Renamed to Client CRM
            ].map(tab => (
              <button 
                key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-4 px-2 text-xs md:text-sm font-black uppercase tracking-widest whitespace-nowrap border-b-2 transition-all cursor-pointer ${activeTab === tab.id ? 'border-cyan-600 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400 dark:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]' : 'border-transparent text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400/50 hover:border-cyan-500/30'}`}
              >
                <tab.icon className="text-lg" /> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-10 relative z-10">
        
        {/* ==================== OVERVIEW TAB ==================== */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in-up space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-[#0f172a]/90 dark:backdrop-blur-xl p-8 rounded-[24px] border border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-lg flex flex-col relative overflow-hidden group transition-colors">
                <div className="absolute inset-0 bg-emerald-50 dark:bg-green-500/5 group-hover:bg-emerald-100 dark:group-hover:bg-green-500/10 transition-colors duration-500"></div>
                <FaMoneyBillWave className="absolute -bottom-4 -right-4 text-8xl text-emerald-500/10 dark:text-green-500/10 group-hover:scale-110 transition-transform duration-500" />
                <span className="text-xs font-black text-emerald-600 dark:text-green-400 uppercase tracking-widest relative z-10">Gross Revenue</span>
                <span className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mt-2 relative z-10 drop-shadow-sm dark:drop-shadow-md">KES {totalRevenue.toLocaleString()}</span>
              </div>
              
              <div className="bg-white dark:bg-[#0f172a]/90 dark:backdrop-blur-xl p-8 rounded-[24px] border border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-lg flex flex-col relative overflow-hidden group transition-colors">
                <div className="absolute inset-0 bg-orange-50 dark:bg-orange-500/5 group-hover:bg-orange-100 dark:group-hover:bg-orange-500/10 transition-colors duration-500"></div>
                <FaClock className="absolute -bottom-4 -right-4 text-8xl text-orange-500/10 group-hover:scale-110 transition-transform duration-500" />
                <span className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest relative z-10">Active Deployments</span>
                <span className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mt-2 relative z-10 drop-shadow-sm dark:drop-shadow-md">{pendingOrders}</span>
              </div>

              <div className="bg-white dark:bg-[#0f172a]/90 dark:backdrop-blur-xl p-8 rounded-[24px] border border-cyan-200 dark:border-cyan-500/30 shadow-sm dark:shadow-[0_0_30px_rgba(34,211,238,0.1)] flex flex-col relative overflow-hidden group transition-colors">
                <div className="absolute inset-0 bg-cyan-50 dark:bg-cyan-500/5 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-500/10 transition-colors duration-500"></div>
                <FaBoxOpen className="absolute -bottom-4 -right-4 text-8xl text-cyan-600/10 dark:text-cyan-500/10 group-hover:scale-110 transition-transform duration-500" />
                <span className="text-xs font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-widest relative z-10">Asset Catalog</span>
                <span className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mt-2 relative z-10 drop-shadow-sm dark:drop-shadow-md">{products.length} Units</span>
              </div>

              <div className="bg-white dark:bg-[#0f172a]/90 dark:backdrop-blur-xl p-8 rounded-[24px] border border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-lg flex flex-col relative overflow-hidden group transition-colors">
                <div className="absolute inset-0 bg-purple-50 dark:bg-purple-500/5 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/10 transition-colors duration-500"></div>
                <FaUsers className="absolute -bottom-4 -right-4 text-8xl text-purple-600/10 dark:text-purple-500/10 group-hover:scale-110 transition-transform duration-500" />
                <span className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest relative z-10">Registered Clients</span>
                <span className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mt-2 relative z-10 drop-shadow-sm dark:drop-shadow-md">{users.length}</span>
              </div>
            </div>
          </div>
        )}

        {/* ==================== ORDERS TAB ==================== */}
        {activeTab === 'orders' && (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3 tracking-wide text-slate-900 dark:text-white"><FaClipboardList className="text-cyan-600 dark:text-cyan-400" /> Logistics & Fulfillment</h2>
            <div className="bg-white dark:bg-[#0f172a]/90 dark:backdrop-blur-xl rounded-[24px] border border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-lg overflow-x-auto transition-colors">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#050b14]/50 border-b border-gray-200 dark:border-slate-700">
                    <th className="p-5 font-black text-cyan-700 dark:text-cyan-500 uppercase tracking-widest text-[10px]">Order ID / Date</th>
                    <th className="p-5 font-black text-cyan-700 dark:text-cyan-500 uppercase tracking-widest text-[10px]">Client Details</th>
                    <th className="p-5 font-black text-cyan-700 dark:text-cyan-500 uppercase tracking-widest text-[10px]">Total Amount</th>
                    <th className="p-5 font-black text-cyan-700 dark:text-cyan-500 uppercase tracking-widest text-[10px] text-center">Admin Action (Status)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                  {orders.length === 0 ? (
                    <tr><td colSpan="4" className="p-8 text-center text-slate-500 font-bold uppercase tracking-widest">No transactions recorded yet.</td></tr>
                  ) : (
                    orders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-5 align-top">
                          <div className="font-mono text-xs font-black text-cyan-600 dark:text-cyan-400 mb-1">#{order.id.substring(0,8).toUpperCase()}</div>
                          <div className="font-medium text-slate-500 dark:text-slate-400 text-xs">{new Date(order.created_at).toLocaleDateString()}</div>
                        </td>
                        <td className="p-5 align-top">
                          <div className="font-bold text-slate-900 dark:text-white mb-1">{order.customer_name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">{order.customer_contact}</div>
                          <div className="text-[10px] text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-900/40 inline-block px-2.5 py-1 rounded border border-cyan-200 dark:border-cyan-700/50 font-bold uppercase tracking-wider">{order.delivery_address}</div>
                        </td>
                        <td className="p-5 align-top font-black text-slate-900 dark:text-white text-lg">KES {parseFloat(order.total_amount).toLocaleString()}</td>
                        <td className="p-5 align-top text-center">
                          <select 
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className={`text-[10px] font-black uppercase tracking-widest rounded-lg px-4 py-2 outline-none cursor-pointer border shadow-sm transition-all dark:bg-[#050b14] ${
                              order.status === 'Pending' ? 'bg-orange-50 text-orange-600 border-orange-200 dark:text-orange-400 dark:border-orange-500/50 dark:shadow-[0_0_10px_rgba(249,115,22,0.2)]' :
                              order.status === 'Processing' ? 'bg-blue-50 text-blue-600 border-blue-200 dark:text-blue-400 dark:border-blue-500/50 dark:shadow-[0_0_10px_rgba(59,130,246,0.2)]' :
                              order.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:text-emerald-400 dark:border-emerald-500/50 dark:shadow-[0_0_10px_rgba(16,185,129,0.2)]' :
                              'bg-red-50 text-red-600 border-red-200 dark:text-red-400 dark:border-red-500/50 dark:shadow-[0_0_10px_rgba(239,68,68,0.2)]'
                            }`}
                          >
                            <option value="Pending">1. Pending (Authorized)</option>
                            <option value="Processing">2. Processing (Configuring)</option>
                            <option value="Completed">3. Completed (Deployed)</option>
                            <option value="Cancelled">X. Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== INVENTORY TAB ==================== */}
        {activeTab === 'inventory' && (
          <div className="animate-fade-in-up">
            
            <form onSubmit={handleSubmit} className={`p-6 sm:p-10 rounded-[32px] border shadow-sm dark:shadow-2xl mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500 dark:backdrop-blur-xl ${editingId ? 'bg-cyan-50 dark:bg-cyan-900/10 border-cyan-200 dark:border-cyan-500/50 dark:shadow-[0_0_40px_rgba(34,211,238,0.15)]' : 'bg-white dark:bg-[#0f172a]/90 border-gray-200 dark:border-slate-700'}`}>
              <div className="md:col-span-2 mb-4 flex items-center justify-between border-b border-gray-100 dark:border-slate-700/80 pb-4">
                <h3 className={`text-sm md:text-lg font-black uppercase tracking-widest flex items-center gap-3 ${editingId ? 'text-cyan-600 dark:text-cyan-400 dark:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]' : 'text-slate-900 dark:text-white'}`}>
                  {editingId ? <><FaEdit /> Updating Database Item</> : <><FaPlus className="text-cyan-600 dark:text-cyan-500"/> Inject New Hardware / Software</>}
                </h3>
                {editingId && (
                  <button type="button" onClick={resetForm} className="text-[10px] font-black text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white uppercase tracking-widest cursor-pointer transition-colors">Cancel Edit</button>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-500 mb-2">Asset Name</label>
                <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="w-full bg-gray-50 dark:bg-[#050B14]/80 border border-gray-200 dark:border-slate-700 p-4 rounded-xl text-sm outline-none focus:border-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 shadow-inner" placeholder="e.g. AIØN 4K Dome Camera" />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-500 mb-2">Brand / Manufacturer</label>
                <select value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} className="w-full bg-gray-50 dark:bg-[#050B14]/80 border border-gray-200 dark:border-slate-700 p-4 rounded-xl text-sm outline-none focus:border-cyan-500 text-slate-900 dark:text-white cursor-pointer shadow-inner appearance-none">
                  {brandsList.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-500 mb-2">Sector / Category</label>
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-gray-50 dark:bg-[#050B14]/80 border border-gray-200 dark:border-slate-700 p-4 rounded-xl text-sm outline-none focus:border-cyan-500 text-slate-900 dark:text-white cursor-pointer shadow-inner appearance-none">
                  {categoriesList.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-500 mb-2">Active Price (KES)</label>
                  <input type="text" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required className="w-full bg-gray-50 dark:bg-[#050B14]/80 border border-gray-200 dark:border-slate-700 p-4 rounded-xl text-sm outline-none focus:border-cyan-500 text-slate-900 dark:text-white shadow-inner" placeholder="e.g. 15,500" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-500 mb-2">Old Price / MSRP</label>
                  <input type="text" value={form.oldPrice} onChange={e => setForm({...form, oldPrice: e.target.value})} className="w-full bg-gray-50 dark:bg-[#050B14]/80 border border-gray-200 dark:border-slate-700 p-4 rounded-xl text-sm outline-none focus:border-cyan-500 text-slate-900 dark:text-white shadow-inner" placeholder="e.g. 22,000" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-500 mb-2">Image Links (Comma Separated for Gallery Viewer)</label>
                <input type="text" value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full bg-gray-50 dark:bg-[#050B14]/80 border border-gray-200 dark:border-slate-700 p-4 rounded-xl text-sm outline-none focus:border-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 shadow-inner" placeholder="https://link1.jpg, https://link2.jpg" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-500 mb-2">Specs & Features (Comma separated)</label>
                <textarea rows="2" value={form.featuresString} onChange={e => setForm({...form, featuresString: e.target.value})} className="w-full bg-gray-50 dark:bg-[#050B14]/80 border border-gray-200 dark:border-slate-700 p-4 rounded-xl text-sm outline-none focus:border-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 shadow-inner resize-none" placeholder="UHD Resolution, IP67 Waterproof, Dual Mic" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-500 mb-2">System Description</label>
                <textarea rows="2" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-gray-50 dark:bg-[#050B14]/80 border border-gray-200 dark:border-slate-700 p-4 rounded-xl text-sm outline-none focus:border-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 shadow-inner resize-none" placeholder="Enter full breakdown of the hardware/software..." />
              </div>

              <div className="flex items-center gap-3 md:col-span-2 bg-gray-50 dark:bg-[#050B14]/80 p-4 rounded-xl border border-gray-200 dark:border-slate-700 w-max shadow-sm">
                <input type="checkbox" id="inStockCheck" checked={form.inStock} onChange={e => setForm({...form, inStock: e.target.checked})} className="w-5 h-5 accent-cyan-600 dark:accent-cyan-500 cursor-pointer" />
                <label htmlFor="inStockCheck" className="text-xs font-black uppercase tracking-widest cursor-pointer select-none text-slate-700 dark:text-white">Asset available for deployment</label>
              </div>

              <div className="md:col-span-2 pt-4">
                <button type="submit" className={`w-full text-white font-black py-4.5 rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest text-sm shadow-md transition-all cursor-pointer ${editingId ? 'bg-cyan-600 hover:bg-cyan-500 dark:shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'bg-slate-900 hover:bg-slate-800 dark:bg-cyan-700 dark:hover:bg-cyan-500 dark:shadow-[0_0_15px_rgba(34,211,238,0.2)]'}`}>
                  {editingId ? <><FaEdit /> Sync Database Updates</> : <><FaDatabase /> Inject to Database</>}
                </button>
              </div>
            </form>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-black flex items-center gap-3 tracking-wide text-slate-900 dark:text-white"><FaBoxOpen className="text-cyan-600 dark:text-cyan-400" /> Active Database Assets</h2>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black tracking-widest uppercase bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-white px-3 py-1.5 rounded-full">{products.length} Items</span>
                <button 
                  onClick={handleInjectCatalog}
                  className="bg-gradient-to-r from-red-600 to-red-700 dark:from-red-600 dark:to-red-800 hover:from-red-500 hover:to-red-600 dark:hover:from-red-500 dark:hover:to-red-700 text-white text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-widest shadow-md dark:shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all flex items-center gap-2 cursor-pointer border border-red-500/50 dark:border-red-400/30"
                >
                  <FaDatabase /> Auto-Populate Master Catalog
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0f172a]/90 dark:backdrop-blur-xl rounded-[24px] border border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-lg overflow-hidden transition-colors">
              <div className="divide-y divide-gray-100 dark:divide-slate-800/80">
                {products.length === 0 ? (
                  <div className="p-10 text-center text-slate-500 font-black uppercase tracking-widest">Database is empty. Click "Auto-Populate" to load default assets.</div>
                ) : products.map(p => (
                  <div key={p.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors group">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-[#050B14] p-1 flex-shrink-0 shadow-inner">
                        <img src={p.image.split(',')[0]} alt={p.name} className="w-full h-full object-cover rounded-lg mix-blend-multiply dark:mix-blend-normal" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] font-black uppercase tracking-widest text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/30 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-800/50">{p.brand}</span>
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{p.category}</span>
                        </div>
                        <h4 className="font-black text-sm md:text-base text-slate-900 dark:text-white line-clamp-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{p.name}</h4>
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">KES {parseFloat(p.price.replace(/,/g, '')).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#050B14] p-1.5 rounded-xl border border-gray-200 dark:border-slate-800">
                      <button onClick={() => toggleStock(p.id, p.in_stock)} className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-colors border shadow-sm ${p.in_stock ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30 hover:bg-emerald-100 dark:hover:bg-emerald-500/20' : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30 hover:bg-red-100 dark:hover:bg-red-500/20'}`}>
                        {p.in_stock ? <><FaCheckCircle /> Stocked</> : <><FaTimesCircle /> Empty</>}
                      </button>
                      <button onClick={() => handleEditClick(p)} className="text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 p-2.5 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-900/30 transition-colors cursor-pointer border border-transparent hover:border-cyan-200 dark:hover:border-cyan-800/50"><FaEdit /></button>
                      <button onClick={() => handleDelete(p.id)} className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 p-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors cursor-pointer border border-transparent hover:border-red-200 dark:hover:border-red-800/50"><FaTrash /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== USERS / CRM TAB ==================== */}
        {activeTab === 'users' && (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3 tracking-wide text-slate-900 dark:text-white"><FaBriefcase className="text-cyan-600 dark:text-cyan-400" /> Enterprise Client CRM</h2>
            <div className="bg-white dark:bg-[#0f172a]/90 dark:backdrop-blur-xl rounded-[24px] border border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-lg overflow-x-auto transition-colors">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#050b14]/50 border-b border-gray-200 dark:border-slate-700">
                    <th className="p-5 font-black text-cyan-700 dark:text-cyan-500 uppercase tracking-widest text-[10px]">Client Identity</th>
                    <th className="p-5 font-black text-cyan-700 dark:text-cyan-500 uppercase tracking-widest text-[10px]">Contact Details</th>
                    <th className="p-5 font-black text-cyan-700 dark:text-cyan-500 uppercase tracking-widest text-[10px]">Delivery Coordinates</th>
                    <th className="p-5 font-black text-cyan-700 dark:text-cyan-500 uppercase tracking-widest text-[10px]">Deployment Stats</th>
                    <th className="p-5 font-black text-cyan-700 dark:text-cyan-500 uppercase tracking-widest text-[10px] text-center">Clearance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                  {users.map(u => {
                    // Calculate CRM Data for each user
                    const userOrders = orders.filter(o => o.user_id === u.id && o.status !== 'Cancelled');
                    const totalSpend = userOrders.reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0);
                    
                    return (
                      <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-5 align-top">
                          <div className="font-bold text-slate-900 dark:text-white">{u.full_name || "Unverified Client"}</div>
                          <div className="text-[10px] text-slate-500 font-mono mt-1">ID: {u.id.substring(0,8)}...</div>
                          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Joined: {new Date(u.updated_at || u.created_at || Date.now()).toLocaleDateString()}</div>
                        </td>
                        <td className="p-5 align-top">
                          <div className="text-slate-700 dark:text-slate-300 font-bold text-xs">{u.email || "No Email"}</div>
                          <div className="text-slate-500 text-xs mt-1">{u.phone || "No Phone"}</div>
                        </td>
                        <td className="p-5 align-top">
                          {u.address && u.city ? (
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{u.address}</span>
                              <span className="text-xs font-black text-slate-900 dark:text-white">{u.city}</span>
                            </div>
                          ) : (
                            <span className="text-[9px] text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-2.5 py-1 rounded border border-orange-200 dark:border-orange-500/30 font-black uppercase tracking-widest">Unmapped</span>
                          )}
                        </td>
                        <td className="p-5 align-top">
                          <div className="flex flex-col gap-1.5">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Orders: <span className="text-cyan-600 dark:text-cyan-400">{userOrders.length}</span></span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">LTV: <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-800/30">KES {totalSpend.toLocaleString()}</span></span>
                          </div>
                        </td>
                        <td className="p-5 text-center align-top">
                          <button 
                            onClick={() => toggleAdminPrivilege(u.id, u.is_admin)}
                            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all border shadow-sm ${u.is_admin ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/50 dark:shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 'bg-gray-50 dark:bg-[#050b14] text-slate-500 border-gray-200 dark:border-slate-700 hover:border-cyan-500/30 hover:text-cyan-600 dark:hover:text-cyan-400'}`}
                          >
                            {u.is_admin ? 'Admin Access' : 'Standard'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;