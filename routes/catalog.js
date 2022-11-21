const express = require("express");
const router = express.Router();
const CategoryRouter = require("../controllers/categoryController");
const productRouter = require("../controllers/productController");
const createRouter = require("../controllers/productController");
const postRouter = require("../controllers/productController");
const Categ = require("../models/category");
router.get("/", CategoryRouter.CategoryList);
router.get("/catalog/category/:id", CategoryRouter.CategoryById, () => {
  console.log("hello");
});
router.get("/product", productRouter.productList);
router.get("/Category/createItem", createRouter.productcreate);

router.get('/catalog', async function(req, res){
  try {
    const data = await Categ.find({});
    console.log(data);
    res.render("index", {
      data: data,
      display: "true",
    });
  } catch (e) {
    console.log(e.message);
  }
})

router.post("/Category/createItem", postRouter.postproduct);
router.patch("/productUpdate/:id", productRouter.updateProduct);
router.delete("/productDelete/:id", productRouter.deleteProduct);
module.exports = router;
