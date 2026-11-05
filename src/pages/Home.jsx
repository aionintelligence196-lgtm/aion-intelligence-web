// src/pages/Home.jsx
import React from 'react';
import Header from "../sections/Header";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Client from "../sections/Client";
import Offer from "../sections/Offer";
import Portfolio from "../sections/Portfolio";
import AionMarquee from "../sections/AionMarquee";
import Reviews from "../sections/Reviews";
import Cta from "../sections/Cta";
import Footer from "../sections/Footer";
import ProductCategories from '../sections/ProductCategories';

const Home = () => {
  return (
    // Added background colors (bg-slate-50 dark:bg-[#020617]) to eliminate white spots
    // Added text colors and transition smoothing
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-500 font-poppins">
      <Header />
      
      {/* Padding added to prevent sections from hiding under the fixed header */}
      <main className="relative pt-[100px] md:pt-[120px]">
        <Hero />
        <About />
        <ProductCategories />
        <AionMarquee />
        <Offer />
        <Portfolio />
        <AionMarquee />
        <Client />
        <AionMarquee />
        <Reviews />
        <Cta />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;