const User = require("../models/user");
const Requests = require("../models/requests");
const electionAdmin = require("../models/electionAdmin");
const courses = require("../models/courses");
const Election = require("../models/election");
const candidates = require("../models/candidates");
const results = require("../models/results");
const bcrypt = require("bcryptjs");
const cbor = require('cbor');
const jwt = require('jsonwebtoken');
const { server } = import('@passwordless-id/webauthn');
const path = require("path");
const multer = require("multer"); 


const jwtSecret = 
  '861707acbd6fa0645b62a37491b92efb27e7e2d72df1d42b83accbf958a319bd92f049';
// admin password: $2a$10$V6OG7GOnUh2HOp8vsgtsFeYj4J1Q68hbGVGF5AJmwgRZkEO/zByIm

// ELECTION ADMIN ENDPOINTS
exports.electionAdminRegister = async (req, res, next) => {
  const { first_name, last_name, phone_no, email, password, 
          college_name, city, district, country, pincode } = req.body
  console.log(password);
  console.log(typeof password);
  bcrypt.hash(password, 10).then(async (hash) => {
    await electionAdmin.create({
      _id: Math.random().toString().substr(2, 8),
      first_name,
      last_name,
      phone_no,
      email,
      password: hash,
      college_name,
      city,
      district,
      country,
      pincode,
    })
      .then((user) => {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          { id: electionAdmin._id, email },
          jwtSecret,
          {
            expiresIn: maxAge, // 3hrs in sec
          }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
        });
        res.status(201).json({
          message: "Elction admin registered",
          user: electionAdmin._id,
          status: 201
        });
      })
      .catch((error) =>
        res.status(400).json({
          message: "Election admin registration failed",
          error: error.message,
          status: 400
        })
      );
  });
} 

