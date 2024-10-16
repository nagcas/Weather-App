const express = require('express');
const addfavoriteCities = require('../controllers/favoritesController');
const getFavoriteCities = require('../controllers/getFavoriteCities');
const favoriteRouter = express.Router();


favoriteRouter.post('/',addfavoriteCities);
favoriteRouter.get('/',getFavoriteCities);

module.exports = favoriteRouter;