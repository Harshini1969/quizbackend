const UserModel = require("../model/UserModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await UserModel.findByIdAndDelete(id);

    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

module.exports = {
  getAllUsers,
  deleteUser
};