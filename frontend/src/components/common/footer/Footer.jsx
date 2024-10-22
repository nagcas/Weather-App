import { useContext } from "react";
import "./Footer.css";

import { Link } from 'react-router-dom';
import { Context } from "../../../modules/Context";

function Footer() {

  const { isLoggedIn } = useContext(Context);

  const currentYear = new Date().getFullYear();

  return (
    <footer>
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li className="nav__item"><Link to="/" className="nav__link px-2">Home</Link></li>
      <li className="nav__item"><Link to="/default-weather" className="nav__link px-2">Default Cities Weather</Link></li>
      <li className="nav__item"><Link to="/forecast" className="nav__link px-2">Forecast</Link></li>
      {isLoggedIn && (
        <li className="nav__item"><Link to="/favorites" className="nav__link px-2">Favorites City</Link></li>
      )}
      <li className="nav__item"><Link to="about" className="nav__link px-2">About</Link></li>
    </ul>
    <p>Created with ❤️ during <a className="link__hack" href="https://hacktoberfest.com/" target="_blank" rel="noopener noreferrer">Hacktoberfest</a> 2024</p>
    <p className="team text-center">{currentYear} Gianluca Chiaravalloti and Team</p>
  </footer>
  );
};

export default Footer;