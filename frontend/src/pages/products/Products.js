import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMethod } from "../../helpers/AxiosMethods";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMethod('products')
        .then(res => {
            setProducts(res.data);
            setLoading(false);
        })
    }, [])

    return (
        <>
        {!loading
        ?
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">name</th>
                    <th scope="col">cost</th>
                    <th scope="col">available</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product =>
                <tr key={product.id}>
                    <th scope="row"><Link to={`/products/${product.id}`}>{product.name}</Link></th>
                    <td>{product.cost}</td>
                    <td>{product.available}</td>
                </tr>
                )}
            </tbody>
        </table>
        :
        <span>Loading...</span>}
        </>
    )
}