import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../../assets/logo/holidaze_logo_white.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';


function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="footer__row">
          <Col className="footer__icons">
            <FontAwesomeIcon className="icon-margin" icon={faFacebook} style={{fontSize: 25}} /> <FontAwesomeIcon className="icon-margin" icon={faInstagram} style={{fontSize: 25}}/><FontAwesomeIcon className="icon-margin" icon={faTwitter} style={{fontSize: 25}} />    
          </Col>
          <Col className="footer__copywright-text">
            Copyright 2022 Holidaze, inc
          </Col>
          <Col className="footer__logo">
            <img alt="logo" src={logo} /> 
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer