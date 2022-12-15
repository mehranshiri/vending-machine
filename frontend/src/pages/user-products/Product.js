import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getMethod, postMethod, putMethod } from "../../helpers/AxiosMethods";
import { useNavigate } from 'react-router-dom';

export default function Product() {

    const { id } = useParams();
    const [product, setProduct] = useState({
        name: '',
        cost: 0,
        available: 0
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if(id !== 'new') {
            getMethod(`products/${id}`)
            .then(res => {
                setProduct(res.data);
            })
        }
        setLoading(false);
    }, [id]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setProduct(values => ({...values, [name]: value}));
    }

    const handleSubmit = event => {
        event.preventDefault();
        if(id !== 'new') {
            putMethod(`products/${id}`, product)
            .then(res => {
                navigate('/my-products');
            })
        } else {
            postMethod(`products`, product)
            .then(res => {
                navigate('/my-products');
            })
        }
    }

    return (
        <>
        {!loading 
        ?   <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between">
                    <h3>Edit product</h3>
                    <NavLink className="btn btn-outline-secondary" to="/my-products">Back</NavLink>
                </div>
                <div className="form-group mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Enter name"
                        value={product.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Cost</label>
                    <input
                        type="number"
                        className="form-control"
                        name="cost"
                        placeholder="Enter cost"
                        value={product.cost}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Available</label>
                    <input
                        type="number"
                        className="form-control"
                        name="available"
                        placeholder="Enter available"
                        value={product.available}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        : <span>Loading...</span>
        }
        </>
    )
}