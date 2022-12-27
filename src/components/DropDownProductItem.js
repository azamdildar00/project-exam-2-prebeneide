import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaBed, FaStar } from "react-icons/fa";

function DropDownProductItem({ data }) {
  return (
    <>
      <Row>
        <Col className="navbar__search--dropdown-image">
          <img
            alt="Hotel,BnB,Guesthouse"
            src={data.attributes.coverimage.data.attributes.url}
          />
        </Col>
        <Col className="navbar__search-dropdown-infocolumn">
          <p>{data.attributes.name}</p>
          <p>
            <FaBed className="icon-margin" />
            {data.attributes.howmanypeople}
          </p>
          <p>{data.attributes.price} kr night</p>
          <p>
            <FaStar className="icon-margin" />
            {data.attributes.ratingdecimal}
          </p>
        </Col>
        <Col className="navbar__search-dropdown-areacolumn">
          <p>{data.attributes.area}</p>
        </Col>
      </Row>
    </>
  );
}

export default DropDownProductItem;
