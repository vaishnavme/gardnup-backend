const { Wishlist } = require("../models/wishlist.model");
const { User } = require("../models/user.model");
const { extend } = require("lodash");

const populateOption = {
    path: "wishlist",
    select: "name price image"
}

const getWislist = async(req, res) => {   
    try{
        const { user } = req;
        const wishlist = await Wishlist.findOne({user: user.userId}).populate(populateOption)
        res.json({
            success: true,
            wishlist
        })
    }
    catch(err) {
        res.status(503).json({ success:false, error:err.message })
    }
}

const toggleWishlistItems = async(req, res) => {
    try {
        const { productId } = req.params;
        const { type } = req.body;

        const currentWishlist = await Wishlist.findOne({user: userId});

        if(type === "REMOVE") {
            await currentWishlist.wishlist.pull(productId);
            currentWishlist.save();
        } else {
            if(currentWishlist) {
                const addNewItem = extend(currentWishlist, {
                    wishlist: [...currentWishlist.wishlist, productId]
                })
                await addNewItem.save();
            } 
            else {
                const newWishlist = new Wishlist({
                    user: user.userId,
                    wishlist: [productId]
                })
                await newWishlist.save();
            }
        }
        res.json({
            success: true,
        })
    } catch (err) {
        res.json({
            success: false,
            message: `ERROR Occured: ${err}`
        })
    }
}

module.exports = {
    getWislist,
    toggleWishlistItems,
}