const Order = require('../models/Order');
const { User } = require('../models');
const Store = require('../models/Store');

const orderController = {};
const orderState = ['REQUESTED', 'ACCEPTED', 'PREPARED', 'DELIVERY', 'DELIVERED'];

const getNextStatus = (status) => {
  if (status === orderState[orderState.length - 1]) {
    return orderState[orderState.length - 1];
  } else {
    const nextStatus = orderState[orderState.findIndex((s) => s === status) + 1];
    console.log(nextStatus);
    return nextStatus;
  }
};

orderController.findAll = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role.name === 'Restaurateur') {
      const store = await Store.findOne({ userId: req.user.id });
      filter.madeBy = store.id;
      filter.status = { $ne: 'DELIVERED' };
    } else if (req.user.role.name === 'Livreur') {
      filter.status = { $in: ['PREPARED', 'DELIVERY'] };
    } else {
      filter['orderedBy.id'] = req.user.id;
      filter.status = { $ne: 'DELIVERED' };
    }
    console.log('filter: ', filter);
    const orders = await Order.find(filter).populate('madeBy');
    res.status(200).json(orders);
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

orderController.createOrder = async (req, res) => {
  try {
    const order = await Order.create({ ...req.body, orderedBy: req.user.dataValues });
    res.status(201).json(order);
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

orderController.findOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('madeBy');
    res.status(200).json(order);
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

orderController.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

orderController.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Deleted with success' });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

orderController.validateStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('madeBy');
    if (order.status === 'PREPARED') {
      order.deliveryManId = req.user.id;
      order.deliveredBy = req.user.dataValues;
    }
    order.status = getNextStatus(order.status);
    console.log('order: ', order);
    await order.save();
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};
module.exports = orderController;
