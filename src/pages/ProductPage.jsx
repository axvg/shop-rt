import React, { useEffect } from "react";
import { Image, ListGroup, Col, Row, Button, Badge } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import {
  deleteItemfromStore,
  getItemDetailsAsync,
} from "../redux/store/slices/productSlice";
import { addItem, removeItem } from "../redux/store/slices/cartSlice";
import { useToaster } from "@scrumble-nl/react-quick-toaster";
import P404 from "../components/P404";

const ProductPage = () => {
  let params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error } = useSelector((state) => state.product);
  const { isAdmin, isLogged } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getItemDetailsAsync(params.id));
  }, [dispatch, params]);

  const add = useToaster();

  const showToast = () => {
    add({ content: `${product.title} added to cart` });
  };

  const showToast2 = () => {
    add({ content: `${product.title} removed from Shop`, variant: "danger" });
  };

  return (
    <>
      <Link className="btn btn-warning my-3" to="/shop">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : !product ? (
        <P404 />
      ) : (
        <Row>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Image
                  src={product?.image}
                  alt={params?.title}
                  fluid
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "45vh",
                  }}
                />
              </ListGroup.Item>
              <ListGroup.Item>{product?.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product?.title}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating rating={product?.rating} />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
              <ListGroup.Item>
                Category:
                <Link to={`/category/${product?.category}`}>
                  <Badge bg="secondary" className="mx-3">
                    {product?.category}
                  </Badge>
                </Link>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                <Row>
                  <Col>Price per unit: </Col>
                  <Col>
                    <strong>${product?.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item> */}

              <ListGroup.Item>
                {/* <Row>
                  <Col>Number: </Col>
                  <Col>
                    <Button size="sm" onClick={() => setQty(qty - 1)}>
                      {" "}
                      -{" "}
                    </Button>
                    <span> {qty} </span>
                    <Button size="sm" onClick={handleChange}>
                      {" "}
                      +{" "}
                    </Button>
                  </Col>
                </Row> */}
              </ListGroup.Item>
              <ListGroup.Item className="d-grid">
                <Button
                  className="btn-success"
                  type="button"
                  onClick={() => {
                    dispatch(addItem(product));
                    showToast();
                  }}
                >
                  <i className="bi bi-cart4" /> Add to Cart
                </Button>
              </ListGroup.Item>
              {isAdmin && isLogged ? (
                <ListGroup.Item className="d-grid">
                  <Row className="text-center">
                    <Col>
                      <Button
                        className="btn-danger"
                        type="button"
                        onClick={() => {
                          dispatch(deleteItemfromStore(product));
                          dispatch(removeItem(product));
                          navigate("/shop");
                          showToast2();
                        }}
                      >
                        <i className="bi bi-trash" /> Delete item
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        className="btn-info"
                        type="button"
                        onClick={() => {
                          navigate(`/update/${params.id}`);
                        }}
                      >
                        <i className="bi bi-arrow-up-square-fill" /> Update item
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ) : (
                <></>
              )}
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductPage;
