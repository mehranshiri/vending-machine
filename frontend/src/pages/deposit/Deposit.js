import { useState } from "react";
import { postMethod } from "../../helpers/AxiosMethods";
import { updateStorage } from "../../helpers/LocalStorageHelper";

export default function Buy() {

    const [deposit, setDeposit] = useState(0);

    const handleSubmit = event => {
        event.preventDefault();
        postMethod(`deposit`, {amount: deposit})
        .then(res => updateStorage(res.data));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Make deposit</h3>
                <div className="form-group mb-3">
                    <label>Deposit</label>
                    <select className="form-select" name="amount" onChange={e => setDeposit(e.target.value)}>
                        <option value="">make your deposit</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}