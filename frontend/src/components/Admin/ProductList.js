import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/common/Message";
import Loader from "../../components/common/Loader";
import {
  deleteProduct,
  adminProducts,
} from "../../actions/productAction";
import { CREATE_PRODUCT_CLEAR } from "../../constants/productConstants";

const ProductList = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.adminProducts);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.deleteProduct);
  const {
    loading: loadingDelete,
    error: errorDelete,
    deleted,
  } = productDelete;

  const productCreate = useSelector((state) => state.updateProduct);
  const {
    loading: loadingCreate,
    error: errorCreate,
    updated,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: CREATE_PRODUCT_CLEAR });

    if (!userInfo || userInfo.role !== 'admin') {
      navigate("/login");
    }

    if (updated) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(adminProducts());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    deleted,
    updated,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to Delete")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    navigate(`/admin/product/create`);
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductList;
