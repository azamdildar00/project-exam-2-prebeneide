import { PropTypes } from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";

function PlaceItem({ id, image, name, rating, people, price, area}) {
    return (
      <Col>
        <LinkContainer to={`detail/${id}`}>
          <Card style={{ width: "14rem" }}>
            <Card.Img variant="top" src={image} className="card-img"/>
            <Card.Body>
              <div>
                <Row>
                    <Col>
                        <p className="card-text-name">{name}</p>
                    </Col>
                    <Col>
                        <p className="card-text-rating d-flex justify-content-end">{rating}</p>
                    </Col>
                </Row>
                <p className="card-text-people">{people}</p>
                <Row>
                    <Col>
                        <p className="card-text-price">{price} kr night</p>
                    </Col>
                    <Col>
                        <p className="card-text-area d-flex justify-content-end">{area}</p>
                    </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </LinkContainer>
      </Col>
    );
}

PlaceItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    people: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    area: PropTypes.string.isRequired
}

export default PlaceItem;
