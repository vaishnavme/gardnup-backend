const express = require("express");
const router = express.Router();
const { getUserById, getUserWishlist, getProductByID } = require("../controllers/params");
const { toggleWishlistItems, getWislist } = require("../controllers/wishlist.controller");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);
router.param("userId", getUserById);
router.param("userId", getUserWishlist);
router.param("productId", getProductByID);
router.get("/:userId", getWislist);
router.post("/:userId/:productId", toggleWishlistItems);


module.exports = router;