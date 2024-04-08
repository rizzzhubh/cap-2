const mongoose = require("mongoose");
const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true,
      },
    songurl: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String,
    },
    language: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model("song", songSchema)