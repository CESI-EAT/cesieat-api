const User = require('../models/User');
const userController = {};

userController.getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

userController.getOneById = async (req, res) => {
  try {
    const user = User.findOne({ where: { id: req.params.id } });
    if (user === null) res.status(401).json({ success: false, message: 'User not found !' });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

userController.addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

userController.deleteById = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(200).json({ success: true, message: 'Deleted with success' });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = userController;
