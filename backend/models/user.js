const Mongoose = require("mongoose")
const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  role: {
    type: String,
    default: "Basic",
    required: true,
  },
  first_name: {
    type: String,
    required: true,
    minlengh: 1,
  },
  last_name: {
    type: String,
    required: true,
    minlength: 1,
  },
  email: {
    type: String,
    required: true,
  },
  mob_no: {
    type: Number,
    required: true,
    length: 10,
  },
  college: {
    type: String,
    required: false,
    default: "NU",
  },
  collegeRequested: {
    type: Boolean,
    required: false,
    default: false,
  },
  course: {
    type: String,
    required: false,
    default: "NU",
  },
  branch: {
    type: String,
    required: false,
    default: "NU",
  },
  year: {
    type: Number,
    required: false,
    default: 0,
  },
  image: {
    type: String,
    required: false,
  },
  credentialID: {
    type: String,
    required: false,
  },
  publicKey: {
    type: String,
    required: false,
  },
  algorithm: {
    type: String,
    required: false,
  },
  votedElections: {
    type: Array,
    deafult: [],
  }
}) 

const User = Mongoose.model("user", UserSchema)
module.exports = User