import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const options = useSelector((state) => state.product.productItems);

  const filterByCallback = (option, props) =>
    option.category.toLowerCase().indexOf(props.text.toLowerCase()) !== -1 ||
    option.title.toLowerCase().indexOf(props.text.toLowerCase()) !== -1;

  return (
    <Container style={{ width: "60%" }}>
      <Typeahead
        size="sm"
        filterBy={filterByCallback}
        id="custom-filtering-example"
        labelKey="title"
        options={options}
        placeholder="Search by product title or category..."
        renderMenuItemChildren={(option) => (
          <Link
            to={`/product/${option.id}`}
            className="text-decoration-none text-dark "
          >
            <div key={option.id}>
              <img
                alt={option.title}
                src={option.image}
                style={{
                  height: "24px",
                  marginRight: "10px",
                  width: "24px",
                }}
              />
              <span style={{ flexShrink: 1 }}>{option.title}</span>
              <div>
                <small>category: {option.category}</small>
                <span>{option.login}</span>
              </div>
            </div>
          </Link>
        )}
      />
    </Container>
  );
};

export default SearchBar;
