const ProductCard = ({ product }) => {
    return (
      <div className="product-card">
        <h2>{product.productName}</h2>
        <p>Provider: {product.provider}</p>
        <p>Price: R{product.productRate}</p>
      </div>
    );
  };
  
  export default ProductCard;
  