exports.loginAdmin = async (req, res, next) => {
  const { email, password } = req.body
  // Check if username and password is provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    })
  }
  try {
    const user = await electionAdmin.findOne({ email })
    if (!user) {
      res.status(400).json({
        message: "Login unsuccessful",
        error: "User not found",
      })
    } else {
      // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, email },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs in sec
            }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });
          res.status(201).json({
            message: "User successfully Logged in", 
            user: user._id,
          });
        } else {
          res.status(400).json({ message: "Login not succesful" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }
}

exports.getAdmin = async (req, res, next) => {
  const { email } = req.body
  try{
    const user = await electionAdmin.findOne({ email })
    res.status(201).json({
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.setCourseUpdated = async (req, res, next) => {
  const { email } = req.body;
  try{
    const user = await electionAdmin.findOne({ email });
      if(!user){
        res.status(404).json({
          message: "User not found!"
        })
      }else{
        user.coursesUpdated = true;
        user.save().then(() => {
          res.status(201).json({
            message: "Admin flag set!",
          });
        })
      }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

exports.setAdminCredential = async (req, res, next) => {
  const { email, credentialID, publicKey, algorithm } = req.body;
  const eAdmin = await electionAdmin.findOne({ email });
  if(!eAdmin){
    res.status(400).json({
      message: "Election admin not found!",
    })
  }else{
    eAdmin.credentialID = credentialID;
    eAdmin.publicKey = publicKey;
    eAdmin.algorithm = algorithm;
    eAdmin.save().then(() => {
      res.status(201).json({ message: "Credentials succesfully updated!", algorithm: algorithm });
    })
  }
}

exports.getAdminCredential = async(req, res, next) => {
  const { email } = req.body;
  const eAdmin = await electionAdmin.findOne({ email });
  if(!eAdmin){
    res.status(400).json({
      message: "Election admin not found!",
    })
  } else{
    res.status(201).json({
      message: "Credentials found!",
      credentialID: eAdmin.credentialID,
      publicKey: eAdmin.publicKey,
      algorithm: eAdmin.algorithm,
    })
  }
}

exports.setCourse = async(req, res, next) => {
  const { collegeName, data } = req.body;
  try{
    for(let item of data){
      await courses.create({
        college: collegeName,
        course: item.course,
        branch: item.branch,
        years: item.years,
      })
    }
    res.status(201).json({
      message: "Course updated",
      courseCreated: true,
    })
  }catch(err){
    res.status(400).json({
      message: err.message,
      courseCreated: false,
    })
  }
}

exports.getCourses = async(req, res, next) => {
  const { college } = req.body;
  
  try{
    const data = await courses.find({"college":college}).then((data) => {
      res.status(201).json({
        message: "courses loaded",
        data: data,
        result: true,
      })
    })
  }catch(err){
    res.status(400).json({
      message: "loading error",
      result: false,
    })
  }
}

//USER API ENDPOINTS
exports.setCredential = async (req, res, next) => {
  const { username, credentialID, publicKey, algorithm } = req.body;
  const user = await User.findOne({ username });
  if(!user){
    res.status(400).json({
      message: "User not found!",
    })
  }else{
    user.credentialID = credentialID;
    user.publicKey = publicKey;
    user.algorithm = algorithm;
    user.save().then(() => {
      res.status(201).json({ message: "Credentials succesfully updated!", algorithm: algorithm });
    })
  }
}

exports.getCredential = async(req, res, next) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if(!user){
    res.status(400).json({
      message: "User not found!",
    })
  } else{
    res.status(201).json({
      message: "Credentials found!",
      credentialID: user.credentialID,
      publicKey: user.publicKey,
      algorithm: user.algorithm,
    })
  }
}

exports.register = async (req, res, next) => {
    const { username, password, role, first_name, last_name, 
            email, mob_no } = req.body
    bcrypt.hash(password, 10).then(async (hash) => {
      await User.create({
        username,
        password: hash,
        role,
        first_name,
        last_name,
        email,
        mob_no,
      })
        .then((user) => {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, username, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs in sec
            }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });
          res.status(201).json({
            message: "User successfully created",
            user: user._id,
            status: 201
          });
        })
        .catch((error) =>
          res.status(400).json({
            message: "User not successful created",
            error: error.message,
            status: 400
          })
        );
    });
} 

exports.updateUserName = async (req, res, next) => {
  const { newUserName, id } = req.body;
  if ( newUserName) {
    await User.findById(id).then((user) => {
      if (user.username !== newUserName) {
        user.username = newUserName;
        user.save().then(() => {
          res.status(201).json({ message: "Update successful", newUsername: user.username });
        }).catch((err) => {
          if (err) {
            res
              .status(400) 
              .json({ message: "An error occurred 400 in", error: err.message });
              process.exit(1);
          }
        });
      } else {
        res.status(400).json({ message: "New username is already current username" });
      }
    }).catch((error) => {
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message });
    });
  }
}

exports.login = async (req, res, next) => {
  const { username, password } = req.body
  // Check if username and password is provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    })
  }
  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.status(400).json({
        message: "Login unsuccessful",
        error: "User not found",
      })
    } else {
      // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, username, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs in sec
            }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });
          res.status(201).json({
            message: "User successfully Logged in", 
            user: user._id,
          });
        } else {
          res.status(400).json({ message: "Login not succesful" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }
}

exports.getUser = async (req, res, next) => {
  const { username } = req.body
  try{
    const user = await User.findOne({ username })
    res.status(201).json({
      user: user,
      image: user.image,
      credentialID: user.credentialID,
      publicKey: user.publicKey,
      algorithm: user.algorithm
    }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getColleges = async (req, res, next) => {
  try{
    const data = await electionAdmin.find({}).then((data) => {
      res.status(201).json({
        message: "colleges loaded",
        data: data,
        result: true,
      })
    })
  }catch(err){
    res.status(400).json({
      message: "loading error",
      result: false,
    })
  }
}

exports.sendRequest = async (req, res, next) => {
  const { college, username, first_name, last_name, email, mob_no,
          course, branch, year } = req.body;

  await Requests.create({
    first_name,
    last_name,
    email,
    mob_no,
    college,
    course,
    branch,
    year
  }).then(async () => {
    const user = await User.findOne({ username });
    user.collegeRequested = true;
    user.save();
  }).then(() => {
    res.status(201).json({
      message: "Request created successfully",
      success: true,
    })
  }).catch((err) => {
    res.status(400).json({
      message: "request not created",
      error: err.message,
      success: false,
    })
  })
}

exports.getRequests = async (req, res, next) => {
  try{
    const data = await Requests.find({}).then((data) => {
      res.status(201).json({
        message: "requests loaded",
        data: data,
        result: true,
      })
    })
  }catch(err){
    res.status(400).json({
      message: "loading error",
      result: false,
    })
  }
}

exports.authRequest = async (req, res, next) => {
  const { email, college, course, branch, year } = req.body;

  await User.findOne({ email }).then((user) => {
    user.college = college;
    user.course = course;
    user.branch = branch;
    user.year = year;
    user.save().then(async () => {
      await Requests.deleteOne({ email: email });
    }).then(() => {
      res.status(201).json({
        message: "College details updated",
        userAuth: true,
      })
    })
  }).catch((err) => {
    res.status(500).json({
      message: "Server error!",
      error: err.message,
    })
  })
}

exports.deleteUser = async (req, res, next) => {
    const { id } = req.body
    await User.findById(id)
      .then(user => user.deleteOne())
      .then(user =>
        res.status(201).json({ message: "User successfully deleted", user })
      )
      .catch(error =>
        res
          .status(400)
          .json({ message: "An error occurred", error: error.message })
      )
} 

exports.updatePhoto = async (req,res, next) => {
  const { file, username } = req.body;

  const user = User.findOne({ username }).then((user) => {
    user.image = file;
    user.save().then(() => {
      res.status(201).json({
        message: "image updated",
        image: user.image,
        updated: true,
      })
    })
  }).catch((err) => {
    res.status(400).json({
      message: err.message,
      updated: false,
    })
  })
} 

//ELECTION API ENDPOINTS

exports.newElection = async (req, res, next) => {
  const { collegeName, electionName, deadline } = req.body;

  try{
    await Election.create({
      college: collegeName, 
      election_name: electionName,
      deadline: deadline,
    }).then(() => {
      res.status(201).json({
        message: "Election created!",
        created: true,
      })
    }).catch((err) => {
      res.status(400).json({
        message: err.message,
        created: false,
      })
    })
  }catch(error){
    res.status(500).json({
      message: error.message,
      m: "Internal server error!",
      created: false,
    })
  }
} 

exports.getElections = async (req, res, next) => {
  const { collegeName } = req.body;
  try{
    const elections = await Election.find({"college":collegeName});
    res.status(201).json({
      message: "elections loaded",
      data: elections,
    })
  }catch(err) {
    res.status(404).json({
      message: err.message,
      m: "Elections not found!",
    })
  }
} 

exports.newCandidate = async (req, res, next) => {
  const { election_name, data } = req.body;

  try{
    for(let item of data){
      await candidates.create({
        election_name: election_name,
        cand_name: item.cand_name,
        election_promise: item.promise, 
        video: item.video,
      });

      // const resp = await fetch("http://192.168.154.79:3001/addCandidate", {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     electionName: election_name,
      //     candidateName: item.cand_name,
      //     votes: 0,
      //   }),
      //   headers: {'Content-type':'application/json'},
      // });
    }
    res.status(201).json({
      message: "Candidate added",
      added: true,
    })
  }catch(err){
    res.status(400).json({
      message: err.message,
      added: false,
    })
  }
} 

exports.getCandidates = async (req, res, next) => {
  try{
    const data = await candidates.find({});
    res.status(201).json({
      message: "Candidates loaded",
      data: data,
    })
  }catch(err){
    res.status(400).json({
      message: "candidates not found!"
    })
  }
} 

exports.setVote = async (req, res, next) => {
  const { cand_name, username, election_name } = req.body;

  try{
    const cand = await candidates.findOne({ "cand_name":cand_name });
    if(!cand){
      res.status(400).json({
        message: "Candidate not found!"
      })
    }else{
      cand.votes++;
      cand.save().then(async () => {
        const user = await User.findOne({username});
        if(!user){
          res.status(404).json({
            message: "User not found!",
          })
        }else{
          user.votedElections.push(election_name);
          user.save().then(() => {
            res.status(201).json({
              message: "Voted!",
              candidate: cand,
            });
          })
        }
      });
    } 
  }catch(err){
    res.status(400).json({
      message: err.message,
    })
  } 
} 

exports.stopElec = async (req, res, next) => {
  const { elec_Name } = req.body;

  try {
      const elec = await Election.findOne({ "election_name":elec_Name })
      console.log(elec);
      if(!elec){
        res.status(404).json({ 
          message: "election not found!",
        })
      }else{
        elec.finished = true;
        elec.save().then(() => {
          res.status(201).json({
            message: "Election closed"
          })
        })
      }
  } catch(err){
    res.status(400).json({
      message: err.message
    })
  }
} 

exports.publishResults = async (req, res, next) => {
  const { election_name, cand_name, election_promise, votes } = req.body;

  try {
    await results.create({
      election_name,
      cand_name,
      election_promise,
      votes,
    }).then(() => {
      res.status(201).json({
        message: "Result published",
      })
    })
  }catch(err){
    res.status(400).json({
      message: err.message,
    })
  }
} 

exports.getResults = async (req, res, next) => {
  const { elecName } = req.body;

  try {
    const result = await results.findOne({ "election_name":elecName });
    if(!result){
      res.status(404).json({
        message: "Result not found"
      })
    }else {
      res.status(201).json({
        message: "Result found!",
        result: result,
      })
    }
  }catch(err){
    res.status(400).json({
      mesage: err.message,
    })
  }
}