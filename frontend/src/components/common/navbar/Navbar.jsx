import "./NavBar.css";
import { useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Image,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import LoggedIn from "../loggedIn/LoggedIn";

function NavBar() {

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <Navbar
      expand="lg"
      className="navbar-dark mb-4 fixed-top p-4 menu__navbar shadow"
    >
      <Container fluid={true}>
        {/* Logo Portfolio */}
        <Navbar.Brand>
          <Link to="/" className="logo">
            Weather App        
          </Link>
        </Navbar.Brand>
        {/* Toggle Btn */}
        <Navbar.Toggle
          aria-controls="offcanvasNavbar-expand-lg"
          className="shadow-none border-0"
          onClick={handleShow}
        />

        {/* Sidebar */}
        <Navbar.Offcanvas
          show={showOffcanvas}
          onHide={handleClose}
          id="offcanvasNavbar-expand-lg"
          aria-labelledby="offcanvasNavbarLabel-expand-lg"
          className="sidebar"
        >
          {/* Sidebar header */}
          <Offcanvas.Header
            className="text-white border-bottom close__white"
            closeButton
          >
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
              Weather App
            </Offcanvas.Title>
          </Offcanvas.Header>

          {/* Sidebar body */}
          <Offcanvas.Body className="d-flex flex-column flex-lg-row p-4 p-lg-0">
            <Nav className="d-flex justify-content-center align-items-center flex-grow-1 pe-3">
              <NavLink to="/" className="nav__menu m-3" onClick={handleClose}>Home</NavLink>
              <NavLink to="/current-weather" className="nav__menu m-3" onClick={handleClose}>Current Weather</NavLink>
              <NavLink to="/forecast" className="nav__menu m-3" onClick={handleClose}>Forecast</NavLink>
              <NavLink to="/settings" className="nav__menu m-3" onClick={handleClose}>Settings</NavLink>
              <NavLink to="/about" className="nav__menu m-3" onClick={handleClose}>About</NavLink>
            </Nav>
            <LoggedIn handleClose={handleClose} />
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavBar;