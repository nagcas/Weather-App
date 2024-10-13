import "./NavBar.css";
import { useState } from "react";
import {
  Container,
  Dropdown,
  Image,
  Nav,
  Navbar,
  NavLink,
  Offcanvas,
} from "react-bootstrap";

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
          Weather App        
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
          placement="start"
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
              <NavLink>Home</NavLink>
              <NavLink>Current Weather</NavLink>
              <NavLink>Forecast</NavLink>
              <NavLink>Settings</NavLink>
              <NavLink>About</NavLink>
              <NavLink>Login</NavLink>
              <NavLink>Sign Up</NavLink>
            </Nav>
            <div className="d-flex justify-content-center align-items-center">
              <a
                href="https://github.com/nagcas"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-github icons__social me-4"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/gianluca-chiaravalloti-5694081a2/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-linkedin icons__social"></i>
              </a>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavBar;