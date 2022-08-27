import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import Loader from "../common/Loader";
import Message from "../common/Message";
import Swal from 'sweetalert2'
import {forgotPassword} from '../../actions/userAction';
import { FORGOT_PASSWORD_CLEAR } from "../../constants/userConstants";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const passwordForgot = useSelector((state) => state.forgotPassword);
  const { loading, error, forgot } = passwordForgot;

  useEffect(() => {
    if(forgot){
      dispatch({type: FORGOT_PASSWORD_CLEAR});
      Swal.fire('Alert text')
      Swal.fire( 'Your Forgot Password Request has been sent Successfully!','Please Check your Email','success');
    }
  }, [forgot, dispatch])

  const emailChangeHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const submitFormHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center my-3">
        <Col md={5} sm={8} className="m-3 p-3 border">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="text-center">
                <h3>
                  <i className="fa fa-lock fa-4x"></i>
                </h3>
                <h2 className="text-center">Forgot Password?</h2>

                <div className="panel-body">
                  <form
                    id="register-form"
                    className="form"
                    method="post"
                    onSubmit={submitFormHandler}
                  >
                    <div
                      style={{ backgroundColor: "#c3e6cb", color: "black" }}
                      className="alert alert-success bg-soft-primary border-0"
                      role="alert"
                    >
                      Enter your email address and we'll send you an email with
                      instructions to reset your password.
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          id="email"
                          name="email"
                          placeholder="email address"
                          className="form-control py-2"
                          type="email"
                          value={email}
                          onChange={emailChangeHandler}
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

                    <div className="d-flex justify-content-between">
                      <Link className="text-decoration-none" to="/login">
                        Login
                      </Link>
                      <Link className="text-decoration-none" to="/signup">
                        Signup
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
