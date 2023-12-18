
const Product = ({product}) => {

    return ( 
        <div>
            {product && (
                <div>
                    <h4>{product.title}</h4>
                    <p>{product.description}</p>
                    <img src={product.thumbnail} alt="productImage" />
                </div>
            )}
        </div>
     );
}
 
export default Product;