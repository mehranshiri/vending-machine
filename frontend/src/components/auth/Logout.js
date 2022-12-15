import axios from "axios";
import { connect } from "react-redux";
import { authActions } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";


function Logout(props) {
    const navigate = useNavigate();
    axios.get('logout')
    .then(res => {
        localStorage.removeItem("user");
        props.logout();
        navigate('/')
    });
}
export default connect(null, authActions)(Logout)