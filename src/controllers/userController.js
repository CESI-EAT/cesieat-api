const User = require('../models/User');
const userController = {};
const sqlC = require('../services/sqlConnector.js');

userController.getAll = async (req, res) => {
  try {
    sqlC.getUser()
    res.send("good old bitches");
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = userController;
