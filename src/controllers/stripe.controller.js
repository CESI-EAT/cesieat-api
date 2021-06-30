const paymentsController = {};
const Publishable_Key = 'pk_test_F5UFRy9rcym7iLRTtaH55jGu';
const Secret_Key = 'sk_test_Czcmd6nNU3pu0sUjKGT3TYAf';
const stripe = require('stripe')(Secret_Key);

paymentsController.createProduct = async (req, res) => {
  try {
    var product = await stripe.products.create({
      name: req.body.name,
    });

    var price = await stripe.prices.create({
      unit_amount: req.body.price,
      currency: 'eur',
      product: product.id,
    });
    res.status(200).json({ success: true, productInfos: product, priceInfos: price });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

paymentsController.findProduct = async (req, res) => {
  try {
    var product = await stripe.products.retrieve(req.params.id);
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

paymentsController.findProductPrice = async (req, res) => {
  try {
    var product = await stripe.products.retrieve(req.params.id);
    console.log(product);
    var prices = await stripe.prices.list({
      product: product.id,
    });
    console.log(prices);
    res.status(200).json({ success: true, prices });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

module.exports = paymentsController;
