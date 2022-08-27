import { useSelector, useDispatch } from "react-redux";

import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import { logout } from "../../actions/userAction";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const totalCartItems = (items) => {
    return items.reduce((acc, item) => acc + 1, 0);
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="main-navbar shadow-sm sticky-top">
      <div className="top-navbar">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 my-auto d-none d-sm-none d-md-block d-lg-block">
              <Link to="/">
                <img
                  style={{ width: "100px", height: "100px" }}
                  src="https://craftindika.com/wp-content/uploads/2021/12/eshop-logo-full.png"
                  alt=""
                />
              </Link>
            </div>
            <div className="col-md-5 my-auto">
              <SearchBox></SearchBox>
            </div>
            <div className="col-md-5 d-flex justify-content-end align-items-center">
              <ul className="nav d-flex justify-content-end">
                <></>
                <div className="bg-black">
                  <Link
                    to="/cart"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="cart d-flex align-items-end">
                      
                      <span
                        className={`${totalCartItems(cartItems) === 0 ? "pt-2 px-1" : "p1 fa-stack has-badge pt-1"}`}
                        data-count ={`${totalCartItems(cartItems) === 0 ? '' : totalCartItems(cartItems)}`}
                      >

                        {/* <i
                          className="p3 fa fa-shopping-cart fa-stack-1x fa-inverse bg-black"
                        ></i> */}
                         <i className="fa fa-shopping-cart text-white" aria-hidden="true"></i>
                      </span>
                      <span style={{ fontSize: "16px" }}>Cart</span>
                    </div>
                  </Link>
                </div>
               

                {userInfo ? (
                  <NavDropdown title={userInfo.name} className="text-white">
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link href="/login">
                    <i className="fas fa-user"></i>Sign In
                  </Nav.Link>
                )}
                {userInfo && userInfo.role === "admin" && (
                  <NavDropdown
                    title="Admin"
                    id="adminmenu"
                    className="text-white"
                  >
                    <NavDropdown.Item href="/admin/userlist">Users</NavDropdown.Item>

                    <NavDropdown.Item href="/admin/productlist">
                      Products
                    </NavDropdown.Item>

                    <NavDropdown.Item href="/admin/orderlist">
                      Orders
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
