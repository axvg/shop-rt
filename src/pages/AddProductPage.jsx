import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useToaster } from "@scrumble-nl/react-quick-toaster";
import { addItemAsync } from "../redux/store/slices/productSlice";

const AddProductPage = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const inputRef = useRef();
  const navigate = useNavigate();
  const add = useToaster();

  // const products = useSelector((state) => state.product.productItems);
  const { isAdmin, isLogged } = useSelector((state) => state?.auth);

  const dispatch = useDispatch();

  const obj = {
    title,
    price: Number(price),
    description,
    image,
    category,
  };

  const showToast = () => {
    add({ content: `${obj.title} added to Shop` });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addItemAsync(obj));
    navigate("/");
    showToast();
  };

  useEffect(() => {
    if (!isAdmin || !isLogged) {
      navigate("/");
    }
  }, []);

  return (
    <FormContainer className="text-center">
      <Form onSubmit={submitHandler}>
        <h3>Add a new product: </h3>
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
            type="text"
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

export default AddProductPage;
