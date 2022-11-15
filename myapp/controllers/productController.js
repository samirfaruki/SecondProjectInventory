const product = require("../models/product");

exports.productList = async (req, res, next) => {
  try {
    const data = await product.find({});
    res.send(data);
  } catch (e) {
    console.log(e.message);
  }
};
