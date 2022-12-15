import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Nav() {

  const store = useSelector((state) => state.user);

  return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top sticky-top">
        <div className="container">
          <Link className="navbar-brand" to={'/'}>
            Vending machine
          </Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={'/products'}>
                  Products
                </Link>
              </li>
            {store && store.token
            ? <>
              {store.user.role === "seller"
              ? <li className="nav-item">
                  <Link className="nav-link" to={'/my-products'}>
                    My products
                  </Link>
                </li>
              : 
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={'/deposit'}>
                      Deposit
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={'/reset'}>
                      Reset
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={'/buy'}>
                      Buy
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={'/orders'}>
                      My orders
                    </Link>
                  </li>
                </>
              }
                <li className="nav-item">
                  <Link className="nav-link" to={'/profile'}>
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/tokens'}>
                    Tokens
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/logout'}>
                    Logout
                  </Link>
                </li>
              </>
            : <>
                <li className="nav-item">
                  <Link className="nav-link" to={'/login'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/register'}>
                    Register
                  </Link>
                </li>
              </>
            }
            </ul>
          </div>
        </div>
      </nav>
  )
}