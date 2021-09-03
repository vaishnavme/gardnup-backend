const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
    toggleWishlistItems,
    getWislist
} = require('../controllers/wishlist.controller');

router.use(verifyToken);
router.get('/', getWislist);
router.post('/:productId', toggleWishlistItems);

module.exports = router;
