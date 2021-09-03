const { Cart } = require('../models/cart.model');
const { extend } = require('lodash');

const populateOption = {
    path: 'cartItems.product',
    select: 'name price image quantity size'
};

const getCart = async (req, res) => {
    try {
        const { user } = req;
        const cart = await Cart.findOne({ user: user.userId }).populate(
            populateOption
        );
        res.json({
            success: true,
            cart
        });
    } catch (err) {
        res.status(503).json({ success: false, error: err.message });
    }
};

const addItemToCart = async (req, res) => {
    try {
        const { user } = req;
        const { productId } = req.body;

        const currentCart = await Cart.findOne({ user: user.userId });

        if (currentCart) {
            // adding to existing cart
            const addNewItem = extend(currentCart, {
                cartItems: [...currentCart.cartItems, { product: productId }]
            });
            const newResponse = await addNewItem.save();
            return res.json({
                success: true,
                newResponse
            });
        } else {
            //creating new cart
            const newCart = new Cart({
                user: user.userId,
                cartItems: [
                    {
                        product: productId
                    }
                ]
            });
            const newResponse = newCart.save();
            return res.json({
                success: true,
                newResponse
            });
        }
    } catch (err) {
        res.status(503).json({
            success: false,
            message: `Error Occured: ${err}`
        });
    }
};

const updateCartQuantity = async (req, res) => {
    try {
        const { cart } = req;
        const { productId } = req.params;
        const { quantity } = req.body;
        if (cart) {
            cart.cartItems.map((item) => {
                if (item.product == productId) {
                    item = extend(item, { quantity: quantity });
                }
            });
            cart.save();
        }
        res.status(200).json({
            success: true,
            productId: productId
        });
    } catch (err) {
        res.status(503).json({
            success: false,
            message: `cannot remove from cart ERROR ${err}`
        });
    }
};

const removeFormCart = async (req, res) => {
    try {
        const { cart } = req;
        const { productId } = req.params;
        if (cart) {
            const updateCartItems = cart.cartItems.filter(
                (prevItem) => prevItem.product != productId
            );
            cart.cartItems = updateCartItems;

            const newResponse = await cart.save();
            res.status(200).json({
                success: true,
                productId: productId
            });
        }
    } catch (err) {
        res.status(503).json({
            success: false,
            message: `cannot remove from cart ERROR ${err}`
        });
    }
};

module.exports = {
    getCart,
    addItemToCart,
    updateCartQuantity,
    removeFormCart
};
