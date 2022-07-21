import React, { useEffect, useState } from "react";
import { Image, ListGroup, Col, Row, Button, Badge } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { getItemDetailsAsync } from "../redux/store/slices/productSlice";
import { addItem } from "../redux/store/slices/cartSlice";
import Notification from "../components/Notification";
import { useToaster } from "@scrumble-nl/react-quick-toaster"; // Step 1

const ProductPage = () => {
  let params = useParams();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const handleChange = (event) => {
    const value = Math.max(1, Math.min(50, Number(event.target.value)));
    setQty(value);
  };

  const { product, loading, rating } = useSelector((state) => state.product);

  useEffect(() => {
    getItem();
  }, [dispatch, params]);

  function getItem() {
    dispatch(getItemDetailsAsync(params.id));
  }
  const error = false;

  const [showA, setShowA] = useState(true);

  const add = useToaster();

  const showToast = () => {
    add({ content: `${product.title} added to cart` }); // Step 2
  };

  return (
    <>
      <Link className="btn btn-warning my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
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
                Category: <Badge bg="secondary">{product?.category}</Badge>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Price per unit: </Col>
                  <Col>
                    <strong>${product?.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
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
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="d-grid">
                <Button
                  className="btn-success"
                  type="button"
                  // disabled={product?.countInStock === 0}
                  onClick={() => {
                    dispatch(addItem(product));
                    showToast();
                  }}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
      <Notification title="test" message="msg" show={showA} />
    </>
  );
};

export default ProductPage;
