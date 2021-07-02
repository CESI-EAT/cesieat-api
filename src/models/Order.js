const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    orderedBy: {
      type: Object,
      required: true,
      unique: false,
    },
    madeBy: {
      type: ObjectID,
      required: true,
      ref: 'Store',
      unique: false,
    },
    deliveryManId: {
      type: Number,
      unique: false,
    },
    status: {
      type: String,
      default: 'REQUESTED',
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
    },
    price: {
      type: Number,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel;
