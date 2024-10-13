const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;


app.use(express.json());


// setting up basic express server


app.get('/',(req,res) =>{
    res.status(200).send('Handling basic get request on / endpoint')
})

app.post('/',(req,res) =>{
    res.status(200).send("Post response");
    
})


mongoose.connect(MONGO_URI)
.then(()=>{
    //This will make app to start only when we have connected to DB 

    app.listen(PORT,()=>{
        console.log("server started at ",PORT);
    })

})
.catch((error)=>console.log("error establishing connection to mongodb ",error))
