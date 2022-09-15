import Heading from "../layout/Heading";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ContactForm from "../ContactForm";
import ContentTabs from "../ContentTabs";
import ContentAccordion from "../ContentAccordion"; 

export default function About() {
    return (
      <>
        <Heading title="About" />
        <p>This is the about page</p>

        <Container>
          <h2>Stop buying things</h2>

          <p>This should be the paragraph</p>

          <h3>Tell us something new</h3>
        </Container>

        <Container>
          <Row>
            <Col md={6}>
              <ContactForm />
            </Col>
            <Col md={6}>
              <ContentAccordion />
              <div className="d-none d-md-block">
                <ContentTabs />
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
}