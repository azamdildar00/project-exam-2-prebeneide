import React from "react";
import "./sass/style.scss";
import Container from 'react-bootstrap/Container';
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from 'react-router-dom';
import Home from './components/home/Home';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import PlaceDetail from './components/places/PlaceDetail';
import EnquiryDetail from './components/enquiry/EnquiryDetail';
import Layout from "./components/Layout";


function App() {
    return (
      <Router>
        <Layout />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/detail/:id" element={<PlaceDetail />} />
            <Route path="/enquiry-detail/:id" element={<EnquiryDetail />} />
          </Routes>
        </Container>
      </Router>
    );
}

export default App;