const UserModel = require("../model/UserModel");
const jwt = require("jsonwebtoken");

// REGISTER
const registerUser = async (req, res) => {
  try {
    let data = req.body;

    let existing = await UserModel.findOne({ email: data.email });

    if (existing) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    await UserModel.create(data);

    res.json({
      message: "Registered successfully"
    });

  } catch (err) {
    res.status(500).json({
      message: "Registration failed"
    });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await UserModel.findOne({ email, password });

    if (!user) {
      return res.status(401).json({
        message: "Login Failed"
      });
    }

    let token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role
    });

  } catch (err) {
    res.status(500).json({
      message: "Login failed"
    });
  }
};

// PROFILE
const getProfile = async (req, res) => {
  try {
    const user = await UserModel
      .findById(req.userId)
      .select("-password");

    res.json(user);

  } catch (err) {
    res.status(500).json({
      message: "Error fetching profile"
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile
};