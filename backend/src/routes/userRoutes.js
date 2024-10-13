const express = require('express');
const register = require('../controllers/registerController');
const login = require('../controllers/loginController');
const userRouter = express.Router();


userRouter.post("/",register);
userRouter.post('/',login);


module.exports = userRouter;


