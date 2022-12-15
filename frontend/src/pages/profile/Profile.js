import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getMethod, putMethod } from "../../helpers/AxiosMethods";
import { updateStorage } from "../../helpers/LocalStorageHelper";
import { authActions } from "../../redux/actions/authActions";

function Profile(props) {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMethod('me')
        .then(res => {
            setUser(res.data);
            setLoading(false);
        })
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser(values => ({...values, [name]: value}))
    }

    const handleSubmit = event => {
        event.preventDefault();
        putMethod(`users/${user.id}`, user)
        .then(response => {
            if (response.data) {
                updateStorage(response.data);
                props.update(response.data)
            }
          })
    }

    return (
        <div>
            {!loading && user && (
                <form onSubmit={handleSubmit}>
                    <h3>Edit profile</h3>
                    <div className="form-group mb-3">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            placeholder="Enter username"
                            value={user.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={handleChange}
                        />
                        <small>type to change your password</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            )}
        </div>
    )
}

export default connect(null, authActions)(Profile)