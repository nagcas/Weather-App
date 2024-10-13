const express = require('express');
const register = require('../controllers/registerController');
const userRouter = express.Router();


userRouter.post("/",register);


module.exports = userRouter;


