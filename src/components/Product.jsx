import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = (item) => {
  const { id, image, title, price, rating } = item.product;

  return (
    <Card className="my-3 p-3 rounded product">
      <Link to={`/product/${id}`} className="text-decoration-none">
        <Card.Img src={image} variant="top" className="product-img" />
      </Link>
      <Card.Body>
        <Link
          to={`/product/${id}`}
          className="text-decoration-none"
          id="product-title"
        >
          <Card.Title as="div" style={{color: 'black'}}>
            <p>{title}</p>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating rating={rating} />
        </Card.Text>

        <Card.Text as="h3">${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
