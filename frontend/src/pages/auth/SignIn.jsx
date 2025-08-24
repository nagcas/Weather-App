import './Auth.css';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Button, Container, FloatingLabel, Form, Alert } from 'react-bootstrap';
import { Context } from '../../modules/Context';
import Loading from '../../components/loading/Loading';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  // useNavigate is used for programmatic navigation after login
  const navigate = useNavigate();

  // useLocation is used to capture the current location or any query parameters
  const location = useLocation();

  // useContext is used to manage global login state
  const { isLoggedIn, setIsLoggedIn, setUserLogin } = useContext(Context);

  // Backend URL for the API, can be set via environment variable or defaults to localhost
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // State to manage form validation errors
  const [errors, setErrors] = useState({});

  // State to show password
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  // State to manage API-related errors during login
  const [apiError, setApiError] = useState(null);

  // State to indicate loading status while submitting login
  const [isLoading, setIsLoading] = useState(false);

  // State for storing user login details (email and password)
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  // Handle changes in form inputs and reset validation errors for the field being updated
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLogin({
      ...login,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  // Validate login form inputs before submission
  const validate = () => {
    const newErrors = {};
    if (!login.email.trim()) {
      newErrors.email = 'Please enter your email!';
    }
    if (!login.password.trim()) {
      newErrors.password = 'Please enter your password!';
    }
    return newErrors;
  };

  // Handle form submission for user login
  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields and set errors if any
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear previous errors and set loading state
    setErrors({});
    setIsLoading(true);
    setApiError(null);

    try {
      // Send POST request to the login API with user credentials
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(login),
      });

      const result = await response.json();

      // Check if the response is successful otherwise, throw an error
      if (!response.ok) {
        throw new Error(result.message || 'Failed to login!');
      }

      // Successful login: store user data and token in localStorage
      setIsLoading(result);
      localStorage.setItem('userLogin', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);

      // Dispatch a storage event to notify other tabs of the login state
      window.dispatchEvent(new Event('storage'));

      // Redirect to the homepage after login
      navigate('/');
    } catch (error) {
      // Set appropriate error message based on the type of error
      if (error.message.includes('Invalid credentials!')) {
        setApiError('Invalid email or password. Please try again!');
      } else {
        setApiError('An error occurred during login. Please try again later!');
      }
    } finally {
      // Stop the loading state after completion
      setIsLoading(false);
    }
  };

  // Effect to handle login using a token passed in the URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    // If a token is found, store it in localStorage and redirect to the homepage
    if (token) {
      localStorage.setItem('token', token);
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    }
  }, [location, navigate]);

  return (
    <Container className='d-flex justify-content-center align-items-center p-5'>
      {!isLoggedIn ? ( // If the user is not logged in, show the login form
        <div className='form__login d-flex justify-content-center align-items-center'>
          <div className='content__form__login'>
            <div className='form__content__title__login d-flex flex-column justify-content-center align-items-center'>
              <p className='title__login'>Sign In</p>
            </div>

            {/* Form to handle user login */}
            <Form onSubmit={handleLoginSubmit}>
              {/* Email input field with floating label */}
              <FloatingLabel
                controlId='login-email'
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
                  isInvalid={!!errors.email} // Show validation error if present
                />
              </FloatingLabel>

              {/* Password input field with floating label */}
              <FloatingLabel
                className='mb-3 position-relative'
                controlId='login-password'
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
                  isInvalid={!!errors.password} // Show validation error if present
                />
                <Button
                  variant='light'
                  className='position-absolute top-50 end-0 translate-middle-y me-2 d-flex align-items-center justify-content-center'
                  onClick={togglePassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </FloatingLabel>

              {/* Display API error message if login fails */}
              {apiError && (
                <Alert
                  variant='danger'
                  className='mt-3'
                >
                  {apiError}
                </Alert>
              )}

              {/* Submit button for login */}
              <Button
                type='submit'
                className='btn__login w-75 mt-4'
                aria-label='signin'
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? <Loading dimension='sm' /> : 'Sign In'}
              </Button>
            </Form>

            {/* Links to sign up or recover password */}
            <p className='text__signup mt-3'>
              Not registered yet?{' '}
              <Link
                className='link__signUp'
                to='/signup'
              >
                Sign Up
              </Link>
            </p>
            <p className='text__password__forgot'>
              Forgot your password?{' '}
              <Link
                className='link__forgot'
                to='/forgot-password'
              >
                Recover
              </Link>
            </p>
          </div>
        </div>
      ) : (
        // If the user is logged in, redirect to homepage
        <Navigate
          to='/'
          replace={true}
        />
      )}
    </Container>
  );
}

export default Login;
