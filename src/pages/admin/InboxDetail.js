import React, { useEffect, useState }from 'react'
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { BASE_URL } from '../../constants/api';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function InboxDetail() {
    const navigate = useNavigate();
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

    const getFormattedDate = (date) => {
        var d = new Date(date);

        var datestring = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

        return datestring
    }
    const getFormattedTime = (date) => {
        var d = new Date(date);
        var datestring = d.getHours() + ":" + d.getMinutes();

        return datestring
    }

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
                <Row className="mb-5">
                    <Col className="mb-4">
                        <h5 onClick={() => navigate(-1)}>Back to inbox</h5>
                    </Col>
                    <h5>Message</h5>
                </Row>
                <Row className="my-md-3 mx-md-5">
                    <Col className="px-md-5">
                        <h6 className="mb-2">From</h6>
                    </Col>
                    <Col className="px-md-5">
                        <span>{message.attributes.name}</span>
                    </Col>
                    <Col className="px-md-5">
                        <h6 className="mb-4">Email</h6>
                    </Col>
                    <Col className="px-md-4">
                        <span>{message.attributes.email}</span>
                    </Col>
                </Row>

                <Row className="my-md-3 mx-md-5">
                    <Col className="px-md-5">
                        <h6 className="mb-2">Subject</h6>
                    </Col>
                    <Col className="px-md-5">
                        <span>{message.attributes.subject}</span>
                    </Col>
                    <Col className="px-md-5">
                        <h6>Date</h6>
                    </Col>
                    <Col className="px-md-3 px-xs-5">
                        <span>{getFormattedDate(message.attributes.createdAt)}</span>
                    </Col>
                    <Col className="px-md-3 px-xs-5">
                        <h6 className="mb-2">Time</h6>
                    </Col>
                    <Col>
                        <span>{getFormattedTime(message.attributes.createdAt)}</span>
                    </Col>
                </Row>
                <Row className="my-md-3 mx-md-5">
                    <Col className="px-md-5">
                        <h6 className="mb-4">Message</h6>
                        <Col>
                            <span>{message.attributes.message}</span>
                        </Col>
                    </Col>
                </Row>
            </Container>
  )
}

export default InboxDetail