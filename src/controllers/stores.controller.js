const Store = require('../models/Store');
const storeController = {};

storeController.findAll = async (req, res) => {
  try {
    //Query to find a stores based on it's name, adress, city, postal, or code
    if (req.query && req.query.search) {
      const regex = new RegExp(`${req.query.search}`, 'i');
      const store = await Store.find({
        $or: [{ name: regex }, { address: regex }, { city: regex }, { postalCode: regex }],
      }).exec();
      console.log(regex);
      res.status(200).json(store);
    }
    //Query to find stores with a price range lower than given
    else if (req.query && req.query['price-range']) {
      const priceRange = parseInt(req.query['price-range']);
      const store = await Store.find({ priceRange: { $lt: priceRange } });
      res.status(200).json(store);
    }
    //Else fin all
    else {
      const stores = await Store.find();
      res.status(200).json(stores);
    }
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

storeController.createStore = async (req, res) => {
  try {
    const store = await Store.create(req.body);
    res.status(200).json(store);
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

storeController.findStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    res.status(200).json(store);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

storeController.updateStore = async (req, res) => {
  try {
    const store = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, store: store });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

storeController.deleteStore = async (req, res) => {
  try {
    await Store.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Deleted with success' });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};
module.exports = storeController;
