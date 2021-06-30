const { Log } = require('../models');
const logsController = {};

logsController.findAll = async (req, res) => {
  try {
    const logs = await Log.findAll();
    res.status(200).json(logs);
  } catch (err) {
    res.status('401').json({ success: false, message: err.message });
  }
};

logsController.createLog = async (req, res) => {
  try {
    const log = await Log.create(req.body);
    res.status(200).json({ success: true, log });
  } catch (err) {
    res.status('401').json({ success: false, message: err.message });
  }
};

module.exports = logsController;
