import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { myOrderList } from "../../actions/orderAction";
import { userDetail } from "../../actions/userAction";
import Loader from "../common/Loader";
import Message from "../common/Message";

const UserOrder = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetails;

  const orderList = useSelector((state) => state.myOrderList);
  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
    result,
  } = orderList;

  useEffect(() => {
    if (!user._id) {
      dispatch(userDetail(userInfo._id));
    }
    if (!result) {
      dispatch(myOrderList());
    }
  }, [user._id, userInfo._id, dispatch, result]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toGMTString();
  };

  return (
    <Container className="my-5">
      <Row>
        {loading || !user._id ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Col md={3} lg={3} className=" mx-3 sm-py-3">
            <div className="bg-white d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src={user.avatar.url}
                alt=""
              />
              <span className="font-weight-bold">{user.name}</span>
              <span className="text-black-50">{user.email}</span>
              <span> </span>
            </div>
            <div className="d-flex flex-column my-3 bg-white">
              <div className="py-3 bg-white border-bottom">
                <Link
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                  to="/profile"
                  className="text-black"
                >
                  Account
                </Link>
              </div>
              <div className="py-3 bg-white border-bottom">
                <Link
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                  to="/changepassword"
                  className="text-black"
                >
                  Change Password
                </Link>
              </div>
              <div className="py-3 bg-white border-bottom">
                <Link
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                  to="/myorders"
                  className="text-black"
                >
                  Orders
                </Link>
              </div>
            </div>
          </Col>
        )}

        <Col md={8} className="bg-white rounded">
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <Table
              hover
              responsive
              className="table align-middle mb-0 bg-white"
            >
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Date</th>
                  <th>Total Price</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>
                      {(
                        order.orderItems.reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0
                        ) +
                        order.taxPrice +
                        order.shippingPrice
                      ).toFixed(2)}
                    </td>
                    <td style={{ backgroundColor: order.isPaid && "#8ff7a1" }}>
                      <span>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </span>
                    </td>
                    <td
                      style={{
                        backgroundColor: order.isDelivered && "#8ff7a1",
                      }}
                    >
                      {order.isDelivered ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <Button className="btn-md" variant="info">
                          Detail
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserOrder;
