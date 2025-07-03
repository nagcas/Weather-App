import './LoggedIn.css';
import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../../modules/Context';

function LoggedIn({ handleClose }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  // Backend URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const { isLoggedIn, setIsLoggedIn, userLogin, setUserLogin } =
    useContext(Context);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUserLogin = localStorage.getItem('userLogin');
      // console.log("token: ", storedToken);

      if (storedToken) {
        try {
          // Check if the token is valid
          const isTokenValid = true; // This should be replaced with actual validation logic

          if (isTokenValid) {
            setIsLoggedIn(true);
            setToken(storedToken);

            if (storedUserLogin) {
              const parsedUserLogin = JSON.parse(storedUserLogin);
              setUserLogin(parsedUserLogin);
            }
          } else {
            // Handle expired or invalid token
            localStorage.removeItem('token');
            localStorage.removeItem('userLogin');
            setIsLoggedIn(false);
            setUserLogin(null);
            navigate('/login');
          }
        } catch (error) {
          console.error('Error during token verification: ', error);
          localStorage.removeItem('token');
          localStorage.removeItem('userLogin');
          setIsLoggedIn(false);
          setUserLogin(null);
        }
      } else {
        // No token found, set user as logged out
        setIsLoggedIn(false);
        setUserLogin(null);
      }
    };

    // Check login status on component mount
    checkLoginStatus();

    // Add event listener to check login status on storage changes
    window.addEventListener('storage', checkLoginStatus);
    // Event listener to check login status when state changes
    window.addEventListener('loginStateChange', checkLoginStatus);

    // Remove event listeners when the component is unmounted or updated
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('loginStateChange', checkLoginStatus);
    };
  }, [setIsLoggedIn, setUserLogin, navigate]);

  // Handle user logout, clear local storage and update context state
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userLogin');
    setIsLoggedIn(false);
    setUserLogin(null);
    handleClose();
    navigate('/');
  };

  return (
    <>
      {!isLoggedIn && !userLogin ? (
        <div className='d-flex justify-content-center align-items-center'>
          <Button
            as={Link}
            to='/login'
            aria-label='Button login'
            className='btn__login'
            onClick={handleClose}
          >
            Login
          </Button>
          <Button
            as={Link}
            to='/signUp'
            aria-label='Button signup'
            className='btn__signUp'
            onClick={handleClose}
          >
            Sign Up
          </Button>
        </div>
      ) : (
        <div className='d-flex justify-content-center align-items-center'>
          <p className='user__logged m-0 me-3'>
            Welcome <span className='username'>{userLogin.username}</span>
          </p>
          <Button
            onClick={handleLogout}
            aria-label='Button logout'
            className='btn__logout'
          >
            Logout
          </Button>
        </div>
      )}
    </>
  );
}

export default LoggedIn;
