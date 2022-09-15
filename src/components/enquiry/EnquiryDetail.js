import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API, POPULATE } from "../../constants/api";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";

function EnquiryDetail() {
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let navigate = useNavigate();

    const { id } = useParams();

    if (!id) {
        navigate.push("/");
    }

    const url = API + "/" + id + POPULATE;

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
                    <Button variant="success">Book</Button>
            </Col>
        </Row>
    </>
    );
}

export default EnquiryDetail;