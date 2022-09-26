import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL, PLACES_API, POPULATE } from "../../constants/api";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";

function PlaceDetail() {
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let navigate = useNavigate();

    const { id } = useParams();

    if (!id) {
        navigate.push("/");
    }

    const url = BASE_URL + PLACES_API + "/" + id + POPULATE;

    useEffect(
        function () {
            async function fetchData() {
                try {
                    const response = await fetch(url);

                    if (response.ok) {
                        const json = await response.json();
                        console.log(json.data);
                        setPlace(json.data);
                    } else {
                        setError("An error occured when loading data");
                    }
                } catch (error) {
                    setError(error.toString());
                } finally {
                    setLoading(false);
                }
            }
            fetchData();
        },[url]
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>An error occured: {error}</div>;
    }

    return (
        <Container className="my-5">
            <Row>
                <Col xs={12} md={12}>
                    <h5 className="product__detail--name">{place.attributes.name}</h5> 
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={12} md={6} className="product__detail--coverimage">
                    <img alt={place.attributes.coverimage.data.attributes.alternativeText} src={place.attributes.coverimage.data.attributes.url} />
                </Col>
                <Col xs={12} sm={12} md={6}>
                    <Row>
                        <Col xs={6} sm={6} md={6} className="product__detail--rowimage">
                            <img alt={place.attributes.image2.data.attributes.alternativeText} src={place.attributes.image2.data.attributes.url} />
                        </Col>
                        <Col xs={6} sm={6} md={6} className="product__detail--rowimage">
                            <img alt={place.attributes.image3.data.attributes.alternativeText} src={place.attributes.image3.data.attributes.url} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} sm={6} md={6} className="product__detail--rowimage">
                            <img alt={place.attributes.image4.data.attributes.alternativeText} src={place.attributes.image4.data.attributes.url} />
                        </Col>
                        <Col xs={6} sm={6} md={6} className="product__detail--rowimage">
                            <img alt={place.attributes.image5.data.attributes.alternativeText} src={place.attributes.image5.data.attributes.url} />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col xs={12} sm={6} md={6} className="d-flex justify-content-between">
                    <span>{place.attributes.howmanypeople} people</span>
                    <span>{place.attributes.howmanybedrooms} bedrooms</span>
                    <span>{place.attributes.howmanybeds} beds</span>
                    <span>{place.attributes.howmanybathrooms} bathrooms</span>
                </Col>
                <Col xs={12} sm={6} md={6} className="d-flex justify-content-end">
                    <span>{place.attributes.price} kr night</span>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col xs={12} sm={6} md={6} className="d-flex flex-column">
                    <h4 className="mb-2">About this place</h4>
                    <p>{place.attributes.generalabouttext}</p>

                    <h6 className="mb-2">The place</h6>
                    <p>{place.attributes.theplacetext}</p>

                    <h6 className="mb-2">Guest access</h6>
                    <p>{place.attributes.guestaccesstext}</p>

                    <h6 className="mb-2">Other things worth noting</h6>
                    <p>{place.attributes.otherthingsworthnotingtext}</p>

                    <h4>This place offers</h4>
                </Col>
                <Col xs={12} sm={6} md={6} className="text-center mt-2">
                    <LinkContainer to={`/sendEnquiry/${place.id}`}>
                        <Button>Book</Button>
                    </LinkContainer>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h4>Good to know</h4>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col xs={12} sm={6} md={6} className="d-flex flex-column">
                    <h4 className="mb-2">Cancellation terms</h4>
                    <p>{place.attributes.cancellationterms}</p>
                </Col>
            </Row>
        </Container>
    );
}

export default PlaceDetail;