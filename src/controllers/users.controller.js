const { User } = require('../models');
const userController = {};

userController.findAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

userController.findUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (user === null) res.status(401).json({ success: false, message: 'User not found !' });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

userController.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

userController.updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    Object.assign(user, req.body);
    await user.save();
    res.status(200).json({ success: true, user, message: 'Updated with success' });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

userController.deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(200).json({ success: true, message: 'Deleted with success' });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = userController;
