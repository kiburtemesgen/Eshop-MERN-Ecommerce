import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../actions/cartAction";
import CartItem from "./CartItem";

const Cart = () => {
  const params = useParams();
  const navigate = useNavigate();
  let location = useLocation();
  const dispatch = useDispatch();

  const productId = params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const [quantity, setQuantity] = useState(qty);

  const [cartItems, setCartItems] = useState([]);

  const cart = useSelector((state) => state.cart);
  const { cartItems: cartFromState } = cart;

  useEffect(() => {
    setCartItems(cartFromState);
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity, cartFromState]);


  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  const subtotalPrice = (items) => {
    return items
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };
  const shippingPrice = (items) => {
    return (subtotalPrice(items) / 10).toFixed(2);
  };

  const totalPrice = (items) => {
    const total = parseFloat(subtotalPrice(items) + shippingPrice(items));
    return (total + (total * 15) / 100).toFixed(2);
  };

  const totalItems = (items) => {
    return items.reduce((acc, item) => acc + quantity, 0);
  };

  const incrementHandler = (id, qt) => {
    const item = cartItems.find((el) => el.product === id);
    item.quantity = qt;
    const newCart = cartItems.map((item) =>
      item.product === id ? item : item
    );
    setCartItems(newCart);
  };
  const decrementHandler = (id, qt) => {
    const item = cartItems.find((el) => el.product === id);
    item.quantity = qt;
    const newCart = cartItems.map((item) =>
      item.product === id ? item : item
    );
    setCartItems(newCart);
  };

  const removeHandler = (id) => {
   const newCart = cartItems.filter(item=> item.product === id);
   setCartItems(newCart)
  }

  return (
    <div className="py-5 px-5 row d-flex justify-content-center align-items-flex-start">
      <div className="col-md-8">
        <div
          className="card card-registration card-registration-2"
          style={{ borderRadius: "15px" }}
        >
          <div className="card-body p-0">
            <div className="p-5">
              <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                <h3 className="mb-0">{totalItems(cartItems)} items</h3>
              </div>
              <hr className="my-4" />

              {cartItems.map((product) => (
                <CartItem
                  incrementHandler={incrementHandler}
                  decrementHandler={decrementHandler}
                  removeHandler={removeHandler}
                  key={product.product}
                  qty={product.quantity}
                  product={product}
                ></CartItem>
              ))}

              <div className="pt-5">
                <h6 className="mb-0">
                  <Link to="/" className="text-body">
                    <i className="fas fa-long-arrow-alt-left me-2"></i>Back to
                    shop
                  </Link>
                </h6>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="card mb-4">
          <div className="card-header bg-white py-3">
            <h4 className="mb-0">Summary</h4>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                Subtotal
                <span>{subtotalPrice(cartItems)}$</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                Shipping Price
                <span>{shippingPrice(cartItems)}$</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                <div>
                  <strong>Total amount</strong>
                  <strong>
                    <p className="mb-0">(including VAT)</p>
                  </strong>
                </div>
                <span>
                  <strong>{totalPrice(cartItems)}$</strong>
                </span>
              </li>
            </ul>

            <button
              type="button"
              className="btn btn-primary btn-lg btn-block"
              onClick={checkoutHandler}
            >
              Go to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
    //   </div>
  );
};

export default Cart;
