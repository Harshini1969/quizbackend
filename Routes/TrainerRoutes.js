const express = require("express");
const router = express.Router();

const { trainerAuth } = require("../middleware/auth");
const { getStudents } = require("../controllers/trainerControllers");

router.get("/students", trainerAuth, getStudents);

module.exports = router;