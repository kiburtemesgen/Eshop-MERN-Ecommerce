import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Button,
  Container,
  Form,
  ListGroup,
} from "react-bootstrap";
import { productDetailAction } from "../../actions/productAction";
import "./ProductDetail.css";
import { addToCart } from "../../actions/cartAction";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Message from "../common/Message";
import Loader from "../common/Loader";
import { createProductReview } from "../../actions/productAction";
import { CREATE_PRODUCT_REVIEW_CLEAR } from "../../constants/productConstants";
import ReviewSummary from "../Review/ReviewSummary";
import ReactStars from "react-rating-stars-component";
import ReviewList from "../Review/ReviewList";

const ProductDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  const productReview = useSelector((state) => state.createProductReview);
  const { created, loading: loadingReview, error: errorReview } = productReview;

  useEffect(() => {

    if (created) {
      setRating(0);
      setComment("");
    }
    
    if (!loading && !product._id) {
      dispatch(productDetailAction(params.id));
      dispatch({ type: CREATE_PRODUCT_REVIEW_CLEAR });
    }
  }, [params.id, dispatch, product, loading, created]);

  const ratingHandler = (ratingVal) => {
    setRating(ratingVal);
  };

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, quantity));
    navigate(`/cart/?qty=${quantity}`);
    // dispatch({type: PRODUCT_DETAILL_CLEAR})
    enqueueSnackbar("Added to cart", { variant: "success" });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <div>
      <Link className="btn btn-light mb-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <h2><Loader/></h2>
      ) : error ? (
        <h2>Error</h2>
      ) : (
        <Container>
          <Row>
            <Col xs="12" md="5" lg="5" className="mb-3 px-3 px-md-2">
              <Image src={product.image} fluid></Image>
            </Col>
            <Col xs="12" md="7" lg="7" className="mb-6 px-6 px-md-2">
              <div className="product-container">
                <div className="item-detail">
                  <h2 className="product-name">{product.name}</h2>
                  <p>{product.description}</p>
                  <h4> Price: ${product.price}</h4>
                  <p>
                    {" "}
                    Status:{" "}
                    {product.countInStock === 0 ? "Out of Stock" : "In Stock"}
                  </p>
                  <p>
                    Qty:{" "}
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((val) => (
                        <option key={val + 1} value={val + 1}>
                          {val + 1}
                        </option>
                      ))}
                    </select>
                  </p>
                </div>
                <Button
                  onClick={addToCartHandler}
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={7}>
              <ReviewSummary
                reviews={product.reviews}
                rating={product.rating}
              />
            </Col>
          </Row>
          <Row>
            <Col md={7}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ReviewList key={review._id} review={review}></ReviewList>
                ))}
                <ListGroup.Item>
                  <h2>Add Review</h2>
                  {created && (
                    <Message variant="success">
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingReview && <Loader />}
                  {errorReview && (
                    <Message variant="danger">{errorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group>
                        <Form.Label>
                          <ReactStars
                            size={20}
                            color={"#adb5bd"}
                            activeColor={"#ffb302"}
                            a11y={true}
                            emptyIcon={<i className="fa fa-star" />}
                            halfIcon={<i className="fa fa-star-half-alt" />}
                            filledIcon={<i className="fa fa-star" />}
                            count={5}
                            onChange={ratingHandler}
                          />
                        </Form.Label>
                      </Form.Group>

                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      )}
      Product Details page
    </div>
  );
};

export default ProductDetail;
