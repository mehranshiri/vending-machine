import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMethod } from "../../helpers/AxiosMethods";

export default function Product() {

    const { id } = useParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        getMethod(`products/${id}`)
        .then(res => {
            setProduct(res.data);
        })
    }, [id]);

    return (
        <>
        {!!product 
        ? <table className="table table-bordered">
        <thead>
            <tr>
                <th scope="col">name</th>
                <th scope="col">cost</th>
                <th scope="col">available</th>
            </tr>
        </thead>
        <tbody>
            <tr key={product.id}>
                <th scope="row">{product.name}</th>
                <td>{product.cost}</td>
                <td>{product.available}</td>
            </tr>
        </tbody>
    </table>
        : <span>Loading...</span>
        }
        </>
    )
}