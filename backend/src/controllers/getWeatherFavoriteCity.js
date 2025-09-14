import axios from 'axios'
import handleHttpError from '../utils/handleError.js'

const getWeatherFavoriteCity = async (req, res) => {
  try {
    const { cityId, temperatureUnit } = req.params
    const apiKey = process.env.OPENWEATHER_API_KEY

    console.log('City ID:', cityId)
    console.log('Unit:', temperatureUnit)

    if (cityId) {
      const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=${temperatureUnit}`
      const response = await axios.get(url)
      const cityData = response.data

      return res.status(200).json({
        message: 'Weather data for favorite city',
        city: cityData
      })
    }
  } catch (error) {
    console.error('Error occurred while fetching favorite cities: ', error.message)
    handleHttpError(
      res,
      error.message.includes('HTTP error') ? error.message : undefined
    )
  }
}

export default getWeatherFavoriteCity
