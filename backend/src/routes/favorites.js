import express from "express";
import addfavoriteCities from "../controllers/favoritesController";

const favoriteRouter = express.Router();

favoriteRouter.post('/', addfavoriteCities);

export default favoriteRouter;
