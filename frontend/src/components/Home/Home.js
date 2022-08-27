import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import Product from "../Products/Product";
import Loader from "../common/Loader";

import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../../actions/productAction";
import { PRODUCT_DETAILL_CLEAR } from "../../constants/productConstants";
import ProductCarousel from "../Products/ProductCarousel";


const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [priceChanged, setPriceChanged] = useState(false);

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Food",
    "Books",
    "Clothes",
    "Shoes",
    "Beauty",
    "Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const dispatch = useDispatch();

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const productDetail = useSelector((state) => state.productDetail);
  const { product } = productDetail;

  const keyword = params.keyword;

  useEffect(() => {
    if (product._id) {
      dispatch({ type: PRODUCT_DETAILL_CLEAR });
    }
    dispatch(allProducts(keyword, currentPage, price, category, rating));
  }, [
    dispatch,
    error,
    keyword,
    currentPage,
    category,
    rating,
    priceChanged,
    product._id,
  ]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const priceChangeHandler = () => {
    setPriceChanged(!priceChanged);
  };

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : keyword ? (
        <Fragment>
          <h1 style={{ margin: "0", padding: "0" }} className="">
            Latest Products
          </h1>

          <div className="row d-flex flex-column flex-md-row flex-lg-row my-md-5 my-lg-5">
            <div className="col-12  col-md-3 col-lg-3 ">
              <div className="d-flex flex-column px-5">
                <Range
                  marks={{
                    1: `$1`,
                    1000: `$1000`,
                  }}
                  min={1}
                  max={1000}
                  defaultValue={[1, 1000]}
                  tipFormatter={(value) => `$${value}`}
                  tipProps={{
                    placement: "top",
                    visible: true,
                  }}
                  value={price}
                  onChange={(price) => setPrice(price)}
                  onAfterChange={priceChangeHandler}
                />

                <hr className="my-5" />

                <div className="mt-5">
                  <h4 className="mb-3">Categories</h4>

                  <ul className="pl-0">
                    {categories.map((category) => (
                      <li
                        style={{
                          cursor: "pointer",
                          listStyleType: "none",
                        }}
                        key={category}
                        onClick={() => setCategory(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-12  col-md-9 col-lg-9">
              <ProductCarousel />
              <div class="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3 py-5">
            {products.map((product) => (
              <Product key={product._id} product={product}/>
            ))}
          </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <div className="col-12  col-md-12 col-lg-12">
          <h2> Top Products</h2>
          <ProductCarousel />
          <h2 className="mt-5">Latest Products</h2>
          <div class="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
            {products.map((product) => (
              <Product key={product._id} product={product}/>
            ))}
          </div>
        </div>
      )}
      {resPerPage <= count && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </Fragment>
  );
};

export default Home;
