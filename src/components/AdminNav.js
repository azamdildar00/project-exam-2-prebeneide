import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

function AdminNav() {

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  function logout() {
    setAuth(null);
    console.log("Logged out");
    navigate("/");
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Holidaze</Navbar.Brand>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >

            <LinkContainer to="/admin/place/add">
              <Nav.Link>Add place</Nav.Link>
            </LinkContainer>
            <button onClick={logout}>Log out</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNav