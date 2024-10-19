import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";
import "./Auth.css";

function SignUp() {

  // Backend URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [signUp, setSignUp] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignUp({
      ...signUp,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!signUp.username.trim()) {
      newErrors.username = "Please enter a username";
    }
    if (!signUp.email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!/\S+@\S+\.\S+/.test(signUp.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!signUp.password.trim()) {
      newErrors.password = "Please enter a password";
    } else if (signUp.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    return newErrors;
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    setApiError(null);

    try {
      // Replace this with your actual API call
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUp),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to sign up");
      }

      // Successful signup
      navigate("/login");
    } catch (error) {
      if (error.message.includes("Username already exists")) {
        setApiError(
          "This username is already taken. Please choose a different one."
        );
      } else if (error.message.includes("Email already exists")) {
        setApiError(
          "This email is already registered. Please use a different email or try logging in."
        );
      } else {
        setApiError("Oops! Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <div className="form__signUp d-flex justify-content-center align-items-center">
        <div className="content__form__signUp">
          <div className="form__content__title__signUp d-flex flex-column justify-content-center align-items-center">
            <p className="title__signUp">Sign Up</p>
          </div>

          <Form onSubmit={handleSignUpSubmit}>
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

            {apiError && (
              <div className="alert alert-danger mt-3" role="alert">
                {apiError}
              </div>
            )}

            <Button
              type="submit"
              className="btn__login w-75 mt-4"
              aria-label="signup"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </Form>

          <p className="text__login mt-3">
            You are already registered?{" "}
            <Link className="link__login" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
}

export default SignUp;
