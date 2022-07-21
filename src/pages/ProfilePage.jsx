import { useEffect, useState } from "react";
import { Card, Col, Row, Button, Container } from "react-bootstrap";
import Loader from "../components/Loader";
import { useJwt } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { getAllUsersAsync } from "../redux/store/slices/userSlice";

const ProfilePage = () => {
  const [passwordType, setPasswordType] = useState("password");

  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
  const { token, error, isLogged } = useSelector((state) => state?.auth);
  const { decodedToken } = useJwt(token);
  const user = decodedToken?.user;
  //   console.log("user", user, "type", typeof user);
  const loggedUser = users.filter((u) => u.username === user)[0];

  console.log("loggedUser", loggedUser);

  useEffect(() => {
    getUsers();
  }, []);

  console.log("users", users);

  function getUsers() {
    dispatch(getAllUsersAsync());
  }

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Card bg="light" className="mx-auto" style={{ width: "30rem" }}>
          <Card.Header className="text-center text-capitalize">
            Name: {loggedUser?.name.firstname} {loggedUser?.name.lastname}
          </Card.Header>
          <Card.Body>
            <Card.Title>Username: </Card.Title>
            <Card.Text className="px-3">{loggedUser?.username}</Card.Text>
            <Card.Title>Email: </Card.Title>
            <Card.Text className="px-3">{loggedUser?.email}</Card.Text>{" "}
            <Card.Title>Phone: </Card.Title>
            <Card.Text className="px-3">{loggedUser?.phone}</Card.Text>{" "}
            <Card.Title>Password: </Card.Title>
            <Card.Text type={passwordType}>
              <span className="px-3">
                {passwordType === "password" ? "******" : loggedUser?.password}
              </span>
              <button
                className="btn btn-outline-primary"
                onClick={togglePassword}
              >
                {passwordType === "password" ? (
                  <i className="bi bi-eye-slash-fill"></i>
                ) : (
                  <i className="bi bi-eye-fill"></i>
                )}
              </button>
            </Card.Text>
            <Card.Title>Address</Card.Title>
            <Card.Text className="px-3">
              City: {loggedUser?.address.city}
            </Card.Text>
            <Card.Text className="px-3">
              Street: {loggedUser?.address.street}
            </Card.Text>
            <Card.Text className="px-3">
              Number: {loggedUser?.address.number}
            </Card.Text>
            <Card.Text className="px-3">
              Zipcode: {loggedUser?.address.zipcode}
            </Card.Text>
            {loggedUser?.id === 1 ? (
              <Row>
                <Col>
                  <Link to="/add">
                    <Button>Add new product</Button>
                  </Link>
                </Col>

                <Col>
                  <Button
                    onClick={() => {
                      localStorage.clear();
                      sessionStorage.clear();
                    }}
                  >
                    Clear localStorage & sessionStorage
                  </Button>
                </Col>
              </Row>
            ) : (
              <Link to="/shop">
                <Button>Go to Shop</Button>
              </Link>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default ProfilePage;
