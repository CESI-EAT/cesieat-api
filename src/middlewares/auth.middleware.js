const passport = require('passport');
const { Role } = require('../models');

const getRole = (name) => Role.findOne({ where: { name } });

const isLoggedIn = (req, res, next) =>
  passport.authenticate('jwt', { session: false })(req, res, next);

const requireAdmin = async (req, res, next) => {
  const role = await getRole('Administrateur');
  if (req.user.roleId === role.id) {
    next();
  } else {
    res.send(401, 'Unauthorized');
  }
};

const requireClient = async (req, res, next) => {
  const role = await getRole('Consommateur');
  if (req.user.roleId === role.id) {
    next();
  } else {
    res.send(401, 'Unauthorized');
  }
};

const requireDeliver = async (req, res, next) => {
  const role = await getRole('Livreur');
  if (req.user.roleId === role.id) {
    next();
  } else {
    res.send(401, 'Unauthorized');
  }
};

const requireDeveloper = async (req, res, next) => {
  const role = await getRole('Service technique');
  if (req.user.roleId === role.id) {
    next();
  } else {
    res.send(401, 'Unauthorized');
  }
};

const requireCommercial = async (req, res, next) => {
  const role = await getRole('Service commercial');
  if (req.user.roleId === role.id) {
    next();
  } else {
    res.send(401, 'Unauthorized');
  }
};

const requireRestorer = async (req, res, next) => {
  const role = await getRole('Restaurateur');
  if (req.user.roleId === role.id) {
    next();
  } else {
    res.send(401, 'Unauthorized');
  }
};

module.exports = {
  requireAdmin,
  requireClient,
  requireDeliver,
  requireDeveloper,
  requireCommercial,
  requireRestorer,
  isLoggedIn,
};
