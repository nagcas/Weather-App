const mongoose = require('mongoose');


const citySchema = new mongoose.Schema({
    cityName:{
        type:String,
        required:true,
        unique:true
    },
    country:{
        type:String,
        require:true
    }
})

const cityModel = mongoose.model("cityModel",citySchema);

module.exports = cityModel;
