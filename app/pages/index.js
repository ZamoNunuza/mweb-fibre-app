"use client"; 

import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select"; // Provider multi-select component
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

 

  useEffect(() => {
    // Fetch Fibre products from API
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://api.mweb.co.za/fibre/products');
        setProducts(res.data);
        console.log('Products:', res); // Add this line
      } catch (error) {
        console.error("Error fetching Fibre products:", error);
      }
    };

    fetchProducts();
  }, []);

  {products
    .filter(product => selectedProviders.includes(product.provider))
    .map(filteredProduct => (
      <ProductCard key={filteredProduct.id} product={filteredProduct} />
    ))}

  const handleProviderChange = (selectedOptions) => {
    const providers = selectedOptions.map(option => option.value);
    setSelectedProviders(providers);
  };

  const handlePriceChange = (e) => {
    setPriceRange({ ...priceRange, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Mweb Fibre Products</h1>

      {/* Provider Multi-Select */}
      <Select
        isMulti
        name="providers"
        options={products.map(p => ({
          value: p.provider,
          label: p.provider
        }))}
        onChange={handleProviderChange}
      />

      {/* Price Range Slider */}
      <input
        type="range"
        name="min"
        min="0"
        max="10000"
        value={priceRange.min}
        onChange={handlePriceChange}
      />
      <input
        type="range"
        name="max"
        min="0"
        max="10000"
        value={priceRange.max}
        onChange={handlePriceChange}
      />

      {/* Filter and Display Products */}
      {products
        .filter(product => selectedProviders.length === 0 || selectedProviders.includes(product.provider))
        .filter(product => product.price >= priceRange.min && product.price <= priceRange.max)
        .map(filteredProduct => (
          <div key={filteredProduct.id}>
            <h2>{filteredProduct.name}</h2>
            <p>{filteredProduct.price}</p>
          </div>
        ))}
    </div>
  );
};

export default Home;
