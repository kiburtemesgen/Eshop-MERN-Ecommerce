import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/common/Message";
import Loader from "../../components/common/Loader";
import { signup } from "../../actions/userAction";

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userSignup);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
     navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(signup(name, email, password));
    }
  };

  return (
    <section className="">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <h2 className="mb-5">Sign up</h2>
                {message && <Message variant="warning">{message}</Message>}
                {error && <div variant="danger">{error}</div>}
                {loading && <Loader/>}
                <form onSubmit={submitHandler}>
                  <div className="form-outline mb-2">
                    <label className="form-label rounded">Name</label>
                    <input
                      type="name"
                      placeholder="Enter Name"
                      className="form-control form-control-lg"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-outline mb-2">
                    <label className="form-label rounded">Email</label>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="form-control form-control-lg"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <div className="d-grid gap-2 my-2">
                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      Signup
                    </button>
                  </div>
                </form>

                <hr className="my-4" />

                <div className="d-flex">
                  <p>Have an account? </p>
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : "/signup"}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
