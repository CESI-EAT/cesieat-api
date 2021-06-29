const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderState = {
    REQUESTED: "requested",
    ACCEPTED: "accepted",
    PREPARED: "prepared",
    DELIVERY: "delivery",
    DELIVERED: "delivered"
}

const OrderSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        unique: true,
    },
    storeId: {
        type: Number,
        required: true,
        unique: true,
    },
    deliveryManId: {
        type: Number,
        unique: true,
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

const OrderModel = mongoose.model('order', OrderSchema);

module.exports = OrderModel;