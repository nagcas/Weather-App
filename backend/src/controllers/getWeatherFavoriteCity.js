const getWeatherFavoriteCity = async (req, res) => {
  res.status(200).json(
    {
      message: 'weather favorite city'
    }
  )
}

export default getWeatherFavoriteCity
