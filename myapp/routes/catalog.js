const express = require("express");
const router = express.Router();
const CategoryRouter = require("../controllers/categoryController");
const productRouter = require("../controllers/productController");
const createRouter = require("../controllers/productController");
const postRouter = require("../controllers/productController");
router.get("/", CategoryRouter.CategoryList);
router.get("/catalog/category/:id", CategoryRouter.CategoryById, () => {
  console.log("hello");
});
router.get("/product", productRouter.productList);
router.get("/Category/createItem", createRouter.productcreate);

router.post("/Category/createItem", postRouter.postproduct);
router.patch("/productUpdate/:id", productRouter.updateProduct);
router.delete("/productDelete/:id", productRouter.deleteProduct);
module.exports = router;
