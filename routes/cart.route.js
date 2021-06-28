const express = require("express");
const router = express.Router();
const { getUserById, getProductByID, getUserCart } = require("../controllers/params");
const { addItemToCart, removeFormCart, updateCartQuantity, getCart } = require("../controllers/cart.controller");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);
router.param("userId", getUserById);
router.param("userId", getUserCart);
router.param("productId", getProductByID);
router.get("/:userId", getCart);
router.post("/:userId", addItemToCart);
router.post("/:userId/:productId", updateCartQuantity);
router.delete("/:userId/:productId", removeFormCart)

module.exports = router;