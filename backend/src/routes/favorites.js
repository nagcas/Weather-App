import express from 'express'
import addfavoriteCities from '../controllers/favoritesController.js'
import getFavoriteCities from '../controllers/getFavoriteCities.js'
import { authMiddleware } from '../middlewares/auth.js'

const router = express.Router()

// Route to add a city to the user's favorite list
// Uses authMiddleware to ensure the user is authenticated
router.post('/add-favorite-city', authMiddleware, addfavoriteCities)

// Route to get the list of user's favorite cities
// Also protected by authMiddleware for authentication
router.post('/get-favorite-city', authMiddleware, getFavoriteCities)

export default router
