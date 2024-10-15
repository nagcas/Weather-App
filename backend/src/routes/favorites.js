const express = require('express');
const addfavoriteCities = require('../controllers/favoritesController');
const favoriteRouter = express.Router();


favoriteRouter.post('/',addfavoriteCities);

module.exports = favoriteRouter;