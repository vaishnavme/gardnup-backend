const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: "Product name is required"
    },
    description: { 
        type: String,
        required: true 
    },
    image: { 
        type: "String", 
        required: "product image is required" 
    },
    category: { 
        type: String, 
        required: true,
        unique:"name should be unique" 
    },
    rating: { 
        type: Number 
    },
    inStock: { 
        type: Boolean 
    },
    size: { 
        type: String 
    },
    price: {
        type: Number,
        required: "Product price is required"
    },
    details: [{
        type: String
    }]
})

const Product = mongoose.model("Product", ProductSchema);
  
module.exports = { Product };