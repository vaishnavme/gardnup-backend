const express = require('express');
const router = express.Router();
const { getUserCart } = require('../controllers/params');
const { orders } = require('../controllers/order.controller');
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
router.post('/payment', orders);
router.post('/:productId', getUserCart, updateCartQuantity);
router.delete('/:productId', getUserCart, removeFormCart);

module.exports = router;
