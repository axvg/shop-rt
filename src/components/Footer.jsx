import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <Col className="md-4 d-flex align-items-center px-3">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          >
            <i class="bi bi-bootstrap-fill"></i>
          </a>
          <span className="mb-3 mb-md-0 text-muted">
            &copy; 2022 Company, Inc
          </span>
        </Col>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex px-4">
          <li className="ms-3">
            <a className="text-muted" href="https://twitter.com">
              <i class="bi bi-twitter"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="https://instagram.com">
              <i class="bi bi-instagram"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="https://facebook.com">
              <i class="bi bi-facebook"></i>
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
