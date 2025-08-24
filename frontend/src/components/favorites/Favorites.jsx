import './Favorites.css'
import { Alert, Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../../modules/Context'
import InfoWeatherCity from '../infoWeatherCity/InfoWeatherCity'

function Favorites() {
  const URL_API = import.meta.env.VITE_API_URL

  const [userId, setUserId] = useState('')
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem('token')
  const { userLogin, isLoggedIn } = useContext(Context)

  useEffect(() => {
    if (userLogin && userLogin._id) {
      setUserId(userLogin._id)
    }
  }, [userLogin])

  // Fetch favorite cities
  useEffect(() => {
    const getAllFavorite = async () => {
      if (!userId) return

      setLoading(true)

      try {
        const response = await fetch(`${URL_API}/api/favorites/get-favorite-city`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        })

        const data = await response.json()
        if (data.list) {
          setFavorites(data.list)
          setLoading(false)
        }
      } catch (error) {
        console.error('Failed to fetch favorites:', error)
      }
    }

    getAllFavorite()
  }, [userId, token, URL_API])

  return (
    <section className='favorites__section'>
      <Container>
        {isLoggedIn ? (
          <>
            <h2 className='title__favorites'>Favorite Cities</h2>
            {loading ? (
              <Spinner animation='border' role='status' className='text-light p-4'>
                <span className='visually-hidden'>Loading...</span>
              </Spinner>
            ) : (
              <Row className='m-0'>
                  {favorites.length > 0 ?
                    (
                    favorites.map((city) => (
                      <Col key={city._id}>
                      <Card style={{ width: '20rem', marginBottom: '1rem', backgroundColor: '#8f9ba75b' }}>
                        <Card.Body>
                          <Card.Title className='text-light'>{city.cityName}</Card.Title>
                          <Card.Subtitle className='mb-2 text-light'>{city.country}</Card.Subtitle>
                          <Card.Text>ID: {city.cityId}</Card.Text>
                          <InfoWeatherCity city={city} />
                        </Card.Body>
                      </Card>
                    </Col>
                    ))
                  ) : (
                    <Alert variant='warning' className='text-center'>No favorites found</Alert>
                  )}
              </Row>
            )}
          </>
        ) : (
          <Alert variant='warning' className='text-center'>
            Oops! You need to log in to see this page
          </Alert>
        )}
      </Container>
    </section>
  )
}

export default Favorites

