import React from "react";
import "./sass/style.scss";
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import PlaceDetail from './components/places/PlaceDetail';
import Enquiry from './pages/Enquiry';
import Navelement from "./components/Navelement";
import LoginPage from "./pages/admin/login/LoginPage";
import Welcome from "./pages/admin/Welcome";
import Container from "react-bootstrap/Container";
import { AuthProvider } from "./context/AuthContext";


function App() {
    return (
      <AuthProvider>
        <Router>
          <Navelement />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/detail/:id" element={<PlaceDetail />} />
              <Route path="/sendEnquiry/:id" element={<Enquiry />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin/welcome" exact element={<Welcome />} />
            </Routes>
          </Container>
        </Router>
      </AuthProvider>
    );
}

export default App;