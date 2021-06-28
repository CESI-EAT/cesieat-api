const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const TagModel = mongoose.model('Tag', TagSchema);

module.exports = TagModel;
