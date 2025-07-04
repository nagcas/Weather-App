import './Favorites.css';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../modules/Context';

function Favorites() {
  const URL_API = import.meta.env.VITE_API_URL;

  const [userId, setUserId] = useState('');
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');
  const { userLogin, isLoggedIn } = useContext(Context);

  useEffect(() => {
    if (userLogin && userLogin._id) {
      setUserId(userLogin._id);
    }
  }, [userLogin]);

  // Fetch favorite cities
  useEffect(() => {
    const getAllFavorite = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`${URL_API}/api/favorites/get-favorite-city`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });

        const data = await response.json();
        if (data.list) {
          setFavorites(data.list);
        }
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    getAllFavorite();
  }, [userId, token, URL_API]);

  return (
    <section className='favorites__section'>
      <Container>
        {isLoggedIn ? (
          <>
            <h2 className='title__favorites'>Favorite Cities</h2>
            <Row>
                {favorites.length === 0 ? (
                  <p>No favorites found</p>
                ) : (
                  favorites.map((city) => (
                    <Col key={city._id}>
                    <Card style={{ width: '18rem', marginBottom: '1rem' }}>
                      <Card.Body>
                        <Card.Title>{city.cityName}</Card.Title>
                        <Card.Subtitle className='mb-2 text-muted'>{city.country}</Card.Subtitle>
                        <Card.Text>ID: {city.cityId}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  ))
                )}
            </Row>
          </>
        ) : (
          <Alert variant='warning' className='text-center'>
            Oops! You need to log in to see this page
          </Alert>
        )}
      </Container>
    </section>
  );
}

export default Favorites;

