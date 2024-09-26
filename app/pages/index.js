"use client"; 

import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

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

  // Helper: Extract summarized product information from promotions
  const getSummarizedProduct = ({ productCode, productName, productRate, subcategory }) => {
    const provider = subcategory.replace('Uncapped', '').replace('Capped', '').trim();
    return { productCode, productName, productRate, provider };
  };

  const getSummarizedProducts = (promos) => {
    return promos.reduce((allProducts, promo) => {
      return allProducts.concat(promo.products.map(getSummarizedProduct));
    }, []);
  };

  // Handle provider filtering
  const handleProviderChange = (selectedOptions) => {
    const providers = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setSelectedProviders(providers);
  };

  // Handle price range filtering
  const handlePriceRangeChange = (selectedOptions) => {
    const ranges = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setSelectedPriceRanges(ranges);
  };

  // Filter products based on selected price ranges
  const filterByPriceRanges = (product) => {
    if (selectedPriceRanges.length === 0) return true; // Include all if no price range selected

    // Find if the product falls into one of the selected price ranges
    return selectedPriceRanges.some(range => {
      const priceRange = priceRanges.find(r => r.label === range);
      return product.productRate >= priceRange.min && product.productRate <= priceRange.max;
    });
  };

  // Function to generate the logo URL
  const getProviderLogo = (provider) => {
    // Mapping specific provider names to their sanitized names
    const providerMapping = {
      'Vumatel': 'vuma',
      'MFN': 'metrofibre',
      'Frogfoot': 'frogfoot',
      // Add more mappings as needed
    };

    // Use the mapped value if it exists, otherwise sanitize normally
    const sanitizedProvider = providerMapping[provider] || provider.toLowerCase().replace(/\s+/g, '-');

    // Return the logo URL with provider prefix
    return `${logoBaseURL}/provider-${sanitizedProvider}.png`;
  };


  // Filter products by selected provider and price range
  const filteredProducts = products
    .filter(product => selectedProviders.length === 0 || selectedProviders.includes(product.provider))
    .filter(product => filterByPriceRanges(product))
    .sort((a, b) => a.productRate - b.productRate); // Sort by price

  return (
    <div className="mweb-fibre-products">
      <h1 className='title'>Mweb Fibre Products</h1>

      {/* Multi-Select for Providers */}
      <Select
        isMulti
        name="providers"
        options={[...new Set(products.map(p => p.provider))].map(provider => ({
          value: provider,
          label: provider
        }))}
        onChange={handleProviderChange}
        placeholder="Select providers"
        className="provider-select"
      />

      {/* Multi-Select for Price Ranges */}
      <Select
        isMulti
        name="priceRanges"
        options={priceRanges.map(range => ({
          value: range.label,
          label: `${range.label} (R${range.min} - R${range.max === Infinity ? 'above' : range.max})`
        }))}
        onChange={handlePriceRangeChange}
        placeholder="Select price ranges"
        className="price-range-select"
      />

      {/* Display Filtered Products */}
      <div className='product-list'>
        {filteredProducts.map((product, index) => (
          <div key={`${product.productCode}-${index}`} className="product-card">
            {/* Provider Logo */}
            <img className='provider-logo' src={getProviderLogo(product.provider)} alt={`${product.provider} logo`} style={{ width: '100px', height: 'auto' }}/>
            <h2 className='product-name'>{product.provider}</h2>
            <p className='product-provide'>{product.productName}</p>
            <p className='product-price'>Price: R{product.productRate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

