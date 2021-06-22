import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";

import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen({ history }) {
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector(state => state.cart);
  if (!shippingAddress.address) {
    history.push("/shipping");
  }
  const handleSubmit = e => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={e => {
                setPaymentMethod(e.target.value);
              }}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit"> Continue </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
