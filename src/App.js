import React from "react";
import "./sass/style.scss";
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import PlaceDetail from './pages/places/PlaceDetail';
import Enquiry from './pages/Enquiry';
import Navelement from "./components/Navelement";
import LoginPage from "./pages/admin/login/LoginPage";
import Welcome from "./pages/admin/Welcome";
import AddPlace from "./pages/admin/AddPlace";
import Container from "react-bootstrap/Container";
import Authentication from "./context/AuthContext";
import PlaceAddSuccess from "./pages/admin/PlaceAddSuccess";


function App() {
    return (
      <Authentication>
        <Router>
          <Navelement />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/detail/:id" element={<PlaceDetail />} />
              <Route path="/sendEnquiry/:id" element={<Enquiry />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin/welcome" element={<Welcome />} />
              <Route path="/admin/place/add" element={<AddPlace />} />
              <Route path="/admin/place/added" element={<PlaceAddSuccess />} /> 
            </Routes>
          </Container>
        </Router>
      </Authentication>
    );
}

export default App;