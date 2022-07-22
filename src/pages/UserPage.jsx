import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
// import Message from '../components/Message';
// import Loader from '../components/Loader';

import { useParams } from "react-router-dom";
import {
  // getUserByDetailsAsync,
  // getUserById,
  getUserByIdAsync,
} from "../redux/store/slices/userSlice";

const UserPage = () => {
  let params = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    // eslint-disable-next-line
    getUser();
  }, [dispatch, params]);

  // console.log(user);

  function getUser() {
    dispatch(getUserByIdAsync(params.id));
  }

  return (
    <Col>
      {JSON.stringify(user)}
      <Row>
        <h2>Hi, {user?.username}</h2>
      </Row>
      <h3>{user?.name?.firstname}</h3>
      <h3>{user?.name?.lastname}</h3>
      <h3>{user?.email}</h3>
      <h3>{user?.phone}</h3>
    </Col>
  );
};

export default UserPage;
