const deleteFavoriteCity = async (req, res) => {
  res.status(200).json(
    {
      message: 'Successfully deleted favorite city'
    }
  )
}

export default deleteFavoriteCity
