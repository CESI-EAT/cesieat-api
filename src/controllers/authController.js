const utils = require('../services/utils');
const User = require('../models/User');
const authController = {};

authController.register = async (req, res, next) => {
  const { password } = req.body;
  const password_hashed = await utils.hashString(password);
  User.create({ ...req.body, password: password_hashed })
    .then((user) => {
      const jwt = utils.createJWT(user);
      res.json({
        success: true,
        user: user,
        token: jwt.token,
        expiresIn: jwt.expires,
      });
    })
    .catch((err) => next(err));
};

authController.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.scope('withPassword').findOne({ where: { email: email } });
    if (user === null) {
      res.status(401).json({ success: false, message: 'Could not find user' });
    }

    const isValid = await utils.compareStringWithHash(password, user.password);
    if (isValid) {
      const jwt = utils.createJWT(user);
      res.cookie('jwt', jwt.token, { httpOnly: true, maxAge: jwt.expires });
      res.status(200).json({ success: true, token: jwt.token, expiresIn: jwt.expires });
    } else {
      res.status(401).json({ success: false, message: 'Your entered the wrong password' });
    }
  } catch (err) {
    return next(err);
  }
};

authController.logout = async (req, res, next) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ success: true, message: 'Bye bye' });
};

authController.getProfile = async (req, res, next) => {
  res.json({
    success: true,
    user: req.user,
  });
};

module.exports = authController;
