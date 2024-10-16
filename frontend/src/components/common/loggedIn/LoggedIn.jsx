import { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../../modules/Context";

function LoggedIn({ handleClose }) {
  const navigate = useNavigate();

  // URL backend
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  
  const { isLoggedIn, setIsLoggedIn, userLogin, setUserLogin } = useContext(Context);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');
      const storedUserLogin = localStorage.getItem('userLogin');

      // console.log('token: ',token)

      if (token) {
        try {
          // Verifica della validità del token
          const isTokenValid = true;

          if (isTokenValid) {
            setIsLoggedIn(true);

            if (storedUserLogin) {
              const parsedUserLogin = JSON.parse(storedUserLogin);
              // console.log('Stored User Login:', parsedUserLogin);
              setUserLogin(parsedUserLogin);
            };
          } else {
            // Gestione del token scaduto o non valido
            localStorage.removeItem('token');
            localStorage.removeItem('userLogin');
            setIsLoggedIn(false);
            setUserLogin(null);
            navigate('/login');
          };
        } catch (error) {
          console.error(t('loggedin.error-token'), error);
          localStorage.removeItem('token');
          localStorage.removeItem('userLogin');
          setIsLoggedIn(false);
          setUserLogin(null);
        };
      } else {
        setIsLoggedIn(false);
        setUserLogin(null);
      };
    };

    // Controlla lo stato di login all'avvio
    checkLoginStatus();

    // Aggiunge un event listener per controllare lo stato di login
    window.addEventListener('storage', checkLoginStatus);
    // Evento per il cambio di stato
    window.addEventListener('loginStateChange', checkLoginStatus);

    // Rimuove l'event listener quando il componente viene smontato e quando cambia
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('loginStateChange', checkLoginStatus);
    };
  }, [setIsLoggedIn, setUserLogin, navigate]);

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
        <div className="d-flex justify-content-center align-items-center">
          <Button as={Link} to="/login" aria-label="Button login" className="btn__login" onClick={handleClose}>Login</Button>
          <Button as={Link} to="/signUp" aria-label="Button signup" className="btn__signUp" onClick={handleClose}>Sign Up</Button>
        </div>
      ) : (
        <Button
          onClick={handleLogout}
          aria-label="Button logout"
          className='btn__logout'
        >
          Logout
        </Button>
      )}
    </>
  );
};

export default LoggedIn;