import express from 'express'
import addfavoriteCities from '../controllers/favoritesController.js'
import getFavoriteCities from '../controllers/getFavoriteCities.js'
import authMiddleware from '../middlewares/auth.js'

const router = express.Router()

router.post('/add-favorite-city', authMiddleware, addfavoriteCities)
router.get('/get-favorite-city', authMiddleware, getFavoriteCities)

export default router
