const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const authMiddleware = require('./middlewares/auth');
const addfavoriteCities = require('./controllers/favoritesController');
const favoriteRouter = require('./routes/favorites');
const app = express();
const PORT = 3000;


app.use(express.json());


// setting up basic express server


app.get('/',(req,res) =>{
    res.status(200).send('Handling basic get request on / endpoint')
})

app.use('/login',userRouter);
app.use('/register',userRouter);


//protected routes(with auth  middleware)
app.use('/favorites',authMiddleware,favoriteRouter);




mongoose.connect(MONGO_URI)
.then(()=>{
    //This will make app to start only when we have connected to DB 

    app.listen(PORT,()=>{
        console.log("server started at ",PORT);
    })

})
.catch((error)=>console.log("error establishing connection to mongodb ",error))
