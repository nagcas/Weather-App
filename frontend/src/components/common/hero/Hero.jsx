import "./Hero.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../../../modules/Context";
import { useContext } from "react";

function Hero() {

  const { isLoggedIn } = useContext(Context);
  
  return (
    <>
      <div className="content__hero__bg">
        <div className="content__hero">
          <h1 className="hero__title">Stay Ahead of the Weather</h1>
          <h3 className="hero__subtitle">
            Real-time forecasts and personalized weather insights at your
            fingertips
          </h3>
          {isLoggedIn ? (
            <Button as={Link} to="/favorites" aria-label="Sign Up" className="btn__hero">
            Favorites City
            </Button>
          ) : (
            <Button as={Link} to="/signup" aria-label="Sign Up" className="btn__hero">
              Sign Up
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default Hero;
