const Categ = require("../models/category");

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
