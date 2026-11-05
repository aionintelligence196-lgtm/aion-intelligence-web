// src/pages/CartPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import { supabase } from '../supabaseClient';
import { PaystackButton } from 'react-paystack';
import { 
  FaTrashAlt, FaArrowLeft, FaShieldAlt, FaLock, 
  FaCreditCard, FaMobileAlt, FaCheckCircle, FaMinus, FaPlus, FaSpinner,
  FaServer, FaBoxOpen 
} from 'react-icons/fa';
import { MdOutlineSecurity } from "react-icons/md";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart(); 
  
  // State for DB saving 
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [userEmail, setUserEmail] = useState('client@aion.co.ke');
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUserId(session.user.id);
        setUserEmail(session.user.email || 'client@aion.co.ke');
        const { data } = await supabase.from('user_profiles').select('*').eq('id', session.user.id).single();
        if (data) setProfile(data);
      }
    };
    fetchUserData();
  }, []);

  // --- BULLETPROOF CALCULATION LOGIC ---
  const subtotal = cart.reduce((total, item) => {
    const cleanPrice = item.price.toString().replace(/,/g, '').trim();
    const numericPrice = parseFloat(cleanPrice) || 0; 
    const itemQty = parseInt(item.quantity) || 1;
    return total + (numericPrice * itemQty);
  }, 0);
  
  const tax = subtotal * 0.16; // 16% VAT
  const totalAmount = subtotal + tax;

  // --- PRE-CHECKOUT VALIDATION ---
  const handleValidationFail = () => {
    if (!userId) {
      alert("Security Protocol: Please sign in to verify your identity before checkout.");
      navigate('/auth');
      return;
    }
    if (!profile || !profile.address || !profile.city) {
      alert("Action Required: Please set your delivery coordinates in your Profile before checking out.");
      navigate('/settings');
      return;
    }
  };

  // --- PAYSTACK NATIVE CONFIGURATION ---
  const paystackProps = {
    email: userEmail,
    amount: Math.round(totalAmount * 100), // Converted cleanly to Cents
    currency: 'KES',
    // Securely pull from environment variable, fallback to test key for local development
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'pk_test_5c8aaccaa327b6661828f0ef2ee437bc781b6020', 
    text: "AUTHORIZE DEPLOYMENT",
    onSuccess: async (reference) => {
      setIsSavingOrder(true);
      const orderSnapshot = [...cart];
      const orderTotalSnapshot = parseFloat(totalAmount.toFixed(2));

      try {
        const { error } = await supabase.from('orders').insert([{
          user_id: userId,
          customer_name: profile?.full_name || 'Enterprise Client',
          customer_contact: profile?.phone || userEmail,
          delivery_address: `${profile?.address}, ${profile?.city}`,
          total_amount: orderTotalSnapshot,
          status: 'Processing',
          items: orderSnapshot
        }]);

        if (error) throw error;

        clearCart();
        navigate('/orders', { replace: true }); 

      } catch (err) {
        console.error("Database Injection Error:", err);
        alert(`Payment successful (Ref: ${reference.reference}), but logging failed. Please contact support.`);
        setIsSavingOrder(false); 
      }
    },
    onClose: () => {
      console.log("Paystack secure terminal closed by user.");
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-[#111111] min-h-screen font-poppins text-slate-900 dark:text-white transition-colors duration-500 pb-24">
      <Header />
      
      <main className="max-w-[1600px] mx-auto px-4 sm:px-8 pt-[100px] md:pt-[120px] relative z-10">
        
        <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10 animate-fade-in-up">
          <button onClick={() => navigate(-1)} className="p-2.5 md:p-3 bg-white dark:bg-[#1c1c1c] backdrop-blur-xl border border-gray-200 dark:border-[#2d2d2d] rounded-xl text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-500 hover:border-cyan-500/50 transition-all shadow-sm cursor-pointer">
            <FaArrowLeft className="text-sm md:text-base" />
          </button>
          <div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-slate-900 dark:text-white drop-shadow-sm">
              Deployment <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-cyan-800 dark:from-cyan-400 dark:to-cyan-600">Cart</span>
            </h1>
            <p className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mt-1">
              Review your selected enterprise assets
            </p>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white dark:bg-[#1c1c1c]/90 dark:backdrop-blur-xl rounded-[24px] md:rounded-[32px] border border-gray-200 dark:border-[#2d2d2d] p-12 md:p-16 text-center shadow-lg dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group animate-fade-in-up">
            <div className="absolute inset-0 bg-cyan-500/5 blur-3xl pointer-events-none hidden dark:block"></div>
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 dark:bg-[#111111] rounded-[20px] md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8 border border-gray-100 dark:border-[#2d2d2d] shadow-inner group-hover:scale-110 transition-transform duration-500 relative z-10">
              <FaServer className="text-3xl md:text-4xl text-slate-300 dark:text-gray-600 group-hover:text-cyan-500 transition-colors duration-500" />
            </div>
            <h2 className="text-xl md:text-3xl font-black mb-2 md:mb-3 text-slate-900 dark:text-white tracking-tight relative z-10">NO ASSETS DETECTED</h2>
            <p className="text-slate-500 dark:text-gray-400 text-[10px] md:text-xs mb-8 md:mb-10 max-w-md mx-auto font-medium relative z-10">Your deployment queue is empty. Browse our enterprise hardware and software architectures to begin.</p>
            <Link to="/products" className="inline-flex bg-cyan-600 dark:bg-cyan-600 hover:bg-cyan-700 text-white font-black py-3.5 md:py-4 px-8 md:px-10 rounded-xl transition-all uppercase tracking-widest text-[10px] md:text-xs shadow-md dark:shadow-[0_4px_20px_rgba(34,211,238,0.2)] relative z-10 hover:scale-[1.02]">
              Access Master Catalog
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
            
            {/* CART ITEMS LIST */}
            <div className="w-full lg:w-2/3 flex flex-col gap-4 md:gap-6 animate-fade-in-up">
              <div className="bg-white dark:bg-[#1c1c1c]/90 dark:backdrop-blur-xl rounded-[16px] md:rounded-2xl border border-gray-200 dark:border-[#2d2d2d] p-4 md:p-5 shadow-sm flex items-center justify-between">
                <span className="text-[10px] md:text-xs font-black text-slate-800 dark:text-gray-300 uppercase tracking-widest flex items-center gap-2">
                  <FaBoxOpen className="text-cyan-600 dark:text-cyan-500" /> Queued Assets ({cart.length})
                </span>
                <span className="text-[9px] md:text-[10px] bg-emerald-50 text-emerald-600 dark:bg-[#111111] dark:text-emerald-500 border border-emerald-200 dark:border-[#2d2d2d] px-2.5 py-1 md:py-1.5 rounded-md md:rounded-lg font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                  <FaCheckCircle /> Stock Verified
                </span>
              </div>

              <div className="space-y-4">
                {cart.map((item, index) => {
                  const itemPrice = parseFloat(item.price.toString().replace(/,/g, '').trim()) || 0;
                  const currentQty = parseInt(item.quantity) || 1;
                  const itemTotal = itemPrice * currentQty;

                  return (
                    <div key={`${item.id}-${index}`} className="bg-white dark:bg-[#1c1c1c]/80 dark:backdrop-blur-xl rounded-[20px] md:rounded-[24px] border border-gray-200 dark:border-[#2d2d2d] p-4 md:p-5 lg:p-6 shadow-sm hover:shadow-md dark:hover:shadow-[0_4px_25px_rgba(0,0,0,0.3)] flex flex-col sm:flex-row items-center gap-4 md:gap-6 group relative transition-all hover:border-cyan-500/50">
                      
                      {/* Image Frame */}
                      <div className="w-full sm:w-28 md:w-36 h-28 md:h-36 bg-gray-50 dark:bg-[#111111] rounded-[16px] md:rounded-2xl flex items-center justify-center p-2 md:p-3 shrink-0 border border-gray-100 dark:border-[#2d2d2d] relative shadow-inner overflow-hidden">
                        <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors duration-500 hidden dark:block"></div>
                        {item.image ? (
                          <img src={item.image.split(',')[0]} alt={item.name} className="w-full h-full object-contain drop-shadow-sm dark:mix-blend-normal mix-blend-multiply group-hover:scale-105 transition-transform duration-500 relative z-10" />
                        ) : (
                          <FaShieldAlt className="text-4xl md:text-5xl text-cyan-200 dark:text-gray-700" />
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col w-full relative z-10">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-1.5 md:gap-2">
                            <span className="text-[8px] md:text-[9px] text-cyan-700 dark:text-cyan-500 font-black tracking-widest uppercase bg-cyan-50 dark:bg-[#111111] px-1.5 md:px-2 py-0.5 rounded border border-cyan-200 dark:border-[#2d2d2d]">{item.brand || 'AIØN'}</span>
                            <span className="text-[8px] md:text-[9px] text-slate-500 dark:text-gray-400 font-bold uppercase tracking-widest">{item.category}</span>
                          </div>
                          <button onClick={() => removeFromCart(index)} className="text-slate-400 hover:text-red-500 transition-colors p-1.5 md:p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 border border-transparent hover:border-red-200 dark:hover:border-red-500/30 cursor-pointer" title="Remove Asset">
                            <FaTrashAlt className="text-[10px] md:text-xs" />
                          </button>
                        </div>
                        
                        <h3 className="text-sm md:text-lg lg:text-xl font-black text-slate-900 dark:text-white leading-tight mb-3 md:mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{item.name}</h3>
                        
                        <div className="mt-auto flex flex-col sm:flex-row sm:items-end justify-between gap-3 md:gap-4 pt-3 md:pt-4 border-t border-gray-100 dark:border-[#2d2d2d]">
                          {/* Quantity Controls */}
                          {updateQuantity && (
                            <div className="flex items-center gap-1 bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#2d2d2d] rounded-lg p-0.5 md:p-1 w-max shadow-inner">
                              <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-500 hover:bg-white dark:hover:bg-[#1c1c1c] rounded cursor-pointer transition-colors shadow-sm">
                                <FaMinus className="text-[8px] md:text-[10px]" />
                              </button>
                              <span className="text-xs md:text-sm font-black w-6 md:w-8 text-center text-slate-900 dark:text-white">{currentQty}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-500 hover:bg-white dark:hover:bg-[#1c1c1c] rounded cursor-pointer transition-colors shadow-sm">
                                <FaPlus className="text-[8px] md:text-[10px]" />
                              </button>
                            </div>
                          )}
                          {!updateQuantity && (
                            <div className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">Qty: {currentQty}</div>
                          )}
                          <span className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">KES {itemTotal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CHECKOUT CONSOLE */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4 md:gap-6 sticky top-[80px] md:top-[120px] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              
              {/* Security Badge */}
              <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 md:p-5 rounded-[16px] md:rounded-2xl border border-emerald-200 dark:border-emerald-500/30 flex flex-col gap-1.5 md:gap-2 shadow-sm">
                <div className="flex items-center gap-2 font-black text-[10px] md:text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-500 drop-shadow-sm">
                  <MdOutlineSecurity className="text-base md:text-lg" /> End-to-End Encryption
                </div>
                <p className="text-[9px] md:text-[10px] font-medium text-emerald-600 dark:text-emerald-400/80 leading-relaxed">Transactions secured by AES-256 bit SSL encryption. We do not store raw payment credentials.</p>
              </div>

              {/* Summary Card */}
              <div className="bg-white dark:bg-gradient-to-br dark:from-[#191124] dark:to-[#21293a] dark:backdrop-blur-xl rounded-[24px] md:rounded-[32px] border border-gray-200 dark:border-[#2d2d2d] p-6 md:p-8 shadow-lg dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none hidden dark:block"></div>
                
                <h3 className="text-sm md:text-base font-black uppercase tracking-widest mb-4 md:mb-6 flex items-center justify-between border-b border-gray-100 dark:border-[#2d2d2d] pb-4 md:pb-5 text-slate-900 dark:text-white">
                  Checkout Console
                </h3>

                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  <div className="flex justify-between items-center text-xs md:text-sm font-bold text-slate-600 dark:text-gray-400">
                    <span>Hardware Subtotal</span>
                    <span className="text-slate-900 dark:text-white">KES {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs md:text-sm font-bold text-slate-600 dark:text-gray-400">
                    <span>VAT Assessment (16%)</span>
                    <span className="text-slate-900 dark:text-white">KES {tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs md:text-sm font-bold text-slate-600 dark:text-gray-400">
                    <span>Enterprise Delivery</span>
                    <span className="text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-[#111111] px-2 py-0.5 rounded border border-emerald-100 dark:border-[#2d2d2d] text-[9px] md:text-[10px] uppercase tracking-widest">Complimentary</span>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-[#111111] rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-100 dark:border-[#2d2d2d] mb-6 md:mb-8 flex flex-col items-center text-center shadow-inner relative z-10">
                  <span className="text-[9px] md:text-[10px] font-black text-cyan-600 dark:text-cyan-500 uppercase tracking-widest mb-1.5 md:mb-2">Total Authorized Amount</span>
                  <span className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter drop-shadow-sm">KES {totalAmount.toLocaleString()}</span>
                </div>

                {/* DYNAMIC BUTTON RENDERING */}
                <div className="relative z-10">
                  {isSavingOrder ? (
                    <button disabled className="w-full bg-cyan-700 dark:bg-cyan-800 text-white font-black py-3.5 md:py-4 rounded-xl flex items-center justify-center gap-2 md:gap-3 uppercase tracking-widest text-[10px] md:text-xs opacity-80 cursor-wait shadow-sm">
                      <FaSpinner className="animate-spin text-sm md:text-lg" /> Finalizing...
                    </button>
                  ) : (!userId || !profile?.address || !profile?.city) ? (
                    <button onClick={handleValidationFail} className="w-full bg-slate-900 dark:bg-gradient-to-r dark:from-cyan-600 dark:to-cyan-800 hover:bg-slate-800 dark:hover:from-cyan-500 dark:hover:to-cyan-700 text-white font-black py-3.5 md:py-4 rounded-xl flex items-center justify-center gap-1.5 md:gap-2 uppercase tracking-widest text-[10px] md:text-xs shadow-md dark:shadow-[0_4px_20px_rgba(34,211,238,0.2)] transition-all cursor-pointer hover:scale-[1.02]">
                      <FaLock className="text-xs md:text-sm" /> Validate Identity
                    </button>
                  ) : (
                    <PaystackButton 
                      {...paystackProps} 
                      className="w-full bg-cyan-600 dark:bg-gradient-to-r dark:from-cyan-500 dark:to-cyan-700 hover:bg-cyan-700 dark:hover:from-cyan-400 dark:hover:to-cyan-600 text-white font-black py-3.5 md:py-4 rounded-xl uppercase tracking-widest text-[10px] md:text-xs shadow-md dark:shadow-[0_4px_20px_rgba(34,211,238,0.3)] transition-all cursor-pointer hover:scale-[1.02]" 
                    />
                  )}
                </div>

                <div className="flex justify-center items-center gap-4 md:gap-6 mt-6 md:mt-8 text-slate-400 dark:text-gray-500 text-xl md:text-2xl relative z-10">
                  <FaMobileAlt title="M-Pesa STK Push Supported" className="hover:text-[#25D366] transition-colors cursor-help" />
                  <FaCreditCard title="Visa / Mastercard Supported" className="hover:text-blue-500 transition-colors cursor-help" />
                </div>
              </div>
            </div>

          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;