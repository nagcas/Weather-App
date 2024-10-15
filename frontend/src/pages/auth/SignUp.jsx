import "./Auth.css";
import { useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  // States for handling errors, messages, and loading status
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [loadingClassic, setLoadingClassic] = useState(false);

  // State for sign-up data (username, email, and password)
  const [signUp, setSignUp] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Handles input changes in the sign-up form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    // Update the specific field in the signUp state
    setSignUp({
      ...signUp,
      [name]: value,
    });
    
    // Clear error messages for the specific field being changed
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Validates the sign-up form inputs
  const validate = () => {
    const newErrors = {};

    // Check if the username field is empty
    if (!signUp.username.trim()) {
      newErrors.username = "You must enter the username field!";
    }
    
    // Check if the email field is empty
    if (!signUp.email.trim()) {
      newErrors.email = "You must enter the email field!";
    }
    
    // Check if the password field is empty
    if (!signUp.password.trim()) {
      newErrors.password = "You must enter your password!";
    }
    
    return newErrors;
  };

  // Handles form submission for sign-up
  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    // Validate the form data
    const validationErrors = validate();
    
    // If there are validation errors, set them and stop the form submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear previous errors and set loading state to true for classic sign-up
    setErrors({});
    setLoadingClassic(true);

    // You can add the sign-up API request here and handle the response
  };

  // Check if a Google token is present in the URL query and handle it
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    // If a token is found, store it in localStorage and redirect to the home page
    if (token) {
      localStorage.setItem("token", token);
      
      // Dispatches an event to trigger updates in components listening to storage changes
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <Container>
    <div className="form__signUp d-flex justify-content-center align-items-center">
      <div className="content__form__signUp">
        <div className="form__content__title__signUp d-flex flex-column justify-content-center align-items-center">
          <p className="title__signUp">Sign Up</p>
        </div>
        
        {/* Sign-up form */}
        <Form onSubmit={handleSignUpSubmit}>
          {/* Username input field with error handling */}
          <FloatingLabel
            controlId="signUp-username"
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

          {/* Email input field with error handling */}
          <FloatingLabel
            controlId="signUp-email"
            label={
              errors.email ? (
                <span className="text-danger">{errors.email}</span>
              ) : (
                "Insert email"
              )
            }
            className="mb-3"
          >
            <Form.Control
              type="email"
              name="email"
              aria-label="Insert email"
              placeholder="email@example.com"
              onChange={handleInputChange}
              isInvalid={!!errors.email}
            />
          </FloatingLabel>

          {/* Password input field with error handling */}
          <FloatingLabel
            controlId="signUp-password"
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

          {/* Submit button for sign-up */}
          <Button
            type="submit"
            className="btn__login w-75 mt-4"
            aria-label="signup"
            disabled={loadingClassic}
          >
            signup
          </Button>
        </Form>

        {/* Links to login if already registered */}
        <p className="text__login mt-3">
        You are already registered{" "}
          <Link className="link__login" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  </Container>
  );
};

export default SignUp;
