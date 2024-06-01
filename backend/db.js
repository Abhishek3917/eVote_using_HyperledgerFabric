const Mongoose = require("mongoose")
// const localDB = `mongodb://localhost:5000/user`
const localDB = `mongodb+srv://shaheen2532:W5hJYRIjoiJD0nBR@cluster0.3kbre0p.mongodb.net/?retryWrites=true&w=majority`
const connectDB = async () => {
  await Mongoose.connect(localDB)
  console.log("MongoDB Connected")
}
module.exports = connectDB;