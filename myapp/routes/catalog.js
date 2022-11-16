const express = require("express");
const router = express.Router();
const CategoryRouter = require("../controllers/categoryController");
const productRouter = require("../controllers/productController");
const createRouter = require("../controllers/productController");
router.get("/", CategoryRouter.CategoryList);
router.get("/catalog/category/:id", CategoryRouter.CategoryById, () => {
  console.log("hello");
});
router.get("/product", productRouter.productList);
router.get("/Category/createItem", createRouter.productcreate);




router.post("/createItem", async (req, res) => {
  console.log("createitem");

  var newitem = new itemSchema({
    P_name: req.body.P_name,

    p_description: req.body.p_description,

    P_category: req.body.P_category,

    P_price: req.body.P_price,

    p_quantity: req.body.p_quantity,

    src: req.body.src,
  });

  console.log(newitem);

  newitem.save(function (err) {
    if (err) throw err;

    res.redirect("/");
  });
});

module.exports = router;
