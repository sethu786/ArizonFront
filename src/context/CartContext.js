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

  // Add item
  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) {
        return prev.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  // Update qty
  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setCartItems(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity: qty } : i))
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
