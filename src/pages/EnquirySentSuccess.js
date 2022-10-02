import React from 'react'
import { Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/pro-solid-svg-icons';
import BackLink from '../components/common/BackLink';

function EnquirySentSuccess() {
  return (
    <Container className="my-5">
    <BackLink title="Back to home" />
        <Row>
            <h5>Your message has been sent</h5>
            <p>Thank you very much, we will reply to you as soon as possible. </p>
        </Row>
    </Container>
  )
}

export default EnquirySentSuccess;