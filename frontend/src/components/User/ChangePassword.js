import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { userDetail } from "../../actions/userAction";
import Message from "../common/Message";
import Loader from "../common/Loader";
import { changePassword } from "../../actions/userAction";
import { CHANGE_PASSWORD_CLEAR } from "../../constants/userConstants";
import { useSnackbar } from "notistack";

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchError, setMatchError] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetails;

  const passwordChange = useSelector((state) => state.changePassword);
  const {
    loading: changePasswordLoading,
    changed,
    error: changePasswordError,
  } = passwordChange;

  useEffect(() => {
    if (changed) {
      dispatch({ type: CHANGE_PASSWORD_CLEAR });
      navigate("/profile");
      enqueueSnackbar("Password Changed Successfully!", { variant: "success" });
    }

    if (!user._id) {
      dispatch(userDetail(userInfo._id));
    }
  }, [user._id, dispatch, userInfo._id, changed, navigate, enqueueSnackbar]);

  const oldPasswordChangeHandler = (e) => {
    e.preventDefault();
    setOldPassword(e.target.value);
  };
  const newPasswordChangeHandler = (e) => {
    e.preventDefault();
    setNewPassword(e.target.value);
  };
  const confirmPassworChangeHandler = (e) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
  };

  const submitChangePasswordHandler = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMatchError(true);
    } else {
      dispatch(changePassword({ oldPassword, newPassword }));
    }
  };

  return (
    <>
      {loading || !user._id || changePasswordLoading ? (
        <Loader />
      ) : (
        <Container className="my-5">
          <Row>
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

            <Col md={8} className="bg-white rounded">
              {error && <Message variant='danger'>{error}</Message>}
              {changePasswordError && <Message variant='danger'>{changePasswordError}</Message>}
              {matchError && (
                <Message variant="danger">Your Password do not match</Message>
              )}
              <h2>Change Password</h2>
              <Form className="py-3" onSubmit={submitChangePasswordHandler}>
                <Form.Group className="mb-3" controlId="formBasicOldPassword">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={oldPasswordChangeHandler}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicNewPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={newPasswordChangeHandler}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicConfirmPassword"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={confirmPassworChangeHandler}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ChangePassword;
