import React, { useEffect, useState }from 'react'
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { BASE_URL } from '../../constants/api';
import { useParams } from "react-router-dom";
import axios from 'axios';

function InboxDetail() {

    const { id } = useParams()
    const url = BASE_URL + `/api/inboxes/${id}`;

    const [message, setMessage] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setMessage(response.data.data);
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    },[]);

    if (loading) {
        return <div className="loading-div">
            <Spinner animation="border" variant="info" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    }

    if (error) {
        return <p>Something went wrong</p>;
    }


  return (
            <Container className="mt-4">
                <Row>
                    <Col className="mb-4">
                        <h5>Back to inbox</h5>
                    </Col>
                    <h5>Message</h5>
                </Row>
                <Row>
                    <Col>
                        <h6>Name</h6>
                    </Col>
                    <Col>
                        <span>{message.attributes.name}</span>
                    </Col>
                    <Col>
                        <h6>Email</h6>
                    </Col>
                    <Col>
                        <p>email</p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h6>Subject</h6>
                    </Col>
                    <Col>
                        <p>subject</p>
                    </Col>
                    <Col>
                        <h6>Date</h6>
                    </Col>
                    <Col>
                        <p>date</p>
                    </Col>
                    <Col>
                        <h6>Time</h6>
                    </Col>
                    <Col>
                        <p>time</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h6>Message</h6>
                        <Col>
                            <p>message</p>
                        </Col>
                    </Col>
                </Row>
            </Container>
  )
}

export default InboxDetail