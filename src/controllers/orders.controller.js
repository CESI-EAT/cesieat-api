const Order = require('../models/Order');
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
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

orderController.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(200).json(order);
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

orderController.findOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
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
    const order = await Order.findById(req.params.id);
    Object.assign(order, { status: getNextStatus(order.status) });
    await order.save();
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};
module.exports = orderController;