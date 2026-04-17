const UserModel = require("../model/UserModel");

const getStudents = async (req, res) => {
  try {
    const students = await UserModel.find({ role: "student" });
    res.json({ students });
  } catch (err) {
    res.status(500).json({ message: "Error fetching students" });
  }
};

module.exports = {
  getStudents
};