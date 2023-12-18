    import { useEffect, useState } from "react";
    import { useNavigate, useParams } from "react-router-dom";

    const EditProduct = ({onProductUpdated}) => {
        const {id} = useParams();

        const [values,setValues] = useState({
            id: id,
            title: '',
            description: '',
            thumbnail: ''
        });
        const navigate = useNavigate();

        const handleSubmit = (e) => {
            e.preventDefault();
            onProductUpdated(values);
            navigate("/products");
        }

        return ( 
            <div>
                <h2>Edit product</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">Title</label>
                    <input type="text" value={values.title} onChange={(e)=> setValues({...values,title: e.target.value})} />

                    <label htmlFor="">Description</label>
                    <input type="text" value={values.description} onChange={(e)=> setValues({...values,description: e.target.value})} />

                    <label htmlFor="">Image url</label>
                    <input type="text" value={values.thumbnail} onChange={(e)=> setValues({...values,thumbnail: e.target.value})} />

                    <button type="submit">Submit changes</button>
                </form>
                {id}
            </div>
        );
    }
    
    export default EditProduct;