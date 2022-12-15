import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../../redux/actions/authActions';
import axios from 'axios';

function Login(props) {

  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = event => {
    event.preventDefault();
    axios.post("login",inputs)
    .then(response => {
      if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          props.login(response.data);
          navigate('/')
        }
      })
    }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>
          <div className="form-group mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Enter username"
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
          </div>
          <div className="d-grid">
            <input type="submit" className="btn btn-primary" value="Submit" />
          </div>
          <p className="my-2 text-left">
            Already have <Link to="/register">account?</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default connect(null, authActions)(Login)