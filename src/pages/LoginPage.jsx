import { createBrowserHistory } from "history";
import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useJwt } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  checkLogin,
  checkUserLogin,
  login,
  loginAsync,
} from "../redux/store/slices/authSlice";
import HomePage from "./HomePage/HomePage";
import UserPage from "./UserPage";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const userRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { check, token, error, isLogged, loading } = useSelector(
    (state) => state?.auth
  );
  // console.log("logged?", isLogged);
  // console.log("error in loginPage", error);
  // console.log('check', check);
  // console.log('token', token);
  // console.log('error', error);

  const { decodedToken } = useJwt(token);
  const id = decodedToken?.sub;

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(loginAsync(username, password));
  };

  if (isLogged && !loading) {
    navigate(`/`);
  }

  return (
    <>
      {isLogged ? (
        <HomePage />
      ) : (
        <FormContainer>
          <h1>Sign In</h1>
          {error && <Message variant="warning">{error}</Message>}
          {check && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Username: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter User"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                ref={userRef}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password: </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="success">
              SIGN IN
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              New Customer?{" "}
              <Link style={{ textDecoration: "none" }} to={"/register"}>
                Register
              </Link>
            </Col>
          </Row>
        </FormContainer>
      )}
    </>
  );
};

export default LoginPage;
