const { Cart } = require("../models/cart.model");
const { User } = require("../models/user.model");
const { Product } = require("../models/product.model");
const { Wishlist } =require("../models/wishlist.model");

const getProductByID = async (req, res, next, productId) => {
    try {
        const product = await Product.findById(productId);
        if(!product) {
            return res.status(400).json({
                success: false,
                message: "Error getting product",
            })
        }
        req.product = product;
        next()
    } catch (err) {
        res.json({
            success: false,
            message: "Cannot fetch product"
        })
    }
}

const getCategoryProducts = async (req, res, next, category) => {
    try {
        const product = await Product.find({category});
        
        if(!product) {
            return res.status(400).json({
                success: false,
                message: "Error getting product of catrgory",
            })
        }
        req.product = product;
        next()
    } catch (err) {
        res.json({
            success: false,
            message: "Cannot fetch product"
        })
    }
}

const getUserCart = async(req, res, next) => {
    try{
        const { user, product } = req
        const cart = await Cart.findOne({user: user._id})
        req.cart = cart;
        next();
    }
    catch(err) {
        res.status(503).json({ success:false, error:err.message })
    }
}

const getUserWishlist = async(req, res, next) => {
    try{
        const { user, product } = req
        const wishlist = await Wishlist.findOne({user: user._id});
        req.wishlist = wishlist;
        next();
    }
    catch(err) {
        res.status(503).json({ success:false, error:err.message })
    }
}


const getUserById = async(req, res, next,userId) =>{
    try{
        const user = await User.findById(userId)
        if(!user){
            throw Error("No such user found");
        }
        req.user = user;
        next()
    } catch(err) {
        res.status(503).json({ 
            success:false, 
            error: "error occured"
        })
    }
}

module.exports = {
    getProductByID,
    getCategoryProducts,
    getUserCart,
    getUserWishlist,
    getUserById
}