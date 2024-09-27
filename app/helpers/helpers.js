// Helper: Extract summarized product information from promotions
export const getSummarizedProduct = ({ productCode, productName, productRate, subcategory }) => {
    const provider = subcategory.replace('Uncapped', '').replace('Capped', '').trim();
    return { productCode, productName, productRate, provider };
  };
  
  export const getSummarizedProducts = (promos) => {
    return promos.reduce((allProducts, promo) => {
      return allProducts.concat(promo.products.map(getSummarizedProduct));
    }, []);
  };
  
  // Function to generate the logo URL
  export const getProviderLogo = (provider) => {
    const logoBaseURL = "https://www.mweb.co.za/media/images/providers";
    
    const providerMapping = {
      'Vumatel': 'vuma',
      'MFN': 'metrofibre',
      'Frogfoot': 'frogfoot',
    };
  
    const sanitizedProvider = providerMapping[provider] || provider.toLowerCase().replace(/\s+/g, '-');
    return `${logoBaseURL}/provider-${sanitizedProvider}.png`;
  };
  