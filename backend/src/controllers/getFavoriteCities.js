import User from '../models/user.js'

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
    console.error('Error occurred while fetching favorite cities: ', error)
    return res.status(500).json({ message: 'Error occurred while getting cities' })
  }
}

export default getFavoriteCities
