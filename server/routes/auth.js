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
        //i am checking wheather user exist or not        // const userExist = await user.findOne({$or: [{user_id: decodedValue.user_id}, {email: decodedValue.email}]});

        const userExist = await user.findOne({email: decodedValue.email})
        if(!userExist){
            newUserData(decodedValue,req, res)
        }
        else{
            updateNewUserData(decodedValue,req, res)
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

const updateNewUserData = async(decodedValue,req, res) => {
    const filter = {email:decodedValue.email};
    const options = { upsert: true,new: true };
    try{
        const result = await user.findOneAndUpdate(
            filter,
            {auth_time:decodedValue.auth_time},
            options
            );
        res.status(200).send({user:result})
    }
    catch(error){
        res.status(400).send({sucess:false, message:error})
    }
}



router.get("/getUsers", async(req, res) => {
    const options = {
        sort: {createdAt: 1}
    }
    const cursor = await user.find(options);
    if(!cursor){
        res.status(400).send({sucess:false, message:"User not found"})
    }
    else{
        res.status(200).send({sucess:true,users:cursor})
    }
})
module.exports = router; 