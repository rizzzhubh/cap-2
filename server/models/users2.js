const mongoose = require("mongoose");
const userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "member"
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("users2", userschema);
