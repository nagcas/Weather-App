export const getWeatherForecast = async (city, country, temperatureUnit, apiKey) => {
   
  if (!city || !country) return;
  setLoading(true);
  setError(null);

  const URL_API_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=${temperatureUnit}&appid=${apiKey}`;
  try {
    const response = await fetch(URL_API_FORECAST);
    if (!response.ok) {
      throw new Error(`Error fetching forecast for ${city}`);
    }
    const dataForecast = await response.json();
    // setWeatherDataForecast(dataForecast);
    return { dataForecast, error: null };
  } catch (error) {
    return { dataForecast: null, error: error.message };
  } 
};