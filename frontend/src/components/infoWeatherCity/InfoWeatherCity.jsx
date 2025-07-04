import './InfoWratherCity.css';
import { useContext, useEffect, useState } from 'react';
import { Button, Col, Modal, Row, Card, Image } from 'react-bootstrap';
import { formatWeatherDate } from '../../modules/useTime';
import { Context } from '../../modules/Context';

function InfoWeatherCity({ city }) {
  const URL_API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const { temperatureUnit } = useContext(Context);

  const [weatherData, setWeatherData] = useState(null);
  const [show, setShow] = useState(false);

  const getUnitsFromAPIParam = (unitParam) => {
    switch (unitParam) {
      case 'imperial':
        return { temp: '°F', wind: 'mph' };
      case 'metric':
      default:
        return { temp: '°C', wind: 'm/s' };
    }
  };

  const { temp: tempUnit, wind: windUnit } = getUnitsFromAPIParam(temperatureUnit);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!city?.cityId) return;

    const handleWeatherCity = async () => {
      try {
        const response = await fetch(
          `${URL_API}/api/favorites/weather-favorite-city/${city.cityId}/${temperatureUnit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();
        setWeatherData(data.city);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };

    handleWeatherCity();
  }, [city, temperatureUnit]); // temperatureUnit aggiunto nelle dipendenze

  const formatTime = (timestamp, timezoneOffset) => {
    const date = new Date((timestamp + timezoneOffset) * 1000);
    return date.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <Button className="btn__info" onClick={handleShow}>
        Info weather
      </Button>

      <Modal size="lg" show={show} onHide={handleClose} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Weather Info - {weatherData?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {weatherData ? (
            <Row>
              <Col className="mb-4">
                <Card className="card__city__info">
                  <Image
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@4x.png`}
                    alt="Weather icon"
                    className="weather-icon"
                  />
                  <Card.Body>
                    <Card.Text className="city__date">
                      {formatWeatherDate(weatherData.dt, weatherData.timezone)}
                    </Card.Text>
                    <Card.Title className="card__title">
                      {weatherData.name}, {weatherData.sys?.country}
                    </Card.Title>
                    <Card.Text><strong>{weatherData.weather[0]?.description}</strong></Card.Text>
                    <Card.Text><strong>Temperature:</strong> {Math.round(weatherData.main?.temp)} {tempUnit}</Card.Text>
                    <Card.Text><strong>Feels like:</strong> {Math.round(weatherData.main?.feels_like)} {tempUnit}</Card.Text>
                    <Card.Text><strong>Min/Max:</strong> {Math.round(weatherData.main?.temp_min)} / {Math.round(weatherData.main?.temp_max)} {tempUnit}</Card.Text>
                    <Card.Text><strong>Humidity:</strong> {weatherData.main?.humidity}%</Card.Text>
                    <Card.Text><strong>Pressure:</strong> {weatherData.main?.pressure} hPa</Card.Text>
                    <Card.Text><strong>Cloudiness:</strong> {weatherData.clouds?.all}%</Card.Text>
                    <Card.Text><strong>Wind:</strong> {Math.round(weatherData.wind?.speed)} {windUnit}, {weatherData.wind?.deg}°</Card.Text>
                    <Card.Text><strong>Sunrise:</strong> {formatTime(weatherData.sys?.sunrise, weatherData.timezone)}</Card.Text>
                    <Card.Text><strong>Sunset:</strong> {formatTime(weatherData.sys?.sunset, weatherData.timezone)}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            <p>Caricamento dati meteo...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} className="btn__close">
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InfoWeatherCity;

