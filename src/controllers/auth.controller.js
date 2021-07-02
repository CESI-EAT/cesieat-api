const utils = require('../services/utils');
const { User, Role, Log } = require('../models');
const authController = {};

authController.register = async (req, res, next) => {
  const { password } = req.body;
  const password_hashed = await utils.hashString(password);
  User.create({ ...req.body, password: password_hashed })
    .then((user) => {
      const jwt = utils.createJWT(user);
      res.cookie('jwt', jwt.token, { maxAge: jwt.expires });
      res.json({
        success: true,
        user,
      });
    })
    .catch((err) => next(err));
};

authController.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.scope('withPassword').findOne({ where: { email: email } });
    if (!user) {
      res.status(401).json({ success: false, message: 'Could not find user' });
      return;
    }

    const isValid = await utils.compareStringWithHash(password, user.password);
    if (isValid) {
      const jwt = utils.createJWT(user);
      await Log.create({ type: 'Connected', userId: user.id });
      res.cookie('jwt', jwt.token, {
        maxAge: jwt.expires,
        SameSite: 'none',
        secure: true,
      });
      res.status(200).json({ success: true, message: 'You are login !' });
    } else {
      const isValid = await utils.compareStringWithHash(password, user.password);
      if (isValid) {
        const jwt = utils.createJWT(user);
        await Log.create({ type: 'Connected', userId: user.id });
        res.cookie('jwt', jwt.token, {
          httpOnly: true,
          maxAge: jwt.expires,
        });
        res.status(200).json({ success: true, message: 'You are login !' });
      } else {
        res.status(401).json({ success: false, message: 'Your entered the wrong password !' });
      }
    }
  } catch (err) {
    return next(err);
  }
};

authController.logout = async (req, res, next) => {
  await Log.create({ type: 'Disconnected', userId: req.user.id });
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ success: true, message: 'Bye bye' });
};

authController.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.scope('withPassword').findOne({ where: { id: req.user.id } });
    const isValid = await utils.compareStringWithHash(currentPassword, user.password);
    if (isValid) {
      const new_password_hashed = await utils.hashString(newPassword);
      const user = await User.findOne({
        where: { id: req.user.id },
      });
      Object.assign(user, { password: new_password_hashed });
      await user.save();
      res.status(200).json({ success: true, message: 'Your password has been  updated !' });
    } else {
      res.status(401).json({ success: false, message: 'Your entered the wrong password !' });
    }
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

authController.getProfile = async (req, res, next) => {
  const user = await User.findOne({
    where: { id: req.user.id },
    include: [{ model: Role, as: 'role' }],
  });
  res.json(user);
};

authController.getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = authController;
