const product = require("../models/product");
const createProduct = require("../models/category");

exports.productList = async (req, res, next) => {
  try {
    const data = await product.find({});
    res.send(data);
  } catch (e) {
    console.log(e.message);
  }
};

exports.productPost = async (req, res, next) => {
  try {
    const data = await product.find({});
    res.send(data);
  } catch (e) {
    console.log(e.message);
  }
};

exports.productcreate = async (req, res) => {
  try {
    const data = await createProduct.find({});

    res.render("create", { categories: data });
  } catch (e) {
    console.log(e.message);
  }
};
