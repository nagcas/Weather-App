import { Card, Col, Image, Row } from 'react-bootstrap';
import { formatWeatherDate } from '../../modules/useTime.js';

function CardsForecast({ weatherDataForecast, unit }) {
  return (
    <Row>
      {weatherDataForecast.list
        .filter((_, index) => [8, 16, 24, 32].includes(index))
        .map((forecast, index) => (
          <Col
            key={index}
            md={6}
            lg={3}
          >
            <Card className='card__forecast'>
              <Card.Title className='forecast__title'>
                {formatWeatherDate(
                  forecast.dt,
                  weatherDataForecast.city.timezone
                )}
              </Card.Title>
              <Image
                src={`https://openweathermap.org/img/wn/${forecast.weather[0]?.icon}@2x.png`}
              />
              <Card.Text className='forecast__temp'>
                Temp: {Math.floor(forecast.main.temp)} {unit}
              </Card.Text>
              <Card.Text className='forecast__humidity'>
                Humidity: {forecast.main.humidity}%
              </Card.Text>
              <Card.Text className='forecast__clouds'>
                Clouds: {forecast.clouds.all}%
              </Card.Text>
            </Card>
          </Col>
        ))}
    </Row>
  );
}

export default CardsForecast;
