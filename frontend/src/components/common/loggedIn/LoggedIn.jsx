import './LoggedIn.css'
import { useContext, useEffect, useState } from 'react'
import { Button, Dropdown, DropdownButton } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../../modules/Context'

function LoggedIn({ handleClose }) {
  const navigate = useNavigate()
  const { isLoggedIn, setIsLoggedIn, userLogin, setUserLogin, temperatureUnit, setTemperatureUnit } =
    useContext(Context)
  const [token, setToken] = useState(null)

  // Backend URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992)

  // Set metric unit
  const handleChangeMetric = () => {
    // console.log("°C")
    setTemperatureUnit('metric')
    handleClose();
  }

  // Set imperial unit
  const handleChangeImperial = () => {
    // console.log("°F")
    setTemperatureUnit('imperial')
    handleClose()
  };

  useEffect(() => {
    // Function to check if the screen width is greater than or equal to 992px
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 992)
    };

    // Call it once on component mount to set the initial state
    handleResize()

    // Listen for window resize events
    window.addEventListener('resize', handleResize)

    // Cleanup the event listener when the component is unmounted
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedToken = localStorage.getItem('token')
      const storedUserLogin = localStorage.getItem('userLogin')
      // console.log("token: ", storedToken)

      if (storedToken) {
        try {
          // Check if the token is valid
          const isTokenValid = true // This should be replaced with actual validation logic

          if (isTokenValid) {
            setIsLoggedIn(true)
            setToken(storedToken)

            if (storedUserLogin) {
              const parsedUserLogin = JSON.parse(storedUserLogin)
              setUserLogin(parsedUserLogin)
            }
          } else {
            // Handle expired or invalid token
            localStorage.removeItem('token')
            localStorage.removeItem('userLogin')
            setIsLoggedIn(false)
            setUserLogin(null)
            navigate('/login')
          }
        } catch (error) {
          console.error('Error during token verification: ', error)
          localStorage.removeItem('token')
          localStorage.removeItem('userLogin')
          setIsLoggedIn(false)
          setUserLogin(null)
        }
      } else {
        // No token found, set user as logged out
        setIsLoggedIn(false)
        setUserLogin(null)
      }
    };

    // Check login status on component mount
    checkLoginStatus()

    // Add event listener to check login status on storage changes
    window.addEventListener('storage', checkLoginStatus)
    // Event listener to check login status when state changes
    window.addEventListener('loginStateChange', checkLoginStatus)

    // Remove event listeners when the component is unmounted or updated
    return () => {
      window.removeEventListener('storage', checkLoginStatus)
      window.removeEventListener('loginStateChange', checkLoginStatus)
    };
  }, [setIsLoggedIn, setUserLogin, navigate])

  // Handle user logout, clear local storage and update context state
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userLogin')
    setIsLoggedIn(false)
    setUserLogin(null)
    handleClose()
    navigate('/')
  };

  return (
    <>
      {!isLoggedIn && !userLogin ? (
        <div className='d-flex flex-column flex-lg-row justify-content-center align-items-center gap-4'>
          <Button
            as={Link}
            to='/signin'
            aria-label='Button login'
            className='btn__login'
            onClick={handleClose}
          >
            Sign In
          </Button>
          <Button
            as={Link}
            to='/signup'
            aria-label='Button signup'
            className='btn__signUp'
            onClick={handleClose}
          >
            Sign Up
          </Button>
        </div>
      ) : (
        <div className='d-flex justify-content-center align-items-center gap-3'>
          <DropdownButton
            variant='secondary'
            title='Account'
            className='dropdown__account responsive-dropdown'
            drop={isDesktop ? 'start' : 'down'}
          >
            <Dropdown.Item
              as={Link}
              onClick={handleClose}
              to='/change-password'
            >
              Change Password
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              onClick={handleClose}
              to='/favorites'
            >
              Favorites City
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              onClick={handleClose}
              to='/delete-account'
            >
              Delete Profile
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Temperature Unit</Dropdown.Header>
            <Dropdown.Item
              onClick={handleChangeMetric}
              active={temperatureUnit === 'metric'}
              disabled={temperatureUnit === 'metric'}
            >
              °C — Metric
            </Dropdown.Item>
            <Dropdown.Item
              onClick={handleChangeImperial}
              active={temperatureUnit === 'imperial'}
              disabled={temperatureUnit === 'imperial'}
            >
              °F — Imperial
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => {
                handleLogout();
                handleClose();
              }}
            >
              Logout
            </Dropdown.Item>
          </DropdownButton>
          <span className='user__logged'>
            Welcome <span className='username'>{userLogin.username}</span>
          </span>
        </div>
      )}
    </>
  );
}

export default LoggedIn;
