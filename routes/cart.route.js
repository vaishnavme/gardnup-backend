const express = require("express");
const router = express.Router();
const { getUserById, getProductByID, getUserCart } = require("../controllers/params");
const { addItemToCart, removeFormCart, updateCartQuantity, getCart } = require("../controllers/cart.controller");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);

router.get("/", getCart);
router.post("/", addItemToCart);
router.post("/:productId", getUserCart, updateCartQuantity);
router.delete("/:productId",getUserCart, removeFormCart)

module.exports = router;