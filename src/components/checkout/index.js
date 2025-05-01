// src/components/checkout/index.js
import React, { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';  // Import CartContext
import { useNavigate } from 'react-router-dom';
import './index.css';

const Checkout = () => {
  const { clearCart } = useContext(CartContext);  // Make sure we call useContext for CartContext
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // (You could call an API here)
    clearCart(); // Now this should work correctly
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="checkout-success">
        <h2>Thank you for your order!</h2>
        <img
          src="https://via.placeholder.com/200?text=%F0%9F%98%8A"
          alt="Happy"
          className="success-image"
        />
        <button className="return-home-btn" onClick={() => navigate('/')}>
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <button type="submit" className="place-order-btn">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
