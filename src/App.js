// src/App.js
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FaCircleNotch } from 'react-icons/fa';
import FloatingContact from './sections/FloatingContact';

// Restored Original Page Imports
const Home = React.lazy(() => import('./pages/Home'));
const ProductsPage = React.lazy(() => import('./pages/ProductsPage'));
const Technologies = React.lazy(() => import('./pages/Technologies'));
const SolutionsPage = React.lazy(() => import('./pages/SolutionsPage')); 
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const AuthPage = React.lazy(() => import('./pages/AuthPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const OrdersPage = React.lazy(() => import('./pages/OrdersPage'));
const PartnersPage = React.lazy(() => import('./pages/PartnersPage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageLoader = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex flex-col items-center justify-center text-cyan-600 transition-colors duration-500">
    <FaCircleNotch className="animate-spin text-4xl mb-4" />
  </div>
);

const App = () => {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} /> 
            <Route path="/technologies" element={<Technologies />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <FloatingContact />
      </Router>
    </CartProvider>
  );
};

export default App;