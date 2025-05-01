import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import MiniCart from '../MiniCart';
import './index.css';

const Navbar = () => {
  const { totalQuantity } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">ShopSphere</div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/cart">Cart</a></li>
      </ul>
      <div
        className="navbar-cart"
        onClick={() => setOpen(o => !o)}
      >
        🛒
        {totalQuantity > 0 && (
          <span className="navbar-cart-count">
            {totalQuantity}
          </span>
        )}
      </div> {open && <MiniCart onClose={() => setOpen(false)} />}

     
    </nav>
  );
};

export default Navbar;
