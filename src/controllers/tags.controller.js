const Tag = require('../models/Tag');
const tagController = {};

tagController.findAll = async (req, res) => {
  try {
    //Query to find a stores based on it's name, adress, city, postal, or code
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (err) {
    res.status('401').json({ success: false, message: err.message });
  }
};

module.exports = tagController;
