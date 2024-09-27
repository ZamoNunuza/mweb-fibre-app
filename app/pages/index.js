"use client"; 

import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { getSummarizedProducts } from '../helpers/helpers';
import Filters from '../components/Filters';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [promos, setPromos] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  const logoBaseURL = "https://www.mweb.co.za/media/images/providers";

  useEffect(() => {
    // Fetch data from the APIs
    const fetchProducts = async () => {
      try {
        const promoResponse = await axios.get(
          'https://apigw.mweb.co.za/prod/baas/proxy/marketing/products/promos/FTTH-VUMA-12MONTH-CLAWBACK-25MBPS,FTTH-OCTOTEL-SEP-PROMO,FTTH-THINKSPEED-ALT-SEP-PROMO,FTTH-CLEARACCESS-SEP-PROMO,FTTH-FROG-SEP-PROMO,FTTH-CCC-SETUP-100MBUP,FTTH-TTCONNECT-SEP-PROMO,FTTH-LINKAFRICA-SEP-PROMO,FTTH-LIGHTSTRUCK-SEP-PROMO,FTTH-MFN-NOVA-SEP-PROMO,FTTH-FROGFOOTAIR-CLAWBACK,FTTH-ZOOM-SEP-PROMO,FTTH-OPEN-SEP-PROMO,FTTH-THINKSPEED-CLARA-SEP-PROMO,FTTH-BALWIN-SEP-PROMO,FTTH-THINKSPEED-SEP-PROMO,FTTH-LINKLAYER-SEP-PROMO,FTTH-VUMA-SEP-PROMO,FTTH-WEBCONNECT-M2M,FTTH-EVOTEL-SEP-PROMO,FTTH-VODA-SEP-PROMO,FTTH-MFN-SEP-PROMO?sellable_online=true'
        );
        setPromos(promoResponse.data);
        setProducts(getSummarizedProducts(promoResponse.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, []);

  const priceRanges = [
    { label: '0-500', min: 0, max: 500 },
    { label: '501-1000', min: 501, max: 1000 },
    { label: '1001-2000', min: 1001, max: 2000 },
    { label: '2001+', min: 2001, max: Infinity }
  ];

  // Filter products based on selected price ranges
  const filterByPriceRanges = (product) => {
    if (selectedPriceRanges.length === 0) return true; // Include all if no price range selected

    // Find if the product falls into one of the selected price ranges
    return selectedPriceRanges.some(range => {
      const priceRange = priceRanges.find(r => r.label === range);
      return product.productRate >= priceRange.min && product.productRate <= priceRange.max;
    });
  };

  // Filter products by selected provider and price range
  const filteredProducts = products
    .filter(product => selectedProviders.length === 0 || selectedProviders.includes(product.provider))
    .filter(product => filterByPriceRanges(product))
    .sort((a, b) => a.productRate - b.productRate); // Sort by price

  return (
    <div className="mweb-fibre-products to-mwTealGradientToRight">
      <h1 className='title'>Mweb Fibre Products</h1>
      {/* Multi-Select for Providers */}
       <Filters
        products={products}
        onProviderChange={setSelectedProviders}
        onPriceRangeChange={setSelectedPriceRanges}
      />
      {/* Display Filtered Products */}
      <div className="product-list">
        {filteredProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;

