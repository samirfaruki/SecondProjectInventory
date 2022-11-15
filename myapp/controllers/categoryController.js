const Categ = require("../models/category");

exports.CategoryList = async (req, res, next) => {
  try {
    const data = await Categ.find({});
    res.send(data);
  } catch (e) {
    console.log(e.message);
  }
};
