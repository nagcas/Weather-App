import { useState } from 'react';
import { Context } from './Context.jsx';

// AuthProvider component that provides authentication state and user to child components
export const AuthProvider = ({ children }) => {

  // State to store user/login details
  const [userLogin, setUserLogin] = useState({});
  // State to manage whether the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    // Context provider that makes values available to other components
    <Context.Provider value={
      { 
        userLogin,  // Details of the currently logged-in user
        setUserLogin,  // Function to update user details
        isLoggedIn,  // State indicating if the user is logged in
        setIsLoggedIn  // Function to update the user's login state
      }
    }>
      {children}
    </Context.Provider>
  );
};
