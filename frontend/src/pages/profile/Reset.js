import { useState } from "react"
import { getMethod } from "../../helpers/AxiosMethods";
import { updateStorage } from "../../helpers/LocalStorageHelper";

export default function Reset(props) {

    const [reset, setReset] = useState();

    const handleSubmit = event => {
        event.preventDefault();
        if(reset) {
            getMethod('reset')
            .then(res => {
                updateStorage(res.data);

            })
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label className="me-3">Do you want to reset your deposits ?</label>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="reset" id="reset-radio1" value={true} onChange={() => setReset(true)}/>
                    <label className="form-check-label" htmlFor="seller-radio">yes</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="reset" id="reset-radio2" value={false} onChange={() => setReset(false)}/>
                    <label className="form-check-label" htmlFor="seller-radio">no</label>
                </div>  
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}