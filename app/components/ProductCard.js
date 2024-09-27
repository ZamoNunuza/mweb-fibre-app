import { getProviderLogo } from '../helpers/helpers';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img className="provider-logo" src={getProviderLogo(product.provider)} alt={`${product.provider} logo`} />
      <h2 className="product-name">{product.provider}</h2>
      <p className="product-provide">{product.productName}</p>
      <p className="product-price">Price: R{product.productRate}</p>
    </div>
  );
};

export default ProductCard;
