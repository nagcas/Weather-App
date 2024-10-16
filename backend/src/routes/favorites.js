import express from "express";
import addfavoriteCities from "../controllers/favoritesController.js";
import getFavoriteCities from "../controllers/getFavoriteCities.js";
import authMiddleware from "../middlewares/auth.js";

const favoriteRouter = express.Router();

favoriteRouter.post("/", authMiddleware, addfavoriteCities);
favoriteRouter.get("/", authMiddleware, getFavoriteCities);

export default favoriteRouter;
