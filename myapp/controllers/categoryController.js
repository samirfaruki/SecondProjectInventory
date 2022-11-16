const Categ = require("../models/category");
const product = require("../models/product");
exports.CategoryList = async (req, res, next) => {
  try {
    const data = await Categ.find({});
    console.log(data);
    res.render("index", {
      data: data,
      title: " hello this is my first proect in pug",
    });
  } catch (e) {
    console.log(e.message);
  }
};

exports.CategoryById = async (req, res, next) => {
  try {
    var id = req.params.id;
    const data = await product.find({});

    var result = [];
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      if (data[i].P_category == id) {
        result.push(data[i]);
      }
    }

    res.render("display", { product: result });
  } catch (e) {
    console.log(e.message);
  }
};
