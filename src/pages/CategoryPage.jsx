import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getItemsByCategory,
  getItemsByCategoryAsync,
} from "../redux/store/slices/categorySlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

const CategoryPage = () => {
  const { cat } = useParams();
  const dispatch = useDispatch();

  const products = useSelector((state) => state?.category?.productsbyCat[cat]);
  const loading = useSelector((state) => state.category.loading);

  useEffect(() => {
    getItemsByCat();
  }, [dispatch, cat]);

  function getItemsByCat() {
    dispatch(getItemsByCategoryAsync(cat));
  }
  const error = false;

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <h2>Category: {cat}</h2>
          <Row>
            {products?.map((item) => (
              <Col key={item.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={item} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
};

export default CategoryPage;
