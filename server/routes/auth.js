const router = require("express").Router();
const admin = require("../config/firebase.config");
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const user2 = require("../models/users2.js");
router.get("/login", async (req, res) => {
  if (!req.headers.authorization) {
    res.status(500).send({ message: "Invalid Token" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) {
      res.status(500).json({ message: "Un Authorized" });
    } else {
      //i am checking wheather user exist or not        // const userExist = await user.findOne({$or: [{user_id: decodedValue.user_id}, {email: decodedValue.email}]});

      const userExist = await user.findOne({ email: decodedValue.email });
      if (!userExist) {
        newUserData(decodedValue, req, res);
      } else {
        updateNewUserData(decodedValue, req, res);
      }
    }
  } catch (error) {
    res.status(505).json({ message: error });
  }
});

const newUserData = async (decodedValue, req, res) => {
  const newUser = new user({
    name: decodedValue.name,
    email: decodedValue.email,
    imageurl: decodedValue.picture,
    user_id: decodedValue.user_id,
    email_verified: decodedValue.email_verified,
    role: "member",
    auth_time: decodedValue.auth_time,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({ user: savedUser });
  } catch (error) {
    res.status(400).send({ sucess: false, message: error });
  }
};

const updateNewUserData = async (decodedValue, req, res) => {
  const filter = { email: decodedValue.email };
  const options = { upsert: true, new: true };
  try {
    const result = await user.findOneAndUpdate(
      filter,
      { auth_time: decodedValue.auth_time },
      options
    );
    res.status(200).send({ user: result });
  } catch (error) {
    res.status(400).send({ sucess: false, message: error });
  }
};

// router.get("/getUsers", async(req, res) => {
//     const options = {
//         sort: {createdAt: 0}
//     }
//     const cursor = await user.find(options);
//     // res.send({sucess:true,users:cursor})
//     if(!cursor){
//         console.log("no user found");
//         res.status(400).send({sucess:false, message:"User not found"})
//     }
//     else{
//         console.log("found user" ,cursor);
//         res.status(200).send({sucess:true,users:cursor})
//     }
// })

router.get("/getUsers", async (req, res) => {
  try {
    const cursor = await user.find().sort({ createdAt: -1 });
    if (!cursor || cursor.length === 0) {
      console.log("No user found");
      return res
        .status(400)
        .send({ success: false, message: "User not found" });
    }

    res.status(200).send({ success: true, users: cursor });
  } catch (error) {
    console.error("Error while fetching users:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
});

router.put("/updateRole/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };
  const role = req.body.role;
  const option = { upsert: true, new: true };
  try {
    const result = await user.findOneAndUpdate(filter, { role: role }, option);
    res.status(200).send({ user: result });
  } catch (error) {
    res.status(400).send({ sucess: false, message: error });
  }
});

router.delete("/deleteUser/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };
  const data = await user.findOneAndDelete(filter);
  if (!data) {
    res.status(400).send({ sucess: false, message: "user not found" });
  } else {
    res.status(200).send({ message: "Deleted Successfully", user: data });
  }
});

router.post("/login-m", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const foundUser = await user2.find({ email: email });
  console.log("userFound",foundUser[0].password);

  if (foundUser.password = password) {
    const token = jwt.sign(
      { email: foundUser.email, id: foundUser._id },
      "secret",
      { expiresIn: "1h" }
    );
    res.json({ token: token , foundUser:foundUser});
    console.log("created token", token);
  } else {
    res.status(400).send({ sucess: false, message: "user not found" });
  }
});

router.post("/signIn", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const createdUser = await user2.create({
      name: name,
      email: email,
      password: password,
      role: role,
    });

    res.send(createdUser);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
