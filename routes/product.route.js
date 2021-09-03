const express = require('express');
const router = express.Router();
const { getProductByID } = require('../controllers/params');
const {
    getAllProducts,
    addNewProduct,
    getProductDetails,
    updateProductDetails
} = require('../controllers/product.controller');

router.get('/', getAllProducts);
router.post('/', addNewProduct);

router.param('productId', getProductByID);
router.get('/:productId', getProductDetails);
router.post('/productId', updateProductDetails);

module.exports = router;
