import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL, PLACES_API, POPULATE } from "../constants/api";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
    checkin: yup.string().required("Please fill in your check-in date"),
    checkout: yup.string().required("Please fill in your check-out date"),
    firstname: yup.string().required("Please fill in your firstname"),
    lastname: yup.string().required("Please fill in your lastname"),
    address: yup.string().required("Please fill in your address"),
    postalcode: yup.string().required("Please fill in your postal code"),
    country: yup.string().required("Please fill in your Country"),
    city: yup.string().required("Please fill in your city"),
    phonenumber: yup.string().required("Please fill in your phonenumber"),
    email: yup.string().required("Please fill in your email"),
});

function Enquiry() {
    const { id } = useParams();
    const getEstablishmentUrl = BASE_URL + PLACES_API + "/" + id + POPULATE;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [guests, setGuests] = useState(0);
    const [days, setDays] = useState(0);
    const [checkin, setCheckin] = useState(new Date());
    const [checkout, setCheckout] = useState(new Date());

    const handleGuests = (value) => {
        setGuests(value)
    }

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
    });

    if (!id) {
        navigate("/");
    }

    const dayDiff = (startdate, enddate) => {
        const date1 = new Date(startdate);
        const date2 = new Date(enddate);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDays(diffDays)
        return diffDays;
    }

    const getPrice = () => {
        return (Number(days)) * Number(data.attributes.price)
    }

    const getTotalPrice = () => {
        return ((Number(days) * Number(data.attributes.price)) + 150)
    }

    const disablePastDate = () => {
        //https://www.codecheef.org/article/how-to-disable-previous-date-in-input-typedate-in-react-js
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    const disablePastDateForCheckout = () => {
        //https://www.codecheef.org/article/how-to-disable-previous-date-in-input-typedate-in-react-js
        const today = new Date(checkin);
        const dd = String(today.getDate() + 1).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };




    useEffect(
        function () {
            async function fetchData() {
                try {
                    const response = await axios.get(getEstablishmentUrl);
                        console.log(response.data.data);
                        setData(response.data.data);
                } catch (error) {
                    setError(error.toString());
                } finally {
                    setLoading(false);
                }
            }
            fetchData();
        },[getEstablishmentUrl]
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>An error occured: {error}</div>;
    }

    const sendEnquiry = async (_data) => {
        const createEnquiryUrl = BASE_URL + "/api/enquiries";
        const body = {
            "data": { 
                checkinDateTime: checkin,
                checkoutDateTime: checkout,
                daysNumber: days,
                guests: guests,
                firstName: _data.firstname,
                lastName: _data.lastname,
                address: _data.address,
                postalCode: _data.postalcode,
                city: _data.city,
                country: _data.country,
                email: _data.email,
                phoneNumber: _data.phonenumber,
                priceNumber: ((Number(days) * Number(data.attributes.price)) + 150),
                establishmentRatingDecimal: data.attributes.ratingdecimal,
                establishmentArea: data.attributes.area,
                establishmentPriceNumber: data.attributes.price,
                establishmentName: data.attributes.name,
                establishmentCoverImage: data.attributes.coverimage.data.attributes.url,
            }
        }
        try {
            await axios.post(createEnquiryUrl, body);
            console.log("enquiry sent")
        } catch (error) {
            console.log("error:", "invalid inputs", error);
        }
    }

    const handleCheckout = (e) => {
        setCheckout(e);
        dayDiff(checkin,e)
    }

    

    return (
      <Container className="mt-5 px-5">
        <Row>
          <h6>Confirm your request details and send an enquiry</h6>
        </Row>
        <form onSubmit={handleSubmit(sendEnquiry)}>
          <Row>
            <Col xs={12} sm={12} md={6}>
              <h5 className="my-4">Your booking details</h5>
              <Row className="send-enquiry__selectedproductinfo--box mx-2">
                <Col xs={12} sm={4} md={5}>
                  <div className="send-enquiry__selectedproductinfo--image">
                    <img
                      alt={
                        data.attributes.coverimage.data.attributes
                          .alternativeText
                      }
                      src={data.attributes.coverimage.data.attributes.url}
                    />
                  </div>
                </Col>
                <Col className="send-enquiry__selectedproductinfo--textdiv">
                  <div className="send-enquiry__selectedproductinfo--row">
                    <span>{data.attributes.name}</span>
                    <span>{data.attributes.area}</span>
                  </div>
                  <div className="send-enquiry__selectedproductinfo--row">
                    <span>{data.attributes.ratingdecimal}</span>
                    <span>{data.attributes.price} kr night</span>
                  </div>
                </Col>
              </Row>
              <Row className="mx-1">
                <h6 className="mt-5 mb-2">Dates</h6>
                <Col xs={12} sm={6} md={6} className="my-2">
                  <input type="date" placeholder="check-in" className="inputs input__borderradius--small" min={disablePastDate()} {...register("checkin", { required: true })} onChange={(e) => setCheckin(e.target.value)} />
                  <span>{errors.checkin?.message}</span>
                </Col>
                <Col xs={12} sm={6} md={6} className="my-2">
                    <input type="date" className="inputs input__borderradius--small" min={disablePastDateForCheckout()} {...register("checkout", { required: true })} onChange={(e) => handleCheckout(e.target.value)} />
                    <span>{errors.checkout?.message}</span>
                </Col>
              </Row>
              <Row className="mx-1">
                <h6 className="mt-5 mb-2">Guests</h6>
                <Col xs={12} sm={6} md={6}>
                  <Dropdown>
                    <Dropdown.Toggle className="send-enqury__guestsdropdown">
                      {guests === 0 ? <> -- select -- </> : guests}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleGuests(1)}>1</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleGuests(2)}>2</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleGuests(3)}>3</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleGuests(4)}>4</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleGuests(5)}>5</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleGuests(6)}>6</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleGuests(7)}>7</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleGuests(8)}>8</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleGuests(9)}>9</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleGuests(10)}>10</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <Row className="send-enquiry__table--div my-4 mx-2 mt-5">
                <Table>
                      <tbody>
                        <tr>
                            <td>{data.attributes.price} kr x {days} nights</td>
                            <td></td>
                            <td>{getPrice()} kr</td>

                        </tr>
                        <tr>
                            <td>Service fee</td>
                            <td></td>
                            <td>150 kr</td>
                        </tr>
                        <tr>
                            <td>Total Price (NOK)</td>
                            <td></td>
                            <td>{getTotalPrice()} kr</td>
                        </tr>
                      </tbody>
                </Table>
              </Row>
            </Col>

            <Col xs={12} sm={12} md={6} className="send-enquiry__personalinformation--container">
                <h5 className="my-4">Your personal information</h5>
                <Row className="mx-1">
                    <Col xs={12} sm={6} md={6} className="mb-3">
                        <h6 className="mb-3">Firstname</h6>
                        <input type="text" className="inputs input__borderradius--small" placeholder="Firstname" {...register("firstname", { required: true })}></input>
                        <span>{errors.firstname?.message}</span>
                    </Col>
                    <Col xs={12} sm={6} md={6} className="mb-3">
                        <h6 className="mb-3">Lastname</h6>
                        <input type="text" className="inputs input__borderradius--small" placeholder="Lastname" {...register("lastname", { required: true })}></input>
                        <span>{errors.lastname?.message}</span>
                    </Col>

                    <Col xs={12} sm={12} md={12} className="my-3">
                        <h6 className="mb-3">Address</h6>
                        <input type="text" className="inputs input__borderradius--small" placeholder="Address" {...register("address", { required: true })}></input>
                        <span>{errors.address?.message}</span>
                    </Col>
                    <Col xs={12} sm={12} md={6} className="my-3">
                        <h6 className="mb-3">Postal Code</h6>
                        <input type="text" className="inputs input__borderradius--small" placeholder="Postal Code" {...register("postalcode", { required: true })}></input>
                        <span>{errors.postalcode?.message}</span>
                    </Col>
                    <Col xs={12} sm={12} md={6} className="my-3">
                        <h6 className="mb-3">City</h6>
                        <input type="text" className="inputs input__borderradius--small" placeholder="City" {...register("city", { required: true })}></input>
                        <span>{errors.city?.message}</span>
                    </Col>
                    <Col xs={12} sm={12} md={6} className="my-3">
                        <h6 className="mb-3">Country</h6>
                        <input type="text" className="inputs input__borderradius--small" placeholder="Country" {...register("country", { required: true })}></input>
                        <span>{errors.country?.message}</span>
                    </Col>
                    <Col xs={12} sm={12} md={12} className="my-3">
                        <h6 className="mb-3">Email</h6>
                        <input type="text" className="inputs input__borderradius--small" placeholder="Email" {...register("email", { required: true })}></input>
                        <span>{errors.email?.message}</span>
                    </Col>
                    <Col xs={12} sm={12} md={12} className="my-3">
                        <h6 className="mb-3">Phonenumber</h6>
                        <input type="text" className="inputs input__borderradius--small" placeholder="Phonenumber" {...register("phonenumber", { required: true })}></input>
                        <span>{errors.phonenumber?.message}</span>
                    </Col>
                </Row>
                <Row className="mx-auto">
                    <Button type="submit">Send enquiry</Button>
                </Row>
            </Col>
          </Row>
        </form>
      </Container>
    );
}

export default Enquiry;