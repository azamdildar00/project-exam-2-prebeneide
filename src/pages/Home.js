import React from "react";
import Container from "react-bootstrap/Container";
import Heading from "../components/layout/Heading";
import Navelement from "../components/Navelement";
import PlaceList from "./places/PlaceList";

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
