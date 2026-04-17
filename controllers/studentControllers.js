const UserModel = require("../model/UserModel");

const dashboard = (req, res) => {
  res.json({ message: "Student Dashboard" });
};

module.exports = {
  dashboard
};