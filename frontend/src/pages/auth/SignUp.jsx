import './Auth.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import Loading from '../../components/loading/Loading';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function SignUp() {
  // Backend URL, using environment variable or fallback to localhost
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // useNavigate is used for navigation to other routes
  const navigate = useNavigate();

  // State to show password
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  // States to manage errors, loading state, API error, and user input for sign-up
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [signUp, setSignUp] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Handles input changes and clears errors for the current input field
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignUp({
      ...signUp,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  // Validation function to check user inputs
  const validate = () => {
    const newErrors = {};
    if (!signUp.username.trim()) {
      newErrors.username = 'Please enter a username';
    }
    if (!signUp.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(signUp.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!signUp.password.trim()) {
      newErrors.password = 'Please enter a password';
    } else if (signUp.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    return newErrors;
  };

  // Handles form submission for sign-up
  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    // Perform validation before submitting
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Reset errors and start loading state
    setErrors({});
    setIsLoading(true);
    setApiError(null);

    try {
      // Making a POST request to the backend to create a new user
      const response = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUp),
      });

      const result = await response.json();

      // Handle non-success responses from the API
      if (!response.ok) {
        throw new Error(result.message || 'Failed to sign up');
      }

      // Successful sign-up, navigate to login page
      navigate('/login');
    } catch (error) {
      // Handle API errors based on the message from the backend
      if (error.message.includes('Username already exists')) {
        setApiError(
          'This username is already taken. Please choose a different one.'
        );
      } else if (error.message.includes('Email already exists')) {
        setApiError(
          'This email is already registered. Please use a different email or try logging in.'
        );
      } else {
        setApiError('Oops! Something went wrong. Please try again later.');
      }
    } finally {
      // Stop the loading state once the process is complete
      setIsLoading(false);
    }
  };

  return (
    <Container className='d-flex justify-content-center align-items-center p-5'>
      <div className='form__signUp d-flex justify-content-center align-items-center'>
        <div className='content__form__signUp'>
          <div className='form__content__title__signUp d-flex flex-column justify-content-center align-items-center'>
            <p className='title__signUp'>Sign Up</p>
          </div>

          {/* Sign Up form with input fields for username, email, and password */}
          <Form onSubmit={handleSignUpSubmit}>
            <FloatingLabel
              controlId='signUp-username'
              label={
                errors.username ? (
                  <span className='text-danger'>{errors.username}</span>
                ) : (
                  'Username'
                )
              }
              className='mb-3'
            >
              <Form.Control
                type='text'
                name='username'
                aria-label='Username'
                placeholder='username'
                onChange={handleInputChange}
                isInvalid={!!errors.username}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId='signUp-email'
              label={
                errors.email ? (
                  <span className='text-danger'>{errors.email}</span>
                ) : (
                  'Email'
                )
              }
              className='mb-3'
            >
              <Form.Control
                type='email'
                name='email'
                aria-label='Email'
                placeholder='email@example.com'
                onChange={handleInputChange}
                isInvalid={!!errors.email}
              />
            </FloatingLabel>

            <FloatingLabel
              className='mb-3 position-relative'
              controlId='signUp-password'
              label={
                errors.password ? (
                  <span className='text-danger'>{errors.password}</span>
                ) : (
                  'Password'
                )
              }
            >
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name='password'
                aria-label='Password'
                placeholder='password'
                onChange={handleInputChange}
                isInvalid={!!errors.password}
              />
              <Button
                variant='light'
                className='position-absolute top-50 end-0 translate-middle-y me-2 d-flex align-items-center justify-content-center'
                onClick={togglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </FloatingLabel>

            {/* Display API error message if there's one */}
            {apiError && (
              <div
                className='alert alert-danger mt-3'
                role='alert'
              >
                {apiError}
              </div>
            )}

            {/* Submit button with loading state */}
            <Button
              type='submit'
              className='btn__login w-75 mt-4'
              aria-label='signup'
              disabled={isLoading}
            >
              {isLoading ? <Loading dimension='sm' /> : 'Sign Up'}
            </Button>
          </Form>

          {/* Link to navigate to the login page if already registered */}
          <p className='text__login mt-3'>
            You are already registered?{' '}
            <Link
              className='link__login'
              to='/signin'
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
}

export default SignUp;
