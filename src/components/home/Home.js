import React from "react";
import Container from "react-bootstrap/Container";
import Heading from "../layout/Heading";
import PlaceList from "../places/PlaceList";

function Home() {
  return (
    <>
      <Heading title="Home" />

      <Container>
        <PlaceList />
      </Container>
    </>
  );
}

export default Home;
