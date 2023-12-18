import Product from "./product/Product";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = ({products}) => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('no');
    const navigate = useNavigate();

    const onEditButton = (id) => {
        navigate(`/products/edit/${id}`);
    }

    return (
        <div className="content">
            <div>
                <label htmlFor="">Filter </label>
                <input type="text" onChange={(e) => setSearch(e.target.value)} />
                <select name="sort" id="" value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="no">No sort</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            {products && 
                    products.filter((product) => {
                        return search.toLowerCase() === '' ? product : product.title.toLowerCase().includes(search);
                    })
                    .sort((a,b)=>{
                        const titleA = a.title.toLowerCase();
                        const titleB = b.title.toLowerCase();
                        if (sort === 'asc'){
                            return titleA.localeCompare(titleB);    
                        }
                        else if (sort === "desc"){
                            return titleB.localeCompare(titleA);
                        }
                        return 0;
                    })
                    .map((product) => (
                            <li key={product.id}>
                                <Product product={product}/>
                                <button onClick={()=>onEditButton(product.id)}>Edit Product</button>
                            </li>
                    ))
            }
        </div> 
    );
}
 
export default ProductList;