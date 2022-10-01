import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson,faDoorOpen, faBed, faToilet, faStar } from '@fortawesome/pro-solid-svg-icons';

function DropDownProductItem({data}) {
  return <>
            <Row>
                <Col className="navbar__search--dropdown-image">
                    <img alt="Hotel,BnB,Guesthouse" src={data.attributes.coverimage.data.attributes.url} />
                </Col>
                <Col className="navbar__search-dropdown-infocolumn">
                    <p>{data.attributes.name}</p>
                    <p><FontAwesomeIcon className="icon-margin" icon={faBed} />{data.attributes.howmanypeople}</p>
                    <p>{data.attributes.price} kr night</p>
                    <p><FontAwesomeIcon className="icon-margin" icon={faStar} />{data.attributes.ratingdecimal}</p>
                </Col>
                <Col className="navbar__search-dropdown-areacolumn">
                    <p>{data.attributes.area}</p>
                </Col>
            </Row>
  </>
}

export default DropDownProductItem