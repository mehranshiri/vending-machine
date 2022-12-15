import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMethod } from "../../helpers/AxiosMethods";
import { getDate } from "../../helpers/DateHelper";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMethod('buys')
        .then(res => {
            setOrders(res.data);
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
                    <th scope="col">id</th>
                    <th scope="col">total</th>
                    <th scope="col">date</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order =>
                <tr key={order.id}>
                    <th scope="row"><Link to={`/orders/${order.id}`}>{order.id}</Link></th>
                    <td>${order.total}</td>
                    <td>{getDate(order.created_at)}</td>
                </tr>
                )}
            </tbody>
        </table>
        :
        <span>Loading...</span>}
        </>
    )
}