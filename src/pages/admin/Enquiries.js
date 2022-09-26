import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Container, Row, Table } from 'react-bootstrap';
import { BASE_URL } from '../../constants/api';

const url = BASE_URL + "/api/enquiries";

function Enquiries() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(
        function () {
            async function fetchData() {
                try {
                    const response = await axios.get(url);
                    setData(response.data.data);
                }   catch (error) {
                    setError(error.toString());
                }   finally {
                    setLoading(false);
                }
            };
            fetchData();
        }, []);
    
    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <p>Something went wrong</p>;
    }

    const getFormattedDate = (date) => {
        var d = new Date(date);

        var datestring = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

        return datestring
    }

  return (
    <Container className="my-5">
        <Row>
            <h5 className="mb-5">Enquiries</h5>
        </Row>
        <Table hover className="enquiries-inbox__table">
            <thead>
                <tr>
                    <th>Hotel/BnB/Guesthouse</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Nights</th>
                    <th>Guests</th>
                    <th>Total Price</th>
                    <th>Enquiry Date</th>
                </tr>
            </thead>
            <tbody>
                {data.map(function (enquiries) {
                    return (
                    <tr>
                        <td className="enquiries-inbox__table--productdetails-div">
                            <div className="enquiries-inbox__table--product-image">
                                <img src={enquiries.attributes.establishmentCoverImage} alt={"Hotelimage"} />
                            </div>
                            <div className="enquiries-inbox__table--product-info">
                                <span>{enquiries.attributes.establishmentName}</span>
                                <span>{enquiries.attributes.establishmentPriceNumber} kr night</span>
                            </div>
                        </td>
                        <td>{getFormattedDate(enquiries.attributes.checkinDateTime)}</td>
                        <td>{getFormattedDate(enquiries.attributes.checkoutDateTime)}</td>
                        <td>{enquiries.attributes.daysNumber} nights</td>
                        <td>{enquiries.attributes.guests} guests</td>

                        <td>{enquiries.attributes.priceNumber} kr</td>
                        <td>{getFormattedDate(enquiries.attributes.createdAt)}</td>
                    </tr>
                    )
                })}
            </tbody>
        </Table>
    </Container>
  );
}

export default Enquiries;