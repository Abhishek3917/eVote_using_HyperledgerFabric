const Mongoose = require("mongoose");
const resultsSchema = new Mongoose.Schema({
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

    votes: {
        type: Number,
        required: false,
    }
});

const results = Mongoose.model("Results", resultsSchema);
module.exports = results;
