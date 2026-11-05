// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { FaShieldAlt } from 'react-icons/fa';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkSession();

    // Set up a listener for auth state changes (e.g., user logs out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show a secure loading screen while checking credentials
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020617] flex flex-col items-center justify-center font-poppins transition-colors duration-500">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4 shadow-inner animate-pulse">
          <FaShieldAlt className="text-cyan-500 text-3xl" />
        </div>
        <p className="text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-widest text-sm animate-pulse">
          Verifying Security Clearance...
        </p>
      </div>
    );
  }

  // If not authenticated, instantly redirect to the auth page
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // If authenticated, render the protected page
  return children;
};

export default ProtectedRoute;