const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: {
    type: Number,
    required: true,
    unique: false,
  },
  storeId: {
    type: ObjectID,
    required: true,
    unique: false,
  },
  deliveryManId: {
    type: Number,
    unique: false,
  },
  status: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  deliverTime: {
    type: String,
    required: true,
  },
  interactionType: {
    type: String,
    required: true,
  },
  specialInstructions: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  articles: {
    type: Array,
    required: true,
  },
});

const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel;
