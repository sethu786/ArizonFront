import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/navbar';
import Home from './components/home';
import Cart from './components/cart';
import Checkout from './components/checkout';
import Contact from './components/contact'; // Import the Contact component
import './index.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            {/* Home page */}
            <Route path="/" element={<Home />} />

            {/* Full cart page */}
            <Route path="/cart" element={<Cart />} />

            {/* Contact page */}
            <Route path="/contact" element={<Contact />} />  {/* Add the contact route */}

            {/* Redirect unknown routes back to home */}
            <Route path="/checkout" element={<Checkout />} />  {/* ← New route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;
