import express from "express";
import addfavoriteCities from "../controllers/favoritesController";
import getFavoriteCities from "../controllers/getFavoriteCities";
import authMiddleware from "../middlewares/auth";

const favoriteRouter = express.Router();

favoriteRouter.post('/',authMiddleware,addfavoriteCities);
favoriteRouter.get('/',authMiddleware,getFavoriteCities);

export default favoriteRouter;
