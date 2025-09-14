import User from '../models/user.js'
import handleHttpError from '../utils/handleError.js'

const getFavoriteCities = async (req, res) => {
  try {
    const { userId } = req.body
    console.log(`UserId received: ${userId}`)

    const user = await User.findById(userId).populate('favoriteCities')

    if (!user || !user.favoriteCities) {
      return res.status(200).json({ list: [] })
    }

    res.status(200).json({ list: user.favoriteCities })
  } catch (error) {
    console.error('Error occurred while fetching favorite cities: ', error.message)
    handleHttpError(
      res,
      error.message.includes('HTTP error') ? error.message : undefined
    )
  }
}

export default getFavoriteCities
