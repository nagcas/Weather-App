import User from '../models/user.js'

const getFavoriteCities = async (req, res) => {
  // This controller assumes the user is authenticated and userId is provided in the request body

  try {
    const { userId } = req.body
    console.log(`UserId received: ${userId}`)

    // Find the user by ID and populate the favoriteCities field with full city documents
    const user = await User.findById(userId).populate('favoriteCities')

    // If no user found or no favorite cities, send appropriate message
    if (!user || !user.favoriteCities || user.favoriteCities.length === 0) {
      return res.status(200).json({ message: 'No favorite cities found' })
    }

    // Send back the populated list of favorite cities
    res.status(200).json({ list: user.favoriteCities })
  } catch (error) {
    // Log the error and send a 500 server error response
    console.error('Error occurred while fetching favorite cities: ', error)
    return res.status(500).json({ message: 'Error occurred while getting cities' })
  }
}

export default getFavoriteCities
