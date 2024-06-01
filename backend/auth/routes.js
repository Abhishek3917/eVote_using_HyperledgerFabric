const express = require("express")
const router = express.Router()
const { register, login, getUser, deleteUser, updateUserName } = require("./auth")
const { setCredential, getCredential } = require("./auth");
const { adminAuth } = require("../middleware/auth")
const { electionAdminRegister, loginAdmin, getAdmin } = require("./auth");
const { getAdminCredential, setAdminCredential } = require('./auth');
const { getColleges, sendRequest, getRequests, authRequest } = require("./auth");
const { updatePhoto } = require("./auth");
const { setCourse, getCourses } = require("./auth");
const { setCourseUpdated } = require("./auth");
const { newElection, getElections } = require("./auth");
const { newCandidate, getCandidates } = require("./auth");
const { setVote } = require("./auth");
const { publishResults, getResults } = require("./auth");
const { stopElec } = require("./auth");

router.route("/deleteUser").delete(adminAuth, deleteUser);
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/getUser").post(getUser);
router.route("/updateUserName").put(updateUserName);
router.route("/setCredential").post(setCredential);
router.route("/getCredential").post(getCredential);
router.route("/updatePhoto").post(updatePhoto);
router.route("/setVote").post(setVote);
router.route("/stopElec").post(stopElec);
router.route("/getResults").post(getResults);
router.route("/pubResults").post(publishResults);

router.route("/electionAdminRegister").post(electionAdminRegister);
router.route("/loginAdmin").post(loginAdmin);
router.route("/getAdmin").post(getAdmin);
router.route("/setAdminCredential").post(setAdminCredential);
router.route("/getAdminCredential").post(getAdminCredential);
router.route("/setCourse").post(setCourse);
router.route("/getCourses").post(getCourses);
router.route("/setCourseUpdated").post(setCourseUpdated);

router.route("/getColleges").get(getColleges);
router.route("/sendRequest").post(sendRequest);
router.route("/getRequests").get(getRequests);
router.route("/authRequest").post(authRequest);

router.route("/newElection").post(newElection);
router.route("/getElections").post(getElections);
router.route("/newCandidate").post(newCandidate);
router.route("/getCandidates").get(getCandidates);

module.exports = router