const Mongoose = require("mongoose")

const courseSchema = new Mongoose.Schema({
    college: {
        type: String,
        required: false,
    },
    course: {
        type: String,
        required: false,
    },
    branch: {
        type: String,
        required: false,
    },
    years: {
        type: Number,
        required: false,
    }
})

const courses = Mongoose.model("courses", courseSchema)
module.exports = courses