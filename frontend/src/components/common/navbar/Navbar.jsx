import "./NavBar.css";
import { useContext, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Image,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import LoggedIn from "../loggedIn/LoggedIn";
import logo from "../../../assets/images/Weather.256.png";
import { Context } from "../../../modules/Context";

function NavBar() {

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const { isLoggedIn, setTemperatureUnit } = useContext(Context);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  // Set metric unit
  const handleChangeMetric = () => {
    // console.log("°C");
    setTemperatureUnit("metric");
    handleClose();
  }

  // Set imperial unit
  const handleChangeImperial = () => {
    // console.log("°F");
    setTemperatureUnit("imperial");
    handleClose();
  }

  return (
    <Navbar
      expand="lg"
      className="navbar-dark mb-4 fixed-top p-4 menu__navbar shadow"
    >
      <Container fluid={true}>
        {/* Logo Weather App */}
        <Navbar.Brand>
          <Link to="/" className="logo">
          <div className="d-flex justify-content-center align-items-center">
            <Image src={logo} alt="logo weather app" className="logo__image me-3" />
            Weather App
          </div>
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
              <NavLink to="/" className="menu__navbar__link nav__menu m-3" onClick={handleClose}>Home</NavLink>
              <NavLink to="/default-weather" className="menu__navbar__link nav__menu m-3" onClick={handleClose}>Default Cities Weather</NavLink>
              <NavLink to="/city-search" className="menu__navbar__link nav__menu m-3" onClick={handleClose}>City Search</NavLink>
              <NavDropdown title="Settings" id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={handleChangeMetric}>
                  Unit Metric
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleChangeImperial}>
                  Unit Imperial
                </NavDropdown.Item>
              </NavDropdown>
              {isLoggedIn && (
                <NavLink to="/favorites" className="menu__navbar__link nav__menu m-3" onClick={handleClose}>Favorites City</NavLink>
              )}
              <NavLink to="/about" className="menu__navbar__link nav__menu m-3" onClick={handleClose}>About</NavLink>
            </Nav>
            <LoggedIn handleClose={handleClose} />
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavBar;