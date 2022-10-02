import React from "react";
import Container from "react-bootstrap/Container";
import Heading from "../components/layout/Heading";
import PlaceList from "./places/PlaceList";

function Home() {
  return (
    <>
      <Container className="mt-4">
        <PlaceList />
      </Container>
    </>
  );
}

export default Home;
