// src/context/CartContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load initial cart from localStorage
  const getCartFromLocalStorage = () => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  };
  const [cartItems, setCartItems] = useState(getCartFromLocalStorage());

  // Sync to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

 
  
  // Update qty
  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setCartItems(prev =>
      prev.map(i => (id === id ? { ...i, quantity: qty } : i))
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Totals
  const totalAmount = cartItems
    .reduce((sum, i) => sum + i.price * i.quantity, 0)
    .toFixed(2);
  const totalQuantity = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeItem,
      updateQuantity,
      clearCart,        // Make sure this is included here
      totalAmount,
      totalQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};
