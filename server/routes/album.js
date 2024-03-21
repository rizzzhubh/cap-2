const album = require("../models/album");

const router = require("express").Router();


router.post("/save", async (req, res) => {
    const newAlbum = album({
        name: req.body.name,
        imageurl: req.body.imageurl
        
    })
    
    try{
        const savedAlbum = await newAlbum.save();
        res.status(200).send({sucess:true,album:savedAlbum})
    }
    catch(error){
        res.status(400).send({sucess:false, message:error})
    }
    })

    router.get("/get/:id", async(req, res) => {
        const filter = {_id:req.params.id}
        const data = await album.findOne(filter)
    
        if(!data){
            res.status(400).send({sucess:false, message:"album not found"})
        }
        else{
            res.status(200).send({sucess:true,album:data})
        }
    })

    router.get("/getAll", async (req, res) => {
        const data = await album.find().sort({ createdAt: 1 });
        if(data){
            res.status(200).send({success:true, album:data});
            
        }
        else{
            res.status(400).send({success:false, message:"album not found"});
        }
    });

    router.put("/update/:id", async(req, res) => {
        const filter = {_id:req.params.id};
       
       
        try{
            const result = await album.findOneAndUpdate(filter, { 
                name: req.body.name,
                imageurl: req.body.imageurl,
               
            }
            );
            res.status(200).send({album:result})
        }
        catch(error){
            res.status(400).send({sucess:false, message:error})
        }
    })


    router.delete("/delete/:id", async(req, res) => {
        const filter = {_id:req.params.id}
        const data = await album.findOneAndDelete(filter)
        if(!data){
            res.status(400).send({sucess:false, message:"album not found"})
        }
        else{
            res.status(200).send({message:"Deleted Successfully",album:data})
        } 
    }) 

module.exports = router