import React, { useState } from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";
import Heading from "../components/layout/Heading";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrorMessage from "./../components/common/FormErrorMessage";
import * as yup from "yup";
import axios from 'axios';
import { BASE_URL } from '../constants/api';

const url = BASE_URL + "/api/inboxes";

const schema = yup.object().shape({
    name: yup.string().required("Please enter your name"),
    email: yup.string().required("Please enter a valid email address"),
    subject: yup.string().required("Subject must contain at least 5 characters"),
    message: yup.string().required("Message must contain at least 25 characters"),
});


function Contact() {
    const navigate = useNavigate();

    const [sending, setSending] = useState(false);
    const [error, setError] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const sendMessageFunction = async (_data) => {
        setSending(true);
        const body = {
            "data": {
                name: _data.name,
                email: _data.email,
                subject: _data.subject,
                message: _data.message,
            }
        }
        try {
            await axios.post(url,body);
            console.log("message sent")
            navigate("/success");
        }   catch (error) {
            setError(error.message);
        }   finally {
            setSending(false);
        }
    }


  return (
    <>  
        <Container>
            <Heading title="Contact" />
            <Row className="mt-5 mb-5">
                <h5>Do you have any questions?</h5>
                <p>Or just want to get in touch with us? Do not hesitate to contact us, we are here for you 24/7</p>
            </Row>
            <form onSubmit={handleSubmit(sendMessageFunction)}>
                <fieldset disabled={sending}>    
                <Row className="my-3">
                    <Col>
                        <h6>Name</h6>
                        <input placeholder="Name" type="text" className="inputs input__borderradius--small" {...register("name", { required: true })} />
                        <span>{errors.name?.message}</span>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <h6>Email</h6>
                        <input placeholder="Email" type="text" className="inputs input__borderradius--small" {...register("email", { required: true })} />
                        <span>{errors.email?.message}</span>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <h6>Subject</h6>
                        <input placeholder="Subject" type="text" className="inputs input__borderradius--small" {...register("subject", { required: true })} />
                        <span>{errors.subject?.message}</span>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col>
                        <h6>Message</h6>
                        <textarea placeholder="Message" type="text" rows={10} className="textarea" {...register("message", { required: true })} />
                        <span>{errors.message?.message}</span>
                    </Col>
                </Row>
                </fieldset>
                <Row>
                    <Button type="submit" >{sending ? "Sending..." : "Send Message"}</Button>
                </Row>
            </form>
        </Container>
    </>
  )
}

export default Contact