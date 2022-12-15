import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMethod } from "../../helpers/AxiosMethods";
import { authActions } from "../../redux/actions/authActions";

function Tokens(props) {
    const [tokens, setTokens] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTokens()
    }, [])

    const navigate = useNavigate();

    const fetchTokens = () => {
        getMethod('tokens')
        .then(res => {
            setTokens(res.data);
            setLoading(false);
        })
    }

    const logoutAll = () => {
        getMethod('logout/all')
        .then(() => {
            localStorage.removeItem("user");
            props.logout();
            navigate('/');
        });
    }

    return (
        <>
        {!loading
        ?
        <div>
            <button className="btn btn-danger mb-5" onClick={logoutAll}>Logout all</button>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">name</th>
                    </tr>
                </thead>
                <tbody>
                    {tokens.map(token =>
                    <tr key={token.id}>
                        <td>{token.name}</td>
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

export default connect(null, authActions)(Tokens)