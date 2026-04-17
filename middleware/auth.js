const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserModel");

const verifyToken = async (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return { error: "No token provided" };
  const token = authHeader.split(" ")[1];
  if (!token) return { error: "Token missing" };
   try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    if (!user) return { error: "User not found" };

    return { user };

  } catch (err) {
    return { error: "Invalid or expired token" };
  }
};

const adminAuth = async (req, res, next) => {
  try {
    const result = await verifyToken(req);

    if (result.error) {
      return res.status(401).json({ message: result.error });
    }

    if (result.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    req.userId = result.user._id;
    next();

  } catch (err) {
    res.status(500).json({ message: "Auth error" });
  }
};

const trainerAuth = async (req, res, next) => {
  try {
    const result = await verifyToken(req);

    if (result.error) {
      return res.status(401).json({ message: result.error });
    }

    if (result.user.role !== "trainer") {
      return res.status(403).json({ message: "Trainer only" });
    }

    req.userId = result.user._id;
    next();

  } catch (err) {
    res.status(500).json({ message: "Auth error" });
  }
};

const studentAuth = async (req, res, next) => {
  try {
    const result = await verifyToken(req);

    if (result.error) {
      return res.status(401).json({ message: result.error });
    }

    if (result.user.role !== "student") {
      return res.status(403).json({ message: "Student only" });
    }

    req.userId = result.user._id;
    next();

  } catch (err) {
    res.status(500).json({ message: "Auth error" });
  }
};

module.exports = {
  adminAuth,
  trainerAuth,
  studentAuth
};