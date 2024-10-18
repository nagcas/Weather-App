import "./Hero.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <div className="content__hero__bg">
        <div className="content__hero">
          <h1 className="hero__title">Stay Ahead of the Weather</h1>
          <h3 className="hero__subtitle">
            Real-time forecasts and personalized weather insights at your
            fingertips
          </h3>
          <Button as={Link} to="/signup" aria-label="Sign Up" className="btn__signUp">
            Sign Up
          </Button>
        </div>
      </div>
    </>
  );
}

export default Hero;
