export const getWeatherInfo = async (
  city,
  country,
  temperatureUnit,
  apiKey
) => {
  if (!city || !country) return;

  const URL_API = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${temperatureUnit}&appid=${apiKey}`;
  try {
    const response = await fetch(URL_API);
    if (!response.ok) {
      throw new Error(`Error fetching data for ${city}`);
    }
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};
