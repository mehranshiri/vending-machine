import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Protected from './components/Protected'
import Home from './pages/Home'
import Nav from './components/navbar'
import Logout from './components/auth/Logout'
import Products from './pages/products/Products'
import './pages/auth/Auth.scss';
import './assets/styles/App.scss';
import './assets/styles/Error.scss';
import Product from './pages/products/Product'
import Profile from './pages/profile/Profile'
import {default as MyProducts} from './pages/user-products/Products';
import {default as MyProduct} from './pages/user-products/Product';
import Deposit from './pages/deposit/Deposit'
import Buy from './pages/buy/Buy'
import Orders from './pages/orders/Orders'
import Reset from './pages/profile/Reset'
import Order from './pages/orders/Order'
import ErrorModal from './components/modal/ErrorModal'
import Tokens from './pages/tokens/Tokens'

function App() {
  return (
    <Router>
      <Nav />
      <ErrorModal />
      <div className="container vertical-center">  
        <div className="row">
          <div className="col-12 p-5 rounded">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
          {/* <div className="col-12 bg-white p-5 rounded"> */}
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/products/:id" element={<Product />} />
              <Route path="/products" element={<Products />} />

              {/* protected routes goes here*/} 
              <Route path="/profile" element={<Protected><Profile /></Protected>} />
              <Route path="/my-products/:id" element={<Protected><MyProduct /></Protected>} />
              <Route path="/my-products" element={<Protected><MyProducts /></Protected>} />
              <Route path="/deposit" element={<Protected><Deposit /></Protected>} />
              <Route path="/buy" element={<Protected><Buy /></Protected>} />
              <Route path="/orders/:id" element={<Protected><Order /></Protected>} />
              <Route path="/orders" element={<Protected><Orders /></Protected>} />
              <Route path="/reset" element={<Protected><Reset /></Protected>} />
              <Route path="/tokens" element={<Protected><Tokens /></Protected>} />
              <Route path="/logout" element={<Protected><Logout /></Protected>} />
            </Routes>
          {/* </div> */}
        </div>
      </div>
    </Router>
  )
}
export default App