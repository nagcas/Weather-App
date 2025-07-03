import User from '../models/user.js'

const getFavoriteCities = async (req, res) => {
  // as this controller will be called after the request has passed auth middleware so the request will contain userid already and we  know the user is authenticated

  try {
    const { userId } = req
    const user = await User.findById(userId)

    if (!user || !user.favoriteCities || user.favoriteCities.length === 0) {
      return res.status(200).json({ message: 'No favorite cities found.' })
    }

    return res.json({ list: user.favoriteCities }).status(200)
  } catch (error) {
    console.error('Error occured in getting favorite cities: ', error)
    return res
      .status(500)
      .json({ message: 'Error occured in getting cities.' })
  }
}

export default getFavoriteCities
