const Mongoose = require("mongoose");
const candidateSchema = new Mongoose.Schema({
    election_name: {
        type: String,
        required: false,
    },
    cand_name: {
        type: String,
        required: false,
    }, 
    election_promise: {
        type: String,
        required: false,
    },
    video: {
        type: String,
    },
    votes: {
        type: Number,
        required: true,
        default: 0,
    }
})
const candidates = Mongoose.model("Candidates", candidateSchema);
module.exports = candidates;