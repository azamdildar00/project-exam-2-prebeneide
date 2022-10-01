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
import Footer from "./components/layout/Footer";
import LoginPage from "./pages/admin/login/LoginPage";
import Welcome from "./pages/admin/Welcome";
import AddPlace from "./pages/admin/AddPlace";
import Container from "react-bootstrap/Container";
import Authentication from "./context/AuthContext";
import PlaceAddSuccess from "./pages/admin/PlaceAddSuccess";
import Enquiries from "./pages/admin/Enquiries";
import EnquiryDetail from "./pages/admin/EnquiryDetail";
import ContactUsSuccess from "./pages/ContactUsSuccess";
import Inbox from "./pages/admin/Inbox";
import InboxDetail from "./pages/admin/InboxDetail";


function App() {
    return (
      <Authentication>
        <Router>
          <div className="wrapper">
            <Navelement />
            <Container>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/success" element={<ContactUsSuccess />} />
                <Route path="/detail/:id" element={<PlaceDetail />} />
                <Route path="/sendEnquiry/:id" element={<Enquiry />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin/welcome" element={<Welcome />} />
                <Route path="/admin/place/add" element={<AddPlace />} />
                <Route path="/admin/place/added" element={<PlaceAddSuccess />} />
                <Route path="/admin/enquiries" element={<Enquiries />} />
                <Route path="/admin/enquiries/details/:id" element={<EnquiryDetail />} />
                <Route path="/admin/inbox" element={<Inbox />} />
                <Route path="/admin/inboxDetail/:id" element={<InboxDetail />} />
              </Routes>
            </Container>
          </div>
          <Footer />
        </Router>
      </Authentication>
    );
}

export default App;