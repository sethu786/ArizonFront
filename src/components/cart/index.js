import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';     
import { CartContext } from '../../context/CartContext';
import './index.css';

const Cart = () => {
  const { cartItems, removeItem, updateQuantity, totalAmount } = useContext(CartContext);
  const navigate = useNavigate();                
  return (
    <div className="cart-page-container">
      <h2 className="cart-title">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart-text">Your cart is empty!</p>
      ) : (
        <>
          <div className="cart-items-container">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-price">${item.price}</p>
                  <div className="quantity-control">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >–</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >+</button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary-container">
            <p className="cart-summary-text">
              Subtotal: <span className="cart-summary-amount">${totalAmount}</span>
            </p>
            <button className="checkout-btn" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
