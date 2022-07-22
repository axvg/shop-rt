import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import {
  addItemAsync,
  getItemDetailsAsync,
  updateItem,
} from "../redux/store/slices/productSlice";

const UpdateProductPage = () => {
  let params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemDetailsAsync(params.id));
  }, []);

  const { product } = useSelector((state) => state.product);

  const [title, setTitle] = useState(product?.title);
  const [price, setPrice] = useState(product?.price);
  const [description, setDescription] = useState(product?.description);
  const [image, setImage] = useState(product?.image);
  const [category, setCategory] = useState(product?.category);
  const inputRef = useRef();
  const navigate = useNavigate();

  // const products = useSelector((state) => state.product.productItems);
  const { isAdmin, isLogged } = useSelector((state) => state?.auth);

  const obj = {
    id: params.id,
    title,
    price: Number(price),
    description,
    image,
    category,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateItem(obj));
    navigate(`/shop/${params.id}`);
  };

  useEffect(() => {
    if (!isAdmin || !isLogged) {
      navigate("/");
    }
  }, []);

  return (
    <FormContainer className="text-center">
      <Form onSubmit={submitHandler}>
        <h3>Update product: </h3>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Title: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ref={inputRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Price: </Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Description: </Form.Label>
          <Form.Control
            type="text-area"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Image (URL): </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Category: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UpdateProductPage;
