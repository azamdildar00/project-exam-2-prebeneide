import React from 'react'
import { Container } from 'react-bootstrap';
import PageMessage from '../../components/common/PageMessage'

function PlaceAddSuccess() {
  return (
    <>
        <Container>
          <PageMessage message="Place added" />
        </Container>
    </>
  )
}

export default PlaceAddSuccess;