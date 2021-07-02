const Order = require('../models/Order');
const { User } = require('../models');

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

orderController.findAllByDay = async (req, res) => {
  try {
    const estimate = await Order.estimatedDocumentCount();
    const orders = await Order.find();
    console.log(`Estimated number of documents in the orders collection: ${estimate}`);
    console.log(orders[0].createdAt);
    const query = { createdAt: '2021-07-01' };
    const orderCount = await Order.countDocuments(query);

    console.log('order count : ' + orderCount);
    res.status(200).json(orderCount);
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

orderController.findAll = async (req, res) => {
  try {
    const orders = await Order.find().populate('madeBy');
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
    const order = await Order.findById(req.params.id);
    if (order.status === 'PREPARED') {
      order.deliveryManId = req.user.id;
      order.deliveredBy = req.user;
    }
    order.status = getNextStatus(order.status);
    await order.save();
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};
module.exports = orderController;
