const express = requir("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://Rishabh:Cipher@cluster0.rjxz1yt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { dbName: "Cipher" })
  .then(() => {
    console.log('Connected to MongoDB');

app.get("/", (req, res) => {
    res.send("DAMN!!!")
})


// user authenti routes
const userRoute = require("./routes/auth")
app.use("/api/users", userRoute);



app.listen(3000, () => {
    console.log("Running on port 3000")
})
  })
