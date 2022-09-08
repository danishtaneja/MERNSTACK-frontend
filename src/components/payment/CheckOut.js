import React from 'react'
import { Row, Col } from 'react-bootstrap'

export default function CheckOutSession(props) {
  return (
      <Row className='checkout-steps'>
          <Col className={props.step1?'active': ''}>Sign In</Col>
          <Col className={props.step2?'active': ''}>Shipping</Col>
          <Col className={props.step3?'active': ''}>Place Order</Col>
      </Row>
  )
}