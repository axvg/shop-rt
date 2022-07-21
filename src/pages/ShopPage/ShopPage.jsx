import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/Product";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { getItemsAsync } from "../../redux/store/slices/productSlice";
import "./styles.css";

const ShopPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.productItems);
  const { isLogged } = useSelector((state) => state?.auth);

  useEffect(() => {
    getProductItems();
  }, []);

  function getProductItems() {
    dispatch(getItemsAsync());
  }

  console.log('products in Shop', products);
  const loading = useSelector((state) => state.product.loading);
  const error = false;

  return (
    <>
      <h2>logged: {isLogged ? "true" : "false"}</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((item) => (
            <Col key={item.id} sm={12} md={6} lg={4} xl={3}>
              <Product product={item} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default ShopPage;
