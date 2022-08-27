import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { userDetail } from "../../actions/userAction";
import Loader from "../common/Loader";
import Message from "../common/Message";
import { updateUserProfile } from "../../actions/userAction";
import {
  UPDATE_PROFILE_CLEAR,
  USER_DETAIL_CLEAR,
  USER_LOGIN_SUCCESS,
} from "../../constants/userConstants";
import axios from "axios";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  let [avatar, setAvatar] = useState({});
  const [uploading, setUploading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.updateUserProfile);
  const {
    updated,
    loading: updateLoading,
    error: updateError,
  } = userUpdateProfile;

  useEffect(() => {
    if (updated) {

      dispatch({ type: UPDATE_PROFILE_CLEAR });
      dispatch({ type: USER_DETAIL_CLEAR });
      enqueueSnackbar("Profile Updated!", { variant: "success" });
    }
    if (!user._id) {
      dispatch(userDetail(userInfo._id));
    
    } else {
   
        const data = JSON.parse(localStorage.getItem("userInfo"));
        data.email = user.email;
        data.name = user.name;
        localStorage.setItem("userInfo", JSON.stringify(data));
        dispatch({type: USER_LOGIN_SUCCESS, payload: data});
      
      setName(user.name);
      setEmail(user.email);
    }
  }, [
    userInfo._id,
    user._id,
    dispatch,
    user.name,
    user.email,
    updated,
    enqueueSnackbar,
    user.avatar,
    user,
  ]);

  const nameChangeHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const emailChangeHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/users/upload", formData, config);
      avatar.url = data.url;
      setAvatar(avatar);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const updateProfileHandler = (e) => {
    e.preventDefault();
    avatar = avatar.url ? avatar : user.avatar;
    dispatch(updateUserProfile({ name, email, avatar }));
  };

  return (
    <>
      {loading || !user._id || updateLoading ? (
        <Loader />
      ) : error || updateError ? (
        error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Message variant="danger">{updateError}</Message>
        )
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
              <h2>Personal Information</h2>
              <Row className="py-3">
                <Col
                  style={{ backgroundColor: "#e8eced" }}
                  className="mx-3 rounded py-2"
                >
                  <div className="d-flex flex-column  align-items-start">
                    <div style={{ fontSize: "22px" }} className="">
                      Name
                    </div>
                    <div style={{ fontSize: "22px" }}>{user.name}</div>
                  </div>
                </Col>
                <Col
                  style={{ backgroundColor: "#e8eced" }}
                  className="mx-3 rounded py-2"
                >
                  <div className="d-flex flex-column  align-items-start">
                    <div style={{ fontSize: "22px" }} className="">
                      Email
                    </div>
                    <div style={{ fontSize: "22px" }}>{user.email}</div>
                  </div>
                </Col>
              </Row>
              <h2>Update Profile</h2>
              <Form className="py-3" onSubmit={updateProfileHandler}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={nameChangeHandler}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter email"
                    value={email}
                    onChange={emailChangeHandler}
                  />
                </Form.Group>

                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image url"
                    value={user.avatar.url}
                    onChange={(e) =>
                      setAvatar(() => {
                        avatar.url = e.target.value;
                      })
                    }
                  ></Form.Control>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file" onChange={uploadFileHandler} />
                  </Form.Group>
                  {uploading && <Loader />}
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

export default UserProfile;
