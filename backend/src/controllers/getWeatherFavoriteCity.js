import axios from 'axios'

const getWeatherFavoriteCity = async (req, res) => {
  try {
    const { cityId } = req.params
    const apiKey = process.env.OPENWEATHER_API_KEY

    console.log('City ID:', cityId)

    if (cityId) {
      const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=metric`
      const response = await axios.get(url)
      const cityData = response.data

      return res.status(200).json({
        message: 'Weather data for favorite city',
        city: cityData
      })
    }
  } catch (error) {
    console.error('Error occurred while fetching favorite cities: ', error)
    return res.status(500).json({ message: 'Error occurred while getting city' })
  }
}

export default getWeatherFavoriteCity
