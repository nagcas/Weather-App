import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { useEffect, useState } from "react";

function Login() {
  const navigate = useNavigate();

  // States for handling errors, messages, and loading status
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [loadingClassic, setLoadingClassic] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  // State for login data (username and password)
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  // Handles input changes in the login form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    // Update the specific field in the login state
    setLogin({
      ...login,
      [name]: value,
    });
    
    // Clear error messages for the specific field being changed
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Validates the login form inputs
  const validate = () => {
    const newErrors = {};
    
    // Check if the username field is empty
    if (!login.username.trim()) {
      newErrors.username = "You must enter the username field!";
    }

    // Check if the password field is empty
    if (!login.password.trim()) {
      newErrors.password = "You must enter your password!";
    }
    
    return newErrors;
  };

  // Handles form submission for login
  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    // Validate the form data
    const validationErrors = validate();
    
    // If there are validation errors, set them and stop the form submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear previous errors and set loading state to true for classic login
    setErrors({});
    setLoadingClassic(true);

    // You can add the login API request here and handle the response
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    // If a token is found, store it in localStorage and redirect to the profile page
    if (token) {
      localStorage.setItem("token", token);
      
      // Dispatches an event to trigger updates in components listening to storage changes
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <Container>
      <div className="form__login d-flex justify-content-center align-items-center">
        <div className="content__form__login">
          <div className="form__content__title__login d-flex flex-column justify-content-center align-items-center">
            <p className="title__login">Login</p>
          </div>
          
          {/* Login form */}
          <Form onSubmit={handleLoginSubmit}>
            {/* Username input field with error handling */}
            <FloatingLabel
              controlId="login-username"
              label={
                errors.username ? (
                  <span className="text-danger">{errors.username}</span>
                ) : (
                  "Insert username"
                )
              }
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="username"
                aria-label="Insert username"
                placeholder="username"
                onChange={handleInputChange}
                isInvalid={!!errors.username}
              />
            </FloatingLabel>

            {/* Password input field with error handling */}
            <FloatingLabel
              controlId="login-password"
              label={
                errors.password ? (
                  <span className="text-danger">{errors.password}</span>
                ) : (
                  "Insert password"
                )
              }
            >
              <Form.Control
                type="password"
                name="password"
                aria-label="Insert password"
                placeholder="password"
                onChange={handleInputChange}
                isInvalid={!!errors.password}
              />
            </FloatingLabel>

            {/* Submit button for login */}
            <Button
              type="submit"
              className="btn__login w-75 mt-4"
              aria-label="login"
              disabled={loadingClassic}
            >
              login
            </Button>
          </Form>

          {/* Links to sign up or recover forgotten password */}
          <p className="text__signup mt-3">
            You are not registered{" "}
            <Link className="link__signUp" to="/signUp">
              Sign Up
            </Link>
          </p>
          <p className="text__password__forgot">
            Forgotten password{" "}
            <Link className="link__forgot" to="/forgot-password">
              recover
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
}

export default Login;

