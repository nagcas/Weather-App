import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Container, FloatingLabel, Form, Alert } from "react-bootstrap";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLogin({
      ...login,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!login.email.trim()) {
      newErrors.email = "Please enter your email";
    }
    if (!login.password.trim()) {
      newErrors.password = "Please enter your password";
    }
    return newErrors;
  };

  const handleLoginSubmit = async (event) => {
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
      const response = await fetch(
        "http://localhost:5000/api/register/userlogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(login),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to login");
      }

      // Successful login
      localStorage.setItem("token", result.token);
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (error) {
      if (error.message.includes("Invalid credentials")) {
        setApiError("Invalid email or password. Please try again.");
      } else {
        setApiError("An error occurred during login. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
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

          <Form onSubmit={handleLoginSubmit}>
            <FloatingLabel
              controlId="login-email"
              label={
                errors.email ? (
                  <span className="text-danger">{errors.email}</span>
                ) : (
                  "Email"
                )
              }
              className="mb-3"
            >
              <Form.Control
                type="email"
                name="email"
                aria-label="Enter email"
                placeholder="email@example.com"
                onChange={handleInputChange}
                isInvalid={!!errors.email}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="login-password"
              label={
                errors.password ? (
                  <span className="text-danger">{errors.password}</span>
                ) : (
                  "Password"
                )
              }
            >
              <Form.Control
                type="password"
                name="password"
                aria-label="Enter password"
                placeholder="password"
                onChange={handleInputChange}
                isInvalid={!!errors.password}
              />
            </FloatingLabel>

            {apiError && (
              <Alert variant="danger" className="mt-3">
                {apiError}
              </Alert>
            )}

            <Button
              type="submit"
              className="btn__login w-75 mt-4"
              aria-label="login"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Form>

          <p className="text__signup mt-3">
            Not registered yet?{" "}
            <Link className="link__signUp" to="/signUp">
              Sign Up
            </Link>
          </p>
          <p className="text__password__forgot">
            Forgot your password?{" "}
            <Link className="link__forgot" to="/forgot-password">
              Recover
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
}

export default Login;