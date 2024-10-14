import { useState } from "react";
import { useFetch } from "../../modules/useFetch.js";
import { Container } from "react-bootstrap";

function WeatherApi() {

  const apiKey = import.meta.env.VITE_API_WEATHER;
  const [city, setCity] = useState("Roma");
 
  const URL_API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const { data, loading, error } = useFetch(URL_API);

  console.log(data);

  return (
    <Container className="mt-4">
      {error && <p>Error: {error}</p>}
      {loading && <p>Loading...</p>}
      <p>City: <span className="fw-bold">{data.name}</span></p>
      <p>Temp. <span className="fw-bold">{data.main?.temp} °C</span> - Temp. Min <span className="fw-bold">{data.main?.temp_min} °C</span>  - Temp. Max <span className="fw-bold">{data.main?.temp_max} °C</span></p>
      <p>Pressure: <span className="fw-bold">{data.main?.pressure} mmHg</span> - Humidity: <span className="fw-bold">{data.main?.humidity} %</span></p>
    </Container>
  );
};

export default WeatherApi;