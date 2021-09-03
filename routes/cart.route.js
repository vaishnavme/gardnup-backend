const express = require('express');
const router = express.Router();
const { getUserCart } = require('../controllers/params');
const verifyToken = require('../middleware/verifyToken');
const {
    addItemToCart,
    removeFormCart,
    updateCartQuantity,
    getCart
} = require('../controllers/cart.controller');

router.use(verifyToken);

router.get('/', getCart);
router.post('/', addItemToCart);
router.post('/:productId', getUserCart, updateCartQuantity);
router.delete('/:productId', getUserCart, removeFormCart);

module.exports = router;
