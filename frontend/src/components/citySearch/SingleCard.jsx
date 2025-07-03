import { Card, Col, Image, Row } from 'react-bootstrap';
import { formatWeatherDate } from '../../modules/useTime.js';

function SingleCard({ weatherData, unit, wind }) {
  return (
    <Card className='card__city__search'>
      <Row className='d-flex justify-content-center align-items-center'>
        <Col
          sm={12}
          md={6}
          lg={6}
          className='d-flex flex-column justify-content-center align-items-center p-4'
        >
          <Card.Title className='title__search'>
            <div className='d-flex flex-column justify-content-center align-items-center'>
              {weatherData.name} ({weatherData.sys?.country})
              <span className='text__coord mt-4'>
                Coord. lon. {weatherData.coord?.lon}
              </span>
              <span className='text__coord'>
                Coord. lat. {weatherData.coord?.lat}
              </span>
            </div>
            <div>
              <span className='city__date'>
                {formatWeatherDate(weatherData.dt, weatherData.timezone)}
              </span>
            </div>
          </Card.Title>
          <Image
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@4x.png`}
            alt='Weather icon'
          />
        </Col>
        <Col
          sm={12}
          md={6}
          lg={6}
        >
          <Card.Body>
            <Card.Text>
              <span className='card__temp'>
                {Math.floor(weatherData.main?.temp)} {unit}
              </span>
            </Card.Text>
            <Card.Text className='card__temperature'>
              <i className='bi bi-thermometer-high'></i> Temp. Max{' '}
              <span className='value__temp__max'>
                {Math.floor(weatherData.main?.temp_max)} {unit}
              </span>
              <br />
              <i className='bi bi-thermometer-low'></i> Temp. Min{' '}
              <span className='value__temp__min'>
                {Math.floor(weatherData.main?.temp_min)} {unit}
              </span>
            </Card.Text>
            <Card.Text className='card__humidity'>
              <i className='bi bi-droplet'></i> Humidity:{' '}
              <span className='value__humidity'>
                {weatherData.main?.humidity} %
              </span>
            </Card.Text>
            <Card.Text className='card__pressure'>
              <i className='bi bi-speedometer2'></i> Pressure:{' '}
              <span className='value__pressure'>
                {weatherData.main?.pressure} hPa
              </span>
            </Card.Text>
            <Card.Text className='card__wind'>
              <i className='bi bi-wind'></i> Wind speed:{' '}
              <span className='value__wind__speed'>
                {Math.floor(weatherData.wind?.speed)} {wind}
              </span>{' '}
              <br />
              <i className='bi bi-compass'></i> Wind deg:{' '}
              <span className='value__wind__deg'>
                {Math.floor(weatherData.wind?.deg)}°
              </span>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default SingleCard;
