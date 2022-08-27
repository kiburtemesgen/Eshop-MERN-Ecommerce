import React, { useState, useEffect, Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/common/Message";
import Loader from "../../components/common/Loader";
import { login } from "../../actions/userAction";

const Login = ({ history }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    
  <Fragment>
    {loading ? <Loader/> :  <section className="">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
              {error && <Message variant="warning" style={{backgroundColor: '#f59d93'}}>{error}</Message>}
                <h3 className="mb-5">Sign in</h3>
                <form onSubmit={submitHandler}>
                  <div className="form-outline mb-2">
                    <label
                      className="form-label rounded"
                      htmlFor="typeEmailX-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="typeEmailX-2"
                      placeholder="Enter Email"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-2">
                    <label className="form-label" htmlFor="typePasswordX-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="typePasswordX-2"
                      placeholder="Enter Password"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-check d-flex justify-content-end mb-4">
                    <Link to="/forgotpassword">
                      <label
                        className="form-check-label"
                        htmlFor="form1Example3"
                      >
                        {" "}
                        Forgot Password{" "}
                      </label>
                    </Link>
                  </div>

                  <div className="d-grid gap-2 my-2">
                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </form>

                <hr className="my-4" />

                <div className="d-flex">
                  <p> Not a memeber? </p>
                  <Link
                    to={redirect ? `/signup?redirect=${redirect}` : "/signup"}
                  >
                    Signup
                  </Link>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>}
  </Fragment>
  );
};

export default Login;
