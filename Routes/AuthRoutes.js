const express = require("express");
const router = express.Router();

const {registerUser,loginUser,getProfile} = require("../controllers/authControllers");

const { studentAuth } = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", studentAuth, getProfile);

module.exports = router;