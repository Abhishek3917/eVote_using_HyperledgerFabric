const Mongoose = require("mongoose");
const electionAdminSchema = new Mongoose.Schema({
  _id: {
    type: String,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  phone_no: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  college_name: {
    type: String,
  },
  city: {
    type: String,
  },
  district: {
    type: String,
  },
  country: {
    type: String,
  },
  pincode: {
    type: String,
  },
  credentialID: {
    type: String,
  },
  publicKey: {
    type: String,
  },
  algorithm: {
    type: String,
  },
  coursesUpdated: {
    type: Boolean,
  }
}) 
const electionAdmin = Mongoose.model("Election Admin", electionAdminSchema);
module.exports = electionAdmin;