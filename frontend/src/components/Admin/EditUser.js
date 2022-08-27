import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/common/Message";
import Loader from "../../components/common/Loader";
import { userDetail, updateUser } from "../../actions/userAction";
import {
  UPDATE_USER_CLEAR,
  USER_DETAIL_CLEAR,
} from "../../constants/userConstants";

const EditUser = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id;

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [role, setRole] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.updateUser);
  const { loading: loadingUpdate, error: errorUpdate, updated } = userUpdate;

  useEffect(() => {
    if (updated) {
      dispatch({ type: UPDATE_USER_CLEAR });
      dispatch({ type: USER_DETAIL_CLEAR });
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(userDetail(userId));
      }
    }
  }, [user, navigate, userId, dispatch, updated, role]);

  const submitHandler = (e) => {
    e.preventDefault();
    name = name === "" ? user.name : name;
    email = email === "" ? user.email : email;
    role = role === "" ? user.role : role;
    dispatch(updateUser({ _id: userId, name, email, role }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col sm={12} md={6} lg={6} className="d-flex justify-content-center">
            <Container>
              <h1>Edit User</h1>
              {loadingUpdate && <Loader />}
              {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter name"
                      value={name === "" ? user.name : name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email === "" ? user.email : email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="role">
                    <Form.Label>User Role</Form.Label>
                    <Form.Control
                      as="select"
                      value={role === "" ? user.role : role}
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </Form.Control>
                  </Form.Group>

                  <Button type="submit" variant="primary">
                    Update
                  </Button>
                </Form>
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditUser;
