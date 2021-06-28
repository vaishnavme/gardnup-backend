const express = require("express");
const router = express.Router();
const { getAllProducts, addNewProduct, getProductDetails, updateProductDetails } = require("../controllers/product.controller");
const { getProductByID } = require("../controllers/params");

router.get("/", getAllProducts);
router.post("/", addNewProduct);

router.param("productId", getProductByID);
router.get("/:productId", getProductDetails);
router.post("/productId", updateProductDetails)


module.exports = router;