// src/components/contact/index.js
import React from 'react';
import './index.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">We'd love to hear from you!</p>

      <div className="contact-info">
        <div className="contact-detail">
          <h3>Address</h3>
          <p>123 E-Commerce St, Suite 101, Shop City, 56789</p>
        </div>
        <div className="contact-detail">
          <h3>Email</h3>
          <p>support@shop.com</p>
        </div>
        <div className="contact-detail">
          <h3>Phone</h3>
          <p>+1 234 567 890</p>
        </div>
      </div>

      <div className="social-media">
        <p>Follow us:</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">Twitter</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
