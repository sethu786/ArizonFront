// src/components/miniCart/index.js
import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './index.css';

const MiniCart = ({ onClose }) => {
  const { cartItems, totalAmount, totalQuantity, updateQuantity, removeItem } = useContext(CartContext);
  const navigate = useNavigate(); // For programmatic navigation

  const handleViewCartClick = () => {
    onClose();              // Close the mini cart
    navigate('/cart');      // Then navigate to cart
  };

  return (
    <div className="mini-cart">
      <div className="mini-cart-header">
  <h3>Cart ({totalQuantity} items)</h3>
  <button className="mini-cart-close-button" onClick={onClose}>×</button>
</div>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="mini-cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="mini-cart-item">
                <img
                  src={item.image}
                  alt={item.title}
                  className="mini-cart-item-image"
                />
                <div className="mini-cart-item-info">
                  <p className="mini-cart-item-title">{item.title}</p>
                  <p className="mini-cart-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="mini-cart-qty-control">
                    <button
                      className="qty-button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >–</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mini-cart-footer">
            <p className="mini-cart-total">Total: ${totalAmount}</p>
            <button className="view-cart-button" onClick={handleViewCartClick}>
              View Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MiniCart;
