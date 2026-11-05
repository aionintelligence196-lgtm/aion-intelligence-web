// src/sections/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPhoneVolume,
} from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus('Please enter an email.');
      return;
    }
    
    setStatus('Subscribing...');

    try {
      const response = await fetch('https://formsubmit.co/ajax/abdisalan31897@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Newsletter Subscriber: ${email}`,
          Email: email,
          Message: 'Please add this email to the newsletter list.'
        }),
      });

      if (response.ok) {
        setStatus('Subscribed successfully!');
        setEmail(''); 
      } else {
        setStatus('Subscription failed. Try again.');
      }
    } catch (error) {
      setStatus('Network error. Check connection.');
    }
  };

  return (
    <div className='w-full bg-gray-50 dark:bg-[#020617] text-slate-900 dark:text-white h-auto flex flex-col items-start justify-center lg:px-[80px] px-[20px] lg:py-[60px] py-[40px] gap-[60px] border-t border-gray-200 dark:border-slate-800 transition-colors duration-500'>
      <div className='w-full h-auto flex lg:flex-row flex-col items-start justify-center gap-[60px]'>
        
        {/* Brand & Contact Info */}
        <div className='lg:w-[40%] w-full flex flex-col justify-center items-start gap-[25px]'>
          <div className='text-cyan-600 dark:text-cyan-400 font-black text-left lg:text-4xl text-3xl uppercase tracking-wider drop-shadow-sm'>
            AIØN<span className='text-slate-900 dark:text-white'>.</span>
          </div>
          <p className='text-slate-600 dark:text-slate-400 text-md font-poppins leading-relaxed font-medium'>
            We engineer flawless technological ecosystems. Feel free to call us in working hours Mon - Fri 9:00 - 18:00. Our team will be happy to help answer your queries.
          </p>
          <div className='flex justify-center items-center gap-3 text-slate-900 dark:text-white font-bold'>
            <FaPhoneVolume className='text-cyan-600 dark:text-cyan-400 size-5' /> +254 700 558 302
          </div>
          <div className='flex justify-center items-center gap-6 mt-2'>
            <FaFacebookF className='size-5 text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors' />
            <FaTwitter className='size-5 text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors' />
            <FaLinkedinIn className='size-5 text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors' />
            <FaInstagram className='size-5 text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 cursor-pointer transition-colors' />
          </div>
        </div>

        {/* Company Links */}
        <div className='lg:w-[15%] w-full flex flex-col justify-center items-start gap-6'>
          <h1 className='text-slate-900 dark:text-white text-[20px] font-bold tracking-wide uppercase font-poppins'>
            Company
          </h1>
          <ul className='flex flex-col justify-center items-start gap-3'>
            <li><Link to="/" className='text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer text-sm font-poppins font-medium'>Home</Link></li>
            <li><Link to="/about" className='text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer text-sm font-poppins font-medium'>About us</Link></li>
            <li><Link to="/products" className='text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer text-sm font-poppins font-medium'>Products & Pricing</Link></li>
            <li><Link to="/contact" className='text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer text-sm font-poppins font-medium'>Contact</Link></li>
          </ul>
        </div>

        {/* Services Links */}
        <div className='lg:w-[15%] w-full flex flex-col justify-center items-start gap-6'>
          <h1 className='text-slate-900 dark:text-white text-[20px] font-bold tracking-wide uppercase font-poppins'>
            Services
          </h1>
          <ul className='flex flex-col justify-center items-start gap-3'>
            <li><Link to="/solutions" className='text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer text-sm font-poppins font-medium'>Cloud Solutions</Link></li>
            <li><Link to="/solutions" className='text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer text-sm font-poppins font-medium'>Cyber Security</Link></li>
            <li><Link to="/solutions" className='text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer text-sm font-poppins font-medium'>Software Development</Link></li>
            <li><Link to="/solutions" className='text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer text-sm font-poppins font-medium'>Enterprise Hardware</Link></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className='lg:w-[30%] w-full flex flex-col justify-center items-start gap-5'>
          <h1 className='text-slate-900 dark:text-white text-[20px] font-bold tracking-wide uppercase font-poppins'>
            Subscribe to Newsletter
          </h1>
          <form onSubmit={handleSubscribe} className='flex flex-col justify-center items-start w-full gap-3'>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className='w-full p-4 bg-white dark:bg-[#0f172a] text-slate-900 dark:text-white border border-gray-300 dark:border-slate-700 outline-none focus:border-cyan-500 rounded-md transition-colors shadow-sm'
            />
            <button type="submit" className='w-full bg-cyan-600 hover:bg-cyan-500 py-4 px-6 text-white text-md font-bold rounded-md transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(8,145,178,0.4)] uppercase tracking-wider'>
              Subscribe
            </button>
            {status && (
              <p className={`text-sm mt-1 font-semibold ${status.includes('success') ? 'text-green-600 dark:text-green-400' : 'text-cyan-600 dark:text-cyan-400'}`}>
                {status}
              </p>
            )}
          </form>
        </div>

      </div>

      {/* Bottom Legal Row */}
      <div className='w-full h-auto flex lg:flex-row flex-col items-center justify-between border-t border-gray-200 dark:border-slate-800 pt-8 gap-[10px] transition-colors duration-500'>
        <p className='text-slate-500 text-sm font-poppins text-center font-medium'>
          Copyright © {new Date().getFullYear()} AIØN Intelligence Solutions. All rights reserved.
        </p>
        <ul className='text-slate-500 text-sm flex justify-center items-end gap-6 font-medium'>
          <li className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">Terms of use</li>
          <li className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
          <li className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">Cookie Policy</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;