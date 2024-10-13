const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'Register_api';//will change it afterwards

const login = async(req,res) =>{

    const { email, password } = req.body;

    try {
        const existingUser =await userModel.findOne({email});

        if(!existingUser){
        return res.status(404).send("User not found");
        }

        const matchPassword = await bcrypt.compare(password,existingUser.hashPassword);

        if(!matchPassword) 
            return res.send(400).json({message:"Invalid Password"});  
        
        const token = jwt.sign({email:existingUser.email,id:existingUser._id},SECRET_KEY);
        
        return res.status(200).json({ user : existingUser , token : token });

    } catch (error) {
          console.log("error while logging in User ",error);
        return res.status(500).send("some error occured ");

    }

}



module.exports = login;

