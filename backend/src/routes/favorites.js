import express from 'express'
import addfavoriteCities from '../controllers/favoritesController.js'
import getFavoriteCities from '../controllers/getFavoriteCities.js'
import deleteFavoriteCity from '../controllers/deleteFavoriteCity.js'
import { authMiddleware } from '../middlewares/auth.js'
import getWeatherFavoriteCity from '../controllers/getWeatherFavoriteCity.js'

const router = express.Router()

// Route to add a city to the user's favorite list
// Uses authMiddleware to ensure the user is authenticated
router.post('/add-favorite-city', authMiddleware, addfavoriteCities)

// Route to get the list of user's favorite cities
// Also protected by authMiddleware for authentication
router.post('/get-favorite-city', authMiddleware, getFavoriteCities)

// Route to get weather meteo favorite city
router.get('/weather-favorite-city/:cityId/:temperatureUnit', authMiddleware, getWeatherFavoriteCity)

// Route to delete one favorite city
router.delete('/delete-favorite-city', authMiddleware, deleteFavoriteCity)

export default router
