import { Routes,Route } from "react-router-dom";
import ProductList from "./ProductList";
import useFetch from "../useFetch";
import EditProduct from "./product/EditProduct";
import { useEffect, useState } from "react";

const ProductsBrowser = () => {

    const [products,setProducts] = useState([]);

    const {data, isPending, error} = useFetch("https://dummyjson.com/products");

    useEffect(()=>{
        if (data){
            setProducts(data.products);
        }
    },[data]);

    const onProductUpdated = (updatedProduct) => {
        
        const updatedIndex = products.findIndex(
          (product) => product.id === parseInt(updatedProduct.id)
        );
        if (updatedIndex !== -1) {
          const updatedProducts = [...products];
          updatedProducts[updatedIndex].title = updatedProduct.title;
          updatedProducts[updatedIndex].description = updatedProduct.description;
          updatedProducts[updatedIndex].thumbnail = updatedProduct.thumbnail;
          setProducts(updatedProducts);
        }
      };
      


    return ( 
        <div>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {products &&
            <Routes>
                <Route path = "/" element={<ProductList products={products}/>}/>
                <Route path ="/edit/:id" element={<EditProduct onProductUpdated={onProductUpdated}/>}></Route>
            </Routes>
            }
        </div>
     );
}
 
export default ProductsBrowser;