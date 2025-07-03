import './CitySearch.css';
import { useContext, useEffect, useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { Context } from '../../modules/Context';
import Legend from './Legend';
import SingleCard from './SingleCard';
import InputSearch from './InputSearch';
import CardsForecast from './CardsForecast';
import { getWeatherForecast } from '../services/useFetchForecast.js';
import { getWeatherInfo } from '../services/useFetchCurrent.js';

function CitySearch() {
  const { temperatureUnit } = useContext(Context);
  const apiKey = import.meta.env.VITE_API_WEATHER;

  // States
  const [unit, setUnit] = useState('°C');
  const [wind, setWind] = useState('meter/sec');
  const [search, setSearch] = useState('');
  const [nameCity, setNameCity] = useState([]);
  const [nameCountry, setNameCountry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherDataForecast, setWeatherDataForecast] = useState(null);

  // Fetch current weather data
  const getWeatherInfo = async (city, country) => {
    setLoading(true);
    const { data, error } = await getWeatherInfo(
      city,
      country,
      temperatureUnit,
      apiKey
    );
    setWeatherData(data);
    setLoading(false);
  };

  // Fetch weather forecast data
  const getWeatherForecast = async (city, country) => {
    setLoading(true);
    const { dataForecast, error } = await getWeatherForecast(
      city,
      country,
      temperatureUnit,
      apiKey
    );
    setWeatherData(dataForecast);
    setLoading(false);
  };

  // const getWeatherForecast = async (city, country) => {
  //   if (!city || !country) return;
  //   setLoading(true);
  //   setError(null);

  //   const URL_API_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=${temperatureUnit}&appid=${apiKey}`;
  //   try {
  //     const response = await fetch(URL_API_FORECAST);
  //     if (!response.ok) {
  //       throw new Error(`Error fetching forecast for ${city}`);
  //     }
  //     const dataForecast = await response.json();
  //     setWeatherDataForecast(dataForecast);
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Update unit symbol (°C or °F) when the temperature unit changes
  useEffect(() => {
    if (temperatureUnit === 'imperial') {
      setUnit('°F');
      setWind('miles/hour');
    } else {
      setUnit('°C');
      setWind('meter/sec');
    }
    // If a city is already searched, re-fetch weather and forecast
    if (weatherData) {
      getWeatherInfo(weatherData.name, weatherData.sys.country);
      getWeatherForecast(weatherData.name, weatherData.sys.country);
    }
  }, [temperatureUnit, search]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Handle form submission
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const searchInput = search.trim().toLowerCase(); // Clean and standardize the input

    if (searchInput) {
      const name = searchInput.split(','); // Split the input into city and country

      // Check if the input contains both city and country
      if (name.length === 2) {
        const city = name[0].trim(); // Extract and clean the city
        const country = name[1].trim(); // Extract and clean the country

        setNameCity(city); // Set the city state
        setNameCountry(country); // Set the country state

        // console.log("City: ", city);
        // console.log("Country: ", country);

        // Make the API calls
        Promise.all([
          getWeatherInfo(city, country),
          getWeatherForecast(city, country),
        ])
          .then(() => {
            setSearch(''); // Clear the input field after the requests
          })
          .catch((error) => setError(error.message)); // Handle any API errors
      } else {
        setError(
          "Please provide both a city and a country code (e.g., 'Rome, it')."
        ); // Show error if input is incomplete
      }
    }
  };

  return (
    <section className='search__section'>
      <Container>
        <h2 className='title__search'>City Search</h2>

        {/* Form to search for a city's weather data */}
        <InputSearch
          handleSubmitSearch={handleSubmitSearch}
          search={search}
          handleSearch={handleSearch}
        />

        {loading && <p>Loading...</p>}
        {error && (
          <Alert
            variant='danger'
            className='error-message'
          >
            {error}
          </Alert>
        )}

        {/* Wiew single card weather */}
        {weatherData && (
          <SingleCard
            weatherData={weatherData}
            unit={unit}
            wind={wind}
          />
        )}

        {/* Wiew ard forestac with map and filter */}
        {weatherDataForecast && weatherDataForecast.list && (
          <CardsForecast
            weatherDataForecast={weatherDataForecast}
            unit={unit}
          />
        )}

        {/* Wiew legend weather */}
        {weatherData && <Legend />}
      </Container>
    </section>
  );
}

export default CitySearch;
