import User from '../models/user.js'
import City from '../models/cities.js'
import axios from 'axios'

const addFavoriteCities = async (req, res) => {
  try {
    const { cityName, cityId, userId } = req.body
    const apiKey = process.env.OPENWEATHER_API_KEY

    console.log(`cityName: ${cityName}`)
    console.log(`cityId: ${cityId}`)
    console.log(`userId: ${userId}`)

    // Find the user in the database by userId
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    // If cityId is provided
    if (cityId) {
      // Search for the city in the DB
      let city = await City.findOne({ cityId })

      // If it doesn't exist, fetch it from OpenWeather using city ID endpoint
      if (!city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?id=${encodeURIComponent(cityId)}&appid=${apiKey}&units=metric`
        const response = await axios.get(url)
        const cityData = response.data

        // If no data or missing id in response
        if (!cityData || !cityData.id) {
          return res.status(404).json({ message: 'City not found on OpenWeather' })
        }

        // Create the city in the DB with data from OpenWeather
        city = new City({
          cityName: cityData.name,
          country: cityData.sys.country,
          cityId: String(cityData.id),
          userId: [user._id]
        })
        await city.save()
      }

      // Check if the city is already in user's favorite list
      const alreadyAdded = user.favoriteCities.some(fav => fav.toString() === city._id.toString())
      if (alreadyAdded) {
        return res.status(200).send("City is already in the user's favorite list")
      }

      // Add the city to user's favorites and save the user
      user.favoriteCities.push(city._id)
      await user.save()

      // Respond with success and info about the added city
      return res.status(200).json({
        message: 'City added to favorites',
        city: {
          name: city.cityName,
          country: city.country,
          id: city.cityId
        }
      })
    }

    // If cityName is provided, search and add (like before)
    if (cityName) {
      const url = `https://api.openweathermap.org/data/2.5/find?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`
      const response = await axios.get(url)
      const cityData = response.data

      // If no cities found
      if (cityData.count === 0) {
        return res.status(200).send('No cities found')
      }

      // If multiple cities found with the same name
      if (cityData.count > 1) {
        return res.status(200).json({
          message: 'Multiple cities found, please select one',
          cities: cityData.list
        })
      }

      // If only one city found, take it
      const singleCity = cityData.list[0]
      let city = await City.findOne({ cityId: String(singleCity.id) })

      // If not in DB, create it
      if (!city) {
        city = new City({
          cityName: singleCity.name,
          country: singleCity.sys.country,
          cityId: String(singleCity.id),
          userId: [user._id]
        })
        await city.save()
      }

      // Check if city is already in user's favorites, if not add it
      const alreadyAdded = user.favoriteCities.some(fav => fav.toString() === city._id.toString())
      if (!alreadyAdded) {
        user.favoriteCities.push(city._id)
        await user.save()
      }

      // Respond with success and info of added city
      return res.status(200).json({
        message: 'City added to favorites',
        city: {
          name: singleCity.name,
          country: singleCity.sys.country,
          id: singleCity.id
        }
      })
    }

    // If neither cityId nor cityName provided, respond with error
    return res.status(400).json({ message: 'Please provide cityName or cityId' })
  } catch (error) {
    // Log the error and respond with server error
    console.error('Error fetching city data:', error.message)
    console.error(error.stack)
    res.status(500).json({ message: 'Server error while processing city', error: error.message })
  }
}

export default addFavoriteCities
