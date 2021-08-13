const express = require("express");
const router = express.Router();
const { toggleWishlistItems, getWislist } = require("../controllers/wishlist.controller");
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);
router.get("/", getWislist);
router.post("/:userId/:productId", toggleWishlistItems);

module.exports = router;