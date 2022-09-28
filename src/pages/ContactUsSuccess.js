import React from 'react'
import { Container, Row } from "react-bootstrap";

function ContactUsSuccess() {
  return (
    <Container className="my-5">
        <Row>
            <h5>Your message has been sent</h5>
            <p>Thank you very much, we will reply to you as soon as possible. </p>
        </Row>
    </Container>
  )
}

export default ContactUsSuccess