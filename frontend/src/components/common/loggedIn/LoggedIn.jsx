import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function LoggedIn({ handleClose }) {

  handleClose();

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Button as={Link} to="/login" className="btn__login" onClick={handleClose}>Login</Button>
      <Button as={Link} to="/signUp" className="btn__signUp" onClick={handleClose}>Sign Up</Button>
    </div>
  );
};

export default LoggedIn;