import Select from 'react-select';

const Filters = ({ products, onProviderChange, onPriceRangeChange }) => {
  const priceRanges = [
    { label: '0-500', min: 0, max: 500 },
    { label: '501-1000', min: 501, max: 1000 },
    { label: '1001-2000', min: 1001, max: 2000 },
    { label: '2001+', min: 2001, max: Infinity }
  ];

  const providerOptions = [...new Set(products.map(p => p.provider))].map(provider => ({
    value: provider,
    label: provider,
  }));

  const priceRangeOptions = priceRanges.map(range => ({
    value: range.label,
    label: `${range.label} (R${range.min} - R${range.max === Infinity ? 'above' : range.max})`,
  }));

  return (
    <div className='selectors-container'>
      {/* Multi-Select for Providers */}
      <Select
        isMulti
        className="provider-select"
        name="providers"
        options={providerOptions}
        onChange={selected => onProviderChange(selected ? selected.map(opt => opt.value) : [])}
        placeholder="Select providers"
      />
<br/>
      {/* Multi-Select for Price Ranges */}
      <Select
        isMulti
        className="price-range-select"
        name="priceRanges"
        options={priceRangeOptions}
        onChange={selected => onPriceRangeChange(selected ? selected.map(opt => opt.value) : [])}
        placeholder="Select price ranges"
      />
    </div>
  );
};

export default Filters;
