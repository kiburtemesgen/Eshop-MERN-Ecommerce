import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import Loader from "../common/Loader";
import Message from "../common/Message";
import { resetPassword } from "../../actions/userAction";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setIsMatch] = useState(true);

  const passwordReset = useSelector((state) => state.resetPassword);

  const { loading, error, reset } = passwordReset;

  useEffect(() => {
    if (reset) {
      Swal.fire("Alert text");
      Swal.fire("Password Reset Successfull!", "Click OK to Login", "success");
      navigate("/login");
    }
  }, [reset, dispatch, navigate]);

  const passwordChangeHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const confirmPasswordChangeHandler = (e) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
  };
  const submitFormHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setIsMatch(false);
    } else {
      dispatch(resetPassword(password, params.token));
    }
  };
  return (
    <div>
      <Container>
        <Row className="d-flex justify-content-center my-3">
          <Col md={5} sm={8} className="m-3 p-3 border">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="text-center">
                  {!isMatch && (
                    <Message variant="warning">
                      Your Password do not match
                    </Message>
                  )}

                  <h3>
                    <i className="fa fa-lock fa-4x"></i>
                  </h3>
                  <h2 className="text-center">Reset Password</h2>

                  <div className="panel-body">
                    <p>Insert your new password</p>

                    <form
                      id="register-form"
                      className="form"
                      method="post"
                      onSubmit={submitFormHandler}
                    >
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            id="password"
                            name="password"
                            placeholder="New Password"
                            className="form-control my-1 py-3"
                            type="password"
                            value={password}
                            onChange={passwordChangeHandler}
                          />
                        </div>
                        <div className="input-group">
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm New password"
                            className="form-control my-2 py-3"
                            type="password"
                            value={confirmPassword}
                            onChange={confirmPasswordChangeHandler}
                          />
                        </div>
                      </div>
                      {loading ? (
                        <Loader />
                      ) : error ? (
                        <Message variant="danger">{error}</Message>
                      ) : (
                        <div className="d-grid gap-2 my-2">
                          <button className="btn btn-primary" type="sumbit">
                            Reset Password
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetPassword;
