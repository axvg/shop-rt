import { useState } from "react";
import { Form, Toast } from "react-bootstrap";

const Notification = ({ title, message, show }) => {
  const [showX, setShowX] = useState(false);

  return (
    <>
      <Toast show={showX} onClose={() => setShowX(false)}  delay={1500} autohide>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{title}</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </>
  );
};

export default Notification;
