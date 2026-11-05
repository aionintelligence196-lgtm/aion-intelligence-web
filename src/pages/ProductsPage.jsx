// src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import { supabase } from '../supabaseClient'; 

// --- PRODUCT IMAGES ---
import im1 from '../assets/im1.jpg';
import im2 from '../assets/im2.jpg';
import im3 from '../assets/im3.jpg';
import im4 from '../assets/im4.jpg';
import im5 from '../assets/im5.jpg';
import im6 from '../assets/im6.jpg';
import heroBannerImg from '../assets/operational_systems.jpg';

// --- THE HERO IMAGES (E1-E7) ---
import E1 from '../assets/E1.jpg';
import E2 from '../assets/E2.jpg';
import E3 from '../assets/E3.jpg';
import E4 from '../assets/E4.jpg';
import E5 from '../assets/E5.jpg';
import E6 from '../assets/E6.jpg';
import E7 from '../assets/E7.jpg';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  FaStar, FaCheckCircle, FaWhatsapp, FaShieldAlt, 
  FaGlobe, FaShoppingCart, FaChevronLeft, FaChevronRight,
  FaEye, FaTimes, FaArrowRight, FaFilter, FaFire, FaGem, 
  FaChevronDown, FaThLarge, FaList, FaHome, FaExchangeAlt, FaFilePdf, FaBarcode, FaSearch
} from 'react-icons/fa';

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // View & Control States
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeBrand, setActiveBrand] = useState('All');
  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState('Featured');
  const [viewMode, setViewMode] = useState('grid');
  
  // Data States
  const [products, setProducts] = useState([]);
  const [webPackages, setWebPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Hero Slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = ['AION_BANNER', E1, E2, E3, E4, E5, E6, E7];

  // Modal & Comparison States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [compareList, setCompareList] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareSearchQuery, setCompareSearchQuery] = useState('');

  // Brands & Categories
  const brands = ['All', 'AIØN', 'Hikvision', 'Ubiquiti', 'Cisco', 'Grandstream', 'ZKTeco', 'Samsung', 'LG', 'VON', 'HP', 'Dell', 'APC', 'Generic'];
  const categories = [
    'Networking & Wi-Fi', 'Security & Surveillance', 'Computing & Workstations', 
    'Servers & Cloud Infrastructure', 'Power & Backup Systems', 'Telephony & Intercom',
    'Access Control & Biometrics', 'Point of Sale (POS)', 'Audio Visual & Displays',
    'Smart Home & Office', 'Accessories & Cables', 'Software & Web Development'
  ];

  useEffect(() => {
    AOS.init({ duration: 600, once: true, easing: 'ease-out' });

    const fetchInventory = async () => {
      const { data, error } = await supabase.from('aion_products').select('*');
      if (!error && data && data.length > 0) {
        const hardwareItems = data.filter(item => item.category !== 'Software & Web Development').map(p => ({
          id: p.id, name: p.name, category: p.category, brand: p.brand || 'AIØN',
          price: p.price, oldPrice: p.old_price, description: p.description || "Premium enterprise-grade technology integrated for optimal performance.",
          features: p.features || [], rating: p.rating || 5, inStock: p.in_stock,
          images: p.image ? p.image.split(',').map(url => url.trim()) : [im1]
        }));
        
        const softwareItems = data.filter(item => item.category === 'Software & Web Development').map(p => ({
          id: p.id, name: p.name, category: p.category, price: p.price, oldPrice: p.old_price,
          rating: p.rating || 5, features: p.features || [], icon: <FaGlobe className="text-3xl text-cyan-400" />
        }));

        setProducts(hardwareItems);
        if (softwareItems.length > 0) setWebPackages(softwareItems);
      }
      setLoading(false);
    };
    fetchInventory();
  }, []);

  const defaultWebPackages = [
    { id: "W1", name: "AIØN Starter Core", category: "Software & Web Development", price: "29,999", oldPrice: "35,000", features: [".CO.KE Domain", "Simple Webhosting", "SSL Certificate", "5 Email Accounts Max", "5 Pages Max", "WhatsApp Integration"], icon: <FaGlobe className="text-3xl text-cyan-400" />, rating: 4.6 },
    { id: "W2", name: "AIØN Enterprise Launch", category: "Software & Web Development", price: "44,999", oldPrice: "52,000", isPopular: true, features: [".CO.KE Domain", "30GB Webhosting", "SSL Certificate", "Unlimited Emails", "10 - 15 Pages Max", "WhatsApp & Livechat"], icon: <FaShoppingCart className="text-3xl text-cyan-400" />, rating: 5 },
    { id: "W3", name: "AIØN Advanced E-Commerce", category: "Software & Web Development", price: "69,999", oldPrice: "79,999", features: [".COM Domain", "90GB Webhosting", "SSL Certificate", "30 - 40 Pages Max", "Advanced E-commerce Website"], icon: <FaFire className="text-3xl text-cyan-400" />, rating: 4.9 },
    { id: "W4", name: "AIØN Apex Global Solution", category: "Software & Web Development", price: "119,999", oldPrice: "139,999", features: [".COM Domain", "120GB Webhosting", "SSL Certificate", "50 - 60 Pages Max", "Advanced E-commerce Website", "3 - 4 Weeks Delivery Period"], icon: <FaGem className="text-3xl text-cyan-400" />, rating: 5 }
  ];
  const activeWebPackages = webPackages.length > 0 ? webPackages : defaultWebPackages;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search');
    if (query) {
      setSearchFilter(query.toLowerCase());
      setActiveCategory('All'); 
    } else {
      setSearchFilter('');
    }
  }, [location.search]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // --- HANDLERS ---
  const calculateDiscount = (priceStr, oldPriceStr) => {
    if (!oldPriceStr || oldPriceStr === "") return 0;
    const price = parseFloat(priceStr.toString().replace(/,/g, ''));
    const oldPrice = parseFloat(oldPriceStr.toString().replace(/,/g, ''));
    if (oldPrice > price && oldPrice > 0) return Math.round(((oldPrice - price) / oldPrice) * 100);
    return 0;
  };

  const handleWhatsAppOrder = (e, item, isWebPackage = false) => {
    if (e) e.stopPropagation();
    const phoneNumber = "254700558302";
    const itemLink = `${window.location.origin}/products`;
    let featuresText = isWebPackage && item.features ? "\n*Features Included:*\n" + item.features.map(f => `- ${f}`).join("\n") : "";
    const message = `Hello AIØN Intelligence Solutions,\n\nI would like to order:\n\n*Product:* ${item.name}\n*Price:* KES ${item.price}${featuresText}\n\n*Product Link:* ${itemLink}\n\nPlease advise on availability and payment details.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  const handleAddToCart = (e, product) => {
    if (e) e.stopPropagation();
    addToCart(product);
    alert(`${product.name} successfully added to your cart!`);
  };

  const handleToggleCompare = (e, product) => {
    if (e) e.stopPropagation();
    const isAlreadyInCompare = compareList.find(p => p.id === product.id);
    if (isAlreadyInCompare) {
      setCompareList(compareList.filter(p => p.id !== product.id));
    } else {
      if (compareList.length >= 3) {
        alert("Enterprise limit reached: You can compare a maximum of 3 assets side-by-side.");
        return;
      }
      setCompareList([...compareList, product]);
      setCompareSearchQuery(''); 
    }
  };

  // --- FILTERS & SORTING ENGINE ---
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchFilter === '' || product.name.toLowerCase().includes(searchFilter);
    const matchesBrand = activeBrand === 'All' || product.brand === activeBrand;
    
    let matchesCategory = true;
    if (activeCategory === 'Offers') {
      matchesCategory = calculateDiscount(product.price, product.oldPrice) >= 25;
    } else if (activeCategory !== 'All' && activeCategory !== 'Software & Web Development') {
      matchesCategory = product.category === activeCategory;
    } else if (activeCategory === 'Software & Web Development') {
      matchesCategory = false; 
    }
    return matchesSearch && matchesBrand && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = parseFloat(a.price.toString().replace(/,/g, ''));
    const priceB = parseFloat(b.price.toString().replace(/,/g, ''));
    if (sortBy === 'Price: Low to High') return priceA - priceB;
    if (sortBy === 'Price: High to Low') return priceB - priceA;
    if (sortBy === 'Newest Arrivals') return b.id - a.id;
    return 0; 
  });

  const filteredWebPackages = activeWebPackages.filter(pkg => {
    const matchesCategory = activeCategory === 'All' || activeCategory === 'Software & Web Development' || activeCategory === 'Offers';
    const matchesSearch = searchFilter === '' || pkg.name.toLowerCase().includes(searchFilter);
    return matchesCategory && matchesSearch;
  });

  // ==========================================
  // COMPONENT: GRID VIEW CARD (COLUMNS)
  // ==========================================
  const ProductCard = ({ product }) => {
    const discount = calculateDiscount(product.price, product.oldPrice);

    return (
      <div 
        className="bg-white dark:bg-[#111111]/90 backdrop-blur-xl rounded-[12px] overflow-hidden border border-gray-200 dark:border-[#2d2d2d] hover:border-cyan-500 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col relative w-full h-full cursor-pointer"
        onClick={() => { setSelectedProduct(product); setActiveImageIndex(0); document.body.style.overflow = 'hidden'; }}
      >
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden hidden md:block">
          <div className="w-full h-px bg-cyan-400/60 shadow-[0_0_15px_#22d3ee] transform -translate-y-[200px] group-hover:translate-y-[300px] transition-transform duration-[1s] ease-in-out opacity-0 group-hover:opacity-100"></div>
        </div>

        {discount > 0 && (
          <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden z-30 pointer-events-none">
            <div className="bg-gradient-to-r from-red-500 to-red-700 text-white text-[9px] font-black py-1 w-[150%] text-center -rotate-45 -translate-x-[2.2rem] translate-y-[1rem] tracking-widest border-y border-red-400/30">
              {discount}% OFF
            </div>
          </div>
        )}

        <div className="relative w-full h-[120px] md:h-[150px] bg-gray-50 dark:bg-[#1c1c1c] p-3 flex items-center justify-center border-b border-gray-100 dark:border-[#2d2d2d] overflow-hidden">
          <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors duration-500 rounded-full blur-2xl scale-50 group-hover:scale-150"></div>
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 relative z-10" />
          
          <div className="absolute inset-0 bg-white/40 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px] z-20 pointer-events-none">
            <span className="bg-cyan-600/90 text-white font-bold text-[10px] px-3 py-1.5 rounded-md shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5">
              <FaEye /> View
            </span>
          </div>
        </div>

        <div className="p-3 flex flex-col flex-grow relative z-30 bg-white dark:bg-gradient-to-b dark:from-[#111111] dark:to-[#0f1423]">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[8px] text-cyan-600 dark:text-cyan-500 font-black tracking-widest uppercase truncate max-w-[70%]">{product.brand}</span>
            <span className="text-yellow-500 dark:text-yellow-400 text-[8px] flex items-center gap-1 shrink-0"><FaStar /> {product.rating}</span>
          </div>
          <h3 className="text-slate-900 dark:text-white font-bold text-[11px] leading-snug mb-2 line-clamp-2 h-7 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{product.name}</h3>
          
          <div className="mt-auto flex flex-col gap-1.5">
            <div className="flex flex-col">
              <span className="text-sm font-black text-slate-900 dark:text-white leading-none tracking-tight">KES {product.price}</span>
              {product.oldPrice && <span className="text-[8px] text-slate-400 line-through font-semibold mt-0.5">KES {product.oldPrice}</span>}
            </div>
            
            <div className="flex items-center gap-1.5 pt-1.5 border-t border-gray-100 dark:border-[#2d2d2d]">
              <button disabled={!product.inStock} onClick={(e) => handleAddToCart(e, product)} className="flex-[0.8] bg-gray-100 dark:bg-[#1c1c1c] hover:bg-cyan-600 dark:hover:bg-cyan-600 text-slate-600 dark:text-cyan-500 hover:text-white border border-gray-200 dark:border-[#2d2d2d] hover:border-cyan-500 rounded py-1 flex items-center justify-center transition-colors shadow-sm text-[8px] font-bold uppercase cursor-pointer">
                <FaShoppingCart size={10} />
              </button>
              <button disabled={!product.inStock} onClick={(e) => handleWhatsAppOrder(e, product)} className="flex-[1.2] bg-gray-100 dark:bg-[#1c1c1c] hover:bg-[#25D366] dark:hover:bg-[#25D366] text-[#25D366] hover:text-white border border-gray-200 dark:border-[#2d2d2d] hover:border-[#25D366] rounded py-1 flex items-center justify-center gap-1 transition-colors shadow-sm text-[8px] font-bold uppercase cursor-pointer">
                <FaWhatsapp size={10} /> Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // COMPONENT: LIST VIEW CARD (ROWS)
  // ==========================================
  const ProductListCard = ({ product }) => {
    const discount = calculateDiscount(product.price, product.oldPrice);

    return (
      <div 
        className="bg-white dark:bg-[#111111]/90 backdrop-blur-xl rounded-[12px] overflow-hidden border border-gray-200 dark:border-[#2d2d2d] hover:border-cyan-500 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col md:flex-row relative w-full cursor-pointer"
        onClick={() => { setSelectedProduct(product); setActiveImageIndex(0); document.body.style.overflow = 'hidden'; }}
      >
        {discount > 0 && (
          <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden z-30 pointer-events-none">
            <div className="bg-gradient-to-r from-red-500 to-red-700 text-white text-[8px] font-black py-0.5 w-[150%] text-center -rotate-45 -translate-x-[1.8rem] translate-y-[0.8rem] tracking-widest border-y border-red-400/30">
              {discount}% OFF
            </div>
          </div>
        )}

        <div className="relative w-full md:w-[200px] h-[140px] md:h-auto bg-gray-50 dark:bg-[#1c1c1c] p-3 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 dark:border-[#2d2d2d] overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors duration-500 rounded-full blur-3xl scale-50 group-hover:scale-150"></div>
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 relative z-10" />
        </div>

        <div className="p-4 flex flex-col flex-grow relative z-30 bg-white dark:bg-gradient-to-b dark:from-[#111111] dark:to-[#0f1423]">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-[#2d2d2d] text-cyan-700 dark:text-cyan-500 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">{product.brand}</span>
            <span className="text-yellow-500 dark:text-yellow-400 text-[8px] flex items-center gap-0.5"><FaStar /> {product.rating}</span>
            <span className="text-slate-400 dark:text-slate-500 text-[8px] font-mono tracking-widest uppercase ml-auto">SKU: AION-{product.id}-26</span>
          </div>
          <h3 className="text-slate-900 dark:text-white font-black text-xs md:text-sm leading-snug mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{product.name}</h3>
          
          <ul className="space-y-1 mb-1 hidden md:block">
            {product.features && product.features.slice(0,2).map((f, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[10px] font-medium text-slate-600 dark:text-gray-400">
                <FaCheckCircle className="text-cyan-500 mt-0.5 shrink-0" />
                <span className="truncate">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-[#1c1c1c]/50 border-l border-gray-100 dark:border-[#2d2d2d]/50 flex flex-col justify-center shrink-0 md:w-[180px]">
          <div className="mb-3 flex flex-col">
            <span className="text-xl font-black text-slate-900 dark:text-white leading-none tracking-tight">KES {product.price}</span>
            {product.oldPrice && <span className="text-[9px] text-slate-400 dark:text-slate-500 line-through font-bold mt-0.5">KES {product.oldPrice}</span>}
          </div>
          
          <div className="flex flex-col gap-2">
            <button disabled={!product.inStock} onClick={(e) => handleAddToCart(e, product)} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 rounded flex items-center justify-center gap-1.5 uppercase tracking-widest text-[9px] transition-colors shadow-sm cursor-pointer">
              <FaShoppingCart size={10} /> Add to Cart
            </button>
            <button disabled={!product.inStock} onClick={(e) => handleWhatsAppOrder(e, product)} className="w-full bg-gradient-to-r from-[#25D366] to-[#1ebe57] text-white dark:text-[#111111] font-black py-2 rounded flex items-center justify-center gap-1.5 uppercase tracking-widest text-[9px] transition-colors shadow-sm cursor-pointer">
              <FaWhatsapp size={12} /> Order Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-50 dark:bg-[#0f1423] min-h-screen font-poppins text-slate-900 dark:text-white transition-colors duration-500 flex flex-col">
      <Header />

      <div className="pt-[100px] md:pt-[110px] flex-grow flex flex-col">

        {/* --- HERO BANNER & SLIDER --- */}
        {!searchFilter && activeCategory === 'All' && (
          <div className="w-full relative h-[180px] md:h-[300px] lg:h-[400px] overflow-hidden group bg-black border-b border-[#2d2d2d]">
            {heroSlides.map((slide, idx) => (
              <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                
                {slide === 'AION_BANNER' ? (
                  <div className="w-full h-full relative flex items-center p-4 lg:p-8 overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-40 bg-cover bg-right group-hover:scale-105 transition-transform duration-[10s]" style={{ backgroundImage: `url(${heroBannerImg})` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-transparent z-0"></div>
                    
                    <div className="relative z-10 max-w-[1800px] mx-auto w-full flex flex-col justify-center px-4 lg:px-12">
                      <h1 className="text-xl md:text-4xl lg:text-6xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-800 dark:from-cyan-400 dark:via-cyan-500 dark:to-cyan-200 mb-1 drop-shadow-sm">
                        AIØN ENTERPRISE HARDWARE
                      </h1>
                      <h2 className="text-[9px] md:text-xs lg:text-sm text-slate-300 font-bold mb-3 tracking-widest uppercase">Integrated Security & Digital Infrastructure</h2>
                      
                      <div className="flex items-center gap-2 lg:gap-3 mb-2">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white text-sm lg:text-xl"><FaWhatsapp /></div>
                        <h3 className="text-xs md:text-lg lg:text-2xl font-black text-white tracking-tight drop-shadow-sm">Direct Order Line</h3>
                      </div>
                      <p className="text-[8px] md:text-[10px] text-cyan-500 font-black tracking-widest uppercase bg-cyan-900/20 w-max px-2.5 py-1 rounded border border-cyan-500/30 backdrop-blur-md">Call/WhatsApp: +254 700 558 302</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent z-10"></div>
                    <img src={slide} alt={`Banner ${idx}`} className="w-full h-full object-cover lg:object-contain bg-[#1c1c1c] group-hover:scale-105 transition-transform duration-[10s] relative z-0" />
                  </div>
                )}
              </div>
            ))}

            <button onClick={() => setCurrentSlide(prev => (prev === 0 ? heroSlides.length - 1 : prev - 1))} className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-6 h-6 md:w-10 md:h-10 rounded-full bg-black/60 hover:bg-cyan-600 text-white flex items-center justify-center shadow-lg z-20 cursor-pointer opacity-0 group-hover:opacity-100 transition-all border border-white/10 backdrop-blur-md"><FaChevronLeft className="text-xs md:text-lg"/></button>
            <button onClick={() => setCurrentSlide(prev => (prev === heroSlides.length - 1 ? 0 : prev + 1))} className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-6 h-6 md:w-10 md:h-10 rounded-full bg-black/60 hover:bg-cyan-600 text-white flex items-center justify-center shadow-lg z-20 cursor-pointer opacity-0 group-hover:opacity-100 transition-all border border-white/10 backdrop-blur-md"><FaChevronRight className="text-xs md:text-lg"/></button>
            
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-[#2d2d2d] shadow-sm hidden md:flex">
              {heroSlides.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentSlide(idx)} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === idx ? 'bg-cyan-500 w-4' : 'bg-gray-500 hover:bg-white'}`}></button>
              ))}
            </div>
          </div>
        )}

        {/* --- BRAND FILTER SLIDER --- */}
        <div className="bg-white/90 dark:bg-[#111111]/80 backdrop-blur-xl border-y border-gray-200 dark:border-[#2d2d2d] shadow-sm relative z-20 transition-colors duration-500">
          <div className="max-w-[1800px] mx-auto px-4 lg:px-12 py-2 md:py-3 flex items-center gap-4 overflow-x-auto custom-scrollbar">
            <span className="text-[9px] md:text-[10px] font-black text-cyan-600 dark:text-cyan-500 uppercase tracking-widest shrink-0 flex items-center gap-1.5 border-r border-gray-200 dark:border-[#2d2d2d] pr-3">
              <FaFilter /> Brands
            </span>
            {brands.map(brand => (
              <button 
                key={brand}
                onClick={() => setActiveBrand(brand)}
                className={`shrink-0 text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-300 px-3 py-1.5 rounded-md border cursor-pointer ${
                  activeBrand === brand 
                    ? 'bg-cyan-50 dark:bg-[#1c1c1c] text-cyan-700 dark:text-cyan-500 border-cyan-400 dark:border-cyan-500/50' 
                    : 'bg-transparent text-slate-500 dark:text-gray-400 border-gray-200 dark:border-[#2d2d2d] hover:border-cyan-500/50'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN GRID CONTENT AREA */}
        <div className="max-w-[1800px] w-full mx-auto px-4 lg:px-12 pt-4 pb-12 relative z-10 flex-grow">
          
          {/* --- CONTROL DESK --- */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-6 bg-white dark:bg-[#111111]/90 backdrop-blur-xl p-3 rounded-[12px] border border-gray-200 dark:border-[#2d2d2d] shadow-sm relative z-10 transition-colors duration-500">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              
              <div className="relative w-full sm:w-56 group">
                <span className="absolute -top-1.5 left-3 bg-white dark:bg-[#111111] px-1 text-[8px] font-black tracking-widest uppercase text-cyan-600 dark:text-cyan-500 z-10 transition-colors">Category</span>
                <select 
                  value={activeCategory}
                  onChange={(e) => { setActiveCategory(e.target.value); setSearchFilter(''); }}
                  className="w-full appearance-none bg-gray-50 dark:bg-[#1c1c1c] text-slate-900 dark:text-white border border-gray-200 dark:border-[#2d2d2d] focus:border-cyan-500 rounded-md px-3 py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-wider cursor-pointer outline-none transition-all shadow-inner relative z-0"
                >
                  <option value="All">All Hardware</option>
                  <option value="Offers">🔥 Flash Sales</option>
                  <option value="Software & Web Development">Software Packages</option>
                  {categories.filter(c => c !== 'Software & Web Development').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500 pointer-events-none text-[10px]" />
              </div>

              <div className="relative w-full sm:w-56 group">
                <span className="absolute -top-1.5 left-3 bg-white dark:bg-[#111111] px-1 text-[8px] font-black tracking-widest uppercase text-cyan-600 dark:text-cyan-500 z-10 transition-colors">Sort By</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none bg-gray-50 dark:bg-[#1c1c1c] text-slate-900 dark:text-white border border-gray-200 dark:border-[#2d2d2d] focus:border-cyan-500 rounded-md px-3 py-2 text-[9px] md:text-[10px] font-bold uppercase tracking-wider cursor-pointer outline-none transition-all shadow-inner relative z-0"
                >
                  <option value="Featured">⭐ Featured</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                  <option value="Newest Arrivals">Newest Arrivals</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500 pointer-events-none text-[10px]" />
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-2 bg-gray-50 dark:bg-[#1c1c1c] px-4 py-1.5 rounded-md border border-gray-200 dark:border-[#2d2d2d] shadow-inner">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Found</span>
              <span className="bg-cyan-50 dark:bg-[#111111] text-cyan-700 dark:text-cyan-500 border border-cyan-200 dark:border-[#2d2d2d] px-2 py-0.5 rounded text-[10px] font-black shadow-sm">
                {activeCategory === 'Software & Web Development' ? filteredWebPackages.length : sortedProducts.length}
              </span>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16 text-cyan-600 dark:text-cyan-500 font-black uppercase tracking-widest animate-pulse text-[10px]">Loading Catalog...</div>
          ) : sortedProducts.length === 0 && activeCategory !== 'Software & Web Development' ? (
            <div className="text-center py-16 bg-white dark:bg-[#111111]/50 rounded-[12px] border border-gray-200 dark:border-[#2d2d2d] shadow-sm">
              <p className="text-slate-500 dark:text-gray-400 font-black uppercase tracking-widest text-[10px] md:text-xs">No products found matching filters.</p>
              <button onClick={() => { setActiveBrand('All'); setActiveCategory('All'); setSearchFilter(''); }} className="mt-3 bg-cyan-50 dark:bg-[#1c1c1c] border border-cyan-200 dark:border-[#2d2d2d] text-cyan-600 dark:text-cyan-500 px-4 py-2 rounded-md font-black uppercase tracking-widest hover:bg-cyan-600 hover:text-white transition-all cursor-pointer text-[9px]">Clear Filters</button>
            </div>
          ) : (
            <div>
              {/* VIEW MODE: SPECIFIC CATEGORY GRID OR LIST */}
              {activeCategory !== 'All' && activeCategory !== 'Software & Web Development' ? (
                <div className="animate-fade-in-up">
                  
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-gray-200 dark:border-[#2d2d2d] pb-3 mb-4 gap-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-500 mb-0.5">
                        <button onClick={() => setActiveCategory('All')} className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 cursor-pointer"><FaHome /> Catalog</button> 
                        <span>/</span> 
                        <span className="text-slate-400">{activeCategory}</span>
                      </div>
                      <h2 className="text-lg md:text-xl lg:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{activeCategory}</h2>
                    </div>

                    <div className="flex items-center bg-gray-50 dark:bg-[#1c1c1c] p-1 rounded-md border border-gray-200 dark:border-[#2d2d2d] shadow-inner w-max">
                      <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded flex items-center justify-center transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-500 hover:text-cyan-600'}`} title="Grid View"><FaThLarge className="text-[10px]" /></button>
                      <button onClick={() => setViewMode('list')} className={`p-1.5 rounded flex items-center justify-center transition-all cursor-pointer ${viewMode === 'list' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-500 hover:text-cyan-600'}`} title="List View"><FaList className="text-[10px]" /></button>
                    </div>
                  </div>

                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2 md:gap-4">
                      {sortedProducts.map(product => <ProductCard key={product.id} product={product} />)}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {sortedProducts.map(product => <ProductListCard key={product.id} product={product} />)}
                    </div>
                  )}
                </div>
              ) : activeCategory === 'All' ? (
                /* VIEW MODE: HORIZONTAL ROWS PER CATEGORY */
                <div className="space-y-8 md:space-y-12">
                  
                  {sortedProducts.filter(p => calculateDiscount(p.price, p.oldPrice) >= 25).length > 0 && (
                    <div className="relative">
                      <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#2d2d2d] pb-2 mb-4">
                        <h2 className="text-base md:text-lg font-black text-red-600 dark:text-red-500 uppercase tracking-widest flex items-center gap-1.5">
                          <FaFire /> Flash Sales
                        </h2>
                      </div>
                      <div className="flex overflow-x-auto gap-2 md:gap-4 pb-4 snap-x snap-mandatory custom-scrollbar">
                        {sortedProducts.filter(p => calculateDiscount(p.price, p.oldPrice) >= 25).map(product => (
                          <div key={product.id} className="snap-start min-w-[160px] md:min-w-[200px]"><ProductCard product={product} /></div>
                        ))}
                      </div>
                    </div>
                  )}

                  {categories.filter(c => c !== 'Software & Web Development').map(cat => {
                    const catProducts = sortedProducts.filter(p => p.category === cat);
                    if (catProducts.length === 0) return null;
                    
                    return (
                      <div key={cat} className="relative">
                        <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#2d2d2d] pb-2 mb-4">
                          <h2 className="text-sm md:text-base lg:text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest">{cat}</h2>
                          <button onClick={() => setActiveCategory(cat)} className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-500 flex items-center gap-1 cursor-pointer bg-cyan-50 dark:bg-[#1c1c1c] px-2.5 py-1 rounded border border-cyan-200 dark:border-[#2d2d2d] transition-all hover:bg-cyan-600 hover:text-white dark:hover:border-cyan-500/50">View All <FaArrowRight /></button>
                        </div>
                        <div className="flex overflow-x-auto gap-2 md:gap-4 pb-4 snap-x snap-mandatory custom-scrollbar">
                          {catProducts.map(product => (
                            <div key={product.id} className="snap-start min-w-[160px] md:min-w-[200px]"><ProductCard product={product} /></div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          )}

          {/* --- SOFTWARE PACKAGES SECTION --- */}
          {(activeCategory === 'Software & Web Development' || activeCategory === 'All') && (
            <div className="w-full mt-12 border-t border-gray-200 dark:border-[#2d2d2d] pt-10 pb-8 relative" data-aos="fade-up">
              
              <div className="text-center mb-8 relative z-10">
                <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-800 dark:from-cyan-400 dark:via-cyan-500 dark:to-cyan-200 mb-2">
                  Software Packages
                </h2>
                <div className="w-16 h-1 bg-cyan-500 mx-auto rounded-full shadow-sm"></div>
              </div>

              {filteredWebPackages.length === 0 && searchFilter ? (
                <div className="text-center py-8 text-slate-500 text-[10px] font-black uppercase tracking-widest">No software packages match your search.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1800px] mx-auto relative z-10">
                  {filteredWebPackages.map((pkg) => (
                    <div 
                      key={pkg.id} 
                      className={`bg-white dark:bg-[#111111]/90 backdrop-blur-xl rounded-[16px] p-5 border transition-all duration-300 flex flex-col group relative overflow-hidden ${pkg.isPopular ? 'border-cyan-500 shadow-sm scale-[1.02]' : 'border-gray-200 dark:border-[#2d2d2d] hover:border-cyan-500 shadow-sm'}`}
                    >
                      {pkg.isPopular && (
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white text-[8px] font-black px-4 py-1 rounded-b-md shadow-sm uppercase tracking-widest">
                          Most Popular
                        </span>
                      )}
                      
                      <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-[#1c1c1c] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 border border-gray-100 dark:border-[#2d2d2d] mx-auto shadow-inner">
                        {pkg.icon}
                      </div>
                      
                      <div className="text-center mb-4">
                        <h3 className="text-sm md:text-base text-slate-900 dark:text-white font-black mb-1 tracking-tight">{pkg.name}</h3>
                        <p className="text-[8px] text-cyan-600 dark:text-cyan-500 uppercase font-black tracking-widest">Premium Web Solution</p>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-[#1c1c1c]/50 rounded-lg p-3 mb-6 border border-gray-100 dark:border-[#2d2d2d]/50 text-center shadow-inner">
                        <div className="flex items-end justify-center gap-1.5 mb-0.5">
                          <span className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white leading-none tracking-tighter">KES {pkg.price}</span>
                        </div>
                        {pkg.oldPrice && <span className="text-[8px] text-slate-400 line-through font-bold">Was KES {pkg.oldPrice}</span>}
                      </div>

                      <ul className="space-y-2 text-slate-700 dark:text-gray-300 text-[10px] font-medium mb-6 flex-grow px-1">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <FaCheckCircle className="text-cyan-500 text-sm shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-100 dark:border-[#2d2d2d]">
                        <button 
                          onClick={(e) => handleAddToCart(e, { id: pkg.id, name: pkg.name, category: pkg.category, price: pkg.price, inStock: true, image: im1 })}
                          className="flex-1 bg-gray-100 dark:bg-[#1c1c1c] hover:bg-cyan-600 text-cyan-600 dark:text-cyan-500 hover:text-white border border-gray-200 dark:border-[#2d2d2d] hover:border-cyan-500 rounded-md py-2 flex items-center justify-center gap-1 uppercase tracking-widest text-[9px] font-black transition-colors shadow-sm cursor-pointer"
                        >
                          <FaShoppingCart size={11} /> Add
                        </button>
                        <button 
                          onClick={(e) => handleWhatsAppOrder(e, pkg, true)}
                          className="flex-1 bg-gradient-to-r from-[#25D366] to-[#1ebe57] text-white dark:text-[#111111] font-black py-2 rounded-md flex items-center justify-center gap-1 shadow-sm uppercase tracking-widest text-[9px] transition-transform hover:scale-[1.02] cursor-pointer"
                        >
                          <FaWhatsapp size={12} /> Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* --- FLOATING COMPARE BAR --- */}
      {compareList.length > 0 && !showCompareModal && (
        <div className="fixed bottom-0 left-0 w-full bg-white/95 dark:bg-[#111111]/95 backdrop-blur-xl border-t border-gray-200 dark:border-[#2d2d2d] shadow-sm z-50 p-2 animate-fade-in-up">
          <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-1 md:pb-0">
              <span className="text-[9px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-500 whitespace-nowrap"><FaExchangeAlt className="inline mr-1"/> Compare:</span>
              {compareList.map(item => (
                <div key={item.id} className="flex items-center gap-1 bg-gray-50 dark:bg-[#1c1c1c] border border-gray-200 dark:border-[#2d2d2d] px-1.5 py-0.5 rounded shrink-0">
                  <img src={item.images[0]} alt={item.name} className="w-4 h-4 object-contain bg-white rounded-sm" />
                  <span className="text-[8px] font-bold text-slate-700 dark:text-gray-300 w-16 truncate">{item.name}</span>
                  <button onClick={() => handleToggleCompare(null, item)} className="text-slate-400 hover:text-red-500 ml-0.5"><FaTimes size={8} /></button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => setCompareList([])} className="text-[9px] font-bold text-slate-500 dark:text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors cursor-pointer">Clear</button>
              <button onClick={() => setShowCompareModal(true)} className="bg-cyan-600 hover:bg-cyan-700 text-white text-[9px] font-black px-3 py-1.5 rounded shadow-sm uppercase tracking-widest flex items-center gap-1 transition-colors cursor-pointer">
                Compare ({compareList.length}) <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- QUICK VIEW MODAL --- */}
      {selectedProduct && !showCompareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 backdrop-blur-sm bg-black/60 transition-opacity">
          <div className="bg-white dark:bg-[#111111]/95 w-full h-full md:h-auto md:max-h-[85vh] md:max-w-4xl md:rounded-[20px] shadow-2xl flex flex-col md:flex-row relative overflow-hidden animate-fade-in-up border border-gray-200 dark:border-[#2d2d2d]">
            <button onClick={closeProductModal} className="absolute top-2 right-2 z-20 bg-gray-100 dark:bg-[#1c1c1c] hover:bg-red-500 text-slate-600 dark:text-gray-300 hover:text-white p-2 rounded-full transition-colors cursor-pointer shadow-sm"><FaTimes className="text-xs" /></button>

            <div className="w-full md:w-1/2 bg-gray-50 dark:bg-[#1c1c1c] flex flex-col items-center p-4 relative pt-8 md:pt-4">
              <div className="w-full flex-1 flex items-center justify-center min-h-[200px] mb-3 z-10">
                <img src={selectedProduct.images[activeImageIndex]} alt={selectedProduct.name} className="max-w-full max-h-[250px] object-contain drop-shadow-sm mix-blend-multiply dark:mix-blend-normal" />
              </div>
              {selectedProduct.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto p-1.5 custom-scrollbar z-10">
                  {selectedProduct.images.map((img, idx) => (
                    <img key={idx} src={img} alt="thumb" onClick={() => setActiveImageIndex(idx)} className={`w-10 h-10 object-contain p-1 rounded-md bg-white cursor-pointer transition-all border ${activeImageIndex === idx ? 'border-cyan-500 shadow-sm scale-105' : 'border-gray-200 opacity-70 hover:opacity-100 hover:border-cyan-400'}`} />
                  ))}
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 p-5 md:p-6 flex flex-col overflow-y-auto bg-white dark:bg-gradient-to-b dark:from-[#111111] dark:to-[#0f1423]">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-[9px] font-black text-cyan-600 dark:text-cyan-500 tracking-widest uppercase flex items-center gap-1"><FaShieldAlt /> {selectedProduct.category}</span>
                <span className="bg-cyan-50 dark:bg-[#1c1c1c] border border-cyan-200 dark:border-[#2d2d2d] text-cyan-700 dark:text-cyan-500 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">{selectedProduct.brand}</span>
              </div>
              
              <h2 className="text-lg md:text-xl font-black text-slate-900 dark:text-white mb-1.5 leading-tight">{selectedProduct.name}</h2>
              
              <div className="flex items-center gap-2 mb-4 text-[8px] font-mono tracking-widest uppercase text-slate-500 dark:text-gray-400">
                <span className="flex items-center gap-0.5"><FaBarcode className="text-cyan-500"/> AION-{selectedProduct.id}-26</span>
                <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-[#1c1c1c] px-1.5 py-0.5 rounded border border-emerald-200 dark:border-[#2d2d2d]"><FaCheckCircle /> In Stock</span>
              </div>

              <ul className="space-y-1.5 mb-4">
                {selectedProduct.features && selectedProduct.features.length > 0 ? (
                  selectedProduct.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[10px] font-medium text-slate-600 dark:text-gray-300">
                      <FaCheckCircle className="text-cyan-500 mt-0.5 shrink-0" /><span>{f}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-[10px] font-medium text-slate-600 dark:text-gray-300">{selectedProduct.description}</li>
                )}
              </ul>

              <div className="flex flex-wrap items-center gap-1.5 mb-4">
                <button className="flex items-center gap-1 text-[9px] font-bold text-cyan-600 dark:text-cyan-500 border border-cyan-200 dark:border-cyan-500/50 rounded px-2.5 py-1 bg-cyan-50 dark:bg-[#1c1c1c] hover:border-cyan-500 cursor-pointer transition-colors"><FaFilePdf /> PDF</button>
                <button onClick={(e) => handleToggleCompare(e, selectedProduct)} className={`flex items-center gap-1 text-[9px] font-bold border rounded px-2.5 py-1 cursor-pointer transition-colors ${compareList.some(p => p.id === selectedProduct.id) ? 'bg-cyan-600 text-white border-cyan-500' : 'bg-gray-50 dark:bg-[#1c1c1c] text-slate-600 dark:text-gray-300 border-gray-200 dark:border-[#2d2d2d] hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-500'}`}>
                  <FaExchangeAlt /> {compareList.some(p => p.id === selectedProduct.id) ? 'Remove' : 'Compare'}
                </button>
              </div>

              <div className="mt-auto bg-gray-50 dark:bg-[#1c1c1c]/80 p-4 rounded-lg border border-gray-100 dark:border-[#2d2d2d] shadow-inner">
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">KES {selectedProduct.price}</span>
                  {selectedProduct.oldPrice && <span className="text-[10px] text-slate-400 dark:text-gray-500 line-through font-bold mb-0.5">KES {selectedProduct.oldPrice}</span>}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button onClick={(e) => { handleAddToCart(e, selectedProduct); closeProductModal(); }} className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded flex items-center justify-center gap-1 uppercase tracking-wider text-[9px] shadow-sm cursor-pointer transition-colors">
                    <FaShoppingCart size={11} /> Cart
                  </button>
                  <button onClick={(e) => handleWhatsAppOrder(e, selectedProduct)} className="flex-1 bg-gradient-to-r from-[#25D366] to-[#1ebe57] text-white dark:text-[#111111] font-black py-2 rounded flex items-center justify-center gap-1 uppercase tracking-wider text-[9px] shadow-sm cursor-pointer transition-colors">
                    <FaWhatsapp size={13} /> Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductsPage;