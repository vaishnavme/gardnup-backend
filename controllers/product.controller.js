const { Product } = require('../models/product.model');
const { extend } = require('lodash');

const getAllProducts = async (req, res) => {
    try {
        const product = await Product.find({});
        res.json({
            product,
            success: true
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'unable to fetch data from server'
        });
    }
};

const addNewProduct = async (req, res) => {
    try {
        const product = req.body;
        const NewProduct = new Product(product);
        const savedProduct = await NewProduct.save();

        res.json({
            product: savedProduct,
            suceess: true
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `unable to update data ERROR: ${err}`
        });
    }
};

const getProductDetails = async (req, res) => {
    const product = req.product;
    res.json({
        product,
        success: true
    });
};

const updateProductDetails = async (req, res) => {
    try {
        const productUpdates = req.body;
        let { product } = req;
        product = extend(product, productUpdates);
        product = await product.save();
        res.status(200).json({
            success: true,
            product
        });
    } catch (err) {
        res.status(503).json({
            success: false,
            message: `unable to update data ERROR: ${err}`
        });
    }
};

module.exports = {
    getAllProducts,
    addNewProduct,
    getProductDetails,
    updateProductDetails
};
