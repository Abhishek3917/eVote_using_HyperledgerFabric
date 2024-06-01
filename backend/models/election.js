const Mongoose = require("mongoose");
const electionSchema = new Mongoose.Schema({
    college: {
        type: String,
        required: false,
    },
    election_name: {
        type: String,
        required: false,
    }, 
    deadline: {
        type: String,
        required: false,
    },
    finished: {
        type: Boolean,
        default: false,
        required: false,
    }
})
const election = Mongoose.model("election", electionSchema);
module.exports = election;