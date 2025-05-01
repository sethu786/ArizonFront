import React, { useState } from 'react';
import FeaturedProducts from '../FeaturedProducts';
import './index.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Capture search query
  };

  return (
    <div className="home-page-container">
      <div className="home-hero">
        <h1 className="home-title">Welcome to Our E-Commerce Store</h1>
        <p className="home-subtitle">Discover products you’ll love, at prices you’ll smile about</p>

        {/* Search Bar */}
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>
      </div>

      {/* Pass searchQuery as a prop to FeaturedProducts */}
      <FeaturedProducts searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
