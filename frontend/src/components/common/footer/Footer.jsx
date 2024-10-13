import "./Footer.css";

import { Link } from 'react-router-dom';

function Footer() {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-3 my-4">
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li className="nav__item"><Link to="/" className="nav__link px-2 text-body-secondary">Home</Link></li>
      <li className="nav__item"><Link to="/current-weather" className="nav__link px-2 text-body-secondary">Current Weather</Link></li>
      <li className="nav__item"><Link to="/forecast" className="nav__link px-2 text-body-secondary">Forecast</Link></li>
      <li className="nav__item"><Link to="/favorites" className="nav__link px-2 text-body-secondary">Favorites</Link></li>
      <li className="nav__item"><Link to="about" className="nav__link px-2 text-body-secondary">About</Link></li>
    </ul>
    <p className="text-center text-body-secondary">© {currentYear} Weather App</p>
  </footer>
  );
};

export default Footer;