const express = require("express")
const User = require("./models/user");
const cors = require('cors')
const SimpleWebAuthnServer = require('@simplewebauthn/server');
const cookieParser = require("cookie-parser");
const connectDb = require('./db')
const path = require("path");
const multer = require("multer");
const { adminAuth, userAuth } = require("./middleware/auth.js");
const app = express()
const PORT = 5000
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", require("./auth/routes"))
app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'images/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
  });
  
const upload = multer({ storage });

app.post("/api/savePhoto", upload.single('data'), (req, res) => {
    try{
        res.status(201).json({
            file: path.resolve(req.file.originalname),
            message: "Upload successful",
        });
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
})

app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`))
connectDb(); 
