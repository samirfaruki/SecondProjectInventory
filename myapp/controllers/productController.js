const product = require("../models/product");
const createProduct = require("../models/category");
const ProductSchema = require("../models/product");
const mongoose = require("mongoose");

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
exports.postproduct = async (req, res) => {
  console.log("createitem");

  var newitem = new ProductSchema({
    P_name: req.body.P_name,

    P_discription: req.body.P_discription,

    P_category: req.body.P_category,

    P_price: req.body.P_price,

    P_quantity: req.body.P_quantity,

    src: req.body.src,
  });

  console.log(newitem);

  newitem.save(function (err) {
    if (err) throw err;

    res.send("updated");
  });
};

exports.updateProduct = async (req, res) => {
  try {
    const dataupdate = await ProductSchema.updateOne(
      { "_id": mongoose.Types.ObjectId(req.params.id.trim()) },
      {
        P_name: req.body.P_name,

        P_discription: req.body.P_discription,

        P_category: req.body.P_category,

        P_price: req.body.P_price,

        P_quantity: req.body.P_quantity,

        src: req.body.src,
      }
    );
    res.send(dataupdate);
  } catch (e) {
    console.log(e.message);
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const datadeleted = await ProductSchema.findByIdAndDelete(
      { "_id": mongoose.Types.ObjectId(req.params.id.trim()) },
     
    );
    res.send(datadeleted);
  } catch (e) {
    console.log(e.message);
  }
};
