const Store = require('../models/Store');
const storeController = {};

storeController.getAll = async (req, res) => {
  try {
    const stores = await Store.find({});
    res.status(200).json(stores);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = storeController;
