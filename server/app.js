const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors({origin:true}))

mongoose.connect("mongodb+srv://Rishabh:Cipher@cluster0.rjxz1yt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { dbName: "Cipher" })
  .then(() => {
    console.log('Connected to MongoDB');

app.get("/", (req, res) => {
    res.send("DAMN!!!")
})


// user authenti routes
const userRoute = require("./routes/auth")
app.use("/api/users", userRoute);

// artist routes
const artistRoutes = require("./routes/artist")
app.use("/api/artist", artistRoutes)

// album routes
const albumRoutes = require("./routes/album")
app.use("/api/album", albumRoutes)

// songs routes
const songRoutes = require("./routes/songs")
app.use("/api/songs", songRoutes)


app.listen(3000, () => {
    console.log("Running on port 3000")
})
  })
