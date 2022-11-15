const express = require("express");
const router = express.Router();
const CategoryRouter = require("../controllers/categoryController");
const productRouter = require("../controllers/productController");
router.get("/", CategoryRouter.CategoryList);
router.get("/product", productRouter.productList);

module.exports = router;
