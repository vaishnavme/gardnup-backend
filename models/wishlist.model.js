const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    wishlist: [
        {type: Schema.Types.ObjectId, ref: "Product", required: true}
    ]
})

const Wishlist = mongoose.model("Wishlist", WishlistSchema);
module.exports = { Wishlist }