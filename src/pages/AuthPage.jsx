// src/pages/AuthPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { 
  FaGoogle, FaApple, FaEnvelope, FaArrowLeft, FaEye, FaEyeSlash, 
  FaCircleNotch, FaLock, FaShieldAlt, FaCheck, FaExclamationTriangle
} from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import B1 from '../assets/B1.jpeg'; 

const AuthPage = () => {
  const navigate = useNavigate();
  
  // UI Flow State
  const [isSignUp, setIsSignUp] = useState(false);
  const [isOtpMode, setIsOtpMode] = useState(false); 
  const [otpSent, setOtpSent] = useState(false);
  
  // Form State
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // Security & Processing State
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: '', color: '' });
  
  // Brute-Force Protection State
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  // Handle Lockout Countdown
  useEffect(() => {
    let interval;
    if (lockoutTimer > 0) {
      interval = setInterval(() => {
        setLockoutTimer((prev) => prev - 1);
      }, 1000);
    } else if (lockoutTimer === 0 && failedAttempts >= 3) {
      setFailedAttempts(0); // Reset after cooldown
    }
    return () => clearInterval(interval);
  }, [lockoutTimer, failedAttempts]);

  // --- PASSWORD EVALUATOR ---
  const evaluatePassword = (val) => {
    setPassword(val);
    let score = 0;
    if (!val) {
      setPasswordStrength({ score: 0, text: '', color: '' });
      return;
    }
    if (val.length >= 8) score += 1;
    if (/[A-Z]/.test(val)) score += 1;
    if (/[0-9]/.test(val)) score += 1;
    if (/[^A-Za-z0-9]/.test(val)) score += 1;

    if (score <= 1) setPasswordStrength({ score, text: 'Weak', color: 'bg-red-500' });
    else if (score === 2) setPasswordStrength({ score, text: 'Fair', color: 'bg-orange-500' });
    else if (score === 3) setPasswordStrength({ score, text: 'Good', color: 'bg-blue-500' });
    else if (score === 4) setPasswordStrength({ score, text: 'Strong', color: 'bg-emerald-500' });
  };

  // --- STRICT INPUT SANITIZATION ---
  const sanitizeInput = (input) => {
    return input.replace(/[<>'"/;`%]/g, '').trim();
  };

  // --- 1. SECURE PASSWORD AUTH ---
  const handlePasswordAuth = async (e) => {
    e.preventDefault();
    if (lockoutTimer > 0) return;

    setLoading(true);
    setErrorMessage('');

    const safeContact = sanitizeInput(contact);
    const isEmail = safeContact.includes('@');

    if (isSignUp) {
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        setLoading(false);
        return;
      }
      if (passwordStrength.score < 3) {
        setErrorMessage('Please choose a stronger password.');
        setLoading(false);
        return;
      }
    }

    const credentials = isEmail ? { email: safeContact, password } : { phone: safeContact, password };

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          ...credentials,
          options: { data: { full_name: sanitizeInput(fullName) } }
        });
        if (error) throw error;
        alert('Account created successfully! Please verify your email or phone.');
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword(credentials);
        if (error) throw error;
        setFailedAttempts(0); 
        navigate('/products'); 
      }
    } catch (error) {
      setErrorMessage(error.message);
      if (!isSignUp) {
        const attempts = failedAttempts + 1;
        setFailedAttempts(attempts);
        if (attempts >= 3) {
          setLockoutTimer(30); 
          setErrorMessage('Too many failed attempts. Please wait 30 seconds.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // --- 2. SECURE OTP AUTH ---
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (lockoutTimer > 0 || contact.trim() === '') return;
    
    setLoading(true);
    setErrorMessage('');

    const safeContact = sanitizeInput(contact);
    const isEmail = safeContact.includes('@');
    
    const { error } = await supabase.auth.signInWithOtp(
      isEmail ? { email: safeContact } : { phone: safeContact }
    );

    if (error) {
      setErrorMessage(error.message);
    } else {
      setOtpSent(true);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (lockoutTimer > 0) return;

    setLoading(true);
    setErrorMessage('');

    const safeContact = sanitizeInput(contact);
    const isEmail = safeContact.includes('@');
    
    const { error } = await supabase.auth.verifyOtp({
      [isEmail ? 'email' : 'phone']: safeContact,
      token: sanitizeInput(otpCode),
      type: isEmail ? 'email' : 'sms',
    });

    if (error) {
      setErrorMessage(error.message);
      const attempts = failedAttempts + 1;
      setFailedAttempts(attempts);
      if (attempts >= 3) {
        setLockoutTimer(30);
        setErrorMessage('Too many invalid codes. Please wait 30 seconds.');
      }
    } else {
      setFailedAttempts(0);
      navigate('/products');
    }
    setLoading(false);
  };

  // --- 3. OAUTH PROVIDERS ---
  const handleOAuthSignIn = async (provider) => {
    setErrorMessage('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: { redirectTo: `${window.location.origin}/products` }
    });
    if (error) setErrorMessage(error.message);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 font-poppins transition-colors duration-500 bg-slate-50 dark:bg-[#111111]">
      
      {/* IMMERSIVE BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img src={B1} alt="Background" className="w-full h-full object-cover opacity-15 dark:opacity-20 scale-105 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-slate-50/80 to-white/90 dark:from-[#111111]/95 dark:via-[#1c1c1c]/90 dark:to-[#111111] backdrop-blur-[4px]"></div>
      </div>

      <button onClick={() => navigate(-1)} className="absolute top-6 left-6 p-3 bg-white dark:bg-[#1c1c1c]/90 backdrop-blur-xl border border-gray-200 dark:border-[#2d2d2d] rounded-full text-slate-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-500 transition-colors shadow-sm z-20 cursor-pointer">
        <FaArrowLeft />
      </button>

      {/* AUTHENTICATION CARD */}
      <div className="relative z-10 w-full max-w-[440px] bg-white dark:bg-[#1c1c1c]/95 backdrop-blur-xl rounded-[24px] shadow-2xl dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-[#2d2d2d] overflow-hidden animate-fade-in-up">
        
        {/* Top Header Section */}
        <div className="bg-slate-900 dark:bg-[#111111] border-b border-gray-800 dark:border-[#2d2d2d] px-8 pt-8 pb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-600/10 dark:bg-cyan-500/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-3xl text-cyan-500 dark:text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]" />
              <Link to="/" className="text-2xl font-black tracking-widest text-white uppercase">AIØN.</Link>
            </div>
            <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white transition-colors cursor-pointer text-xl">
              <IoCloseSharp />
            </button>
          </div>
        </div>

        <div className="p-8">
          
          <div className="mb-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-1.5">
              {isOtpMode && otpSent ? 'Check your messages' : isSignUp ? 'Create an Account' : 'Welcome Back'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-gray-400 font-medium tracking-wide">
              {isOtpMode && otpSent ? `We sent a code to ${contact}` : isSignUp ? 'Sign up to access enterprise systems.' : 'Log in to your dashboard.'}
            </p>
          </div>

          {/* Error & Lockout Display */}
          {errorMessage && (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-[10px] font-bold px-4 py-3 rounded-lg mb-6 flex items-start gap-2.5 shadow-inner">
              <FaExclamationTriangle className="text-sm shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}
          {lockoutTimer > 0 && (
            <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 text-orange-600 dark:text-orange-400 text-[10px] font-bold px-4 py-3 rounded-lg mb-6 text-center animate-pulse">
              System locked. Retry in {lockoutTimer}s.
            </div>
          )}

          {/* --- OTP VERIFICATION STEP --- */}
          {isOtpMode && otpSent ? (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <input
                type="text" required value={otpCode} onChange={(e) => setOtpCode(e.target.value)} disabled={lockoutTimer > 0}
                className="w-full bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#2d2d2d] rounded-xl px-4 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors text-[24px] tracking-[0.5em] text-center font-mono shadow-inner disabled:opacity-50" 
                placeholder="------" maxLength={6}
              />
              <button type="submit" disabled={loading || lockoutTimer > 0} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3.5 rounded-xl shadow-sm transition-colors text-xs disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-widest">
                {loading && <FaCircleNotch className="animate-spin" />} Verify Code
              </button>
              <button type="button" onClick={() => setOtpSent(false)} className="w-full text-[10px] font-bold text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-500 transition-colors cursor-pointer uppercase tracking-widest">
                Go Back
              </button>
            </form>
          ) : (
            
            /* --- MAIN AUTHENTICATION FORM --- */
            <form onSubmit={isOtpMode ? handleSendOtp : handlePasswordAuth} className="space-y-4">
              
              {isSignUp && !isOtpMode && (
                <div className="relative flex items-center bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#2d2d2d] focus-within:border-cyan-500 rounded-xl transition-colors shadow-inner">
                  <input 
                    type="text" placeholder="Full Name" required value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={lockoutTimer > 0}
                    className="w-full bg-transparent py-3 px-4 text-xs font-bold text-slate-900 dark:text-white outline-none placeholder-slate-400 dark:placeholder-gray-500 disabled:opacity-50"
                  />
                </div>
              )}

              <div className="relative flex items-center bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#2d2d2d] focus-within:border-cyan-500 rounded-xl transition-colors shadow-inner">
                <FaEnvelope className="absolute left-4 text-slate-400 dark:text-gray-500" />
                <input 
                  type="text" placeholder="Email Address" required value={contact} onChange={(e) => setContact(e.target.value)} disabled={lockoutTimer > 0}
                  className="w-full bg-transparent py-3 pl-10 pr-4 text-xs font-bold text-slate-900 dark:text-white outline-none placeholder-slate-400 dark:placeholder-gray-500 disabled:opacity-50"
                />
              </div>

              {!isOtpMode && (
                <div className="space-y-3">
                  <div className="relative flex items-center bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#2d2d2d] focus-within:border-cyan-500 rounded-xl transition-colors shadow-inner">
                    <FaLock className="absolute left-4 text-slate-400 dark:text-gray-500" />
                    <input 
                      type={showPassword ? "text" : "password"} placeholder="Password" required value={password} onChange={(e) => evaluatePassword(e.target.value)} disabled={lockoutTimer > 0}
                      className="w-full bg-transparent py-3 pl-10 pr-10 text-xs font-bold text-slate-900 dark:text-white outline-none placeholder-slate-400 dark:placeholder-gray-500 disabled:opacity-50"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-slate-400 dark:text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-500 transition-colors cursor-pointer">
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {/* Password Strength Meter */}
                  {isSignUp && password.length > 0 && (
                    <div className="px-1 animate-fade-in-up">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 dark:text-gray-400">Security Level</span>
                        <span className={`text-[8px] font-black uppercase tracking-widest ${passwordStrength.score >= 3 ? 'text-emerald-500' : 'text-red-500'}`}>{passwordStrength.text}</span>
                      </div>
                      <div className="flex gap-1 h-1 w-full rounded-full overflow-hidden bg-gray-200 dark:bg-[#111111]">
                        {[1, 2, 3, 4].map((level) => (
                          <div key={level} className={`h-full flex-1 transition-all duration-300 ${passwordStrength.score >= level ? passwordStrength.color : 'bg-transparent'}`}></div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Confirm Password */}
                  {isSignUp && (
                    <div className="relative flex items-center bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#2d2d2d] focus-within:border-cyan-500 rounded-xl transition-colors shadow-inner">
                      <FaLock className="absolute left-4 text-slate-400 dark:text-gray-500" />
                      <input 
                        type={showPassword ? "text" : "password"} placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={lockoutTimer > 0}
                        className="w-full bg-transparent py-3 pl-10 pr-4 text-xs font-bold text-slate-900 dark:text-white outline-none placeholder-slate-400 dark:placeholder-gray-500 disabled:opacity-50"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Options Row */}
              {!isOtpMode && !isSignUp && (
                <div className="flex items-center justify-between pt-1 pb-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center transition-colors border ${rememberMe ? 'bg-cyan-600 border-cyan-600 dark:bg-cyan-500 dark:border-cyan-500' : 'bg-gray-100 dark:bg-[#111111] border-gray-300 dark:border-[#2d2d2d] group-hover:border-cyan-500'}`}>
                      {rememberMe && <FaCheck className="text-white text-[8px]" />}
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-gray-400 select-none">Keep me signed in</span>
                  </label>
                  <button type="button" className="text-[10px] font-bold text-cyan-600 dark:text-cyan-500 hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors cursor-pointer">
                    Forgot Password?
                  </button>
                </div>
              )}

              <button type="submit" disabled={loading || lockoutTimer > 0} className="w-full bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white font-black py-3.5 rounded-xl tracking-widest uppercase text-[10px] shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 mt-2">
                {loading && <FaCircleNotch className="animate-spin text-sm" />} 
                {isOtpMode ? 'Send Auth Code' : (isSignUp ? 'Create Account' : 'Authenticate')}
              </button>

            </form>
          )}

          {/* Social Logins & Footer Options */}
          {(!isOtpMode || !otpSent) && (
            <>
              {/* Divider */}
              <div className="flex items-center gap-4 my-5">
                <div className="h-px bg-gray-200 dark:bg-[#2d2d2d] flex-1"></div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-gray-500">Or Continue With</span>
                <div className="h-px bg-gray-200 dark:bg-[#2d2d2d] flex-1"></div>
              </div>

              {/* OAuth Buttons */}
              <div className="flex gap-3 mb-6">
                <button onClick={() => handleOAuthSignIn('google')} disabled={lockoutTimer > 0} className="flex-1 flex items-center justify-center gap-2 bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#2d2d2d] hover:bg-gray-100 dark:hover:bg-[#2d2d2d]/50 py-3 rounded-xl transition-colors shadow-sm font-bold text-[10px] uppercase tracking-wider text-slate-700 dark:text-gray-300 cursor-pointer disabled:opacity-50">
                  <FaGoogle className="text-red-500 text-sm" /> Google
                </button>
                <button onClick={() => handleOAuthSignIn('apple')} disabled={lockoutTimer > 0} className="flex-1 flex items-center justify-center gap-2 bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#2d2d2d] hover:bg-gray-100 dark:hover:bg-[#2d2d2d]/50 py-3 rounded-xl transition-colors shadow-sm font-bold text-[10px] uppercase tracking-wider text-slate-700 dark:text-gray-300 cursor-pointer disabled:opacity-50">
                  <FaApple className="text-slate-900 dark:text-white text-sm md:text-base" /> Apple
                </button>
              </div>

              {/* Bottom Toggles */}
              <div className="flex flex-col items-center gap-2.5 border-t border-gray-100 dark:border-[#2d2d2d] pt-5">
                <button 
                  type="button" 
                  onClick={() => { setIsOtpMode(!isOtpMode); setErrorMessage(''); }} 
                  className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-500 transition-colors cursor-pointer"
                >
                  {isOtpMode ? 'Use Password Authentication' : 'Use One-Time Code (OTP)'}
                </button>
                
                <p className="text-[10px] font-medium text-slate-500 dark:text-gray-400 mt-1">
                  {isSignUp ? "Already have an account? " : "Don't have an account? "}
                  <button 
                    onClick={() => { setIsSignUp(!isSignUp); setIsOtpMode(false); setErrorMessage(''); setPasswordStrength({score:0}); }}
                    className="text-cyan-600 dark:text-cyan-500 hover:text-cyan-700 dark:hover:text-cyan-400 font-bold uppercase tracking-widest cursor-pointer transition-colors"
                  >
                    {isSignUp ? 'Log In' : 'Sign Up'}
                  </button>
                </p>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default AuthPage;