import React from 'react'
import PropTypes from "prop-types";
import { Container, Row } from "react-bootstrap";

export default function PageMessage({ message }) {
  return (
    <div className="page__message--div">
        <Container className="my-5">
            <Row>
                <h5 className="page__message">{message}</h5>
            </Row>
        </Container>
    </div>
)};

PageMessage.propTypes = {
    message: PropTypes.node.isRequired,
};


