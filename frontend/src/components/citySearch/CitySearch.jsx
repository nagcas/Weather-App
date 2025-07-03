import './CitySearch.css';
import { useContext, useEffect, useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { Context } from '../../modules/Context';
import Legend from './Legend';
import SingleCard from './SingleCard';
import InputSearch from './InputSearch';
import CardsForecast from './CardsForecast';

function CitySearch() {
  const { temperatureUnit } = useContext(Context);
  const apiKey = import.meta.env.VITE_API_WEATHER;

  // States
  const [unit, setUnit] = useState('°C');
  const [wind, setWind] = useState('meter/sec');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherDataForecast, setWeatherDataForecast] = useState(null);

  // Fetch current weather data
  const fetchCurrentWeather = async (city, country) => {
    if (!city || !country) return;
    setLoading(true);
    setError(null);

    const URL_API_CURRENT = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${temperatureUnit}&appid=${apiKey}`;

    try {
      const response = await fetch(URL_API_CURRENT);
      if (!response.ok) {
        throw new Error(`Error fetching current weather for ${city}`);
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch forecast weather data
  const fetchForecastWeather = async (city, country) => {
    if (!city || !country) return;
    setLoading(true);
    setError(null);

    const URL_API_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=${temperatureUnit}&appid=${apiKey}`;

    try {
      const response = await fetch(URL_API_FORECAST);
      if (!response.ok) {
        throw new Error(`Error fetching forecast for ${city}`);
      }
      const data = await response.json();
      setWeatherDataForecast(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update unit when temperature unit changes
  useEffect(() => {
    if (temperatureUnit === 'imperial') {
      setUnit('°F');
      setWind('miles/hour');
    } else {
      setUnit('°C');
      setWind('meter/sec');
    }

    // If a city is already selected, refresh the data
    if (weatherData) {
      fetchCurrentWeather(weatherData.name, weatherData.sys.country);
      fetchForecastWeather(weatherData.name, weatherData.sys.country);
    }
  }, [temperatureUnit]);

  // Handle search input
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Handle form submit
  const handleSubmitSearch = (e) => {
    e.preventDefault();

    const trimmed = search.trim().toLowerCase();
    if (!trimmed) return;

    const [city, country] = trimmed.split(',').map((s) => s.trim());

    if (!city || !country) {
      setError("Please enter city and country code (e.g. 'Rome, IT')");
      return;
    }

    fetchCurrentWeather(city, country);
    fetchForecastWeather(city, country);
    setSearch('');
  };

  return (
    <section className='search__section'>
      <Container>
        <h2 className='title__search'>City Search</h2>

        <InputSearch
          handleSubmitSearch={handleSubmitSearch}
          search={search}
          handleSearch={handleSearch}
        />

        {loading && <p>Loading...</p>}
        {error && (
          <Alert variant='danger' className='error-message'>
            {error}
          </Alert>
        )}

        {/* Show current weather */}
        {weatherData && (
          <SingleCard weatherData={weatherData} unit={unit} wind={wind} />
        )}

        {/* Show forecast weather */}
        {weatherDataForecast?.list && (
          <CardsForecast weatherDataForecast={weatherDataForecast} unit={unit} />
        )}

        {/* Show legend */}
        {weatherData && <Legend />}
      </Container>
    </section>
  );
}

export default CitySearch;

