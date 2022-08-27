import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartAction";

const CartItem = ({ qty, product, incrementHandler, decrementHandler, removeHandler }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(parseInt(qty));


  const cartIncrementHandler = () => {
      dispatch(addToCart(product.product, quantity+1));
    setQuantity(quantity + 1);
    incrementHandler(product.product, quantity+1);

  };
  const cartDecrementHandler = () => {
      dispatch(addToCart(product.product, quantity-1));
    setQuantity(quantity - 1);
    decrementHandler(product.product, quantity-1)

  };

  const quantityChangeHandler = (e) => {
    // setQuantity(e.target.value);
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(product.product));
  };
  return (
      <div
        key={product.product}
        className="row mb-3 d-flex justify-content-between align-items-center border-bottom"
      >
        <div className="col-md-2 col-lg-2 col-xl-2">
          <img src={product.image} className="img-fluid rounded-3" alt="" />
        </div>
        <div className="col-md-3 col-lg-3 col-xl-3">
          <h6 className="text-muted">{product.category}</h6>
          <h6 className="text-black mb-0">{product.name}</h6>
        </div>
        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
          <button
            style={{ backgroundColor: "#2a96e8" }}
            className="btn btn-secondary px-2 m-2"
            onClick={cartDecrementHandler}
            disabled={quantity === 1 ? true : false}
          >
            <i className="fas fa-minus"></i>
          </button>

          <input
            id="form1"
            min="0"
            max={product.countInStock}
            name="quantity"
            value={quantity}
            type="number"
            onChange={quantityChangeHandler}
            className="form-control form-control-sm"
          />

          <button
            style={{ backgroundColor: "#2a96e8" }}
            className="btn btn-secondary px-2 m-2"
            onClick={cartIncrementHandler}
            disabled={quantity >= product.countInStock ? true : false}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
          <h6 className="mb-0">{product.price}</h6>
        </div>
        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
          <button className="btn btn-link px-2" onClick={removeFromCartHandler}>
            <i className="fas fa-trash fa-lg text-danger"></i>
          </button>
        </div>
      </div>
  );
};

export default CartItem;
