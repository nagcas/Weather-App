import userModel from '../models/user.js'
import axios from 'axios'

const addFavoriteCities = async (req, res) => {
  try {
    const { cityName, cityId } = req.body
    const userId = req.userId
    const apiKey = process.env.OPENWEATHER_API_KEY

    // PART 1: Add a city by its ID to the user's favorites
    if (cityId) {
      const user = await userModel.findById(userId)

      if (!user) return res.status(404).json({ message: 'User not found.' })

      const alreadyAdded = user.favoriteCities.includes(cityId)

      if (alreadyAdded) {
        return res.status(200).send("City is already in the user's favorite list.")
      }

      user.favoriteCities.push(cityId)
      await user.save()

      return res.status(200).send('City added to favorites.')
    }

    // PART 2: If no ID is provided, search for the city using OpenWeather API
    if (cityName) {
      const url = `https://api.openweathermap.org/data/2.5/find?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`

      // Request city data from OpenWeather
      const response = await axios.get(url)
      const cityData = response.data

      // If no city is found
      if (cityData.count === 0) {
        return res.status(200).send('No cities found.')
      }

      // If multiple cities with the same name are found
      if (cityData.count > 1) {
        return res.status(200).json({
          message: 'Multiple cities found, please select one.',
          cities: cityData.list
        })
      }

      // If exactly one city is found, return it (or you could add it directly here)
      return res.status(200).json({
        message: 'One city found.',
        city: cityData.list[0]
      })
    }

    // If neither cityId nor cityName is provided
    return res.status(400).json({ message: 'Please provide cityName or cityId.' })
  } catch (error) {
    console.error('Error fetching city data:', error)
    res.status(500).json({ message: 'Server error while processing city.' })
  }
}

export default addFavoriteCities
