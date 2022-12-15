import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../../redux/actions/authActions';
import axios from 'axios';
function Register(props) {

  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .post("users", inputs)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          props.register(response.data);
          navigate('/')
        }
    });
  }
  
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <div className="form-group mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              onChange={handleChange}
            />
          </div>

          <div className="form-group mb-3">
            <label className="me-3">User role:</label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="role" id="seller-radio" value="seller" onChange={handleChange}/>
              <label className="form-check-label" htmlFor="seller-radio">Seller</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="role" id="buyer-radio" value="buyer" onChange={handleChange}/>
              <label className="form-check-label" htmlFor="seller-radio">Buyer</label>
            </div>      
          </div>
          <div className="d-grid">
            <input type="submit" className="btn btn-primary" value="Submit" />
          </div>
          <p className="my-2 text-right">
            Already registered <Link to="/login
            ">login?</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
export default connect(null, authActions)(Register)