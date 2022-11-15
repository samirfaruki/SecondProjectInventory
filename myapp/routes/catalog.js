const express = require("express");
const router = express.Router();
const CategoryRouter = require("../controllers/categoryController");
const productRouter = require("../controllers/productController");
router.get("/", CategoryRouter.CategoryList);
router.get("/catalog/category/:id", CategoryRouter.CategoryById, () => {
  console.log("hello yahi hai");
});
router.get("/product", productRouter.productList);

module.exports = router;
