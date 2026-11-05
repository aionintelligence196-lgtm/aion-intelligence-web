// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // <-- Imported Supabase for global auth tracking

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('aion_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to load cart from storage:", error);
      return [];
    }
  });

  // Save to local storage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem('aion_cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to storage:", error);
    }
  }, [cart]);

  // NEW: Global Security Listener - Wipe cart instantly upon Sign Out
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setCart([]); // Clear state
        localStorage.removeItem('aion_cart'); // Purge browser storage
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantityOrDelta, isAbsolute = false) => {
    setCart((prev) => prev.map(item => {
      if (item.id === id) {
        const currentQty = item.quantity || 1;
        const newQuantity = isAbsolute ? quantityOrDelta : currentQty + quantityOrDelta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('aion_cart');
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.toString().replace(/,/g, ''));
      return total + (price * (item.quantity || 1));
    }, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + (item.quantity || 1), 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      getCartTotal, 
      getCartItemCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};