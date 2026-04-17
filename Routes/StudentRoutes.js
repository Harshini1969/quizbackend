const express = require("express");
const router = express.Router();

const { studentAuth } = require("../middleware/auth");
const { dashboard } = require("../controllers/studentControllers");

router.get("/dashboard", studentAuth, dashboard);

module.exports = router;
