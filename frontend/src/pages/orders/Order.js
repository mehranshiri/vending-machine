import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMethod } from "../../helpers/AxiosMethods";

export default function Order() {

    const { id } = useParams();
    const [order, setOrder] = useState();

    useEffect(() => {
        getMethod(`buys/${id}`)
        .then(res => {
            setOrder(res.data);
        })
    }, [id]);

    return (
        <>
        {!!order 
        ? 
        <div>
            <div className="form-group">
                <label>Order id:</label>
                <input
                    type="number"
                    className="form-control"
                    value={order.id}
                    disabled
                />
            </div>
            <div className="form-group mb-5">
                <label>Order total:</label>
                <input
                    type="number"
                    className="form-control"
                    value={order.total}
                    disabled
                />
            </div>

            <h4>Products</h4>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">product name</th>
                        <th scope="col">amount</th>
                        <th scope="col">cost</th>
                    </tr>
                </thead>
                <tbody>
                    {order.products.map(product =>
                    <tr key={product.id}>
                        <td>{product.product.name}</td>
                        <td>{product.amount}</td>
                        <td>{product.product.cost}</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
        
        : <span>Loading...</span>
        }
        </>
    )
}