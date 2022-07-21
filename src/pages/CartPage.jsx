import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Row, Table, ButtonGroup } from "react-bootstrap";
import {
  addItem,
  removeAllItems,
  removeItem,
} from "../redux/store/slices/cartSlice";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const { isLogged } = useSelector((state) => state?.auth);
  console.log("isLogged", isLogged);
  const grandQuantity = () => {
    return cartItems.reduce((a, b) => a + b.quantity, 0);
  };

  const grandTotal = () => {
    return cartItems.reduce((a, b) => a + b.totalPrice, 0)?.toFixed(2);
  };

  const emptyCart = () => {
    dispatch(removeAllItems());
  };

  return (
    <>
      {cartItems.length ? (
        <Col>
          <Row>
            <h4>Your Cart has {cartItems.length} items</h4>
          </Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems &&
                cartItems.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <td>{index + 1}</td>
                      <td>{item.title} </td>
                      <td>{item.quantity}</td>
                      <td>{item.price} $</td>
                      <td>{item.totalPrice?.toFixed(2)} $</td>
                      <td>
                        <ButtonGroup aria-label="Basic example">
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => dispatch(addItem(item))}
                          >
                            <i className="bi bi-plus-lg"></i>
                          </Button>{" "}
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => dispatch(removeItem(item))}
                          >
                            <i className="bi bi-dash-lg"></i>
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  );
                })}

              <tr sx={{ borderTop: "1px solid #dbdbdb" }}>
                <td>Total</td>
                <td></td>
                <td component="th" sx={{ fontWeight: "bold" }}>
                  {grandQuantity()}
                </td>
                <td></td>
                <td component="th" sx={{ fontWeight: "bold" }}>
                  {grandTotal()} $
                </td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </Col>
      ) : (
        <h1>Your cart is empty!</h1>
      )}
      <Row>
        {cartItems.length ? (
          <Col className="text-center">
            <Button variant="danger" onClick={emptyCart}>
              <i className="bi bi-cart-x-fill" /> EMPTY CART
            </Button>
          </Col>
        ) : (
          // <Col className="text-center">
          //   <Button variant="danger" disabled>
          //     <i className="bi bi-cart-x-fill" /> EMPTY CART
          //   </Button>
          // </Col>
          <></>
        )}

        {isLogged && cartItems.length ? (
          <Col className="text-center">
            <Button variant="success">
              <i className="bi bi-cart-check-fill" /> CHECKOUT
            </Button>
          </Col>
        ) : !isLogged && cartItems.length ? (
          <Col className="text-center">
            <Button variant="success" disabled>
              <i className="bi bi-cart-check-fill" /> CHECKOUT
            </Button>
          </Col>
        ) : (
          <></>
        )}
      </Row>
    </>
  );
};

export default CartPage;
