import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import './index.css';

const FeaturedProducts = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 8;

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => setProducts(json));
  }, []);

  // Apply filters
  const filtered = products.filter(p =>
    (categoryFilter === 'all' || p.category === categoryFilter) &&
    p.price >= priceRange[0] &&
    p.price <= priceRange[1] &&
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) // Filter based on searchQuery
  );

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filtered.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="featured-products-container">
      <div className="filters-container">
        <select value={categoryFilter} onChange={e => {
          setCategoryFilter(e.target.value);
          setCurrentPage(1); // Reset page on filter change
        }}>
          <option value="all">All Categories</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelery">Jewelry</option>
          <option value="electronics">Electronics</option>
        </select>

        <select onChange={e => {
          const value = e.target.value;
          if (value === 'low') setPriceRange([0, 50]);
          else if (value === 'mid') setPriceRange([50, 100]);
          else if (value === 'high') setPriceRange([100, 1000]);
          else setPriceRange([0, 1000]);
          setCurrentPage(1); // Reset page on filter change
        }}>
          <option value="all">All Prices</option>
          <option value="low">Under $50</option>
          <option value="mid">$50 - $100</option>
          <option value="high">Over $100</option>
        </select>
      </div>

      <div className="product-list">
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          ‹ Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next ›
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
