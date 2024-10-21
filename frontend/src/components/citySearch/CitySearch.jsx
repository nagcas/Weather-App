import "./CitySearch.css";
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Image, InputGroup, Row } from "react-bootstrap";
import { Context } from "../../modules/Context";

function CitySearch() {
  // Retrieve the temperature unit from the global context (imperial or metric)
  const { temperatureUnit } = useContext(Context);

  // Retrieve the weather API key from environment variables
  const apiKey = import.meta.env.VITE_API_WEATHER;

  // State to store the unit symbol (°C or °F)
  const [unit, setUnit] = useState("°C");
  // State to stare the unit (meter/sec, miles/hour)
  const [wind, setWind] = useState("meter/sec");

  // Update unit symbol (°C or °F) when the temperature unit changes
  useEffect(() => {
    if (temperatureUnit === "imperial") {
      setUnit("°F");
      setWind("miles/hour");
    } else {
      setUnit("°C");
      setWind("meter/sec")
    }
  }, [temperatureUnit]);

  // State to manage the search input, loading status, error messages, and fetched weather data
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  // Fetch weather data from the OpenWeather API based on the city name entered by the user
  const getWeatherInfo = async (search) => {
    setLoading(true);  // Set loading status to true while fetching data
    setError(null);    // Clear any previous errors

    const URL_API = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=${temperatureUnit}&appid=${apiKey}`;
    try {
      const response = await fetch(URL_API); // Fetch weather data from API
      if (!response.ok) {
        throw new Error(`Error fetching data for ${search}`); // Throw an error if request fails
      }

      // Parse the response as JSON and store it in the weatherData state
      const data = await response.json();
      setWeatherData(data);
      console.log(data); // Log the data for debugging purposes
    } catch (error) {
      setError(error.message); // Set the error message in case of failure
    } finally {
      setLoading(false); // Stop the loading spinner after data is fetched
    }
  };

  // Update the search state when the user types in the input field
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Handle form submission to trigger the weather search
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (search.trim().toLowerCase()) {
      getWeatherInfo(search);  // Fetch the weather information for the entered city
      setSearch("");           // Clear the input field after submitting
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
              placeholder="example: Rome, it"  // Placeholder to guide users on input format
              aria-label="City Search"
              aria-describedby="search"
              value={search}  // Bind input value to search state
              onChange={handleSearch}  // Update search state on user input
            />
            <InputGroup.Text id="search">
              <Button className="btn__search" type="submit">
                <i className="bi bi-search"></i>  {/* Search icon for visual indication */}
              </Button>
            </InputGroup.Text>
          </InputGroup>
        </Form>

        {/* Display loading message when data is being fetched */}
        {loading && <p>Loading...</p>}

        {/* Display error message if the API request fails */}
        {error && <Alert variant="danger" className="error-message">{error}</Alert>}
        
        {/* Display the weather data if it exists */}
        {weatherData && (
          <Card className="card__city__search">
            <Row className="d-flex justify-content-center align-items-center">
              {/* Weather data with city name, country, and coordinates */}
              <Col sm={12} md={6} lg={6} className="d-flex flex-column justify-content-center align-items-center p-4">
                <Card.Title className="title__search">
                  {weatherData.name} ({weatherData.sys?.country})
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <span className="text__coord">Coord. lon. {weatherData.coord?.lon}</span>
                    <span className="text__coord">Coord. lat. {weatherData.coord?.lat}</span>
                  </div>
                </Card.Title>
                {/* Weather icon */}
                <Image
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@4x.png`}
                  alt="Weather icon"
                />
              </Col>

              {/* Weather data details like temperature, humidity, pressure, and wind */}
              <Col sm={12} md={6} lg={6}>
                <Card.Body>
                  <Card.Text>
                    <span className="card__temp">{Math.floor(weatherData.main?.temp)} {unit}</span> {/* Display temperature */}
                  </Card.Text>
                  <Card.Text className="card__temperature">
                    <i class="bi bi-thermometer-high"></i>Temp. Max <span className="value__temp__max">{Math.floor(weatherData.main?.temp_max)} {unit}</span>
                    <br/>
                    <i class="bi bi-thermometer-low"></i>Temp. Min <span className="value__temp__min">{Math.floor(weatherData.main?.temp_min)} {unit}</span>
                  </Card.Text>
                  <Card.Text className="card__humidity">
                    <i className="bi bi-droplet"></i> Humidity: <span className="value__humidity">{weatherData.main?.humidity} %</span> {/* Display humidity */}
                  </Card.Text>
                  <Card.Text className="card__pressure">
                    <i class="bi bi-speedometer2"></i> Pressure: <span className="value__pressure">{weatherData.main?.pressure} hPa</span> {/* Display pressure */}
                  </Card.Text>
                  <Card.Text className="card__wind">
                      <i className="bi bi-wind"></i> Wind speed: <span className="value__wind__speed">{Math.floor(weatherData.wind?.speed)} {wind}</span> <br/>
                      <i class="bi bi-compass"></i> Wind deg: <span className="value__wind__deg">{Math.floor(weatherData.wind?.deg)}°</span> {/* Display wind direction */}
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        )}

        {/* Display a legend explaining the weather data terminology */}
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

