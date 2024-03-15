const router = require("express").Router();
const admin = require("../config/firebase.config")

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
        res.status(200).json(decodedValue)
    }

}
catch(error){
    res.status(505).json({message:error})
}
 
})

module.exports = router; 