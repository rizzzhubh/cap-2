const router = require("express").Router();
const admin = require("../config/firebase.config")
const user = require("../models/user")
router.get("/login", async(req, res) => {
if(!req.headers.authorization){
    res.status(500).send({message:"Invalid Token"})
}
const token = req.headers.authorization.split(" ")[1];
try{
    const decodedValue = await admin.auth().verifyIdToken(token);
    if(!decodedValue){
        res.status(500).json({message:"Un Authorized"})
    }
    else{
        //i am checking wheather user exist or not
        const userExist = await user.findOne({"user_id":decodedValue.user_id})
        if(!userExist){
            newUserData(decodedValue,req, res)
        }
        else{
            res.status(200).json({message:"Already Exist"})
        }
    }

}
catch(error){
    res.status(505).json({message:error})
}
 
})


const newUserData = async(decodedValue,req, res) => {
    const newUser = new user({
        name:decodedValue.name,
        email:decodedValue.email,
        imageurl:decodedValue.picture,
        user_id:decodedValue.user_id,
        email_verified:decodedValue.email_verified,
        role:"member",
        auth_time:decodedValue.auth_time

        
    })
    try{
       const savedUser = await newUser.save();
        res.status(200).send({user:savedUser})
    }
    catch(error){
        res.status(400).send({sucess:false, message:error})
    }
    
}

module.exports = router; 