import { useState } from 'react';
import { Context } from './Context.jsx';

// AuthProvider component that provides authentication state and user to child components
const AuthProvider = ({ children }) => {

  // State to store user/login details
  const [userLogin, setUserLogin] = useState({});
  // State to manage whether the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // State of the temperature setting
  const [temperatureUnit, setTemperatureUnit] = useState("metric");

  return (
    // Context provider that makes values available to other components
    <Context.Provider value={
      { 
        userLogin,  // Details of the currently logged-in user
        setUserLogin,  // Function to update user details
        isLoggedIn,  // State indicating if the user is logged in
        setIsLoggedIn,  // Function to update the user's login state
        temperatureUnit, // State temperature metric
        setTemperatureUnit // Function to update temperature metric
      }
    }>
      {children}
    </Context.Provider>
  );
};

export default AuthProvider;
