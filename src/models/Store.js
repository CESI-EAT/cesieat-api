const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  openingHours: {
    type: Object,
  },
  priceRange: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  ratingCount: {
    type: Number,
  },
  takeaway: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const StoreModel = mongoose.model('store', StoreSchema);

module.exports = StoreModel;
