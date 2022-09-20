import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL, PLACES_API, POPULATE } from "../../constants/api";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
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
                        setError("An error occured");
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
    <>
        <Row>
            <Col>
                <div className="place-detail">
                    <h1>{place.attributes.name}</h1>
                    <p>{place.attributes.area}</p>
                    <p>{place.attributes.price}</p>
                </div>
            </Col>
            <Col>
                <LinkContainer to={`/sendEnquiry/${place.id}`}>
                    <Button variant="success">Book</Button>
                </LinkContainer>
            </Col>
        </Row>   
    </>
    );
}

export default PlaceDetail;