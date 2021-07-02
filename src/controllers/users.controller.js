const { User, Role } = require('../models');
const Order = require('../models/Order');
const userController = {};

userController.findAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(401).json({ success: false, message: err });
  }
};

userController.findUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (user === null) res.status(401).json({ success: false, message: 'User not found !' });
    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ success: false, message: err });
  }
};

userController.getOrders = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      include: [{ model: Role, as: 'role' }],
    });
    if (user === null) res.status(401).json({ success: false, message: 'User not found !' });
    const filter = {};
    filter.status = 'DELIVERED';
    if (user.role.name === 'Consommateur') filter['orderedBy.id'] = parseInt(req.params.id);
    if (user.role.name === 'Livreur') filter['deliveredBy.id'] = parseInt(req.params.id);
    const filterPopulate = {};
    if (user.role.name === 'Restaurateur') {
      filterPopulate.path = 'madeBy';
      filterPopulate.match = { userId: req.params.id };
    }

    const orders = await Order.find(filter).populate(filterPopulate);

    res.status(200).json(orders);
  } catch (err) {
    res.status(401).json({ success: false, message: err });
  }
};

userController.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(401).json({ success: false, message: err });
  }
};

userController.updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    Object.assign(user, req.body);
    await user.save();
    res.status(200).json({ success: true, user, message: 'Updated with success' });
  } catch (err) {
    res.status(401).json({ success: false, message: err });
  }
};

userController.deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(200).json({ success: true, message: 'Deleted with success' });
  } catch (err) {
    res.status(401).json({ success: false, message: err });
  }
};

module.exports = userController;
