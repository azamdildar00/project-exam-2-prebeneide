import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { API, POPULATE } from "../../constants/api";
import PlaceItem from "./PlaceItem";

function PlaceList() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(function () {
        async function fetchData() {
            try {
                const response = await fetch(API + POPULATE);

                if (response.ok) {
                    const json = await response.json();
                    console.log(json.data);
                    setPlaces(json.data);
                } else {
                    setError("A server error occured");
                }
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        );
    }

    if (error) {
        return <Alert key="danger" variant="danger">An error occured: {error}</Alert>;
    }

    return (
        <>
        <Container>
            <Row xs={1} md={2} lg={3} xl={4}>
                {places.map(function (place) {
                    return <PlaceItem id={place.id} key={place.id} name={place.attributes.name} image={place.attributes.coverimage.data.attributes.url} rating={place.attributes.ratingdecimal} people={place.attributes.howmanypeople} price={place.attributes.price} area={place.attributes.area} />;
                })}
            </Row>
        </Container>        
        </>
    );
}

export default PlaceList;