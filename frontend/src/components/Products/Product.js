import React from "react";
import Rating from "./Rating";
import './Product.css'
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="col">
    <div className="card h-100 shadow-sm">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          className="card-img-top"
          alt="product.title"
        />
      </Link>
      <div className="label-top shadow-sm">
        <span className="text-white" >
          {product.brand}
        </span>
      </div>
      <div className="card-body">
        <div className="clearfix mb-3">
          <span className="float-start badge rounded-pill bg-success">
            {product.price}$
          </span>

          <Rating
            value={product.rating}
            text={`${product.numOfReviews} reviews`}
            color="#ffb302"
          />
        </div>
        <h5 className="card-title">
          <p>
            {product.description}
          </p>
        </h5>

        <div className="d-grid gap-2 my-4">
          <Link to={`/product/${product._id}`} href="#" className="btn btn-warning bold-btn">
            Veiw Detail
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Product;
