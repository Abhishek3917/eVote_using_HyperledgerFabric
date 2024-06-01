const Mongoose = require("mongoose");

const RequestSchema = new Mongoose.Schema({
    first_name: {
        type: String,
        required: false,
    },
    
    last_name: {
      type: String,
      required: false,
    },

    email: {
      type: String,
      required: false,
    },

    mob_no: {
      type: String,
      required: false,
    },

    college: {
      type: String,
      required: false,
    },

    course:{
      type: String,
      required: false,
    },

    branch: {
      type: String,
      required: false,
    },

    year: {
      type: Number,
      required: false,
    }
});

const Requests = Mongoose.model("Requests", RequestSchema);
module.exports = Requests;