import './WeatherApi.css';
import { useState, useEffect, useContext } from 'react';
import { Card, Col, Container, Row, Image } from 'react-bootstrap';
import { Context } from '../../modules/Context';
import { formatWeatherDate } from '../../modules/useTime';

function WeatherApi() {
  // Retrieve the temperature unit from the global context (imperial or metric)
  const { temperatureUnit } = useContext(Context);

  // State to store the unit symbol (°C or °F)
  const [unit, setUnit] = useState('°C');
  // State to stare the unit (meter/sec, miles/hour)
  const [wind, setWind] = useState('meter/sec');

  // Update unit symbol (°C or °F) when the temperature unit changes
  useEffect(() => {
    if (temperatureUnit === 'imperial') {
      setUnit('°F');
      setWind('miles/hour');
    } else {
      setUnit('°C');
      setWind('meter/sec');
    }
  }, [temperatureUnit]);

  // Retrieve the weather API key from environment variables
  const apiKey = import.meta.env.VITE_API_WEATHER;

  // Array of cities for which weather data will be fetched
  const cities = ['Milano', 'Venezia', 'Roma', 'Catania'];

  // State variables to manage weather data, loading status, and error messages
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Asynchronous function to fetch weather data for a single city
    const fetchWeather = async (city) => {
      try {
        // Construct the API URL with the specified city and API key
        const URL_API = `https://api.openweathermap.org/data/2.5/weather?q=${city},IT&units=${temperatureUnit}&appid=${apiKey}`;
        const response = await fetch(URL_API);

        // Check if the response is successful; if not, throw an error
        if (!response.ok) {
          throw new Error(`Error fetching data for ${city}`);
        }

        // Parse the JSON response to extract weather data
        const data = await response.json();
        return { city, data }; // Return an object containing the city and its weather data
      } catch (error) {
        // In case of an error, return the city along with the error message
        return { city, error: error.message };
      }
    };

    // Asynchronous function to fetch weather data for all cities
    const fetchAllWeather = async () => {
      setLoading(true); // Set loading state to true
      setError(null); // Reset any previous errors
      try {
        // Use Promise.all to fetch weather data for all cities concurrently
        const allWeatherData = await Promise.all(
          cities.map((city) => fetchWeather(city))
        );
        setWeatherData(allWeatherData); // Update state with the fetched weather data for all cities
      } catch (err) {
        // If an error occurs, set the error state
        setError(err.message);
      } finally {
        // Set loading state to false once data fetching is complete
        setLoading(false);
      }
    };

    // Initial call to fetch weather data for all specified cities
    fetchAllWeather();
  }, [apiKey, temperatureUnit]); // Dependency array ensures the effect runs when apiKey changes

  return (
    <Container className='mt-4'>
      {error && <p>Error: {error}</p>} {/* Display error message if present */}
      {loading && <p>Loading...</p>}{' '}
      {/* Display loading message while fetching data */}
      <Row>
        {weatherData.map(({ city, data, error }, index) => (
          <Col
            key={index}
            sm={12}
            md={6}
            lg={3}
            className='mb-4'
          >
            <Card className='card__city'>
              {error && (
                <p>
                  Error loading {city}: {error}
                </p>
              )}{' '}
              {/* Display error message for individual cities */}
              {!error && data && (
                <>
                  <Image
                    src={`https://openweathermap.org/img/wn/${data.weather[0]?.icon}@4x.png`}
                    alt='Weather icon'
                    className='card-img-top'
                  />
                  <Card.Body>
                    <Card.Text className='city__date'>
                      {formatWeatherDate(data.dt, data.timezone)}
                    </Card.Text>
                    <Card.Title className='card__title'>{city}</Card.Title>
                    <Card.Text>
                      <span className='card__temp'>
                        {Math.floor(data.main?.temp)} {unit}
                      </span>
                    </Card.Text>
                    <Card.Text>
                      <span className='card__humidity'>
                        <i className='bi bi-droplet'></i> Humidity:{' '}
                        {data.main?.humidity} %
                      </span>
                    </Card.Text>
                    <Card.Text>
                      <span className='card__wind'>
                        <i className='bi bi-wind'></i> Wind:{' '}
                        {Math.floor(data.wind?.speed)} {wind}
                      </span>
                    </Card.Text>
                  </Card.Body>
                </>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default WeatherApi;
