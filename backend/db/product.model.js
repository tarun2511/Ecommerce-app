const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a product name"]
    },
    description: {
        type: String,
    },
    rating: {
        type: Number
    },
    image: {
        data: String,
        contentType: String
    },
    startingPrice: {   
        type: Number,
        required: [true, "Please provide a starting price for the products"]
    },
    CurrentBid: {
        type: Number,
        default: 0
    },
    AvgRating: {
        type: Number,
        min: 0,
        max: 5
    },
    category: {
        type: String,
        required: [true, "Please provide a product category"]
    },
    brand: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model("Product", ProductSchema);

module.exports= Product;