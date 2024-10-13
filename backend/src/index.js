const express = require('express');
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

app.listen(PORT,()=>{
    console.log("server started at ",PORT);
})