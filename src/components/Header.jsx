import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useJwt } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../redux/store/slices/authSlice";
import SearchBar from "./SearchBar";

const Header = () => {
  const dispatch = useDispatch();
  const { loading, token, error } = useSelector((state) => state?.auth);

  const { decodedToken } = useJwt(token);
  // console.log(decodedToken);
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          {/* To Home */}
          <LinkContainer to="/">
            <Navbar.Brand>
              <i className="bi bi-shop" /> SHOP
            </Navbar.Brand>
          </LinkContainer>
          <SearchBar />
          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            MENU
          </Navbar.Toggle>

          {/* LogIn - LogOut */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="bi bi-cart-fill" /> CART
                </Nav.Link>
              </LinkContainer>
              {token ? (
                <NavDropdown
                  title={`Hello, ${decodedToken?.user}`}
                  id="username"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>PROFILE</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i className="bi bi-door-closed" /> LOGOUT
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="bi bi-door-open" /> SIGN IN
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
