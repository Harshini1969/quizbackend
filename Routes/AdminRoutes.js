const express = require("express");
const router = express.Router();

const { adminAuth } = require("../middleware/auth");
const { getAllUsers, deleteUser } = require("../controllers/adminControllers");

router.get("/users", adminAuth, getAllUsers);
router.delete("/user/:id", adminAuth, deleteUser);

module.exports = router;