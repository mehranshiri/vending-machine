import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { deleteMethod, getMethod } from "../../helpers/AxiosMethods";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();        
    }, []);

    const fetchProducts = () => {
        getMethod('my-products')
        .then(res => {
            setProducts(res.data);
            setLoading(false);
        })
    }

    const deleteProduct = id => {
        deleteMethod(`products/${id}`)
        .then(res => {
            fetchProducts()
        })
    }

    return (
        <>
        {!loading
        ?
        <div>
            <NavLink className="btn btn-outline-primary mb-3" to={'/my-products/new'}>add product</NavLink>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">name</th>
                        <th scope="col">cost</th>
                        <th scope="col">available</th>
                        <th scope="col">action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product =>
                    <tr key={product.id}>
                        <th scope="row"><Link to={`/my-products/${product.id}`}>{product.name}</Link></th>
                        <td>{product.cost}</td>
                        <td>{product.available}</td>
                        <td><button className="btn btn-danger" onClick={() => deleteProduct(product.id)}>Delete</button></td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
        :
        <span>Loading...</span>}
        </>
    )
}