const mongoose = require("mongoose");
const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageurl: {
        type: String,
        required: true
    },
    twitter: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model("artists", artistSchema)