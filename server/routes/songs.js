const router = require("express").Router();
const songs = require("../models/song");


router.post("/save", async (req, res) => {
const newSong = songs({
    name: req.body.name,
    imageURL: req.body.imageURL,
    songurl: req.body.songurl,
    artist: req.body.artist,
    album: req.body.album,
    language: req.body.language,
    category: req.body.category
})

try{
    const savedSongs = await newSong.save();
    res.status(200).send({sucess:true,Song:savedSongs})
}
catch(error){
    res.status(400).send({sucess:false, message:error})
}
})

router.get("/get/:id", async(req, res) => {
    const filter = {_id:req.params.id}
    const data = await songs.findOne(filter)

    if(!data){
        res.status(400).send({sucess:false, message:"Song not found"})
    }
    else{
        res.status(200).send({sucess:true,Song:data})
    }
})


router.get("/getAll", async (req, res) => {
    const data = await songs.find().sort({ createdAt: 1 });
    if(data){
        res.status(200).send({success:true, songs:data});
        
    }
    else{
        res.status(400).send({success:false, message:"songs not found"});
    }
});


router.put("/update/:id", async(req, res) => {
    const filter = {_id:req.params.id};
   
   
    try{
        const result = await songs.findOneAndUpdate(filter, { 
            name: req.body.name,
            songurl: req.body.songurl,
            artist: req.body.artist,
            album: req.body.album,
            language: req.body.language,
            category: req.body.category
        }
        );
        res.status(200).send({songs:result})
    }
    catch(error){
        res.status(400).send({sucess:false, message:error})
    }
})

router.delete("/delete/:id", async(req, res) => {
    const filter = {_id:req.params.id}
    const data = await songs.findOneAndDelete(filter)
    if(!data){
        res.status(400).send({sucess:false, message:"songs not found"})
    }
    else{
        res.status(200).send({message:"Deleted Successfully",songs:data})
    } 
}) 



module.exports = router