// src/pages/Contact.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp, 
  FaPaperPlane, FaCircleNotch, FaCheckCircle, FaArrowRight
} from 'react-icons/fa';

const Contact = () => {
  const location = useLocation();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 600, once: true, easing: 'ease-out' });

    const searchParams = new URLSearchParams(location.search);
    const action = searchParams.get('action');
    const reference = searchParams.get('reference');

    if (action === 'quote') {
      const formattedRef = reference ? `[Ref: ${reference}]` : 'Enterprise Architecture';
      setSubject(`Hardware Quotation Request ${formattedRef}`);
      setMessage(`Hello AIØN Engineering Team,\n\nI would like to request a formal quotation and deployment timeline regarding ${reference ? reference : 'your enterprise IT solutions'}.\n\nPlease provide specifications and pricing details.\n\nThank you.`);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setName(''); setEmail(''); setSubject(''); setMessage('');
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const handleWhatsApp = () => {
    const text = "Hello AIØN Support, I need assistance with an enterprise deployment.";
    window.open(`https://wa.me/254700558302?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-slate-50 dark:bg-[#111111] min-h-screen font-poppins text-slate-900 dark:text-white transition-colors duration-500 flex flex-col">
      <Header />

      {/* --- UNIFIED BANNER & CLEARANCE (Flush with Header) --- */}
      <div className="bg-white/50 dark:bg-gradient-to-r dark:from-[#191124]/90 dark:via-[#21293a]/90 dark:to-[#191124]/90 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 pt-[100px] pb-8 px-4 lg:px-12">
        <div className="max-w-[1600px] mx-auto" data-aos="fade-right">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter drop-shadow-sm">
            Secure <span className="text-cyan-600 dark:text-cyan-400">Communications</span>
          </h1>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1.5">
            Connect with our engineering and deployment teams.
          </p>
        </div>
      </div>

      {/* --- COMPACT MAIN CONTENT AREA --- */}
      <main className="flex-grow max-w-[1600px] w-full mx-auto px-4 lg:px-12 py-10 relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT: Secure Messaging Form (Span 7) */}
        <div className="xl:col-span-7 bg-white dark:bg-[#1c1c1c]/90 p-6 md:p-8 rounded-[24px] border border-gray-200 dark:border-[#2d2d2d] shadow-sm dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)]" data-aos="fade-up">
          <h2 className="text-xl font-black mb-1">Initiate Transmission</h2>
          <p className="text-xs text-slate-500 dark:text-gray-400 font-medium mb-6">
            Submit your requirements below. Our technical team responds within 2 hours.
          </p>

          {submitSuccess ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
              <FaCheckCircle className="text-4xl text-emerald-500 mb-3" />
              <h3 className="text-lg font-black mb-1">Transmission Successful</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Your request is logged. An engineer will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-500 mb-1.5">Authorized Representative</label>
                  <input 
                    type="text" required value={name} onChange={(e) => setName(e.target.value)} disabled={isSubmitting}
                    className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#2d2d2d] p-3 rounded-lg text-xs outline-none focus:border-cyan-500 dark:focus:border-cyan-500 dark:text-white transition-colors" 
                    placeholder="Full Name" 
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-500 mb-1.5">Corporate Email</label>
                  <input 
                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting}
                    className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#2d2d2d] p-3 rounded-lg text-xs outline-none focus:border-cyan-500 dark:focus:border-cyan-500 dark:text-white transition-colors" 
                    placeholder="name@company.com" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-500 mb-1.5">Subject / Reference</label>
                <input 
                  type="text" required value={subject} onChange={(e) => setSubject(e.target.value)} disabled={isSubmitting}
                  className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#2d2d2d] p-3 rounded-lg text-xs outline-none focus:border-cyan-500 dark:focus:border-cyan-500 dark:text-white transition-colors" 
                  placeholder="e.g., Server Infrastructure Quotation" 
                />
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-500 mb-1.5">Message Payload</label>
                <textarea 
                  required value={message} onChange={(e) => setMessage(e.target.value)} disabled={isSubmitting} rows="5"
                  className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#2d2d2d] p-3 rounded-lg text-xs outline-none focus:border-cyan-500 dark:focus:border-cyan-500 dark:text-white transition-colors resize-none" 
                  placeholder="Detail your operational requirements here..." 
                ></textarea>
              </div>

              <button 
                type="submit" disabled={isSubmitting}
                className="w-full bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white font-black py-3.5 rounded-lg flex items-center justify-center gap-2 uppercase tracking-widest text-xs transition-colors cursor-pointer disabled:opacity-70 dark:shadow-[0_4px_15px_rgba(34,211,238,0.2)]"
              >
                {isSubmitting ? <><FaCircleNotch className="animate-spin" /> Processing</> : <><FaPaperPlane /> Transmit Request</>}
              </button>
            </form>
          )}
        </div>

        {/* RIGHT: Compact Contact Cards & Map (Span 5) */}
        <div className="xl:col-span-5 flex flex-col gap-4" data-aos="fade-up" data-aos-delay="100">
          
          {/* Quick Contact Grid */}
          <div className="grid grid-cols-2 gap-4">
            <a href="tel:+254700558302" className="bg-white dark:bg-[#1c1c1c]/90 p-4 rounded-[20px] border border-gray-200 dark:border-[#2d2d2d] shadow-sm hover:border-cyan-500 dark:hover:border-cyan-500/50 transition-colors flex flex-col items-center justify-center text-center group cursor-pointer dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
              <div className="w-8 h-8 rounded-full bg-cyan-50 dark:bg-[#111111] border dark:border-[#2d2d2d] flex items-center justify-center mb-2 group-hover:bg-cyan-600 dark:group-hover:bg-cyan-500 transition-colors">
                <FaPhoneAlt className="text-cyan-600 dark:text-cyan-500 group-hover:text-white text-xs" />
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-gray-400 mb-0.5">Direct Line</p>
              <p className="text-xs font-bold whitespace-nowrap dark:text-white">+254 700 558 302</p>
            </a>

            <a href="mailto:client@aion.co.ke" className="bg-white dark:bg-[#1c1c1c]/90 p-4 rounded-[20px] border border-gray-200 dark:border-[#2d2d2d] shadow-sm hover:border-cyan-500 dark:hover:border-cyan-500/50 transition-colors flex flex-col items-center justify-center text-center group cursor-pointer dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
              <div className="w-8 h-8 rounded-full bg-cyan-50 dark:bg-[#111111] border dark:border-[#2d2d2d] flex items-center justify-center mb-2 group-hover:bg-cyan-600 dark:group-hover:bg-cyan-500 transition-colors">
                <FaEnvelope className="text-cyan-600 dark:text-cyan-500 group-hover:text-white text-xs" />
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-gray-400 mb-0.5">Email Comm-Link</p>
              <p className="text-xs font-bold dark:text-white">client@aion.co.ke</p>
            </a>
          </div>

          {/* Urgent WhatsApp Strip */}
          <div className="bg-[#25D366] dark:bg-[#25D366]/90 rounded-[20px] p-5 shadow-sm dark:shadow-[0_4px_25px_rgba(37,211,102,0.15)] text-white dark:text-[#111111] flex items-center justify-between cursor-pointer hover:bg-[#20ba59] dark:hover:bg-[#20ba59] transition-colors" onClick={handleWhatsApp}>
            <div>
              <h3 className="text-sm font-black flex items-center gap-2"><FaWhatsapp className="text-lg" /> Urgent Deployment?</h3>
              <p className="text-[10px] font-medium mt-1 opacity-90">Bypass the email queue. Chat directly with an engineer.</p>
            </div>
            <FaArrowRight className="text-xl opacity-80" />
          </div>

          {/* Compact Map */}
          <div className="w-full h-full min-h-[200px] bg-gray-200 dark:bg-[#111111] rounded-[20px] overflow-hidden border border-gray-200 dark:border-[#2d2d2d] shadow-sm relative filter dark:grayscale dark:contrast-125 dark:opacity-80">
            <div className="absolute top-3 left-3 z-10 bg-white/90 dark:bg-[#1c1c1c]/90 backdrop-blur-md px-3 py-1.5 rounded text-[9px] font-black uppercase tracking-widest border border-gray-200 dark:border-[#2d2d2d] shadow-sm flex items-center gap-1.5 dark:text-white">
              <FaMapMarkerAlt className="text-cyan-600 dark:text-cyan-400" /> Nairobi HQ
            </div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127641.19231846511!2d36.7397312102148!3d-1.2920659999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi!5e0!3m2!1sen!2ske!4v1690000000000!5m2!1sen!2ske" 
              width="100%" height="100%" style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
              allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="AION HQ"
            ></iframe>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;