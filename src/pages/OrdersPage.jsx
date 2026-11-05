// src/pages/OrdersPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import { 
  FaArrowLeft, FaBoxOpen, FaSpinner, FaCheckCircle, 
  FaCog, FaTruckLoading, FaTimesCircle 
} from 'react-icons/fa';

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [navigate]);

  // Visual Tracker Logic
  const getStageStyles = (currentStatus, targetStage) => {
    const stages = ['Pending', 'Processing', 'Completed'];
    const currentIndex = stages.indexOf(currentStatus);
    const targetIndex = stages.indexOf(targetStage);

    if (currentStatus === 'Cancelled') return 'bg-red-500/10 text-red-500 border-red-500/30';
    if (currentIndex >= targetIndex) return 'bg-cyan-500 text-white shadow-[0_0_10px_rgba(34,211,238,0.4)] border-cyan-500';
    return 'bg-gray-100 dark:bg-slate-800 text-slate-400 border-gray-200 dark:border-slate-700';
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#020617] font-poppins text-slate-900 dark:text-white pb-20 transition-colors duration-500">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 pt-28 md:pt-36">
        
        {/* Navigation & Header */}
        <div className="flex items-center gap-4 mb-10">
          <button 
            onClick={() => navigate('/profile')} 
            className="p-3 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-slate-800 rounded-full hover:text-cyan-500 transition-colors shadow-sm cursor-pointer"
          >
            <FaArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-slate-900 dark:text-white">
              Deployment <span className="text-cyan-600 dark:text-cyan-400">History</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">Track the exact status and configuration stages of your hardware.</p>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-cyan-500">
            <FaSpinner className="animate-spin text-4xl mb-4" />
            <span className="font-bold tracking-widest uppercase text-sm">Synchronizing Records...</span>
          </div>
        ) : orders.length === 0 ? (
          
          /* Empty State */
          <div className="bg-white dark:bg-[#0f172a] rounded-[24px] border border-gray-200 dark:border-slate-800 p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-50 dark:bg-[#050B14] rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100 dark:border-slate-800">
              <FaBoxOpen className="text-3xl text-slate-300 dark:text-slate-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">No active deployments found.</h2>
            <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto">You have not requested any hardware or software packages yet.</p>
            <button onClick={() => navigate('/products')} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3.5 px-8 rounded-xl transition-colors uppercase tracking-widest text-sm shadow-md cursor-pointer">
              Access Catalog
            </button>
          </div>
          
        ) : (
          
          /* Orders List */
          <div className="flex flex-col gap-8">
            {orders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-[#0f172a] rounded-[24px] border border-gray-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
                
                {/* Order Meta Header */}
                <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order Reference ID</span>
                    <p className="font-mono text-sm text-slate-900 dark:text-white font-bold bg-gray-50 dark:bg-slate-800/50 px-2 py-1 rounded inline-block mt-1">
                      {order.id.split('-')[0].toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date Authorized</span>
                    <p className="font-medium text-sm text-slate-900 dark:text-white mt-1">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Valuation</span>
                    <p className="font-black text-lg text-slate-900 dark:text-white mt-0.5">KES {parseFloat(order.total_amount).toLocaleString()}</p>
                  </div>
                </div>

                {/* Dynamic Visual Stage Tracker */}
                {order.status !== 'Cancelled' ? (
                  <div className="mb-10 relative">
                    {/* Connecting Line */}
                    <div className="absolute top-5 left-8 right-8 h-1 bg-gray-100 dark:bg-slate-800 rounded-full z-0"></div>
                    <div className={`absolute top-5 left-8 h-1 bg-cyan-500 rounded-full z-0 transition-all duration-700 ${order.status === 'Pending' ? 'w-0' : order.status === 'Processing' ? 'w-1/2' : 'w-[calc(100%-4rem)]'}`}></div>

                    <div className="relative z-10 flex justify-between">
                      {/* Step 1: Pending */}
                      <div className="flex flex-col items-center gap-2 w-1/3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm transition-all duration-500 ${getStageStyles(order.status, 'Pending')}`}>
                          <FaCheckCircle />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Authorized</span>
                        <span className="text-[10px] text-slate-500 text-center px-2 hidden sm:block">Payment verified.</span>
                      </div>

                      {/* Step 2: Processing */}
                      <div className="flex flex-col items-center gap-2 w-1/3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm transition-all duration-500 ${getStageStyles(order.status, 'Processing')}`}>
                          <FaCog className={order.status === 'Processing' ? 'animate-spin' : ''} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Configuring</span>
                        <span className="text-[10px] text-slate-500 text-center px-2 hidden sm:block">Preparing hardware.</span>
                      </div>

                      {/* Step 3: Completed */}
                      <div className="flex flex-col items-center gap-2 w-1/3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm transition-all duration-500 ${getStageStyles(order.status, 'Completed')}`}>
                          <FaTruckLoading />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Deployed</span>
                        <span className="text-[10px] text-slate-500 text-center px-2 hidden sm:block">Delivered & active.</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3 font-bold text-sm mb-8">
                    <FaTimesCircle className="text-lg shrink-0" /> Order Terminated / Cancelled.
                  </div>
                )}
                
                {/* Embedded Items List */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 border-t border-gray-100 dark:border-slate-800 pt-6">Acquired Assets</span>
                  {order.items && order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 bg-gray-50 dark:bg-[#050B14] p-3 rounded-xl border border-gray-100 dark:border-slate-800/50">
                      <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center p-1 border border-gray-200 dark:border-slate-700 shrink-0">
                        {item.image ? <img src={item.image.split(',')[0]} alt={item.name} className="w-full h-full object-contain" /> : <FaBoxOpen className="text-cyan-500 text-xl" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{item.name}</p>
                        <p className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">{item.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-500">Qty: {item.quantity || 1}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OrdersPage;