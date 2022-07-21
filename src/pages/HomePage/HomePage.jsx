import React, { useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/Product";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getItemsAsync } from "../../redux/store/slices/productSlice";
import AnimatedPage from "../../motions/AnimatedPage";
import { Link } from "react-router-dom";
import "./styles.css";
import menImg from "./img/men.webp";
import womenImg from "./img/women.webp";
import jewelryImg from "./img/jewelry.webp";
import electronicImg from "./img/electronic.webp";
import blankImg from "./img/blank.png";

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.productItems);
  const { islogged } = useSelector((state) => state?.auth);

  useEffect(() => {
    getProductItems();
  }, []);

  function getProductItems() {
    dispatch(getItemsAsync());
  }
  const loading = useSelector((state) => state.product.loading);
  const error = false;

  const categories = [
    { category: "Electronics", image: electronicImg },
    { category: "Jewelery", image: jewelryImg },
    { category: "Men's clothing", image: menImg },
    { category: "Women's clothing", image: womenImg },
  ];

  return (
    <div className="home text-center">
      <header className="masthead position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
        <Container className="col-md-5 p-lg-5 mx-auto my-5 h-100">
          <Row className="h-100 align-items-center">
            <Col className="text-center">
              <h1 className="text-light display-4 fw-normal">
                Welcome to the Shop
              </h1>
              <div className="lead fw-normal">
                <h1 className="text-dark fw-light">
                  Volutpat maecenas volutpat blandit aliquam{" "}
                </h1>
                <p className="text-light lead">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <Link
                  className="btn btn-outline-secondary bg-success text-light"
                  to="/shop"
                >
                  See your products
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      <div className="categories pt-5">
        <h1>Featured Categories</h1>
        <Row className="products-title-section">
          {categories.map((obj, i) => (
            <Col
              className="category-item py-5"
              sm={6}
              md={6}
              lg={4}
              xl={3}
              key={i}
            >
              <Link
                to={`/category/${obj.category.toLowerCase()}`}
                className="text-decoration-none pull-left"
                key={i}
              >
                <Image src={obj.image} alt={obj.category} roundedCircle />

                <h6 className="py-3 text-secondary">{obj.category}</h6>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
