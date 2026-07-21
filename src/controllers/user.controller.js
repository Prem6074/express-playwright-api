const User = require("../models/User");

const getUsers = async (req, res) => {
  const users = await User.find().select("-password");

  res.status(200).json(users);
};

const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.status(200).json(user);
};

module.exports = {
  getUsers,
  getProfile,
};