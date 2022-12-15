import { useEffect, useState } from "react";
import { getMethod, postMethod } from "../../helpers/AxiosMethods";
import { useNavigate } from "react-router-dom";

export default function Deposit() {

    const [products, setProducts] = useState([]);
    const [formValues, setFormValues] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getMethod('products')
        .then(res => {
            setProducts(res.data)
        })
    }, []);

    const handleSubmit = event => {
        event.preventDefault();
        postMethod('buy', {products: formValues})
        .then(res => navigate('/my-orders'))
    };
    
    const handleChange = (i, e) => {
        const newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    };
    
    const addFormFields = () => {
        setFormValues([...formValues, { id: '', amount: '' }]);
    };
    
    const removeFormFields = i => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
    };
    return (
        <div>
             <form onSubmit={handleSubmit}>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">product</th>
                            <th scope="col">amount</th>
                            <th scope="col">action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {formValues.map((element, index) => (
                        <tr key={index}>
                            <td>
                                <select className="form-select" name="id" onChange={e => handleChange(index, e)} value={element.id || ""}>
                                    <option value="" >Select a product</option>
                                    {products.length > 0 && products.map(product =>
                                        <option value={product.id} key={product.id}>{product.name}</option>
                                    )}
                                </select>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="amount"
                                    value={element.amount || ''}
                                    onChange={e => handleChange(index, e)}
                                />
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => removeFormFields(index)}>delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-between mt-5">
                    <button type="button" className="btn btn-outline-primary" onClick={addFormFields} >add</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}