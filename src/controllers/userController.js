const User = require('../models/User');
const userController = {};
const { getRequest } = require('../services/sqlConnector.js');

userController.getAll = async (req, res) => {
  try {
    getRequest().query('select * from Users', function (err, result) {
      if (err) console.log(err);
      // send records as a response
      console.log(result);
      res.send(result.recordset);
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

userController.getOneById = async (req, res) => {
  try {
    getRequest().query('select * from UserView WHERE Id=' + req.params.id, function (err, result) {
      if (err) console.log(err);
      // send records as a response
      console.log(result);
      res.send(result.recordset);
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

userController.addUser = async (req, res) => {
  try {
    //TODO: SQL request
    getRequest().query('delete * from Users WHERE Id=' + req.params.id, function (err, result) {
      if (err) console.log(err);
      res.send('coucou');
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

userController.deleteById = async (req, res) => {
  try {
    getRequest().query('delete * from Users WHERE Id=' + req.params.id, function (err, result) {
      if (err) console.log(err);
      res.send('user deleted');
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = userController;
