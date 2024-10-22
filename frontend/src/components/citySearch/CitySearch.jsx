import "./CitySearch.css";
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Image, InputGroup, Row } from "react-bootstrap";
import { Context } from "../../modules/Context";
import { formatWeatherDate } from "../../modules/useTime.js";

function CitySearch() {
  const { temperatureUnit } = useContext(Context);
  const apiKey = import.meta.env.VITE_API_WEATHER;

  // States
  const [unit, setUnit] = useState("°C");
  const [wind, setWind] = useState("meter/sec");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherDataForecast, setWeatherDataForecast] = useState(null);

  // Fetch current weather data
  const getWeatherInfo = async (city) => {
    if (!city) return;
    setLoading(true);
    setError(null);

    const URL_API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${temperatureUnit}&appid=${apiKey}`;
    try {
      const response = await fetch(URL_API);
      if (!response.ok) {
        throw new Error(`Error fetching data for ${city}`);
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather forecast data
  const getWeatherForecast = async (city) => {
    if (!city) return;
    setLoading(true);
    setError(null);

    const URL_API_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${temperatureUnit}&appid=${apiKey}`;
    try {
      const response = await fetch(URL_API_FORECAST);
      if (!response.ok) {
        throw new Error(`Error fetching forecast for ${city}`);
      }
      const dataForecast = await response.json();
      setWeatherDataForecast(dataForecast);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update unit symbol (°C or °F) when the temperature unit changes
  useEffect(() => {
    if (temperatureUnit === "imperial") {
      setUnit("°F");
      setWind("miles/hour");
    } else {
      setUnit("°C");
      setWind("meter/sec");
    }
    // If a city is already searched, re-fetch weather and forecast
    if (weatherData) {
      getWeatherInfo(weatherData.name);
      getWeatherForecast(weatherData.name);
    }
  }, [temperatureUnit, search]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Handle form submission
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const city = search.trim().toLowerCase();
    if (city) {
      Promise.all([getWeatherInfo(city), getWeatherForecast(city)])
        .then(() => {
          setSearch("");  // Clear the input field after both requests complete
        })
        .catch((error) => setError(error.message));
    }
  };

  return (
    <section className="search__section">
      <Container>
        <h2 className="title__search">City Search</h2>
        
        {/* Form to search for a city's weather data */}
        <Form onSubmit={handleSubmitSearch}>
          <InputGroup className="input__search mb-3">
            <Form.Control
              type="search"
              placeholder="example: Rome, it"
              aria-label="City Search"
              aria-describedby="search"
              value={search}
              onChange={handleSearch}
            />
            <InputGroup.Text id="search">
              <Button className="btn__search" type="submit">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup.Text>
          </InputGroup>
        </Form>

        {loading && <p>Loading...</p>}
        {error && <Alert variant="danger" className="error-message">{error}</Alert>}

        {weatherData && (
          <Card className="card__city__search">
            <Row className="d-flex justify-content-center align-items-center">
              <Col sm={12} md={6} lg={6} className="d-flex flex-column justify-content-center align-items-center p-4">
                <Card.Title className="title__search">
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    {weatherData.name} ({weatherData.sys?.country})
                    <span className="text__coord mt-4">Coord. lon. {weatherData.coord?.lon}</span>
                    <span className="text__coord">Coord. lat. {weatherData.coord?.lat}</span>
                  </div>
                  <div>
                    <span className="city__date">
                      {formatWeatherDate(weatherData.dt, weatherData.timezone)}
                    </span>
                  </div>
                </Card.Title>
                <Image
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@4x.png`}
                  alt="Weather icon"
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <Card.Body>
                  <Card.Text>
                    <span className="card__temp">{Math.floor(weatherData.main?.temp)} {unit}</span>
                  </Card.Text>
                  <Card.Text className="card__temperature">
                    <i className="bi bi-thermometer-high"></i> Temp. Max <span className="value__temp__max">{Math.floor(weatherData.main?.temp_max)} {unit}</span>
                    <br/>
                    <i className="bi bi-thermometer-low"></i> Temp. Min <span className="value__temp__min">{Math.floor(weatherData.main?.temp_min)} {unit}</span>
                  </Card.Text>
                  <Card.Text className="card__humidity">
                    <i className="bi bi-droplet"></i> Humidity: <span className="value__humidity">{weatherData.main?.humidity} %</span>
                  </Card.Text>
                  <Card.Text className="card__pressure">
                    <i className="bi bi-speedometer2"></i> Pressure: <span className="value__pressure">{weatherData.main?.pressure} hPa</span>
                  </Card.Text>
                  <Card.Text className="card__wind">
                    <i className="bi bi-wind"></i> Wind speed: <span className="value__wind__speed">{Math.floor(weatherData.wind?.speed)} {wind}</span> <br/>
                    <i className="bi bi-compass"></i> Wind deg: <span className="value__wind__deg">{Math.floor(weatherData.wind?.deg)}°</span>
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        )}

        {weatherDataForecast && weatherDataForecast.list && (
          <Row>
            {weatherDataForecast.list
              .filter((_, index) => [8, 16, 24, 32].includes(index))
              .map((forecast, index) => (
                <Col key={index} md={6} lg={3}>
                  <Card className="card__forecast">
                    <Card.Title className="forecast__title">{formatWeatherDate(forecast.dt, weatherDataForecast.city.timezone)}</Card.Title>
                    <Image src={`https://openweathermap.org/img/wn/${forecast.weather[0]?.icon}@2x.png`} />
                    <Card.Text className="forecast__temp">Temp: {Math.floor(forecast.main.temp)} {unit}</Card.Text>
                    <Card.Text className="forecast__humidity">Humidity: {forecast.main.humidity}%</Card.Text>
                    <Card.Text className="forecast__clouds">Clouds: {forecast.clouds.all}%</Card.Text>
                  </Card>
                </Col>
              ))}
          </Row>
        )}

        {weatherData && (
          <Container className="content__legend">
            <h2 className="mb-4">Weather Data Legend</h2>
            <p><span className="fw-bold">Coord. lon:</span> The geographical longitude of the location, measured in degrees, indicating the position east or west of the Prime Meridian.</p>
            <p><span className="fw-bold">Coord. lat:</span> The geographical latitude of the location, measured in degrees, indicating the position north or south of the Equator.</p>
            <p><span className="fw-bold">Temp.:</span> The current air temperature at the location. Measured in either Celsius (metric) or Fahrenheit (imperial).</p>
            <p><span className="fw-bold">Temp. Max.:</span> The maximum temperature currently observed at the location, reflecting the highest recorded temperature at the moment.</p>
            <p><span className="fw-bold">Temp. Min.:</span> The minimum temperature currently observed at the location, reflecting the lowest recorded temperature at the moment.</p>
            <p><span className="fw-bold">Pressure:</span> Atmospheric pressure at sea level, measured in hectopascals (hPa). This helps indicate weather conditions, with lower pressure suggesting potential storms.</p>
            <p><span className="fw-bold">Humidity:</span> The percentage of moisture in the air. High humidity often indicates a higher chance of precipitation or muggy conditions.</p>
            <p><span className="fw-bold">Wind speed:</span> The current speed of the wind at the location. Measured in meters per second (metric) or miles per hour (imperial).</p>
            <p><span className="fw-bold">Wind deg:</span> The direction from which the wind is coming, measured in degrees (meteorological). A degree of 0° indicates wind from the north.</p>
          </Container>
        )}
      </Container>
    </section>
  );
}

export default CitySearch;


