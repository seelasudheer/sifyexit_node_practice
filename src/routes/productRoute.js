const express = require("express");
const router = express.Router();
const {
  fetchProducts,
  addNewProduct,
  deleteProduct,
  updateProduct,
  fetchByCategories,
  fetchSelectedCategories,
} = require("../controllers/productsController");

router.get("/fetchAll", fetchProducts);
router.get("/fetchByCategories", fetchByCategories);
router.post("/fetchOptedCategories", fetchSelectedCategories);
router.post("/addProduct", addNewProduct);
router.post("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
