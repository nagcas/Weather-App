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
    <p>Created with ❤️ during <a className="link__hack" href="https://hacktoberfest.com/" target="_blank" rel="noopener noreferrer">Hacktoberfest</a> 2024</p>
    <p className="text-center text-body-secondary">{currentYear} Gianluca Chiaravalloti and Team</p>
  </footer>
  );
};

export default Footer;